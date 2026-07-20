import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@eui/db";
import type { AdminRole } from "@eui/shared";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      displayName: string | null;
      role: AdminRole;
      permissions: string[];
    };
  }
}

/**
 * The JWT type augmentation for "next-auth/jwt" is flaky across next-auth
 * v5 beta releases under TS "bundler" module resolution, so the extra
 * session fields are carried via a local interface + casts here instead of
 * augmenting the library's ambient JWT type.
 */
interface AppToken {
  id?: string;
  username?: string;
  displayName?: string | null;
  role?: AdminRole;
  permissions?: string[];
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Auth.js v5 refuses the request's Host header by default unless told to
  // trust it — necessary on Netlify (and most serverless platforms), which
  // proxies/terminates TLS in front of the function, so the Host header
  // doesn't match what a single fixed NEXTAUTH_URL would predict across a
  // custom domain, its netlify.app preview, and any future domain changes.
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username;
        const password = credentials?.password;
        if (typeof username !== "string" || typeof password !== "string") return null;

        const user = await prisma.adminUser.findUnique({ where: { username } });
        if (!user || user.status !== "active") return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        await prisma.adminUser.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });

        return {
          id: user.id.toString(),
          username: user.username,
          displayName: user.displayName,
          role: user.role as AdminRole,
          permissions: Array.isArray(user.permissions) ? (user.permissions as string[]) : [],
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const t = token as AppToken;
      if (user) {
        t.id = user.id;
        t.username = (user as any).username;
        t.displayName = (user as any).displayName;
        t.role = (user as any).role;
        t.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      const t = token as AppToken;
      session.user.id = t.id!;
      session.user.username = t.username!;
      session.user.displayName = t.displayName ?? null;
      session.user.role = t.role!;
      session.user.permissions = t.permissions ?? [];
      return session;
    },
  },
});
