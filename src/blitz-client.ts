import { AuthClientPlugin } from "@blitzjs/auth";
import { setupBlitzClient } from "@blitzjs/next";
import { BlitzRpcPlugin, getQueryClient } from "@blitzjs/rpc";
import { notifications } from "@mantine/notifications";

export const authConfig = {
  cookiePrefix: "eventio",
};

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: {
          retry: 2,
        },
        mutations: {
          onSuccess: async () => {
            const queryClient = getQueryClient();
            await queryClient.invalidateQueries();
          },
          onError: async (err: any) => {
            notifications.show({
              color: "red",
              title: "Error",
              message: err.message,
            });
          },
        },
      },
    }),
  ],
});
