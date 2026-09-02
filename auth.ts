import NextAuth from "next-auth";

type WiseProfile = { sub: string; wise_user_id?: string; user_id?: string; email?: string; email_verified?: boolean; name?: string; picture?: string; membership_tier?: "MEMBER" | "VIP" | "VIP_PLUS" };

const WISE_ADMIN_USER_IDS = ["Y36FUHLKBHJVE"];

function isAdmin(wiseUserId?: string | null) {
  return Boolean(wiseUserId && WISE_ADMIN_USER_IDS.includes(wiseUserId));
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.WISE_AUTH_CLIENT_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login", error: "/auth/login" },
  providers: [{
    id: "wise", name: "Wise ID", type: "oidc",
    issuer: "https://wise-invest.org",
    wellKnown: "https://www.wise-invest.org/.well-known/openid-configuration",
    clientId: "wise_sim",
    clientSecret: process.env.WISE_AUTH_CLIENT_SECRET,
    checks: ["pkce", "state", "nonce"], idToken: true,
    authorization: { params: { scope: "openid profile email wise.membership" } },
    profile(raw) {
      const p = raw as WiseProfile;
      return { id: p.sub, name: p.name ?? p.email ?? "Wise 用户", email: p.email ?? null, image: p.picture ?? null, wiseSubject: p.sub, wiseUserId: p.wise_user_id ?? p.user_id ?? null, wiseEmailVerified: Boolean(p.email_verified), membershipTier: p.membership_tier ?? "MEMBER" };
    },
  }],
  callbacks: {
    jwt({ token, user, profile }) {
      const p = profile as WiseProfile | undefined;
      if (user && p) { token.wiseSubject = p.sub; token.wiseUserId = p.wise_user_id ?? p.user_id ?? null; token.wiseEmailVerified = Boolean(p.email_verified); token.membershipTier = p.membership_tier ?? "MEMBER"; }
      return token;
    },
    session({ session, token }) {
      session.user.wiseSubject = token.wiseSubject as string;
      session.user.wiseUserId = (token.wiseUserId as string | null) ?? null;
      session.user.wiseEmailVerified = Boolean(token.wiseEmailVerified);
      session.user.membershipTier = (token.membershipTier as "MEMBER" | "VIP" | "VIP_PLUS") ?? "MEMBER";
      session.user.isAdmin = isAdmin(session.user.wiseUserId);
      return session;
    },
  },
});
