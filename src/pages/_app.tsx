import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { Poppins } from "@next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/layouts/Sidebar";
// import Intro from "@/layouts/Intro";
import Snowfall from "react-snowfall";
import { NEXT_SEO_DEFAULT } from "@/libs/config";
import { NextSeo } from "next-seo";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const isWinter = false;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsIntro(false), 1500);
  }, []);

  // return isIntro ? (
  //   <>
  //     <NextSeo {...NEXT_SEO_DEFAULT} defaultTitle={"Umut Kızıloğlu"} />
  //     <AnimatePresence mode="wait">
  //       <motion.div
  //         key={router.route}
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 2 }}
  //         transition={{ duration: 0.85 }}
  //       >
  //         <Intro />
  //       </motion.div>
  //     </AnimatePresence>
  //   </>
  // ) : (
  return (
    <>
      {/* {isWinter && <Snowfall snowflakeCount={20} speed={[0.5, 1]} />} */}
      <Sidebar className={poppins.className} />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          transition={{ duration: 0.85 }}
        >
          <main
            className={`${poppins.className} py-12 px-8 lg:w-[calc(100vw-15rem)] `}
          >
            <Component {...pageProps} />
          </main>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
