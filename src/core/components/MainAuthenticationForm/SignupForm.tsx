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

import signup from "@/features/auth/mutations/signup";
import { Vertical } from "mantine-layout-components";
import { SignUpFormType, SignupInput } from "@/features/auth/schemas";
import Link from "next/link";
import { Routes } from "@blitzjs/next";
import SocialButtonsAuth from "./SocialButtonsAuth";
import { ReactFC } from "types";

export const SignupForm: ReactFC<{
  toggle: () => void;
}> = ({ toggle }) => {
  const [$signup, { isLoading }] = useMutation(signup);

  const form = useForm<SignUpFormType>({
    validate: zodResolver(SignupInput),
    validateInputOnBlur: true,
    validateInputOnChange: ["terms"],
  });

  const onSubmit = async (values: SignUpFormType) => {
    await $signup(values);
  };

  return (
    <Vertical mih="100vh" center fullH fullW>
      <Paper radius="md" p="xl" withBorder>
        <Text size="lg" weight={500}>
          Welcome to Eventio, Sign Up with
        </Text>

        <SocialButtonsAuth />

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              {...form.getInputProps("name")}
              radius="md"
            />

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

            <Checkbox
              label="I accept terms and conditions"
              {...form.getInputProps("terms", { type: "checkbox" })}
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor onClick={toggle} component="button" type="button" color="dimmed" size="xs">
              Already have an account? Login
            </Anchor>
            <Button disabled={!form.isValid()} loading={isLoading} type="submit" radius="xl">
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Vertical>
  );
};
