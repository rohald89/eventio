import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { openContextModal } from "@mantine/modals";
import { GlobalModal } from "@/modals";
import { Button } from "@mantine/core";
import { confirmDelete } from "@/utils/mantine";
import { useMutation } from "@blitzjs/rpc";
import sendDummyEmail from "@/features/users/mutations/sendDummyEmail";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  const deleteAccountMutation = () => {
    console.log("deleting account");
  };

  const [$sendEmail] = useMutation(sendDummyEmail);

  return (
    <Layout title="Home">
      {!user && <AuthenticationForm />}
      <Button
        onClick={() => {
          openContextModal({
            modal: GlobalModal.becomePro,
            title: "Become a pro",
            innerProps: {
              price: 35,
            },
          });
        }}
      >
        Become a pro modal
      </Button>

      <Button
        color="red"
        onClick={() => {
          openContextModal({
            modal: GlobalModal.reportBug,
            title: "Report a bug",
            innerProps: {},
          });
        }}
      >
        Report a bug
      </Button>

      <Button
        color="red"
        onClick={() => {
          confirmDelete(
            () => {
              deleteAccountMutation();
            },
            {
              title: "Delete Account",
              text: "Are you sure you want to delete your profile? This action is destructive and you will have to contact support to restore your data.",
              confirmLabel: "Delete Account",
              cancelLabel: "No don't delete it",
            }
          );
        }}
      >
        Delete Account
      </Button>

      <Button
        onClick={async () => {
          await $sendEmail({});
        }}
        color="blue.4"
      >
        Send dummy email
      </Button>
    </Layout>
  );
};

export default Home;
