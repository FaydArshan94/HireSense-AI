"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroMockup() {
  const containerRef = useRef(null);
  const mockupWrapRef = useRef(null);
  const mockupRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    // Initial entry animation
    gsap.from(mockupWrapRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.1,
      delay: 0.8,
      ease: "power3.out"
    });

    // Scroll trigger scale
    gsap.fromTo(
      mockupWrapRef.current,
      { scale: 0.5 },
      {
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: mockupWrapRef.current,
          start: "top 100%",
          end: "top 60%",
          scrub: 1.5,
        },
      }
    );

    // Video play/pause based on visibility
    ScrollTrigger.create({
      trigger: mockupWrapRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => videoRef.current?.play(),
      onEnterBack: () => videoRef.current?.play(),
      onLeave: () => videoRef.current?.pause(),
      onLeaveBack: () => videoRef.current?.pause(),
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white hidden md:flex flex-col items-center justify-center pb-16 px-2 p-10 relative overflow-hidden">
      {/* Product mockup */}
      <div
        ref={mockupWrapRef}
        className="relative rounded-[34px] bg-black max-w-[1800px] w-full [perspective:1200px] p-10 z-10"
      >
        <div
          ref={mockupRef}
          className="bg-white      border-b-0 shadow-[0_-8px_60px_rgba(0,0,0,0.1),0_-2px_20px_rgba(0,0,0,0.06)] overflow-hidden origin-bottom"
        >
          <video
            ref={videoRef}
            src="/mp.mp4"
            loop
            muted
            playsInline
            className="w-full block"
          />
        </div>
      </div>
    </section>
  );
}
