"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ShineButton from "../ui/ShineButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const paths = [
    { d: "M 0,150 L 300,150 L 300,300 L 450,300", duration: 2.5, delay: 0 },
    { d: "M 0,450 L 250,450 L 250,350 L 450,350", duration: 2.8, delay: 1.2 },
    { d: "M 150,0 L 150,200 L 450,200", duration: 2.0, delay: 2 },
    { d: "M 100,600 L 100,500 L 350,500 L 350,400 L 450,400", duration: 3.2, delay: 0.5 },
    { d: "M 1200,150 L 900,150 L 900,300 L 750,300", duration: 2.5, delay: 0.8 },
    { d: "M 1200,450 L 950,450 L 950,350 L 750,350", duration: 3.0, delay: 2.5 },
    { d: "M 1050,0 L 1050,200 L 750,200", duration: 2.2, delay: 1.5 },
    { d: "M 1100,600 L 1100,500 L 850,500 L 850,400 L 750,400", duration: 3.5, delay: 0.2 },
];

const BackgroundLines = () => {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            <svg
                viewBox="0 0 1200 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute w-full h-full min-w-[1200px]"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4338ca" stopOpacity="0" />
                        <stop offset="50%" stopColor="#4338ca" />
                        <stop offset="100%" stopColor="#4338ca" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {paths.map((p, i) => (
                    <g key={i}>
                        <path d={p.d} stroke="rgba(67, 56, 202, 0.08)" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <motion.path
                            d={p.d}
                            stroke="url(#pulse-gradient)"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathOffset: 0, pathLength: 0.05, opacity: 0 }}
                            animate={{ pathOffset: 1, opacity: [0, 1, 1, 0] }}
                            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
};

export default function CTASection() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
                scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-white py-24 px-6 relative overflow-hidden"
        >
            {/* Subtle indigo tint blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(67,56,202,0.06)_0%,transparent_70%)] pointer-events-none" />

            <BackgroundLines />

            <div
                ref={contentRef}
                className="relative max-w-[620px] mx-auto text-center flex flex-col items-center gap-0"
            >
                {/* Tag */}
                <span className="inline-block font-sans text-[11px] font-semibold tracking-[0.09em] text-indigo-700 bg-indigo-700/5 border border-indigo-700/15 px-3 py-1 rounded-full mb-6">
                    GET STARTED FREE
                </span>

                {/* Headline */}
                <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-black tracking-[-0.03em] text-[#0f0f0f] leading-[1.1] mb-5">
                    Your next interview
                    <br />
                    <span className="text-indigo-700 italic">starts here.</span>
                </h2>

                {/* Subtext */}
                <p className="font-serif text-[1.05rem] text-gray-500 leading-[1.75] max-w-[440px] mb-9">
                    Stop guessing why you're not getting callbacks. Upload your resume and find out in seconds — for free.
                </p>

                {/* CTA */}
                <Link href="/dashboard">
                    <ShineButton />
                </Link>

                {/* Trust */}
                <p className="font-sans text-[0.78rem] text-[#b0a99a]">
                    No credit card · No signup required · Instant results
                </p>
            </div>
        </section>
    );
}