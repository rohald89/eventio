import { resolver } from "@blitzjs/rpc";
import db from "db";

import { TodoInput } from "../schemas";

export default resolver.pipe(
  resolver.zod(TodoInput),
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
