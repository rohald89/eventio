import { resolver } from "@blitzjs/rpc";

export default resolver.pipe(async () => {
  return { id: 1, title: "Buy Milk" };
});
