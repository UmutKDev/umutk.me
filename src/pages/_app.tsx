import { useCallback, useEffect, useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Poppins } from "@next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/layouts/Sidebar";
import styled from 'styled-components';
import { FaBars } from "react-icons/fa";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [openOnMobile, setOpenOnMobile] = useState(false);
  const toggleMobileMenu = useCallback(() => setOpenOnMobile(!openOnMobile), [openOnMobile]);



  return (
    <>
      {openOnMobile && (
        <div className="flex items-center justify-between h-16 w-[115%] lg:hidden z-20 absolute p-8 border-b border-[#1C1C1C]">
          <p className="text-xl font-semibold text-white">
            Umut Kızıloğlu
          </p>
          <FaBars className="text-xl text-white" onClick={toggleMobileMenu} />
        </div>
      )}
      {!openOnMobile && (
        <Sidebar
          className={poppins.className}
          openOnMobile={openOnMobile}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}
      <Container openOnMobile={openOnMobile}>
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
      </Container>
    </>
  );
}

const Container = styled.aside<{ openOnMobile: boolean }>`
  @media (max-width: 850px) {
    margin-top: ${({ openOnMobile }) => (openOnMobile ? '2rem' : '0')};
    display: ${({ openOnMobile }) => (openOnMobile ? 'block' : 'none')};
  }
`;