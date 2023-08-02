import ToggleUserSetting from "@/core/components/ToggleUserSetting";
import getUserEmailSettings from "@/features/users/queries/getUserEmailSettings";
import { useQuery } from "@blitzjs/rpc";
import { Vertical } from "mantine-layout-components";
import React from "react";

const UserEmailSettings = () => {
  const [settings] = useQuery(getUserEmailSettings, {});

  return (
    <Vertical>
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailMarketing"
        label="Marketing emails"
      />
      <ToggleUserSetting
        settings={settings}
        setting="settingsEmailProduct"
        label="Product emails"
      />
    </Vertical>
  );
};

export default UserEmailSettings;
