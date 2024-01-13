import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { Tabs } from "@mantine/core";
import { IconUserCog } from "@tabler/icons-react";
import { Vertical } from "mantine-layout-components";

export const AdminPage: BlitzPage = () => {
  return (
    <Layout>
      <Vertical fullW>
        <Tabs w="100%" orientation="vertical" defaultValue="email">
          <Tabs.List>
            <Tabs.Tab value="email" icon={<IconUserCog size="0.8rem" />}>
              Email
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="email" pl="xs">
            Sent Bulk Email
          </Tabs.Panel>
        </Tabs>
      </Vertical>
    </Layout>
  );
};

export default AdminPage;
