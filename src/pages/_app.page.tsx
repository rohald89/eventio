import { ErrorBoundary, AppProps } from "@blitzjs/next";
import React, { Suspense } from "react";
import { withBlitz } from "@/blitz-client";
import RootErrorFallback from "@/core/components/RootErrorFallback";
import "@/styles/globals.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import FullPageLoader from "@/core/components/MainAuthenticationForm/FullPageLoader";
import { ModalsProvider } from "@mantine/modals";
import { globalModals } from "@/modals";
import { theme } from "@/styles/mantine-theme";
import { useLocalStorage } from "@mantine/hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || colorScheme === "dark" ? "light" : "dark");

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          ...theme,
          colorScheme,
        }}
      >
        <ModalsProvider modals={globalModals}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <Notifications position="top-right" />
            <Suspense fallback={<FullPageLoader />}>
              <Component {...pageProps} />
            </Suspense>
          </ErrorBoundary>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default withBlitz(MyApp);
