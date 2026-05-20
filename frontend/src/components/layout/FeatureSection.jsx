"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const features = [
    {
        tag: "ATS SCORE",
        title: "Know exactly where you stand.",
        description:
            "Most people apply blind. HireSense gives you a real ATS match score against the specific job description — so you know if you're at 40% or 90% before you hit send.",
        bullets: ["Instant match score 0–100%", "Score bar with visual feedback", "Compared against actual job requirements"],
        screenshot: "/analyze.png",
        screenshotAlt: "HireSense ATS score dashboard",
        flip: false,
    },
    {
        tag: "KEYWORD GAPS",
        title: "See what the ATS is looking for.",
        description:
            "ATS systems scan for specific keywords. If they're missing, you're invisible — no matter how qualified you are. HireSense shows you exactly which ones are missing and which ones you have.",
        bullets: ["Matched skills highlighted in green", "Missing keywords shown in red", "Prioritized by importance to the JD"],
        screenshot: "/suggestions.png",
        screenshotAlt: "HireSense keyword gap analysis",
        flip: true,
    },
    {
        tag: "RESUME REWRITE",
        title: "Get a resume that actually gets through.",
        description:
            "Not just suggestions — a fully rewritten resume. HireSense rewrites your resume with the right keywords, stronger language, and clean formatting. Download it as a PDF, ready to apply.",
        bullets: ["AI rewrites your actual resume", "Keywords added naturally — no stuffing", "Download as clean PDF instantly"],
        screenshot: "/resume_rewrite.png",
        screenshotAlt: "HireSense AI resume rewrite",
        flip: false,
    },
];

function FeatureCard({ feature, index }) {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imgRef.current, {
                scrollTrigger: { trigger: cardRef.current, start: "top 72%" },
                x: feature.flip ? 60 : -60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });
            gsap.from(contentRef.current.children, {
                scrollTrigger: { trigger: cardRef.current, start: "top 72%" },
                y: 32,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, cardRef);
        return () => ctx.revert();
    }, [feature.flip]);

    return (
        <div
            ref={cardRef}
            className={`py-20 px-6  border-[#ede9e0]`}
        >
            <div
                className={`max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center`}
                style={{ direction: feature.flip ? "rtl" : "ltr" }}
            >
                {/* Screenshot */}
                <div ref={imgRef} style={{ direction: "ltr" }} className="flex justify-center">
                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-[0_8px_40px_rgba(0,0,0,0.08),_0_2px_12px_rgba(0,0,0,0.04)] bg-white w-[85%] max-w-[450px]">
                        <img
                            src={feature.screenshot}
                            alt={feature.screenshotAlt}
                            className="w-full h-auto block"
                        />
                    </div>
                </div>

                {/* Content */}
                <div ref={contentRef} style={{ direction: "ltr" }}>
                    <span className="inline-block font-sans text-[10px] font-bold tracking-[0.1em] text-indigo-700 bg-indigo-700/5 border border-indigo-700/15 px-2.5 py-[3px] rounded-full mb-4">
                        {feature.tag}
                    </span>

                    <h2 className="font-serif text-[clamp(1.6rem,2.8vw,2.2rem)] font-black text-[#0f0f0f] tracking-[-0.03em] leading-[1.2] mb-4">
                        {feature.title}
                    </h2>

                    <p className="font-serif text-base text-gray-500 leading-[1.75] mb-6">
                        {feature.description}
                    </p>

                    <div className="flex flex-col gap-2.5">
                        {feature.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-start gap-2.5">
                                <CheckCircle2 size={16} className="text-indigo-700 mt-0.5 shrink-0" strokeWidth={2} />
                                <span className="font-sans text-sm text-gray-700 leading-relaxed">
                                    {bullet}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function FeatureSection() {
    return (
        <section id="features bg-blue-300">
            <div className="text-center pt-20 px-6 bg-white">
                <span className="inline-block font-sans text-[11px] font-semibold tracking-[0.09em] text-indigo-700 bg-indigo-700/5 border border-indigo-700/15 px-3 py-1 rounded-full mb-4">
                    FEATURES
                </span>
                <h2 className="font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] font-black text-[#0f0f0f] tracking-[-0.03em] leading-[1.15] mb-3">
                    Everything you need to
                    <br />
                    <span className="text-indigo-700 italic">get past the gatekeepers.</span>
                </h2>
                <p className="font-sans text-[0.95rem] text-gray-400 max-w-[480px] mx-auto">
                    No fluff. Just the three things that actually matter when your resume hits an ATS.
                </p>
            </div>

            {features.map((feature, i) => (
                <FeatureCard key={feature.tag} feature={feature} index={i} />
            ))}
        </section>
    );
}