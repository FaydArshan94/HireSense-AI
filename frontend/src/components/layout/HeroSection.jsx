"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Upload } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    // ── Canvas cursor-reactive rings ──────────────────────────
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;

    const rings = Array.from({ length: 5 }, (_, i) => ({
      baseRadius: 120 + i * 90,
      x: 0,
      y: 0,
      angle: (i * Math.PI * 2) / 5,
      speed: 0.0003 + i * 0.0001,
      opacity: 0.06 - i * 0.008,
      particles: Array.from({ length: 3 + i }, (_, j) => ({
        angle: (j * Math.PI * 2) / (3 + i),
        size: 2.5 - i * 0.3,
      })),
    }));

    function resize() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      rings.forEach((r) => {
        r.x = width / 2;
        r.y = height / 2;
      });
      targetRef.current = { x: width / 2, y: height / 2 };
      mouseRef.current = { x: width / 2, y: height / 2 };
    }

    resize();
    window.addEventListener("resize", resize);

    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    canvas.addEventListener("mousemove", onMouseMove);
    heroRef.current?.addEventListener("mousemove", onMouseMove);

    let time = 0;

    function draw() {
      ctx.clearRect(0, 0, width, height);
      time += 1;

      // Smoothly lerp target toward mouse — this creates the wave lag
      targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.045;
      targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.045;

      rings.forEach((ring, i) => {
        // Each ring follows target with different lag — creates wave effect
        const lag = 0.02 + i * 0.015;
        ring.x += (targetRef.current.x - ring.x) * lag;
        ring.y += (targetRef.current.y - ring.y) * lag;
        ring.angle += ring.speed;

        // Draw ring
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.baseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(67, 56, 202, ${ring.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw particles on ring
        ring.particles.forEach((p) => {
          p.angle += ring.speed * 1.5;
          const px = ring.x + Math.cos(p.angle) * ring.baseRadius;
          const py = ring.y + Math.sin(p.angle) * ring.baseRadius;

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99, 102, 241, ${ring.opacity * 3})`;
          ctx.fill();
        });
      });

      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── GSAP entry animations ─────────────────────────────────
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(badgeRef.current, { y: 20, opacity: 0, duration: 0.6 })
      .from(headlineRef.current.children, { y: 48, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.3")
      .from(subRef.current, { y: 24, opacity: 0, duration: 0.7 }, "-=0.5")
      .from(ctaRef.current.children, { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="h-screen bg-white flex flex-col items-center justify-center pt-20  px-2 relative overflow-hidden"
    >
      {/* Canvas for cursor-reactive rings */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Dot grid texture underneath rings */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #d4cfc6 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative max-w-[780px] w-full text-center z-10">

        {/* Badge */}
        {/* <div ref={badgeRef} className="mb-7">
          <span
            className="inline-flex items-center gap-[7px] text-[11px] font-semibold tracking-[0.09em] text-indigo-700 bg-indigo-700/5 border border-indigo-700/15 py-[5px] px-[14px] rounded-full font-sans"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-indigo-700 inline-block animate-[hsPulse_2s_infinite]"
            />
            AI-POWERED RESUME OPTIMIZER
          </span>
        </div> */}

        {/* Headline */}
        <div ref={headlineRef} className="overflow-hidden mb-6">
          <h1
            className="font-serif text-[clamp(2.6rem,5.5vw,4rem)] font-black leading-[1.08] tracking-[-0.03em] text-[#0f0f0f] m-0"
          >
            Your resume is being rejected
          </h1>
          <h1
            className="font-serif text-[clamp(2.6rem,5.5vw,4rem)] font-black leading-[1.2] tracking-[-0.03em] italic text-indigo-700 m-0"
          >
            before anyone reads it.
          </h1>
        </div>

        {/* Subtext */}
        <p
          ref={subRef}
          className="font-serif text-[1.15rem] text-[#6b6b6b] leading-[1.75] max-w-[520px] mx-auto mb-9"
        >
          ATS systems filter out 75% of resumes automatically. HireSense tells
          you exactly why — and rewrites your resume to get past them.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex gap-3 justify-center items-center mb-4 flex-wrap"
        >
          <Link href="/dashboard">
            <button
              className="flex items-center gap-2 bg-[#0f0f0f] text-white py-[13px] px-[26px] rounded-[10px] font-sans text-[0.9rem] font-semibold border-none cursor-pointer shadow-[0_4px_20px_rgba(15,15,15,0.2)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_28px_rgba(15,15,15,0.26)]"
            >
              <Upload size={16} />
              Analyze my resume free
              <ArrowRight size={15} />
            </button>
          </Link>

          <Link href="#how-it-works">
            <button
              className="flex items-center gap-2 bg-transparent text-gray-700 py-[13px] px-[22px] rounded-[10px] font-sans text-[0.9rem] font-medium border-[1.5px] border-[#d4cfc6] cursor-pointer transition-colors duration-200 hover:border-gray-400 hover:bg-black/5"
            >
              See how it works
            </button>
          </Link>
        </div>

        {/* Trust line */}
        <p
          className="font-sans text-[0.78rem] text-gray-400 mb-14"
        >
          Free to start · No credit card required · Results in seconds
        </p>
      </div>

      <style>{`
        @keyframes hsPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}