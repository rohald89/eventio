import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Tabs } from "@mantine/core";
import { IconMail, IconSettings, IconUserCog } from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";

export const SettingsPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical>
        <Tabs orientation="vertical" defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="account" icon={<IconUserCog size="0.8rem" />}>
              Account
            </Tabs.Tab>
            <Tabs.Tab value="email" icon={<IconMail size="0.8rem" />}>
              Email
            </Tabs.Tab>
            <Tabs.Tab value="settings" icon={<IconSettings size="0.8rem" />}>
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="account" pl="xs">
            Account tab content
          </Tabs.Panel>
          <Tabs.Panel value="email" pl="xs">
            Email tab content
          </Tabs.Panel>

          <Tabs.Panel value="settings" pl="xs">
            Settings tab content
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  );
};

export default SettingsPage;
