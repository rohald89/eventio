import { useForm, zodResolver } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
} from "@mantine/core";
import { useMutation } from "@blitzjs/rpc";

import { GoogleButton, TwitterButton } from "./SocialButtons";
import login from "@/features/auth/mutations/login";
import { Vertical } from "mantine-layout-components";
import { LoginFormType, LoginInput } from "@/features/auth/schemas";
import Link from "next/link";
import { Routes } from "@blitzjs/next";

export function LoginForm(props: PaperProps) {
  const [$login, { isLoading }] = useMutation(login);

  const form = useForm<LoginFormType>({
    validate: zodResolver(LoginInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values: LoginFormType) => {
    await $login(values);
  };

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Eventio, Login with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              {...form.getInputProps("email")}
              radius="md"
            />

            <Vertical fullW spacing="3px">
              <PasswordInput
                w="100%"
                required
                label="Password"
                placeholder="Your password"
                {...form.getInputProps("password")}
                radius="md"
              />
              <Text
                fz="xs"
                color="dimmed"
                sx={{ alignSelf: "flex-end" }}
                component={Link}
                href={Routes.ForgotPasswordPage()}
              >
                Forgot password?
              </Text>
            </Vertical>
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="dimmed" size="xs">
              Don't have an account? Register
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
}
