import { NotFoundError, AuthenticationError } from "blitz";
import { resolver } from "@blitzjs/rpc";
import { SecurePassword } from "@blitzjs/auth/secure-password";
import db from "db";
import { ChangePasswordInput } from "../schemas";
import { authenticateUser } from "@/utils/auth";
import login from "./login";

export default resolver.pipe(
  resolver.zod(ChangePasswordInput),
  resolver.authorize(),
  async ({ currentPassword, newPassword, newPasswordConfirmation }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId } });
    if (!user) throw new NotFoundError();

    if (newPassword !== newPasswordConfirmation) throw new Error("Passwords do not match");

    try {
      await authenticateUser(user.email, currentPassword);
    } catch (error) {
      if (error instanceof AuthenticationError) {
        throw new Error("Invalid Password");
      }
      throw error;
    }

    const hashedPassword = await SecurePassword.hash(newPassword.trim());

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    });

    await login({ email: updatedUser.email, password: newPassword }, ctx);

    return true;
  }
);
