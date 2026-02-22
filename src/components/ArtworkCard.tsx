import { useState } from "react";

export type Artwork = { title: string; medium: string; year: string; color: string };

export function ArtworkCard({ title, medium, year, color, onClick }: Artwork & { onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "1",
        background: color,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%), 
                     radial-gradient(ellipse at 70% 70%, rgba(0,0,0,0.15) 0%, transparent 50%)`,
          mixBlendMode: "overlay",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "20px 16px 16px",
          background: "linear-gradient(to top, rgba(26,26,24,0.85) 0%, transparent 100%)",
          transform: hovered ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ color: "#fff", fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 14, fontWeight: 400, marginBottom: 2 }}>
          {title}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.65)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {medium} · {year}
        </div>
      </div>
    </div>
  );
}
