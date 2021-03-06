import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import PlausibleProvider from "next-plausible";
import Head from "next/head";

import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bulletproof PHP</title>
      </Head>
      <PlausibleProvider domain="bulletproofphp.dev">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
