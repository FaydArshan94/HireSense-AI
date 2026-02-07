"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function StatsSection() {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.2,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  const companyLogos = [
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Amazon",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Netflix",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Tesla",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "IBM",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
  ];

  return (
    <section
      ref={statsRef}
      className="py-12 lg:py-16 bg-muted/30 border-y border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-lg font-semibold text-foreground mb-8">
          Trusted by professionals at
        </h3>
        <div className="overflow-hidden w-full">
          <div
            className="flex items-center gap-32 animate-marquee"
            style={{
              animation: "marquee 20s linear infinite",
            }}
          >
            {companyLogos.map((logo, idx) => (
              <img
                key={idx}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
                style={{ maxHeight: 48 }}
              />
            ))}
            {/* Duplicate for seamless loop */}
            {companyLogos.map((logo, idx) => (
              <img
                key={companyLogos.length + idx}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
                style={{ maxHeight: 48 }}
              />
            ))}

            {companyLogos.map((logo, idx) => (
              <img
                key={companyLogos.length + idx}
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                className="h-12 w-auto grayscale hover:grayscale-0 transition duration-300"
                style={{ maxHeight: 48 }}
              />
            ))}
          </div>
        </div>
        <style>{`
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-marquee {
                        min-width: 200%;
                        will-change: transform;
                    }
                `}</style>
      </div>
    </section>
  );
}
