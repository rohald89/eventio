import Layout from "@/core/layouts/Layout";
import { BlitzPage } from "@blitzjs/next";
import { AuthenticationForm } from "@/core/components/MainAuthenticationForm";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";

const Home: BlitzPage = () => {
  const user = useCurrentUser();

  return <Layout title="Home">{!user && <AuthenticationForm />}</Layout>;
};

export default Home;
