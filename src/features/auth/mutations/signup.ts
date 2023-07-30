import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";
import db from "db";
import { Role } from "types";
import { Signup } from "../schemas";
import { PrismaError } from "@/utils/blitz";

export default resolver.pipe(resolver.zod(Signup), async ({ name, email, password }, ctx) => {
  const existingUser = await db.user.findFirst({
    where: { email: email.toLowerCase().trim() },
  });

  if (existingUser) throw new Error("This email is already registered");

  const hashedPassword = await SecurePassword.hash(password.trim());
  try {
    const user = await db.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
      },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      await ctx.session.$create({ userId: user.id, role: user.role as Role });
      return user;
    }
  } catch (err) {
    throw new PrismaError(err.message, err.code, err.meta);
  }

  return null;
});
