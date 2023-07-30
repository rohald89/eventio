import Layout from "@/core/layouts/Layout";
import { useStringParam, useStringQueryParam } from "@/utils/utils";
import { BlitzPage } from "@blitzjs/next";
import { Text } from "@mantine/core";
import { Vertical } from "mantine-layout-components";
import { useRouter } from "next/router";

export const VerifyEmailPage: BlitzPage = () => {
  const token = useStringQueryParam("token");
  return (
    <Layout>
      <Vertical>
        <Text>Token is {token} </Text>
      </Vertical>
    </Layout>
  );
};

export default VerifyEmailPage;
