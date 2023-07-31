import { Button, TextInput, Textarea } from "@mantine/core";
import { Form, UseFormReturnType } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import React from "react";
import { UpdateProfileFormType } from "../schemas";
import { ReactFC } from "types";
import { UploadButton } from "@/core/components/UploadThing";
import { notifications } from "@mantine/notifications";

export const EditProfileForm: ReactFC<{
  form: UseFormReturnType<UpdateProfileFormType>;
  onSubmit: (values: UpdateProfileFormType) => Promise<void>;
  isSubmitting: boolean;
}> = ({ form, onSubmit, isSubmitting }) => {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Vertical fullW>
        <TextInput
          w="100%"
          required
          label="Name"
          placeholder="Your name"
          {...form.getInputProps("name")}
          radius="md"
        />
        <TextInput
          w="100%"
          required
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          required
          label="Bio"
          placeholder="Your Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const fileKey = res?.[0]?.fileKey;
            // Do something with the response
            console.log("Files: ", res);
            notifications.show({
              color: "green",
              title: "Files uploaded",
              message: "Files have been uploaded",
            });
            form.setFieldValue("avatarImageKey", fileKey);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            console.log("Error: ", error);
            notifications.show({
              color: "red",
              title: "Error",
              message: error.message,
            });
          }}
        />
        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  );
};

export default EditProfileForm;
