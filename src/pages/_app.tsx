import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import Sidebar from "@/components/layouts/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Sidebar className={poppins.className} />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          transition={{ duration: 0.85 }}
        >
          <main
            className={`${poppins.className} w-[calc(100vw-15rem)] py-12 px-8 `}
          >
            <Component {...pageProps} />
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
