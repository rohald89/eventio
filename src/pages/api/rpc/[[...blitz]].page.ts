import { errorFormatter } from "@/utils/blitz";
import { rpcHandler } from "@blitzjs/rpc";
import { api } from "src/blitz-server";

export default api(
  rpcHandler({
    formatError: errorFormatter,
    onError: console.log,
  })
);
