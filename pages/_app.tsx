import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import PlausibleProvider from "next-plausible";

import "@fontsource/fira-sans";
import "@fontsource/fira-sans/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="bulletproofphp.dev">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlausibleProvider>
  );
}

export default MyApp;
