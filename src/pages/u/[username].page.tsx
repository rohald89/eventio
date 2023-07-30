import Layout from "@/core/layouts/Layout";
import EditProfileForm from "@/features/users/forms/EditProfileForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import updateProfile from "@/features/users/mutations/updateProfile";
import getUserForProfile from "@/features/users/queries/getUserForProfile";
import { UpdateProfileFormType, UpdateProfileInput } from "@/features/users/schemas";
import { useStringParam } from "@/utils/utils";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { Button, Modal, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";

export const ProfilePage: BlitzPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const username = useStringParam("username");
  const currentUser = useCurrentUser();
  const router = useRouter();

  const [user] = useQuery(
    getUserForProfile,
    { username: username || "" },
    {
      enabled: !!username,
    }
  );

  const [$updateProfile, { isLoading }] = useMutation(updateProfile);

  const form = useForm<UpdateProfileFormType>({
    initialValues: {
      name: user?.name || "",
      username: user?.username || "",
      bio: user?.bio || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: UpdateProfileFormType) => {
    await $updateProfile(values);
    const { username } = values;
    if (username !== user?.username) {
      if (username) {
        await router.push(Routes.ProfilePage({ username }));
      }
      //   TODO: what if username is empty?
    }
    showNotification({
      color: "green",
      title: "Profile updated",
      message: "Your profile has been updated",
    });
    close();
  };

  const isOwner = currentUser?.id === user?.id;

  if (!user) return <Text>User not found 😭</Text>;

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          close();
          form.reset();
        }}
        title="Edit Profile"
      >
        <EditProfileForm form={form} onSubmit={onSubmit} isSubmitting={isLoading} />
      </Modal>

      <Layout>
        <Vertical>
          {isOwner && <Button onClick={open}>Edit Profile</Button>}
          <Text>Hello {username}</Text>
          <Text>{user.bio}</Text>
        </Vertical>
      </Layout>
    </>
  );
};

export default ProfilePage;
