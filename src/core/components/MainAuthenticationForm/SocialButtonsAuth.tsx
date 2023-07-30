import { Group } from "@mantine/core";
import React from "react";
import { GoogleButton, TwitterButton } from "./SocialButtons";

const SocialButtonsAuth = () => {
  return (
    <Group grow mb="md" mt="md">
      <GoogleButton radius="xl">Google</GoogleButton>
      <TwitterButton radius="xl">Twitter</TwitterButton>
    </Group>
  );
};

export default SocialButtonsAuth;
