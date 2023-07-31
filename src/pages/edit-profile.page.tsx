import Layout from "@/core/layouts/Layout";
import EditProfileForm from "@/features/users/forms/EditProfileForm";
import updateProfile from "@/features/users/mutations/updateProfile";
import getUserForEditProfile from "@/features/users/queries/getUserForEditProfile";
import { UpdateProfileFormType, UpdateProfileInput } from "@/features/users/schemas";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";

export const EditProfilePage: BlitzPage = () => {
  const router = useRouter();
  const [$updateProfile, { isLoading }] = useMutation(updateProfile);

  const [data] = useQuery(getUserForEditProfile, {});
  const form = useForm<UpdateProfileFormType>({
    initialValues: {
      name: data?.name || "",
      username: data?.username || "",
      bio: data?.bio || "",
      avatarImageKey: data?.avatarImageKey || "",
      coverImageKey: data?.coverImageKey || "",
    },
    validate: zodResolver(UpdateProfileInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: UpdateProfileFormType) => {
    await $updateProfile(values);
    const { username } = values;
    if (username) {
      await router.push(Routes.ProfilePage({ username }));
    }
    //   TODO: what if username is empty?
    showNotification({
      color: "green",
      title: "Profile updated",
      message: "Your profile has been updated",
    });
  };
  return (
    <Layout>
      <Vertical>
        <EditProfileForm form={form} onSubmit={onSubmit} isSubmitting={isLoading} />
      </Vertical>
    </Layout>
  );
};

export default EditProfilePage;
