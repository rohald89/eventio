import { Box, Button, Indicator, Menu, Text, Tooltip } from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconPencil,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconTrash,
  IconUser,
  IconUserShield,
} from "@tabler/icons-react";
import React from "react";
import Conditional from "conditional-wrap";
import UserAvatar from "../UserAvatar";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import { MenuItemIcon, MenuItemLink } from "../MenuItems";
import { Routes } from "@blitzjs/next";

const UserHeaderMenu = () => {
  const user = useCurrentUser();

  if (!user) return null;
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Box sx={{ cursor: "pointer" }}>
          <Conditional
            condition={user.isAdmin}
            wrap={(children) => (
              <Indicator
                position="bottom-end"
                color="none"
                label={
                  <Tooltip color="dark" label="Admin">
                    <Box>
                      <IconUserShield size={15} />
                    </Box>
                  </Tooltip>
                }
              >
                {children}
              </Indicator>
            )}
          >
            <UserAvatar user={user} />
          </Conditional>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <MenuItemLink Icon={IconSettings} href={Routes.SettingsPage()}>
          Setting
        </MenuItemLink>
        <MenuItemLink Icon={IconPencil} href={Routes.EditProfilePage()}>
          Edit profile
        </MenuItemLink>
        {user.username && (
          <MenuItemLink
            Icon={IconUser}
            href={Routes.ProfilePage({
              username: user.username,
            })}
          >
            Go to Profile
          </MenuItemLink>
        )}

        <Menu.Item
          icon={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" color="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={14} />}>
          Delete my account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserHeaderMenu;
