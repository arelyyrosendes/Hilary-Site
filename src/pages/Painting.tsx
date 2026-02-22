import { GalleryTemplate } from "./Gallery";

// Oil paint color swatches — palette knife strokes
const PaletteStrokes = () => (
  <svg
    style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="paint-rough">
        <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="4" seed="14" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="paint-blur">
        <feGaussianBlur stdDeviation="32" />
      </filter>
      <filter id="paint-blur-sm">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      {/* Canvas linen texture */}
      <filter id="canvas-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" seed="5" stitchTiles="stitch" result="noise" />
        <feColorMatrix type="saturate" values="0.3" in="noise" result="colorNoise" />
        <feBlend in="SourceGraphic" in2="colorNoise" mode="multiply" result="blended" />
        <feComposite in="blended" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>

    {/* Warm ivory canvas base */}
    <rect width="100%" height="100%" fill="#FAF4EB" />
    {/* Canvas weave grain over everything */}
    <rect width="100%" height="100%" fill="#D4A877" opacity="0.07" filter="url(#canvas-grain)" />

    {/* Large warm umber pool — bottom left */}
    <ellipse cx="8%" cy="85%" rx="380" ry="240" fill="#8B4513" opacity="0.07" filter="url(#paint-blur)" />

    {/* Cadmium orange warmth — right side */}
    <ellipse cx="90%" cy="40%" rx="300" ry="350" fill="#C9552A" opacity="0.08" filter="url(#paint-blur)" />

    {/* Cool viridian accent — top center */}
    <ellipse cx="45%" cy="5%" rx="260" ry="180" fill="#3D6B50" opacity="0.055" filter="url(#paint-blur)" />

    {/* Yellow ochre mid-tone */}
    <ellipse cx="60%" cy="70%" rx="200" ry="160" fill="#D4A227" opacity="0.07" filter="url(#paint-blur-sm)" />

    {/* Palette knife strokes — impasto-style thick marks, top-right corner */}
    <g filter="url(#paint-rough)" opacity="0.13">
      <rect x="78%" y="2%" width="160" height="14" rx="4" fill="#C9552A" transform="rotate(-8, 85%, 5%)" />
      <rect x="80%" y="5%" width="100" height="10" rx="3" fill="#3D6B50" transform="rotate(5, 83%, 7%)" />
      <rect x="76%" y="9%" width="130" height="8" rx="3" fill="#D4A227" transform="rotate(-3, 80%, 10%)" />
      <rect x="82%" y="12%" width="80" height="12" rx="4" fill="#7A2D1E" transform="rotate(10, 84%, 13%)" />
      <rect x="75%" y="15%" width="110" height="7" rx="2" fill="#F5E6C8" transform="rotate(-6, 79%, 16%)" />
    </g>

    {/* Thin turpentine wash line — like paint wiped across canvas */}
    <line x1="0" y1="68%" x2="100%" y2="64%"
      stroke="#C9552A" strokeWidth="1" opacity="0.06" filter="url(#paint-rough)" />
  </svg>
);

// Brush mark decoration — top left
const BrushMarks = () => (
  <svg
    style={{ position: "fixed", top: 64, left: 0, width: 180, height: 260, pointerEvents: "none", zIndex: 0, opacity: 0.08 }}
    viewBox="0 0 180 260"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="brush-warp">
        <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="3" seed="11" />
        <feDisplacementMap in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    {/* Gestural vertical brush strokes */}
    {[
      { x: 20, w: 12, h: 180, color: "#C9552A", rot: -4 },
      { x: 45, w: 7, h: 140, color: "#3D6B50", rot: 2 },
      { x: 65, w: 16, h: 200, color: "#8B4513", rot: -2 },
      { x: 95, w: 6, h: 110, color: "#D4A227", rot: 5 },
      { x: 115, w: 10, h: 160, color: "#7A2D1E", rot: -1 },
    ].map((s, i) => (
      <rect
        key={i}
        x={s.x} y={30} width={s.w} height={s.h}
        rx={s.w / 2}
        fill={s.color}
        filter="url(#brush-warp)"
        transform={`rotate(${s.rot} ${s.x + s.w / 2} 130)`}
      />
    ))}
  </svg>
);

