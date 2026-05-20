"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const sentence = "Your resume deserves to be read by a human — not filtered out by a machine before anyone sees your name.";

export default function TextReveal() {
    const sectionRef = useRef(null);
    const wordsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                wordsRef.current,
                { opacity: 0.12, y: 8 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        end: "bottom 40%",
                        scrub: 0.8,
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const words = sentence.split(" ");

    return (
        <section
            ref={sectionRef}
            className="bg-white flex items-center justify-start py-16 px-6 md:py-[120px] md:px-12"
        >
            <p
                style={{
                    maxWidth: 900,
                    fontFamily: "'Google Sans Flex', 'Google Sans', sans-serif",
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    lineHeight: "1",
                    color: "#0f0f0f",
                    margin: 0,
                    textAlign: "left",
                }}
            >
                {words.map((word, i) => (
                    <span
                        key={i}
                        ref={(el) => (wordsRef.current[i] = el)}
                        style={{
                            display: "inline-block",
                            marginRight: "0.28em",
                            willChange: "opacity, transform",
                        }}
                    >
                        {word}
                    </span>
                ))}
            </p>
        </section>
    );
}