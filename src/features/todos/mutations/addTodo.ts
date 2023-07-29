import { resolver } from "@blitzjs/rpc";
import db from "db";

import { z } from "zod";

const Input = z.object({
  title: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ title }, { session: { userId } }) => {
    const todo = await db.todo.create({
      data: {
        title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log(`Creating a todo with the title: ${title}`);
    return todo;
  }
);
