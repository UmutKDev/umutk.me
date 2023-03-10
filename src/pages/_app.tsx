import { useCallback, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/layouts/Sidebar";
import styled from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const toggleMobileMenu = useCallback(
    () => setOpenOnMobile(!openOnMobile),
    [openOnMobile]
  );

  return (
    <>
      <Sidebar
        openOnMobile={openOnMobile}
        toggleMobileMenu={toggleMobileMenu}
      />
      <Container openOnMobile={openOnMobile}>
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
      </Container>
    </>
  );
}

const Container = styled.div<{ openOnMobile: boolean }>`
  @media (max-width: 850px) {
    width: 100%;
    margin-top: ${({ openOnMobile }) => (openOnMobile ? "2rem" : "0")};
    display: ${({ openOnMobile }) => (openOnMobile ? "block" : "none")};
  }
`;
