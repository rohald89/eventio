import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { Vertical } from "mantine-layout-components";
import { Button } from "@mantine/core";
import { useMutation } from "@blitzjs/rpc";
import adminOnlyMutation from "@/features/auth/mutations/adminOnlyMutation";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const [$adminOnlyMutation] = useMutation(adminOnlyMutation);

  return (
    <Layout title="Home">
      {user && (
        <Vertical>
          {user.isAdmin && (
            <Button
              onClick={() => {
                $adminOnlyMutation();
              }}
            >
              Admin only button
            </Button>
          )}
        </Vertical>
      )}
      {!user && <AuthenticationForm />}
    </Layout>
  );
};

export default Home;
