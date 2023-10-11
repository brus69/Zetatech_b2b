import type { AppProps } from "next/app";
import "../app/styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import { EffectorNext } from "@effector/next";
import { useGate } from "effector-react/compat";
import { appStaredGate } from "@/api/app";
import { AppLayout, CoreLayout } from "@/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EffectorNext>
      <CoreLayout>
        <MantineProvider theme={theme}>
          <Head>
            <title>Mantine Template</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
            />
            <link rel="shortcut icon" href="/favicon.svg" />
          </Head>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MantineProvider>
      </CoreLayout>
    </EffectorNext>
  );
}
