import { getUploadThingUrl } from "@/utils/images";
import {
  ActionIcon,
  Avatar,
  FileInput,
  Image,
  Indicator,
  Loader,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPhoto, IconX } from "@tabler/icons-react";
import { Horizontal, Vertical } from "mantine-layout-components";
import React from "react";
import { useBoolean } from "react-hanger";
import { useUploadThing } from "./UploadThing";
import { notifications } from "@mantine/notifications";
import { ReactFC } from "types";
import { UseFormReturnType } from "@mantine/form";

const UploadThingFileInput: ReactFC<{
  form: UseFormReturnType<any>;
  name: string;
  label: string;
}> = ({ form, name, label }) => {
  const loading = useBoolean(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      loading.setFalse();
      notifications.show({
        color: "green",
        title: "Image uploaded",
        icon: <IconPhoto size={16} />,
        message: "Image has been uploaded",
      });
      const fileKey = files?.[0]?.fileKey;
      form.setFieldValue(name, fileKey);
    },
    onUploadError: (error: Error) => {
      loading.setFalse();
      notifications.show({
        color: "red",
        title: "Error",
        icon: <IconPhoto size={16} />,
        message: error.message,
      });
    },
  });

  const existingImageKey = form.values[name];
  return (
    <Vertical>
      <Horizontal spacing="xs" center>
        <Text size="sm" weight={500}>
          {label}
        </Text>
        {loading.value && <Loader size="xs" />}
      </Horizontal>
      {existingImageKey && (
        <Indicator
          color="none"
          label={
            <Tooltip color="dark" label="Clear Image">
              <ActionIcon
                onClick={() => {
                  form.setFieldValue(name, "");
                }}
                variant="light"
                size="xs"
              >
                <IconX size={13} />
              </ActionIcon>
            </Tooltip>
          }
        >
          <Image
            src={getUploadThingUrl(existingImageKey)}
            alt="profile image"
            radius="sm"
            width="60px"
          />
        </Indicator>
      )}

      {!existingImageKey && (
        <FileInput
          disabled={loading.value}
          onChange={async (files) => {
            loading.setTrue();
            if (files) {
              await startUpload([files]);
            }
          }}
          clearable
          placeholder={label}
          icon={<IconPhoto size={16} />}
        />
      )}
    </Vertical>
  );
};

export default UploadThingFileInput;