// Title — feels like it was lettered with a wide flat brush
const PaintingTitle = () => (
  <div style={{ position: "relative", display: "inline-block", marginBottom: 6 }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
      @keyframes paint-in { from { opacity: 0; transform: translateY(8px) skewX(-1deg); } to { opacity: 1; transform: translateY(0) skewX(0); } }
    `}</style>

    {/* Warm undertone shadow — like paint beneath paint */}
    <h1 aria-hidden style={{
      position: "absolute", top: 3, left: 2,
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(44px, 5.5vw, 72px)",
      fontWeight: 700,
      fontStyle: "italic",
      letterSpacing: "-0.01em",
      color: "#C9552A",
      margin: 0, lineHeight: 1,
      opacity: 0.18,
      userSelect: "none",
      pointerEvents: "none",
    }}>Painting</h1>

    {/* Main title */}
    <h1 style={{
      position: "relative",
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(44px, 5.5vw, 72px)",
      fontWeight: 700,
      fontStyle: "italic",
      letterSpacing: "-0.01em",
      color: "#2A1A0E",
      margin: 0, lineHeight: 1,
      animation: "paint-in 0.7s ease both",
    }}>Painting</h1>

    {/* Thick impasto-style underline — uneven like a palette knife */}
    <svg style={{ display: "block", marginTop: 8, overflow: "visible" }} height="10" width="260" viewBox="0 0 260 10">
      <defs>
        <filter id="stroke-rough">
          <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="3" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="3" />
        </filter>
      </defs>
      <rect x="0" y="3" width="180" height="4" rx="2" fill="#C9552A" opacity="0.55" filter="url(#stroke-rough)" />
      <rect x="170" y="4" width="60" height="3" rx="1" fill="#D4A227" opacity="0.4" filter="url(#stroke-rough)" />
    </svg>
  </div>
);

// Oil paint color chips — like a limited palette laid out
const PaletteChips = () => {
  const paints = [
    { name: "Burnt Sienna", color: "#8B4513" },
    { name: "Cadmium Orange", color: "#C9552A" },
    { name: "Yellow Ochre", color: "#D4A227" },
    { name: "Viridian", color: "#3D6B50" },
    { name: "Titanium White", color: "#F0EAD6" },
    { name: "Ivory Black", color: "#2A1A0E" },
  ];
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 26, alignItems: "center", flexWrap: "wrap" }}>
      {paints.map((p) => (
        <div key={p.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{
            width: 22, height: 22,
            background: p.color,
            borderRadius: "50%",
            border: "1.5px solid rgba(42,26,14,0.12)",
            boxShadow: `0 2px 6px ${p.color}55, inset 0 1px 2px rgba(255,255,255,0.3)`,
          }} />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 8,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "rgba(42,26,14,0.38)",
            whiteSpace: "nowrap",
          }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

export function PaintingPage() {
  return (
    <div style={{ position: "relative" }}>

      <PaletteStrokes />
      <BrushMarks />

      {/* Custom header */}
      <div style={{ position: "relative", zIndex: 1, padding: "52px 48px 0" }}>

        {/* Category label */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 11,
          fontStyle: "italic",
          letterSpacing: "0.1em",
          color: "#9B5E3A",
          opacity: 0.7,
          marginBottom: 20,
        }}>
          — Medium
        </div>

        <PaintingTitle />

        {/* Description — like a label on the back of a painting */}
        <div style={{
          position: "relative",
          maxWidth: 540,
          marginTop: 28,
          padding: "18px 22px",
          background: "rgba(201,85,42,0.04)",
          borderLeft: "3px solid rgba(201,85,42,0.25)",
          borderBottom: "1px solid rgba(201,85,42,0.1)",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "rgba(42,26,14,0.65)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            Primarily working in oil, exploring the interplay between color temperature and spatial depth. Influences include the Northern California landscape and the domestic still life tradition.
          </p>
        </div>

        {/* Palette chips */}
        <PaletteChips />
      </div>

      {/* Gallery */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <GalleryTemplate
          category="Painting"
          title=""
          description=""
          theme={{
            accent: "#C9552A",
            background: "transparent",
            text: "#2A1A0E",
          }}
        />
      </div>
    </div>
  );
}