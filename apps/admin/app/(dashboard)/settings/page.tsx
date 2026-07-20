import { prisma } from "@eui/db";
import { auth } from "@/auth";
import { requireSection } from "@/require-section";
import { PasswordForm } from "./password-form";
import { GoalsForm } from "./goals-form";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requireSection("settings");
  const session = await auth();
  const user = await prisma.adminUser.findUnique({ where: { id: BigInt(session!.user.id) } });
  const preferences = (user?.preferences as { goals?: Record<string, number> } | null) ?? {};

  return (
    <div>
      <h1 style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 28, marginBottom: 20 }}>Settings</h1>

      <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Change Password</div>
        <p style={{ color: "var(--muted2)", fontSize: 12, marginBottom: 16 }}>
          Update the password for your own account ({user?.username}).
        </p>
        <PasswordForm />
      </div>

      <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 20, marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Monthly Goals</div>
        <p style={{ color: "var(--muted2)", fontSize: 12, marginBottom: 16 }}>
          Set monthly targets shown on the Analytics panel. Saved to your account, not this browser.
        </p>
        <GoalsForm goals={preferences.goals ?? {}} />
      </div>

      <div style={{ border: "1px solid var(--border2)", borderRadius: 6, padding: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Removed in this rewrite</div>
        <p style={{ color: "var(--muted2)", fontSize: 12, lineHeight: 1.7 }}>
          The old dashboard&apos;s maintenance-mode toggle, IP allowlist, spam-keyword filter and login-throttle
          warning were client-side only and enforced nothing server-side. They&apos;ve been dropped rather than
          carried forward as fake controls. The Resend API key and auto-reply/broadcast sending are now
          configured server-side via environment variables, never entered or stored in the browser.
        </p>
      </div>
    </div>
  );
}
