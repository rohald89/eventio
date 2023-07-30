import { useToggle, upperFirst } from "@mantine/hooks";
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
  Checkbox,
  Anchor,
  Stack,
} from "@mantine/core";
import { useMutation } from "@blitzjs/rpc";

import { GoogleButton, TwitterButton } from "./SocialButtons";
import login from "@/features/auth/mutations/login";
import signup from "@/features/auth/mutations/signup";
import { Vertical } from "mantine-layout-components";
import { Signup } from "@/features/auth/schemas";
import { z } from "zod";
import Link from "next/link";
import { Routes } from "@blitzjs/next";

type SignUpFormType = z.infer<typeof Signup>;

export function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const [$login, { isLoading: isLoggingIn }] = useMutation(login);
  const [$signup, { isLoading: isSigningUp }] = useMutation(signup);

  const form = useForm<SignUpFormType>({
    validate: zodResolver(Signup),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  });

  const onSubmit = async (values: SignUpFormType) => {
    if (type === "login") {
      await $login(values);
    } else {
      await $signup(values);
    }
  };

  const loading = isLoggingIn || isSigningUp;

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Eventio, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
          <TwitterButton radius="xl">Twitter</TwitterButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            {type === "register" && (
              <TextInput
                required
                label="Name"
                placeholder="Your name"
                {...form.getInputProps("name")}
                radius="md"
              />
            )}

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
            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                {...form.getInputProps("terms", { type: "checkbox" })}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={!form.isValid()} loading={loading} type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
}
