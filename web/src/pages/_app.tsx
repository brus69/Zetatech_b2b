import type { AppProps } from "next/app";
import "../app/styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { EffectorNext } from "@effector/next";
import { theme } from "../theme";
import { AppLayout, CoreLayout } from "@/layouts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EffectorNext values={pageProps.values}>
      <CoreLayout>
        <Head>
          <title>ZETATECH - Парсинг сайтов</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <MantineProvider theme={theme}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </MantineProvider>
      </CoreLayout>
    </EffectorNext>
  );
}
