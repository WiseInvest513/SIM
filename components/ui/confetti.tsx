"use client";

import { useEffect, useRef } from "react";

interface ConfettiProps {
  duration?: number;
}

export function Confetti({ duration = 3000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height * 0.5;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = Math.random() * 5 - 2;
        this.life = 1;
        const colors = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA502", "#FF1493", "#00FF00"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 8 + 3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity
        this.life -= 0.01;
      }

      draw() {
        ctx!.fillStyle = this.color;
        ctx!.globalAlpha = this.life;
        ctx!.fillRect(this.x, this.y, this.size, this.size);
        ctx!.globalAlpha = 1;
      }
    }

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    const startTime = Date.now();

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Add new particles occasionally
      if (particles.length < 100 && Date.now() - startTime < duration * 0.5) {
        particles.push(new Particle());
      }

      particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      });

      if (Date.now() - startTime < duration && particles.length > 0) {
        requestAnimationFrame(animate);
      }
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [duration]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
}
