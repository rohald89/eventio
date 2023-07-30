import Layout from "@/core/layouts/Layout";
import resetPassword from "@/features/auth/mutations/resetPassword";
import { BlitzPage, Routes } from "@blitzjs/next";
import { useMutation } from "@blitzjs/rpc";
import Link from "next/link";
import { Button, PasswordInput, Title, Text } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { ResetPasswordFormType, ResetPasswordInput } from "@/features/auth/schemas";
import { useStringQueryParam } from "@/utils/utils";
import { Vertical } from "mantine-layout-components";

const ResetPasswordPage: BlitzPage = () => {
  const token = useStringQueryParam("token");
  const [$resetPassword, { isSuccess, isLoading }] = useMutation(resetPassword);

  const form = useForm<ResetPasswordFormType>({
    initialValues: {
      token: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: zodResolver(ResetPasswordInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values) => {
    await $resetPassword({ ...values, token: token as string });
  };

  if (!token) return <Text>Invalid Token</Text>;

  return (
    <Layout title="Reset Your Password">
      <div>
        <h1>Set a New Password</h1>

        {isSuccess && (
          <Vertical>
            <Title order={3}>Password Reset Successfully</Title>
            <p>
              Go to the <Link href={Routes.Home()}>homepage</Link>
            </p>
          </Vertical>
        )}
        {!isSuccess && (
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Vertical fullW>
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password Confirmation"
                {...form.getInputProps("passwordConfirmation")}
              />

              <Button disabled={!form.isValid()} loading={isLoading} type="submit">
                Submit
              </Button>
            </Vertical>
          </form>
        )}
      </div>
    </Layout>
  );
};

ResetPasswordPage.redirectAuthenticatedTo = "/";

export default ResetPasswordPage;
