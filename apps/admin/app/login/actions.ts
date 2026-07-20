"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export async function loginAction(_prevState: string | undefined, formData: FormData): Promise<string | undefined> {
  const username = formData.get("username");
  const password = formData.get("password");
  const callbackUrl = (formData.get("callbackUrl") as string) || "/overview";

  try {
    await signIn("credentials", { username, password, redirectTo: callbackUrl });
  } catch (err) {
    if (err instanceof AuthError) {
      return "Invalid username or password.";
    }
    throw err;
  }
}
