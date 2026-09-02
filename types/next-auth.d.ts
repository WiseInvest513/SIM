import "next-auth";
import "next-auth/jwt";
type MembershipTier = "MEMBER" | "VIP" | "VIP_PLUS";
declare module "next-auth" {
  interface User { wiseSubject?: string; wiseUserId?: string | null; wiseEmailVerified?: boolean; membershipTier?: MembershipTier }
  interface Session { user: User & { wiseSubject: string; wiseUserId: string | null; wiseEmailVerified: boolean; membershipTier: MembershipTier; isAdmin: boolean } }
}
declare module "next-auth/jwt" { interface JWT { wiseSubject?: string; wiseUserId?: string | null; wiseEmailVerified?: boolean; membershipTier?: MembershipTier } }
