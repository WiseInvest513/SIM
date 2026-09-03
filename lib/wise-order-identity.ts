import { createHash, randomBytes } from "node:crypto";
import type { SupabaseClient, User } from "@supabase/supabase-js";

const ISSUER = "https://wise-invest.org";
const KIND = "wise-sim-order-v1";

// Stable, namespaced UUID: independent of email, display name and secret rotation.
export function orderUserId(subject: string): string {
  if (!subject) throw new Error("Missing Wise subject");
  const bytes = createHash("sha256").update(JSON.stringify([KIND, ISSUER, subject])).digest().subarray(0, 16);
  bytes[6] = (bytes[6] & 0x0f) | 0x80;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function verifyIdentity(user: User, subject: string) {
  const meta = user.app_metadata;
  if (user.id !== orderUserId(subject) || meta?.mapping_kind !== KIND || meta?.wise_issuer !== ISSUER || meta?.wise_subject !== subject) {
    throw new Error("Order identity mismatch");
  }
  return user.id;
}

// Read-only: visiting the account/order pages never creates a local identity.
export async function findOrderUser(db: SupabaseClient, subject: string): Promise<string | null> {
  const { data, error } = await db.auth.admin.getUserById(orderUserId(subject));
  if (error) {
    if (error.status === 404 || error.code === "user_not_found") return null;
    throw new Error(`Order identity lookup failed (${error.code ?? error.status})`);
  }
  return data.user ? verifyIdentity(data.user, subject) : null;
}

export async function ensureOrderUser(db: SupabaseClient, subject: string): Promise<string> {
  const existing = await findOrderUser(db, subject);
  if (existing) return existing;
  const id = orderUserId(subject);
  const { data, error } = await db.auth.admin.createUser({
    id,
    email: `wise-order-${id}@identity.wise-sim.invalid`,
    password: randomBytes(48).toString("base64url"),
    email_confirm: true,
    ban_duration: "876000h",
    app_metadata: { mapping_kind: KIND, wise_issuer: ISSUER, wise_subject: subject },
    user_metadata: { role: "user", display_name: "Wise 订单内部身份" },
  });
  if (!error && data.user) return verifyIdentity(data.user, subject);
  // Concurrent first orders can race; accept only an exact, verified mapping.
  const concurrent = await findOrderUser(db, subject);
  if (concurrent) return concurrent;
  throw new Error(`Order identity creation failed (${error?.code ?? "unknown"})`);
}
