import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import PlausibleProvider from "next-plausible";

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
