import { BlitzPage } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";
import { LoginForm } from "@/pages/auth/login/components/LoginForm";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";

const LoginPage: BlitzPage = () => {
  const router = useRouter();

  return (
    <Layout title="Log In">
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/";
          return router.push(next);
        }}
      />
    </Layout>
  );
};

export default LoginPage;
