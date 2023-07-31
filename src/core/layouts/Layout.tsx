import Head from "next/head";
import { Suspense } from "react";
import { ErrorBoundary, Routes } from "@blitzjs/next";
import { Horizontal, Vertical } from "mantine-layout-components";
import {
  Anchor,
  AppShell,
  Avatar,
  Box,
  Button,
  Footer,
  Header,
  Indicator,
  Loader,
  RingProgress,
  Text,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import logout from "@/features/auth/mutations/logout";
import { useMutation } from "@blitzjs/rpc";
import { useCurrentUser } from "@/features/users/hooks/useCurrentUser";
import type { ReactFC } from "types";
import { IconUserShield } from "@tabler/icons-react";
import RootErrorFallback from "../components/RootErrorFallback";
import { useRouter } from "next/router";
import Conditional from "conditional-wrap";
import { getAvatarFallback, getUploadThingUrl } from "@/utils/images";
import UserAvatar from "../components/UserAvatar";
import UserProfileProgress from "../components/Header/UserProfileProgress";

const Layout: ReactFC<{
  title?: string;
  maxWidth?: number;
}> = ({ title, maxWidth = 800, children }) => {
  const thisYear = new Date().getFullYear();
  const [logoutMutation] = useMutation(logout);

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
                    <Conditional
                      condition={!!user.username}
                      wrap={(children) => {
                        return (
                          <Link href={Routes.ProfilePage({ username: user.username as string })}>
                            {children}
                          </Link>
                        );
                      }}
                    >
                      <Horizontal>
                        <Conditional
                          condition={user.isAdmin}
                          wrap={(children) => (
                            <Indicator
                              position="bottom-end"
                              color="none"
                              label={
                                <Tooltip color="dark" label="Admin">
                                  <Box>
                                    <IconUserShield size={15} />
                                  </Box>
                                </Tooltip>
                              }
                            >
                              {children}
                            </Indicator>
                          )}
                        >
                          <UserAvatar user={user} />
                        </Conditional>
                        <Text>{user.name}</Text>
                        <UserProfileProgress />
                      </Horizontal>
                    </Conditional>
                  </Horizontal>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={async () => {
                      await logoutMutation();
                      await router.push("/");
                    }}
                  >
                    Logout
                  </Button>
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
              {children}
            </Suspense>
          </ErrorBoundary>
        </Vertical>
      </AppShell>
    </>
  );
};

export default Layout;
