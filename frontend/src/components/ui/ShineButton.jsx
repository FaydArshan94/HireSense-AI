import React from 'react';
import { motion } from 'framer-motion';

const ShineButton = () => {
    return (
        <button
            className=" relative px-6 py-2 bg-zinc-800 lg:mb-10 mb-12 rounded-lg border border-zinc-700 shadow-[0_4px_14px_0_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer overflow-hidden">
            <motion.span
                className=" bg-[linear-gradient(110deg,#71717a,45%,#ffffff,55%,#71717a)] bg-[length:200%_100%] bg-clip-text text-transparent font-bold text-lg tracking-tight font-sans"
                animate={{
                    backgroundPosition: ["-100% 0%", "200% 0%"]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2.5,
                    ease: "linear",
                    repeatDelay: 0.5 // Adds a slight pause between flashes
                }}
            >
                Analyse My Resume
            </motion.span>
        </button>
    );
};

export default ShineButton;