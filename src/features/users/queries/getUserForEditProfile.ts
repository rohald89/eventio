import { resolver } from "@blitzjs/rpc";
import { NotFoundError } from "blitz";
import db from "db";
import { z } from "zod";

const Input = z.object({});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
      select: { id: true, username: true, name: true, bio: true },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
);
