import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Sidebar from "@/components/layouts/Sidebar";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar className={poppins.className} />
      <main
        className={`${poppins.className} w-[calc(100vw-15rem)] py-12 px-8 `}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
