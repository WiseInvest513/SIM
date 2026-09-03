import test from "node:test";
import assert from "node:assert/strict";
import { orderUserId, findOrderUser, ensureOrderUser } from "../lib/wise-order-identity.ts";

function mockDb() {
  const users = new Map();
  const created = [];
  return { users, created, auth: { admin: {
    async getUserById(id) {
      return users.has(id) ? { data: { user: users.get(id) }, error: null } : { data: { user: null }, error: { status: 404, code: "user_not_found" } };
    },
    async createUser(input) {
      created.push(input);
      if (users.has(input.id)) return { data: { user: null }, error: { code: "conflict" } };
      users.set(input.id, input);
      return { data: { user: input }, error: null };
    },
  } } };
}

test("stable UUID and distinct subjects", () => {
  assert.equal(orderUserId("a"), orderUserId("a"));
  assert.notEqual(orderUserId("a"), orderUserId("b"));
  assert.match(orderUserId("a"), /^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  assert.throws(() => orderUserId(""));
});
test("read-only account visit creates no identity", async () => {
  const db = mockDb();
  assert.equal(await findOrderUser(db, "a"), null);
  assert.equal(db.created.length, 0);
});
test("first order creates banned identity; subsequent orders reuse it", async () => {
  const db = mockDb();
  const id = await ensureOrderUser(db, "a");
  assert.equal(await ensureOrderUser(db, "a"), id);
  assert.equal(db.created.length, 1);
  assert.equal(db.created[0].ban_duration, "876000h");
  assert.ok(db.created[0].email.endsWith(".invalid"));
});
test("unrelated existing UID is never accepted", async () => {
  const db = mockDb();
  db.users.set(orderUserId("a"), { id: orderUserId("a"), app_metadata: {} });
  await assert.rejects(ensureOrderUser(db, "a"), /mismatch/);
  assert.equal(db.created.length, 0);
});
test("concurrent first orders resolve to same verified identity", async () => {
  const db = mockDb();
  const [a, b] = await Promise.all([ensureOrderUser(db, "a"), ensureOrderUser(db, "a")]);
  assert.equal(a, b);
  assert.equal(db.users.size, 1);
});
test("lookup failure does not create users", async () => {
  const db = mockDb();
  db.auth.admin.getUserById = async () => ({ data: { user: null }, error: { status: 503 } });
  await assert.rejects(ensureOrderUser(db, "a"), /lookup failed/);
  assert.equal(db.created.length, 0);
});
