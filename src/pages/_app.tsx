import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className} style={{ height: "100%" }}>
      <Component {...pageProps} /> <Analytics />
    </main>
  );
}
