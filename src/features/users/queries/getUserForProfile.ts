import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const Input = z.object({
  username: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ username }, { session: { userId } }) => {
  const user = await db.user.findFirst({
    where: { username },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      avatarImageKey: true,
      coverImageKey: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
});
