import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { Routes } from "@blitzjs/next";
import { List, RingProgress, Text, Tooltip } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import Link from "next/link";
import React from "react";

const UserProfileProgress = () => {
  const user = useCurrentUser();

  if (!user) return null;
  const keys = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "username",
      label: "Username",
    },
    {
      key: "bio",
      label: "Bio",
    },
    {
      key: "avatarImageKey",
      label: "Profile picture",
    },
    {
      key: "coverImageKey",
      label: "Cover Image",
    },
  ];

  const existingKeys = keys.filter(({ key }) => user[key]);

  const missingKeys = keys.filter(({ key }) => !user[key]);

  const completionPercentage = (existingKeys.length / keys.length) * 100;

  if (completionPercentage === 100) return null;
  return (
    <Link href={Routes.EditProfilePage()}>
      <Tooltip
        color="dark"
        label={
          <Vertical spacing="xs">
            <Text fw="bold">Profile Progress ({completionPercentage}%)</Text>
            <Vertical spacing="0">
              <Text>Missing:</Text>
              <List>
                {missingKeys.map(({ label }) => (
                  <List.Item key={label}>{label}</List.Item>
                ))}
              </List>
            </Vertical>
          </Vertical>
        }
      >
        <RingProgress
          size={25}
          thickness={4}
          roundCaps
          sections={[{ value: completionPercentage, color: "cyan" }]}
        />
      </Tooltip>
    </Link>
  );
};

export default UserProfileProgress;
