import { ourFileRouter } from "@/uploadthing/uploadthing-router";
import { createNextPageApiHandler } from "uploadthing/next-legacy";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;
