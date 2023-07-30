import Layout from "@/core/layouts/Layout";
import forgotPassword from "@/features/auth/mutations/forgotPassword";
import { useMutation } from "@blitzjs/rpc";
import { BlitzPage } from "@blitzjs/next";
import { Button, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import { ForgotPasswordFormType, ForgotPasswordInput } from "@/features/auth/schemas";
import { notifications } from "@mantine/notifications";

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess, isLoading }] = useMutation(forgotPassword);

  const onSubmit = async (values: ForgotPasswordFormType) => {
    await forgotPasswordMutation(values);
    notifications.show({
      color: "green",
      title: "Password Reset",
      message:
        "If your email is in our system, you will receive instructions to reset your password shortly.",
    });
  };

  const form = useForm<ForgotPasswordFormType>({
    initialValues: {
      email: "",
    },
    validate: zodResolver(ForgotPasswordInput),
  });
  return (
    <Layout title="Forgot Your Password?">
      <Title order={3}>Forgot your password?</Title>

      {isSuccess && (
        <Vertical>
          <Title order={3}>Request Submitted</Title>
          <p>
            If your email is in our system, you will receive instructions to reset your password
            shortly.
          </p>
        </Vertical>
      )}
      {!isSuccess && (
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Vertical>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />

            <Button disabled={!form.isValid()} loading={isLoading} type="submit">
              Submit
            </Button>
          </Vertical>
        </form>
      )}
    </Layout>
  );
};

export default ForgotPasswordPage;
