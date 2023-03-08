import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Intro = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        transition={{ duration: 1 }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1, transition: { duration: 1 } }}
        className="fixed top-0 left-0 z-50 h-full w-full bg-black"
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="text-4xl font-semibold text-white">
            Umut Kızıloğlu
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Intro;
