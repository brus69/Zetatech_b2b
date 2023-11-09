import type { AppProps } from "next/app";
import "../app/styles/globals.css";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { EffectorNext } from "@effector/next";
import { NextPage } from "next";
import { ElementType } from "react";
import { theme } from "../theme";
import { Layout, CoreLayout } from "@/layouts";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: ElementType;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const AppLayout = Component.Layout ?? Layout;

  return (
    <>
      <Head>
        <title>ZETATECH - Парсинг сайтов</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <EffectorNext values={pageProps.values}>
        <CoreLayout>
          <MantineProvider theme={theme}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </MantineProvider>
        </CoreLayout>
      </EffectorNext>
    </>
  );
}
