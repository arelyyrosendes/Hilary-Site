import { GalleryTemplate } from "./Gallery";

const HalftonePattern = () => (
  <svg
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.045 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="halftone" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="2.2" fill="#a090ff" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#halftone)" />
  </svg>
);

const SpeedLines = () => (
  <svg
    style={{ position: "absolute", top: 0, right: 0, width: 420, height: 280, pointerEvents: "none", opacity: 0.06 }}
    viewBox="0 0 420 280"
    xmlns="http://www.w3.org/2000/svg"
  >
    {Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * 90 - 10;
      const rad = (angle * Math.PI) / 180;
      const len = 180 + (i % 4) * 40;
      return (
        <line
          key={i}
          x1="420" y1="0"
          x2={420 - Math.cos(rad) * len}
          y2={Math.sin(rad) * len}
          stroke="#7F5AF0"
          strokeWidth={i % 3 === 0 ? "1.5" : "0.8"}
        />
      );
    })}
  </svg>
);

const ComicsBorderAccent = () => (
  <div style={{
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: 4,
    background: "repeating-linear-gradient(90deg, #7F5AF0 0px, #7F5AF0 32px, #2CB67D 32px, #2CB67D 64px, #FF6B6B 64px, #FF6B6B 96px, #FFD166 96px, #FFD166 128px)",
  }} />
);

const PanelBorderDecor = () => (
  <div style={{
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    height: 3,
    background: "linear-gradient(90deg, transparent, #7F5AF0 20%, #7F5AF0 80%, transparent)",
    opacity: 0.35,
  }} />
);

// Comic-style title treatment
const ComicsTitle = () => (
  <div style={{ position: "relative", display: "inline-block" }}>
    {/* Shadow layer */}
    <h1
      aria-hidden
      style={{
        position: "absolute",
        top: 4, left: 4,
        fontFamily: "'Bangers', 'Impact', 'Arial Black', sans-serif",
        fontSize: "clamp(44px, 6vw, 78px)",
        fontWeight: 400,
        letterSpacing: "0.04em",
        color: "#2CB67D",
        margin: 0,
        lineHeight: 1,
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      COMICS
    </h1>
    {/* Main title */}
    <h1
      style={{
        position: "relative",
        fontFamily: "'Bangers', 'Impact', 'Arial Black', sans-serif",
        fontSize: "clamp(44px, 6vw, 78px)",
        fontWeight: 400,
        letterSpacing: "0.04em",
        color: "#E2E2F5",
        margin: 0,
        lineHeight: 1,
        whiteSpace: "nowrap",
        WebkitTextStroke: "1.5px #7F5AF0",
        textShadow: "0 0 40px rgba(127,90,240,0.4)",
      }}
    >
      COMICS
    </h1>
  </div>
);

export function ComicsPage() {
  return (
    <div style={{ position: "relative" }}>
      {/* Google Font for comic title */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');`}</style>

      {/* Decorative background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "radial-gradient(circle at 20% 30%, #1E1E2E 0, rgba(30,30,46,0.6) 45%), #0f1115",
      }}>
        <HalftonePattern />
        <SpeedLines />
      </div>

      {/* Custom header overlay that sits above GalleryTemplate */}
      <div style={{
        position: "relative", zIndex: 1,
        padding: "52px 48px 0",
      }}>
        <ComicsBorderAccent />

        {/* Category label with comic panel style */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#7F5AF0",
          background: "rgba(127,90,240,0.1)",
          border: "1px solid rgba(127,90,240,0.3)",
          padding: "5px 12px",
          marginBottom: 20,
        }}>
          <span style={{
            display: "inline-block", width: 6, height: 6,
            background: "#7F5AF0",
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }} />
          Medium
        </div>

        {/* Title */}
        <div style={{ marginBottom: 24 }}>
          <ComicsTitle />
        </div>

        {/* Description with "caption box" comic styling */}
        <div style={{
          position: "relative",
          maxWidth: 560,
          background: "rgba(127,90,240,0.08)",
          border: "1px solid rgba(127,90,240,0.2)",
          borderLeft: "3px solid #7F5AF0",
          padding: "14px 18px",
          marginBottom: 4,
        }}>
          <p style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 13.5,
            lineHeight: 1.75,
            color: "rgba(226,226,245,0.75)",
            margin: 0,
            letterSpacing: "0.015em",
          }}>
            Short and long-form comics exploring pacing, rhythm, and how negative space carries emotion. Pages mix brush pen grit with digital tone, risograph layers, and limited color to keep the focus on gesture, expression, and the beat between panels.
          </p>
        </div>

        {/* Thin rule */}
        <div style={{
          width: 48, height: 3, marginTop: 24, marginBottom: 0,
          background: "linear-gradient(90deg, #7F5AF0, #2CB67D)",
        }} />
        <PanelBorderDecor />
      </div>

      {/* GalleryTemplate but with title/description suppressed via theme override */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <GalleryTemplate
          category="Comics"
          title=""
          description=""
          theme={{
            accent: "#7F5AF0",
            background: "transparent",
            text: "#E2E2F5",
          }}
        />
      </div>
    </div>
  );
}
