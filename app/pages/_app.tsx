import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "../components/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouteGuard } from "../components/RouteGuard";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Layout>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </Layout>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
