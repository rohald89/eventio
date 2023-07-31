import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { openContextModal } from "@mantine/modals";
import { GlobalModal } from "@/modals";
import { Button } from "@mantine/core";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  return (
    <Layout title="Home">
      {!user && <AuthenticationForm />}
      <Button
        onClick={() => {
          openContextModal({
            modal: GlobalModal.becomePro,
            title: "Become a pro",
            innerProps: {},
          });
        }}
      >
        Become a pro modal
      </Button>
    </Layout>
  );
};

export default Home;
