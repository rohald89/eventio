import { getAvatarFallback, getUploadThingUrl } from "@/utils/images";
import { Avatar, AvatarProps } from "@mantine/core";
import React from "react";
import { ReactFC } from "types";

type Props = {
  user: {
    name?: string | null;
    avatarImageKey?: string | null;
  };
} & Partial<AvatarProps>;

const UserAvatar: ReactFC<Props> = ({ user, ...rest }) => {
  return (
    <Avatar src={getUploadThingUrl(user.avatarImageKey)} radius="xl" {...rest}>
      {getAvatarFallback(user.name)}
    </Avatar>
  );
};

export default UserAvatar;
