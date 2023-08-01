import { z } from "zod";

export const email = z
  .string()
  .email()
  .transform((str) => str.toLowerCase().trim());

export const password = z
  .string()
  .min(6)
  .max(100)
  .transform((str) => str.trim());

export const name = z.string().min(2);

export const SignupInput = z.object({
  email,
  password,
  name,
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type SignUpFormType = z.infer<typeof SignupInput>;

export const LoginInput = z.object({
  email,
  password: z.string(),
});

export type LoginFormType = z.infer<typeof LoginInput>;

export const ForgotPasswordInput = z.object({
  email,
});

export type ForgotPasswordFormType = z.infer<typeof ForgotPasswordInput>;

export const ResetPasswordInput = z
  .object({
    password: password,
    passwordConfirmation: password,
    token: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });

export type ResetPasswordFormType = z.infer<typeof ResetPasswordInput>;

// export const ChangePassword = z.object({
//   currentPassword: z.string(),
//   newPassword: password,
// });

export const ChangePasswordInput = z
  .object({
    currentPassword: password,
    newPassword: password,
    newPasswordConfirmation: password,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"], // set the path of the error
  });

export type ChangePasswordFormType = z.infer<typeof ChangePasswordInput>;
