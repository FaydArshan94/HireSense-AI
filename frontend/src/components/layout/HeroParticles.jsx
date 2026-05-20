"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#673AB7", "#FF6D00"];
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 200 : 450;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < numParticles; i++) {
        // Generate particles in a V shape
        // Randomly pick left or right side of the V
        const isLeft = Math.random() > 0.5;

        // V shape parameters
        const startY = centerY - 200;
        const endY = canvas.height + 100;

        // Distribution along the V
        const t = Math.random(); // Position along the arm (0 to 1)
        let y = startY + t * (endY - startY);

        // X position based on Y (forming the V)
        // At startY, the width is widest. At endY, it converges or goes outward? 
        // A 'V' shape goes from wide at top to narrow at bottom.
        // Wait, the screenshot shows V is wide at top, pointing down, but mostly behind the text.
        // Actually, let's just make the particles scattered but concentrated towards a V or U shape.

        const spread = 200 + (Math.random() * 300); // Random spread
        const slope = 1.2; // The angle of the V

        let x;
        if (isLeft) {
          x = centerX - (y - startY + 100) / slope + (Math.random() - 0.5) * spread;
        } else {
          x = centerX + (y - startY + 100) / slope + (Math.random() - 0.5) * spread;
        }

        // Add some random ones everywhere for fill
        if (Math.random() > 0.7) {
          x = Math.random() * canvas.width;
          y = Math.random() * canvas.height;
        }

        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2 + 1.5,
          angle: Math.random() * Math.PI * 2,
          rotation: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
          radius: Math.random() * 40 + 10
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Simple floating circular motion
        p.angle += p.speed;
        p.x = p.originX + Math.cos(p.angle) * p.radius;
        p.y = p.originY + Math.sin(p.angle) * p.radius;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        // Draw dashes
        ctx.beginPath();
        ctx.roundRect(-p.size * 2, -p.size / 2, p.size * 4, p.size, p.size / 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
