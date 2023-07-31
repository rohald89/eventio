import { resolver } from "@blitzjs/rpc";
import { Role } from "types";
import { authenticateUser } from "@/utils/auth";
import { LoginInput } from "../schemas";

export default resolver.pipe(resolver.zod(LoginInput), async (params, ctx) => {
  const { email, password } = params;
  const user = await authenticateUser(email, password);
  await ctx.session.$create({ userId: user.id, role: user.role as Role });

  return user;
});
