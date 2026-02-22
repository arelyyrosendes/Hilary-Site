import { GalleryTemplate } from "./Gallery";

const SketchLines = () => (
  <svg
    style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.07 }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="roughen">
        <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="3" seed="8" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.8" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    {/* Loose hatching lines across background */}
    {Array.from({ length: 38 }).map((_, i) => (
      <line
        key={i}
        x1={-60 + i * 58}
        y1={0}
        x2={-60 + i * 58 - 120}
        y2={"100%"}
        stroke="#1a1a18"
        strokeWidth={i % 5 === 0 ? "0.9" : "0.4"}
        filter="url(#roughen)"
        opacity={i % 3 === 0 ? 0.9 : 0.5}
      />
    ))}
  </svg>
);

const SketchCircle = () => (
  <svg
    style={{ position: "fixed", bottom: -80, right: -80, width: 480, height: 480, pointerEvents: "none", opacity: 0.055 }}
    viewBox="0 0 480 480"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="roughen2">
        <feTurbulence type="turbulence" baseFrequency="0.025" numOctaves="4" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="4" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    {/* Concentric imperfect circles */}
    {[200, 175, 150, 125, 100, 76].map((r, i) => (
      <circle key={r} cx="240" cy="240" r={r} fill="none" stroke="#1a1a18"
        strokeWidth={i === 0 ? 1.5 : 0.7} filter="url(#roughen2)" />
    ))}
    {/* Cross-hatch inside */}
    {Array.from({ length: 14 }).map((_, i) => (
      <line key={i} x1={100} y1={100 + i * 20} x2={380} y2={100 + i * 20 - 10}
        stroke="#1a1a18" strokeWidth="0.5" filter="url(#roughen2)" />
    ))}
  </svg>
);

// Graphite smear accent top-left
const GraphiteSmear = () => (
  <svg
    style={{ position: "fixed", top: 64, left: 0, width: 300, height: 200, pointerEvents: "none", opacity: 0.06 }}
    viewBox="0 0 300 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="blur-smear">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </defs>
    <ellipse cx="80" cy="90" rx="160" ry="55" fill="#1a1a18" filter="url(#blur-smear)" />
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={i} x1={10 + i * 22} y1={60 + i * 3} x2={240 + i * 5} y2={75 + i * 4}
        stroke="#1a1a18" strokeWidth={1.5 - i * 0.1} opacity={0.6 - i * 0.05} />
    ))}
  </svg>
);

// Pencil tick marks border accent
const RuledMargin = () => (
  <div style={{
    position: "fixed",
    top: 64, bottom: 0, left: 0,
    width: 3,
    background: "repeating-linear-gradient(to bottom, transparent 0px, transparent 18px, rgba(26,26,24,0.12) 18px, rgba(26,26,24,0.12) 19px)",
    pointerEvents: "none",
  }} />
);

const DrawingTitle = () => (
  <div style={{ position: "relative", display: "inline-block", marginBottom: 6 }}>
    <h1 style={{
      fontFamily: "'EB Garamond', 'Libre Baskerville', Georgia, serif",
      fontSize: "clamp(40px, 5.5vw, 70px)",
      fontWeight: 400,
      fontStyle: "italic",
      letterSpacing: "-0.01em",
      color: "#1a1a18",
      margin: 0,
      lineHeight: 1,
      // Slightly uneven baseline via subtle text-shadow stack = hand-drawn feel
      textShadow: "1px 1px 0 rgba(26,26,24,0.12), 0 0 1px rgba(26,26,24,0.08)",
    }}>
      Drawing
    </h1>
    {/* Underline that looks hand-drawn */}
    <svg style={{ display: "block", marginTop: 6, overflow: "visible" }} height="8" width="240" viewBox="0 0 240 8">
      <defs>
        <filter id="wobble">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" seed="12" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <path d="M2 5 Q60 2 120 5 Q180 8 238 4" stroke="#1a1a18" strokeWidth="1.4" fill="none" filter="url(#wobble)" opacity="0.55" />
    </svg>
  </div>
);

export function DrawingPage() {
  return (
    <div style={{ position: "relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&display=swap');`}</style>

      {/* Background texture layers */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: "linear-gradient(135deg, #F4F2ED 0%, #E9E5DB 50%, #F0EDE6 100%)",
      }}>
        <SketchLines />
        <SketchCircle />
        <GraphiteSmear />
      </div>
      <RuledMargin />

      {/* Custom header */}
      <div style={{ position: "relative", zIndex: 1, padding: "52px 48px 0" }}>

        {/* Category label */}
        <div style={{
          fontFamily: "'EB Garamond', Georgia, serif",
          fontSize: 12,
          fontStyle: "italic",
          letterSpacing: "0.14em",
          color: "rgba(26,26,24,0.45)",
          marginBottom: 18,
          textTransform: "uppercase",
        }}>
          Medium
        </div>

        <DrawingTitle />

        {/* Description styled like a sketchbook annotation */}
        <div style={{
          position: "relative",
          maxWidth: 520,
          marginTop: 28,
          paddingLeft: 16,
          borderLeft: "1.5px solid rgba(26,26,24,0.18)",
        }}>
          <p style={{
            fontFamily: "'EB Garamond', Georgia, serif",
            fontSize: 16.5,
            fontStyle: "italic",
            lineHeight: 1.8,
            color: "rgba(26,26,24,0.62)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            Daily observational practice forms the backbone of the studio — life sessions, plein air studies, and pencil mileage that feed every other medium.
          </p>
          {/* Little arrow annotation mark */}
          <svg style={{ position: "absolute", top: -14, left: -10, overflow: "visible" }} width="20" height="16" viewBox="0 0 20 16">
            <defs>
              <filter id="wob2">
                <feTurbulence baseFrequency="0.05" numOctaves="2" seed="5" />
                <feDisplacementMap in="SourceGraphic" scale="1.5" />
              </filter>
            </defs>
            <path d="M10 14 L10 2 M6 6 L10 2 L14 6" stroke="rgba(26,26,24,0.3)" strokeWidth="1.2" fill="none" filter="url(#wob2)" />
          </svg>
        </div>

        {/* Horizontal rule that looks like a pencil stroke */}
        <svg style={{ display: "block", marginTop: 32, overflow: "visible" }} height="4" width="80" viewBox="0 0 80 4">
          <defs>
            <filter id="wob3">
              <feTurbulence baseFrequency="0.06" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="2" />
            </filter>
          </defs>
          <line x1="0" y1="2" x2="80" y2="2" stroke="#1a1a18" strokeWidth="2" filter="url(#wob3)" opacity="0.4" />
        </svg>
      </div>

      {/* Gallery */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <GalleryTemplate
          category="Drawing"
          title=""
          description=""
          theme={{
            accent: "#1a1a18",
            background: "transparent",
            text: "#1a1a18",
          }}
        />
      </div>
    </div>
  );
}