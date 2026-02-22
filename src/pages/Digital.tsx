import { useState, useEffect, useRef } from "react";
import { GalleryTemplate } from "./Gallery";

// Animated grid of pixel-like cells that flicker — nods to both code and pixelated art
const PixelGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;
    const SIZE = 28;
    const cols = Math.ceil(W / SIZE);
    const rows = Math.ceil(H / SIZE);

    const cells: { alpha: number; target: number; color: string }[] = [];
    const colors = ["#22D3EE", "#818CF8", "#F472B6", "#34D399", "#FBBF24"];

    for (let i = 0; i < cols * rows; i++) {
      cells.push({
        alpha: Math.random() * 0.04,
        target: Math.random() * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let raf: number;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      for (let i = 0; i < cells.length; i++) {
        const c = cells[i];
        // Very occasionally pick a new target brightness
        if (Math.random() < 0.0015) {
          c.target = Math.random() < 0.03 ? Math.random() * 0.22 : Math.random() * 0.035;
          if (Math.random() < 0.1) c.color = colors[Math.floor(Math.random() * colors.length)];
        }
        c.alpha += (c.target - c.alpha) * 0.04;

        const col = i % cols;
        const row = Math.floor(i / cols);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = c.alpha;
        ctx.fillRect(col * SIZE + 1, row * SIZE + 1, SIZE - 2, SIZE - 2);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
};

// Glitch-style scan line overlay
const ScanLines = () => (
  <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
    backgroundImage: "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
  }} />
);

// Chromatic aberration title
const GlitchTitle = () => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 320);
    };
    const id = setInterval(trigger, 3400 + Math.random() * 2000);
    return () => clearInterval(id);
  }, []);

  const titleStyle: React.CSSProperties = {
    fontFamily: "'Space Mono', 'Courier New', monospace",
    fontSize: "clamp(40px, 5.5vw, 70px)",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    color: "#E6F4FF",
    margin: 0,
    lineHeight: 1,
    position: "relative",
    display: "inline-block",
  };

  return (
    <div style={{ position: "relative", display: "inline-block", marginBottom: 6 }}>
      <style>{`
        @keyframes glitch-r {
          0%   { clip-path: inset(10% 0 80% 0); transform: translate(3px, 0); }
          25%  { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 0); }
          50%  { clip-path: inset(70% 0 5% 0);  transform: translate(2px, 0); }
          75%  { clip-path: inset(30% 0 60% 0); transform: translate(-3px, 0); }
          100% { clip-path: inset(10% 0 80% 0); transform: translate(3px, 0); }
        }
        @keyframes glitch-b {
          0%   { clip-path: inset(60% 0 10% 0); transform: translate(-3px, 0); }
          25%  { clip-path: inset(20% 0 60% 0); transform: translate(2px, 0); }
          50%  { clip-path: inset(5% 0 80% 0);  transform: translate(-2px, 0); }
          75%  { clip-path: inset(80% 0 5% 0);  transform: translate(3px, 0); }
          100% { clip-path: inset(60% 0 10% 0); transform: translate(-3px, 0); }
        }
      `}</style>

      {/* Cyan aberration layer */}
      <h1 aria-hidden style={{
        ...titleStyle,
        position: "absolute", top: 0, left: 0,
        color: "#22D3EE",
        animation: glitching ? "glitch-r 80ms steps(1) 2" : "none",
        opacity: glitching ? 0.75 : 0,
        pointerEvents: "none",
      }}>Digital</h1>

      {/* Magenta aberration layer */}
      <h1 aria-hidden style={{
        ...titleStyle,
        position: "absolute", top: 0, left: 0,
        color: "#F472B6",
        animation: glitching ? "glitch-b 80ms steps(1) 2" : "none",
        opacity: glitching ? 0.75 : 0,
        pointerEvents: "none",
      }}>Digital</h1>

      {/* Main title */}
      <h1 style={titleStyle}>Digital</h1>
    </div>
  );
};

// Animated color palette chips — a nod to the artist's color theory work
const ColorPalette = () => {
  const swatches = ["#22D3EE", "#818CF8", "#F472B6", "#34D399", "#FBBF24", "#F87171"];
  return (
    <div style={{ display: "flex", gap: 6, marginTop: 28, alignItems: "center" }}>
      {swatches.map((color, i) => (
        <div
          key={color}
          style={{
            width: 10,
            height: 10,
            background: color,
            borderRadius: "50%",
            opacity: 0.7,
            transform: `translateY(${Math.sin(i) * 2}px)`,
            boxShadow: `0 0 8px ${color}88`,
          }}
        />
      ))}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: 9,
        letterSpacing: "0.12em",
        color: "rgba(230,244,255,0.3)",
        marginLeft: 6,
        textTransform: "uppercase",
      }}>
        palette_v3.ase
      </div>
    </div>
  );
};

export function DigitalPage() {
  return (
    <div style={{ position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');`}</style>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "linear-gradient(180deg, #080f1a 0%, #0b1724 60%, #0e1e30 100%)",
      }} />
      <PixelGrid />
      <ScanLines />

      {/* Custom page header */}
      <div style={{ position: "relative", zIndex: 2, padding: "52px 48px 0" }}>

        {/* Breadcrumb-style category label */}
        <style>{`@keyframes cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#22D3EE",
            opacity: 0.7,
            marginLeft: 2,
          }}>
            <span style={{ opacity: 0.4 }}>portfolio</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span>digital</span>
            <span style={{
              display: "inline-block",
              width: 6, height: 12,
              background: "#22D3EE",
              marginLeft: 2,
              animation: "cursor-blink 1.1s step-end infinite",
            }} />
          </div>
          <GlitchTitle />
        </div>

        {/* Description in a terminal-style block */}
        <div style={{
          position: "relative",
          maxWidth: 560,
          marginTop: 26,
          background: "rgba(34,211,238,0.04)",
          border: "1px solid rgba(34,211,238,0.12)",
          padding: "14px 18px 14px 44px",
        }}>
          {/* Line numbers */}
          <div style={{
            position: "absolute",
            left: 0, top: 0, bottom: 0,
            width: 34,
            borderRight: "1px solid rgba(34,211,238,0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
            padding: "14px 0",
          }}>
            {["1", "2", "3", "4"].map(n => (
              <span key={n} style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "rgba(34,211,238,0.2)", lineHeight: 1 }}>{n}</span>
            ))}
          </div>

          <p style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 12.5,
            lineHeight: 1.85,
            color: "rgba(230,244,255,0.62)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            Using the computer as both design tool and expressive medium: generative pattern, motion, and UI studies pushed toward glitch and color play.
          </p>
        </div>

        {/* Color palette chips */}
        <ColorPalette />

        {/* Divider — a single pixel-wide colored rule */}
        <div style={{
          marginTop: 28,
          height: 1,
          width: 80,
          background: "linear-gradient(90deg, #22D3EE, #818CF8, transparent)",
          opacity: 0.5,
        }} />
      </div>

      {/* Gallery */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <GalleryTemplate
          category="Digital"
          title=""
          description=""
          theme={{
            accent: "#22D3EE",
            background: "transparent",
            text: "#E6F4FF",
          }}
        />
      </div>
    </div>
  );
}
