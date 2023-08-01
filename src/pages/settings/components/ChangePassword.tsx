import changePassword from "@/features/auth/mutations/changePassword";
import { ChangePasswordFormType, ChangePasswordInput } from "@/features/auth/schemas";
import { useMutation } from "@blitzjs/rpc";
import { Button, Card, PasswordInput, Text, Title } from "@mantine/core";
import { Form, useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { Vertical } from "mantine-layout-components";
import React from "react";

const ChangePassword = () => {
  const [$changePassword, { isLoading, isSuccess }] = useMutation(changePassword);

  const form = useForm<ChangePasswordFormType>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validate: zodResolver(ChangePasswordInput),
    validateInputOnBlur: true,
  });

  const onSubmit = async (values) => {
    await $changePassword(values);
    if (isSuccess) {
      notifications.show({
        title: "Password Changed",
        message: "Your password has been changed successfully",
        color: "green",
      });
      form.reset();
    }
  };

  return (
    <Card withBorder w="100%" maw={300}>
      <Vertical fullW>
        <Title order={4}>Change Password</Title>
        <Vertical fullW>
          <Form style={{ width: "100%" }} form={form} onSubmit={onSubmit}>
            <Vertical fullW>
              <PasswordInput
                w="100%"
                withAsterisk
                label="Current Password"
                {...form.getInputProps("currentPassword")}
              />
              <PasswordInput
                w="100%"
                withAsterisk
                label="New Password"
                {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                w="100%"
                withAsterisk
                label="Password Confirmation"
                {...form.getInputProps("newPasswordConfirmation")}
              />

              <Button disabled={!form.isValid()} loading={isLoading} type="submit">
                Submit
              </Button>
            </Vertical>
          </Form>
        </Vertical>
      </Vertical>
    </Card>
  );
};

export default ChangePassword;
