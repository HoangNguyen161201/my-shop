import { Provider } from "@/components/ui/provider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

// 👇 Custom type: Page có thể có getLayout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

// 👇 Custom type: AppProps chứa Component có getLayout
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {getLayout(<Component {...pageProps} />)} <ToastContainer />{" "}
      </Provider>
      ;
    </QueryClientProvider>
  );
}
