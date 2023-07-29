import { resolver } from "@blitzjs/rpc";
import { Role } from "types";
import { authenticateUser } from "@/utils/auth";
import { Login } from "../schemas";

export default resolver.pipe(resolver.zod(Login), async (params, ctx) => {
  const { email, password } = params;
  const user = await authenticateUser(email, password);
  await ctx.session.$create({ userId: user.id, role: user.role as Role });

  return user;
});
