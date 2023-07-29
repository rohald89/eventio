import { resolver } from "@blitzjs/rpc";
import { z } from "zod";

const Input = z.object({
  search: z.string().optional(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  console.log(`user is searching for ${search}`);
  const todos = [
    { id: 1, title: "Buy Milk" },
    { id: 2, title: "Buy Eggs" },
    { id: 3, title: "Buy Bread" },
  ];

  return todos;
});
