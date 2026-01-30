"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FeatureSection() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                x: -60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(contentRef.current.children, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 lg:py-32 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left - Visual Mockup */}
                    <div ref={imageRef} className="relative order-2 lg:order-1">
                        <div className="relative bg-card border border-border rounded-2xl shadow-xl p-8 space-y-6">
                            {/* Design Analysis Card */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-foreground">Design</h3>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">Resume template</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Using a resume template may struggle to process resumes with multiple columns or complex layouts.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">Font type</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">Skills section</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">Background</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Score Badge */}
                            <div className="absolute -top-4 -right-4 bg-card border-2 border-border rounded-xl px-4 py-2 shadow-lg">
                                <p className="text-2xl font-bold text-foreground">20/25</p>
                            </div>

                            {/* Mini Resume Preview */}
                            <div className="absolute -bottom-6 -left-6 w-24 h-32 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-border overflow-hidden transform -rotate-6">
                                <div className="p-2 space-y-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 bg-primary/20 rounded-full" />
                                        <div className="space-y-0.5">
                                            <div className="h-1.5 w-10 bg-muted rounded" />
                                            <div className="h-1 w-12 bg-muted/60 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="h-1 w-full bg-muted rounded" />
                                        <div className="h-1 w-full bg-muted rounded" />
                                        <div className="h-1 w-2/3 bg-muted rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div ref={contentRef} className="space-y-8 order-1 lg:order-2">
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                                Applicant Tracking System Simulator
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                No interviews? ATS scans might be at fault.
                            </h2>
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Applicant Tracking Systems (ATS) are computer programs that many
                            employers use to automatically weed out unqualified candidates. ATSs
                            are everywhere—they're used by 99% of Fortune 500 companies and even
                            20% of smaller businesses. But ATSs aren't perfect. Even if you have
                            the necessary skills and experience, they can discard your resume if
                            it's not optimized.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Our ATS Resume Checker will help you optimize your resume for ATS and
                            help you pass the initial scan.
                        </p>

                        <button className="group bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105">
                            ATS-Check My Resume
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
