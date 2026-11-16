'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Shield,
  Zap,
  Layers,
  Sparkles,
  Cpu,
  Workflow,
  CheckCircle2,
  Heart,
  Code2,
  HelpCircle,
  Laptop
} from 'lucide-react';

// ============================================================================
// 🎯 REUSABLE CURSOR-TRACKING SPOTLIGHT CARD (Bento & Founder Cards)
// ============================================================================
function SpotlightCard({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={{ animationDelay: `${delay}ms` }}
      className={`animate-reveal relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0d16]/85 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.2] hover:-translate-y-1 ${className}`}
    >
      {/* Dynamic Cursor Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, rgba(99, 102, 241, 0.16), transparent 45%)`,
        }}
      />
      {/* Subtle Top Specular Line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================================================
// 🧲 MAGNETIC SHIMMER CTA BUTTON
// ============================================================================
function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.18;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <a
      ref={btnRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition:
          offset.x === 0
            ? 'transform 400ms cubic-bezier(0.16, 1, 0.3, 1)'
            : 'transform 80ms ease-out',
      }}
      className="group/btn relative overflow-hidden inline-flex items-center space-x-2 bg-white text-slate-950 hover:bg-indigo-50 font-semibold text-xs px-5 py-3 rounded-xl shadow-[0_0_25px_rgba(255,255,255,0.18)] hover:shadow-[0_0_38px_rgba(129,140,248,0.45)] active:scale-95 shrink-0"
    >
      {/* Continuous Subtle Light Shimmer */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent group-hover/btn:animate-[shimmerSweep_1.1s_infinite]" />
      {children}
    </a>
  );
}

// ============================================================================
// 🏛️ MAIN COMPONENT: HITESH INNOVATION STUDIO
// ============================================================================
export default function HiteshInnovationHome() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ventureCardRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // 3D Card Tilt + Local Glare State
  const [cardTilt, setCardTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 0,
    glareY: 0,
    hovered: false,
  });

  // Global Mouse Tracker
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Local 3D Tilt Physics for Flagship Card
  const handleVentureMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ventureCardRef.current) return;
    const rect = ventureCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -3.8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 3.8;

    setCardTilt({
      rotateX,
      rotateY,
      glareX: x,
      glareY: y,
      hovered: true,
    });
  };

  const handleVentureLeave = () => {
    setCardTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      hovered: false,
    }));
  };

  // 🌌 60FPS 3D PARALLAX GRID + LASER BEAMS + CONSTELLATION + CLICK SHOCKWAVES
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    // Click Shockwaves
    const shockwaves: Array<{ x: number; y: number; radius: number; alpha: number }> = [];
    const onClick = (e: MouseEvent) => {
      shockwaves.push({ x: e.clientX, y: e.clientY, radius: 10, alpha: 0.7 });
    };
    window.addEventListener('click', onClick);

    // Floating Particles
    const count = Math.min(65, Math.floor((width * height) / 20000));
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.8,
      hue: Math.random() > 0.5 ? 235 : 275,
    }));

    // Traveling Laser Beams
    const beams = Array.from({ length: 8 }, () => ({
      horizontal: Math.random() > 0.5,
      pos: Math.floor(Math.random() * 20) * 60,
      progress: Math.random() * width,
      speed: Math.random() * 2.5 + 1.5,
      color: Math.random() > 0.5 ? '99, 102, 241' : '168, 85, 247',
    }));

    let smoothMx = width / 2;
    let smoothMy = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my } = mouseRef.current;

      if (mx > 0 && my > 0) {
        smoothMx += (mx - smoothMx) * 0.08;
        smoothMy += (my - smoothMy) * 0.08;
      }

      const parallaxX = (smoothMx - width / 2) * 0.03;
      const parallaxY = (smoothMy - height / 2) * 0.03;

      // 1. Grid
      const gridSize = 60;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.028)';
      ctx.lineWidth = 1;

      for (let x = parallaxX % gridSize; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = parallaxY % gridSize; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Beams
      beams.forEach((b) => {
        b.progress += b.speed;
        const grad = b.horizontal
          ? ctx.createLinearGradient(b.progress - 90, 0, b.progress, 0)
          : ctx.createLinearGradient(0, b.progress - 90, 0, b.progress);

        grad.addColorStop(0, `rgba(${b.color}, 0)`);
        grad.addColorStop(1, `rgba(${b.color}, 0.55)`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (b.horizontal) {
          const yPos = (((b.pos + parallaxY) % height) + height) % height;
          ctx.moveTo(b.progress - 90, yPos);
          ctx.lineTo(b.progress, yPos);
          if (b.progress > width + 100) {
            b.progress = -100;
            b.pos = Math.floor(Math.random() * 20) * gridSize;
          }
        } else {
          const xPos = (((b.pos + parallaxX) % width) + width) % width;
          ctx.moveTo(xPos, b.progress - 90);
          ctx.lineTo(xPos, b.progress);
          if (b.progress > height + 100) {
            b.progress = -100;
            b.pos = Math.floor(Math.random() * 30) * gridSize;
          }
        }
        ctx.stroke();
      });

      // 3. Cursor Glow
      if (mx > 0 && my > 0) {
        const cursorGlow = ctx.createRadialGradient(smoothMx, smoothMy, 0, smoothMx, smoothMy, 240);
        cursorGlow.addColorStop(0, 'rgba(99, 102, 241, 0.13)');
        cursorGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
        cursorGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = cursorGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Particles & Connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        const dx = smoothMx - p1.x;
        const dy = smoothMy - p1.y;
        const distCursor = Math.hypot(dx, dy);
        if (distCursor < 180 && distCursor > 1) {
          p1.x += (dx / distCursor) * 0.35;
          p1.y += (dy / distCursor) * 0.35;
        }

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 85%, 75%, 0.45)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.16 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        if (distCursor < 170) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(smoothMx, smoothMy);
          ctx.strokeStyle = `rgba(192, 132, 252, ${0.42 * (1 - distCursor / 170)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 5. Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 6;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(129, 140, 248, ${sw.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        if (sw.alpha < 0.02) shockwaves.splice(i, 1);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-200 selection:bg-indigo-500 selection:text-white relative overflow-x-hidden font-sans">
      {/* 🌟 1. AMBIENT TOP AURORA GLOW */}
      <div
        className="fixed top-[-190px] left-1/2 -translate-x-1/2 w-[920px] h-[500px] rounded-full pointer-events-none z-0 animate-aurora blur-[135px]"
        style={{
          background:
            'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.14) 45%, transparent 75%)',
        }}
      />

      {/* 🌟 2. 60FPS CANVAS */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* 🌟 3. FILM GRAIN */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ============================================================== */}
      {/* 🧭 TOP NAVIGATION */}
      {/* ============================================================== */}
      <nav className="border-b border-white/[0.07] bg-[#05070c]/75 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/25 to-purple-500/25 border border-white/15 flex items-center justify-center font-black text-white text-xs tracking-tighter transition-all duration-300 group-hover:scale-105 group-hover:border-indigo-400/60 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.35)]">
              HI
            </div>
            <div className="leading-none">
              <span className="font-bold text-sm tracking-tight text-white block">
                Hitesh Innovation
              </span>
              <span className="text-[10px] text-slate-400 tracking-wider uppercase font-medium">
                Software & AI Product Studio
              </span>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="group text-xs text-slate-200 hover:text-white font-medium flex items-center space-x-1.5 bg-white/[0.04] hover:bg-white/[0.09] px-3.5 py-1.5 rounded-lg border border-white/[0.1] transition-all duration-300"
            >
              <span>Explore StackBlueprint</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================================== */}
      {/* ⚡ HERO SECTION (GENUINE BUILDER STORY) */}
      {/* ============================================================== */}
      <main className="max-w-6xl mx-auto px-5 pt-16 md:pt-24 pb-24 relative z-20">
        {/* Live Location & Studio Status Chip */}
        <div
          style={{ animationDelay: '60ms' }}
          className="animate-reveal inline-flex items-center space-x-2.5 bg-white/[0.03] border border-white/[0.09] px-3.5 py-1.5 rounded-full text-slate-300 text-xs mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-slate-300 font-medium">Independent Software & AI Studio</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono text-[11px]">Surat, Gujarat, India</span>
        </div>

        {/* Hero Headline & Honest Mission */}
        <div className="max-w-3xl mb-14">
          <h1
            style={{ animationDelay: '160ms' }}
            className="animate-reveal text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.08] mb-6"
          >
            We build software & AI workflows that turn{' '}
            <span className="bg-gradient-to-r from-indigo-300 via-white to-purple-300 bg-clip-text text-transparent">
              chaos into repeatable systems.
            </span>
          </h1>
          <p
            style={{ animationDelay: '260ms' }}
            className="animate-reveal text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl"
          >
            <strong>Hitesh Innovation</strong> is an independent digital product lab founded by <strong>Hitesh Chaturvedi</strong>. We design, code, and operate focused web applications, automated multi-tool workflows, and curated discovery engines for builders worldwide.
          </p>
        </div>

        {/* ============================================================== */}
        {/* 🎨 3D VENTURE SHOWCASE: WHY STACKBLUEPRINT EXISTS */}
        {/* ============================================================== */}
        <div style={{ animationDelay: '360ms' }} className="animate-reveal mb-16">
          <div
            ref={ventureCardRef}
            onMouseMove={handleVentureMove}
            onMouseLeave={handleVentureLeave}
            className="relative rounded-2xl p-6 sm:p-8 border border-white/[0.12] bg-[#0a0d16]/90 backdrop-blur-2xl shadow-[0_20px_70px_-15px_rgba(79,70,229,0.2)] overflow-hidden group"
            style={{
              transform: `perspective(1100px) rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg)`,
              transition: cardTilt.hovered
                ? 'transform 90ms ease-out'
                : 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Specular Light Rim */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent" />

            {/* Local Cursor Glass Glare */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: cardTilt.hovered ? 1 : 0,
                background: `radial-gradient(520px circle at ${cardTilt.glareX}px ${cardTilt.glareY}px, rgba(129, 140, 248, 0.15), transparent 65%)`,
              }}
            />

            {/* Header Row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08] relative z-10">
              <div>
                <div className="inline-flex items-center space-x-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-semibold">
                    Flagship Platform
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  StackBlueprint.io (TopTools)
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-xl leading-relaxed">
                  Solving AI tool fragmentation. Instead of 5,000 dead links, we chain software into verified, automated multi-tool assembly lines with exact copy-paste prompts.
                </p>
              </div>

              <MagneticButton href="https://stackblueprint-io.vercel.app">
                <span className="relative">Explore Live Platform</span>
                <ArrowUpRight className="relative w-4 h-4 text-slate-950 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </MagneticButton>
            </div>

            {/* ⚡ LIVE ANIMATED WORKFLOW ARCHITECTURE VISUALIZER */}
            <div className="py-6 border-b border-white/[0.08] relative z-10">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3">
                <span>WHY STACKBLUEPRINT EXISTS (THE ASSEMBLY LINE)</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PIPELINE ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center relative">
                {/* Node 1 */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">01. 50+ Curated Giants</div>
                    <div className="text-[11px] text-slate-400">Zero spam, verified only</div>
                  </div>
                </div>

                {/* Node 2 with Animated Data Packet Stream */}
                <div className="relative flex items-center space-x-3 p-3 rounded-xl bg-indigo-500/[0.07] border border-indigo-500/25 overflow-hidden">
                  <div className="pointer-events-none absolute top-0 h-[2px] w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-packet" />
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/35 flex items-center justify-center text-purple-300 shrink-0">
                    <Workflow className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">02. Chained Blueprints</div>
                    <div className="text-[11px] text-indigo-200/80">Live Handoff Bridges</div>
                  </div>
                </div>

                {/* Node 3 */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">03. In-Browser Utilities</div>
                    <div className="text-[11px] text-slate-400">Tokens, Prompts & Ratios</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 relative z-10">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-mono block">Curated Core</span>
                <strong className="text-base sm:text-lg text-white font-semibold block">
                  50+ Hand-Curated
                </strong>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-mono block">Global Billing</span>
                <strong className="text-base sm:text-lg text-indigo-300 font-semibold block">
                  Lemon Squeezy
                </strong>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-mono block">Data Security</span>
                <strong className="text-base sm:text-lg text-emerald-400 font-semibold block">
                  PostgreSQL RLS
                </strong>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 font-mono block">Cloud Edge</span>
                <strong className="text-base sm:text-lg text-cyan-300 font-semibold block">
                  Sub-second Vercel
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 🧱 BENTO GRID: WHAT WE DO (REAL PILLARS) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          <SpotlightCard delay={440} className="p-6 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
              <Workflow className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-base text-white mb-2">Workflow Engineering</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We connect disconnected software. Moving away from isolated tools into end-to-end automated pipelines that run with minimal manual intervention.
            </p>
          </SpotlightCard>

          <SpotlightCard delay={540} className="p-6 group">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-400 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-500/20">
              <Code2 className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-base text-white mb-2">Independent Software</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We bootstrap software from scratch — modern web apps built with Next.js 15, TypeScript, and Supabase designed for performance and clean UI.
            </p>
          </SpotlightCard>

          <SpotlightCard delay={640} className="p-6 group">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:bg-cyan-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-base text-white mb-2">Builder Curation</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We cut through the AI noise. Rigorously testing emerging tools and startups to help creators adopt what actually works without wasting money.
            </p>
          </SpotlightCard>
        </div>

        {/* ============================================================== */}
        {/* 👤 FOUNDER & LEADERSHIP DESK */}
        {/* ============================================================== */}
        <SpotlightCard
          delay={740}
          className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
              About the Founder
            </span>
            <h4 className="text-xl font-black text-white">Hitesh Chaturvedi</h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              "I started Hitesh Innovation to build the tools and workflows I wished existed. No bloated corporate bureaucracy — just focused, well-crafted software built in public with community support."
            </p>
            <p className="text-[11px] text-slate-500 font-mono pt-1">
              Based in Surat, Gujarat, India 🇮🇳 • Building for the global internet
            </p>
          </div>

          <div className="flex items-center space-x-3 text-xs shrink-0">
            <a
              href="https://www.linkedin.com/in/hitesh-chaturvedi-15bb2b449/"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.09] transition-all duration-300 flex items-center space-x-1.5 font-bold"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="https://x.com/KrishnaCha60537"
              target="_blank"
              rel="noopener noreferrer"
              className="group text-slate-300 hover:text-white px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.09] transition-all duration-300 flex items-center space-x-1.5 font-bold"
            >
              <span>X (Twitter)</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-indigo-400 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </SpotlightCard>
      </main>

      {/* ============================================================== */}
      {/* 🏛️ CLEAN BUILDER FOOTER (Pvt Ltd Removed) */}
      {/* ============================================================== */}
      <footer className="border-t border-white/[0.06] py-8 text-xs text-slate-500 relative z-20">
        <div className="max-w-6xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0" />
            <p className="text-slate-400 font-medium">
              Building the future of software with your support.
            </p>
          </div>
          <div className="text-[11px] text-slate-500">
            © 2026 Hitesh Innovation IT • Handcrafted by <strong className="text-slate-300">Hitesh Chaturvedi</strong>
          </div>
        </div>
      </footer>
    </div>
  );
}