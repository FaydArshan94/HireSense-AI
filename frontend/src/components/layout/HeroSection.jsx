"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Upload } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const mockupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(headlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          subtextRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4",
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        )
        .from(
          mockupRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 1,
          },
          "-=0.8",
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-0 bg-linear-to-b from-background to-muted/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p
                ref={headlineRef}
                className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
              >
                ATS Resume Checker
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Optimize your resume
                <br />
                <span className="text-primary">for ATS scanners.</span>
              </h1>
            </div>

            <p
              ref={subtextRef}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Do you want to get invited to more job interviews? Simulate an
              applicant tracking system scan with our ATS Resume Checker and
              ensure that your resume always gets into the hands of a human
              recruiter.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <Link href="/dashboard">
                <button className="group relative bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:bg-primary/90 transition-all hover:shadow-xl hover:scale-105 flex items-center gap-2">
                  <Upload size={20} className="group-hover:animate-bounce" />
                  Upload Your Resume
                </button>
              </Link>
              <p className="text-xs text-muted-foreground flex items-center gap-2 pt-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Privacy guaranteed
              </p>
            </div>
          </div>

          {/* Right Mockup */}
          <div ref={mockupRef} className="relative">
            <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-8 space-y-6">
              {/* Score Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    ATS Score
                  </span>
                  <div className="flex gap-2">
                    <div className="w-8 h-8 bg-muted rounded-lg" />
                    <div className="w-8 h-8 bg-muted rounded-lg" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-5xl font-bold text-foreground">
                    85/100
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Design</span>
                  <span className="text-sm font-semibold text-foreground">
                    20/25
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Structure
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    40/50
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Content</span>
                  <span className="text-sm font-semibold text-foreground">
                    25/25
                  </span>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="absolute -top-6 -right-6 w-32 h-40 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-border overflow-hidden transform rotate-6">
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full" />
                    <div className="space-y-1">
                      <div className="h-2 w-12 bg-muted rounded" />
                      <div className="h-1.5 w-16 bg-muted/60 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-1.5 w-full bg-muted rounded" />
                    <div className="h-1.5 w-full bg-muted rounded" />
                    <div className="h-1.5 w-3/4 bg-muted rounded" />
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
    </section>
  );
}
