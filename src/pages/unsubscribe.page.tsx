import Layout from "@/core/layouts/Layout";
import { useStringQueryParam } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useQuery } from "@blitzjs/rpc";
import getUserEmailSettingsForUnsubscribe from "@/features/users/queries/getUserEmailSettingsForUnsubscribe";

import setUserEmailSetting from "@/features/users/mutations/setUserEmailSetting";
import { useMutation } from "@blitzjs/rpc";
import { Checkbox } from "@mantine/core";
import React from "react";

const ToggleUserSetting = ({ settings, setting, token, label }) => {
  const [$setUserSetting, { isLoading }] = useMutation(setUserEmailSetting);

  return (
    <Checkbox
      disabled={isLoading}
      onClick={async () => {
        await $setUserSetting({
          key: setting,
          value: !settings?.[setting],
          token,
        });
      }}
      checked={settings?.[setting]}
      label={label}
    />
  );
};

export const UnsubscribePage: BlitzPage = () => {
  const token = useStringQueryParam("token");

  const [settings] = useQuery(getUserEmailSettingsForUnsubscribe, { token: token as any });
  return (
    <Layout>
      <Vertical>
        <Text>Email Settings</Text>
        <Vertical>
          <ToggleUserSetting
            token={token}
            settings={settings}
            setting="settingsEmailMarketing"
            label="Marketing emails"
          />
          <ToggleUserSetting
            token={token}
            settings={settings}
            setting="settingsEmailProduct"
            label="Product emails"
          />
        </Vertical>
      </Vertical>
    </Layout>
  );
};

export default UnsubscribePage;
