import { useCallback, useEffect, useRef, useState } from "react";
import { AppProps } from "next/app";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/layouts/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const toggleMobileMenu = useCallback(
    () => setOpenOnMobile(!openOnMobile),
    [openOnMobile]
  );

  useEffect(() => {
    if (document.body.clientWidth < 850) {
      toggleMobileMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);

  useEffect(() => {
    document.body.style.overflow = openOnMobile ? "unset" : "hidden";
  }, [openOnMobile]);

  useEffect(() => {
    const handleResize = () => {
      if (document.body.clientWidth > 850) {
        setOpenOnMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [router.route]);

  return (
    <>
      <Sidebar
        openOnMobile={openOnMobile}
        toggleMobileMenu={toggleMobileMenu}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 2 }}
          transition={{ duration: 0.85 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
