import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  subject: z.string().max(300).optional(),
  message: z.string().min(1).max(5000),
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const newsletterSignupSchema = z.object({
  email: z.string().email(),
});
export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>;
