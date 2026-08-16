import { z } from "zod";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const schemaChangePassword = z
  .object({
    password: z
      .string()
      .min(1, "Current password is required")
      .regex(
        passwordRegex,
        "Must contain 8+ characters, uppercase, lowercase, number, and special character.",
      ),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .regex(
        passwordRegex,
        "Must contain 8+ characters, uppercase, lowercase, number, and special character.",
      ),

    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
