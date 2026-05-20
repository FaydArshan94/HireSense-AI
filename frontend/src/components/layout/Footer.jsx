'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const LiftoffHero = () => {
  const massiveTextRef = useRef(null);

  // --- GSAP ANIMATION ---
  useEffect(() => {
    // A dramatic bottom-up reveal for the main title
    gsap.fromTo(
      massiveTextRef.current,
      {
        opacity: 0,
        y: 150,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: 'power4.out',
        delay: 0.3
      }
    );
  }, []);

  // --- FRAMER MOTION VARIANTS ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.5 } },
  };

  // Link Data
  const column1 = ['Download', 'Product', 'Docs', 'Changelog', 'Press', 'Releases'];
  const column2 = ['Blog', 'Pricing', 'Use Cases'];

  return (
    <div className=" bg-white text-zinc-900 flex flex-col justify-between p-8 md:p-16 lg:p-10  font-sans overflow-hidden">

      {/* --- TOP SECTION --- */}
      {/* <div className="flex flex-col md:flex-row justify-between w-full max-w-7xl mx-auto"> */}

      {/* Left Heading */}
      {/* <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-3xl md:text-4xl font-normal tracking-tight mb-12 md:mb-0"
        >
          Experience liftoff
        </motion.h2> */}

      {/* Right Navigation Links */}
      {/* <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex gap-20 md:gap-32 md:pr-12"
        >

          <ul className="flex flex-col gap-3">
            {column1.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUpItem}
                className="text-[15px] font-medium cursor-pointer hover:text-zinc-500 transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>


          <ul className="flex flex-col gap-3">
            {column2.map((item, i) => (
              <motion.li
                key={i}
                variants={fadeUpItem}
                className="text-[15px] font-medium cursor-pointer hover:text-zinc-500 transition-colors"
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div> */}
      {/* </div> */}

      {/* --- BOTTOM SECTION --- */}
      <div className="mt-auto  w-full flex justify-center items-end ">
        <h1
          ref={massiveTextRef}
          // Using viewport width (vw) for the text size ensures it scales massively on all screens
          className="text-[16vw] leading-none font-bold tracking-tighter text-zinc-900 origin-bottom"
        >
          HireSense AI
        </h1>
      </div>
    </div>
  );
};

export default LiftoffHero;