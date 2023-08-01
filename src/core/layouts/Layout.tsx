import Head from "next/head";
import { Suspense } from "react";
import { ErrorBoundary, Routes } from "@blitzjs/next";
import { Horizontal, Vertical } from "mantine-layout-components";
import { Anchor, AppShell, Badge, Footer, Header, Loader, Modal, Text } from "@mantine/core";
import Link from "next/link";
import logout from "@/features/auth/mutations/logout";
import { useMutation } from "@blitzjs/rpc";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import type { ReactFC } from "types";
import RootErrorFallback from "../components/RootErrorFallback";
import { useRouter } from "next/router";
import UserProfileProgress from "../components/Header/UserProfileProgress";
import { OnboardingWizard } from "../components/OnboardingWizard";
import { openContextModal } from "@mantine/modals";
import { GlobalModal } from "@/modals";
import UserHeaderMenu from "../components/Header/UserHeaderMenu";

const Layout: ReactFC<{
  title?: string;
  maxWidth?: number;
}> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear();
  const [$logout] = useMutation(logout);

  const user = useCurrentUser();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title || "eventio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppShell
        padding="md"
        // navbar={
        //   <Navbar width={{ base: 300 }} height={500} p="xs">
        //     {/* Navbar content */}
        //   </Navbar>
        // }
        header={
          <Header height={50} p="xs">
            <Horizontal fullH spaceBetween>
              <Anchor
                underline={false}
                color="gray.3"
                component={Link}
                fw="bold"
                href={Routes.Home()}
              >
                Eventio
              </Anchor>
              {user && (
                <Horizontal center>
                  <Horizontal center spacing="xs">
                    <Horizontal>
                      <UserHeaderMenu />
                    </Horizontal>
                    <Badge
                      color="red"
                      onClick={() => {
                        openContextModal({
                          modal: GlobalModal.becomePro,
                          title: "Become a pro",
                          innerProps: {
                            price: 95,
                          },
                        });
                      }}
                    >
                      Pro
                    </Badge>
                    <UserProfileProgress />
                  </Horizontal>

                  {/* <DarkLightSwitch />

                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await $logout();
                      await router.push("/");
                    }}
                  >
                    Logout
                  </Button> */}
                </Horizontal>
              )}
            </Horizontal>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
        footer={
          <Footer height={35}>
            <Horizontal fullH fullW center>
              <Text fz="xs" color="dimmed">
                copyright {thisYear}
              </Text>
            </Horizontal>
          </Footer>
        }
      >
        <Vertical fullW fullH>
          <ErrorBoundary resetKeys={[user]} FallbackComponent={RootErrorFallback}>
            <Suspense
              fallback={
                <Vertical center fullW fullH>
                  <Loader />
                </Vertical>
              }
            >
              {user && (
                <Modal
                  size="xl"
                  centered={true}
                  title="Onboarding modal"
                  closeOnClickOutside={false}
                  closeOnEscape={false}
                  withCloseButton={false}
                  opened={!user?.onboarded}
                  onClose={() => {}}
                >
                  Welcome to our app!
                  <OnboardingWizard />
                </Modal>
              )}
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
