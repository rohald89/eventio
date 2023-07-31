import { Button, TextInput, Textarea } from "@mantine/core";
import { Form, UseFormReturnType } from "@mantine/form";
import { Vertical } from "mantine-layout-components";
import React from "react";
import { UpdateProfileFormType } from "../schemas";
import { ReactFC } from "types";
import UploadThingFileInput from "@/core/components/UploadThingFileInput";

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
          label="Username"
          placeholder="Your username"
          {...form.getInputProps("username")}
          radius="md"
        />
        <Textarea
          w="100%"
          label="Bio"
          placeholder="Your Bio"
          {...form.getInputProps("bio")}
          radius="md"
        />

        <UploadThingFileInput form={form} name="avatarImageKey" label="Profile picture" />
        <UploadThingFileInput form={form} name="coverImageKey" label="Cover Image" />

        <Button disabled={!form.isValid()} loading={isSubmitting} type="submit">
          Save
        </Button>
      </Vertical>
    </Form>
  );
};

export default EditProfileForm;
