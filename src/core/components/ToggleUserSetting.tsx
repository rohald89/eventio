import setUserSetting from "@/features/users/mutations/setUserSetting";
import { useMutation } from "@blitzjs/rpc";
import { Checkbox } from "@mantine/core";
import React from "react";

const ToggleUserSetting = ({ settings, setting, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserSetting);

  return (
    <Checkbox
      disabled={isLoading}
      onClick={async () => {
        await $setUserSetting({
          key: setting,
          value: !settings?.[setting],
        });
      }}
      checked={settings?.[setting]}
      label={label}
    />
  );
};

export default ToggleUserSetting;
