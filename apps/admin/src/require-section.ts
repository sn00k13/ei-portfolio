import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { hasPermission } from "@eui/shared";

/**
 * Server-side permission gate for a section route/layout or a Server Action.
 * The old dashboard only hid nav items client-side (hasPermission()/
 * applySessionToUI()) while every Supabase call still used the same anon
 * key — this is the real enforcement point that replaces that.
 */
export async function requireSection(sectionId: string) {
  const session = await auth();
  if (!session?.user) redirect(`/login?callbackUrl=/${sectionId}`);
  if (!hasPermission(session.user, sectionId)) redirect("/overview?denied=" + sectionId);
  return session;
}
