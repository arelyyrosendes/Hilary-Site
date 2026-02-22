import { GalleryTemplate } from "./Gallery";

// Organic blob shapes suggesting clay forms and vessel silhouettes
const CeramicBlobs = () => (
  <svg
    style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="clay-blur">
        <feGaussianBlur stdDeviation="28" />
      </filter>
      <filter id="clay-blur-sm">
        <feGaussianBlur stdDeviation="14" />
      </filter>
      {/* Paper/clay grain texture */}
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" seed="2" stitchTiles="stitch" result="noise" />
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        <feBlend in="SourceGraphic" in2="grayNoise" mode="multiply" result="blended" />
        <feComposite in="blended" in2="SourceGraphic" operator="in" />
      </filter>
    </defs>

    {/* Warm background wash */}
    <rect width="100%" height="100%" fill="#EDE5D8" />

    {/* Grain overlay on entire background */}
    <rect width="100%" height="100%" fill="#C4A882" opacity="0.09" filter="url(#grain)" />

    {/* Large warm terracotta blob — bottom right, like a raku vessel */}
    <ellipse cx="82%" cy="78%" rx="320" ry="260"
      fill="#C97A56" opacity="0.13" filter="url(#clay-blur)" />

    {/* Mid sage-green blob — top left, like celadon glaze */}
    <ellipse cx="10%" cy="18%" rx="240" ry="200"
      fill="#8FA88A" opacity="0.11" filter="url(#clay-blur)" />

    {/* Small cream highlight blob */}
    <ellipse cx="55%" cy="35%" rx="180" ry="120"
      fill="#F2E8D9" opacity="0.35" filter="url(#clay-blur-sm)" />

    {/* Thin contour lines suggesting wheel-thrown rings */}
    <g opacity="0.055" transform="translate(88%, 85%)">
      {[110, 90, 70, 52, 36, 22].map((r) => (
        <ellipse key={r} cx="0" cy="0" rx={r * 1.4} ry={r * 0.55}
          fill="none" stroke="#6B3F2A" strokeWidth="0.8" />
      ))}
    </g>
  </svg>
);

// Fingerprint-like texture marks — hand of the maker
const FingerprintMarks = () => (
  <svg
    style={{ position: "fixed", top: 64, left: 0, width: 220, height: 300, pointerEvents: "none", zIndex: 0, opacity: 0.055 }}
    viewBox="0 0 220 300"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="fp-warp">
        <feTurbulence type="turbulence" baseFrequency="0.018" numOctaves="4" seed="6" result="warp" />
        <feDisplacementMap in="SourceGraphic" in2="warp" scale="7" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
    {/* Concentric arcs like a fingerprint / throwing rings */}
    {[30, 48, 66, 84, 100, 116, 130, 143].map((r) => (
      <path
        key={r}
        d={`M ${110 - r} 160 A ${r} ${r * 0.62} 0 0 1 ${110 + r} 160`}
        fill="none"
        stroke="#5C3D2A"
        strokeWidth="1"
        filter="url(#fp-warp)"
      />
    ))}
  </svg>
);

// Vessel silhouette — right side decorative
const VesselSilhouette = () => (
  <svg
    style={{ position: "fixed", bottom: 0, right: 48, width: 160, height: 340, pointerEvents: "none", zIndex: 0, opacity: 0.07 }}
    viewBox="0 0 160 340"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="vessel-rough">
        <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="3" seed="9" />
        <feDisplacementMap in="SourceGraphic" scale="3" />
      </filter>
    </defs>
    {/* Vessel form: narrow neck, wide belly, foot */}
    <path
      d="M 72 20 C 68 20 60 28 58 45 C 54 70 30 110 26 165 C 22 210 28 255 40 278 C 48 292 60 302 80 304 C 100 302 112 292 120 278 C 132 255 138 210 134 165 C 130 110 106 70 102 45 C 100 28 92 20 88 20 Z"
      fill="#7A4A2E"
      filter="url(#vessel-rough)"
    />
    {/* Rim */}
    <ellipse cx="80" cy="22" rx="16" ry="5" fill="#7A4A2E" filter="url(#vessel-rough)" />
    {/* Foot ring */}
    <ellipse cx="80" cy="300" rx="38" ry="8" fill="none" stroke="#7A4A2E" strokeWidth="2" filter="url(#vessel-rough)" />
  </svg>
);

// Title: carved/impressed feeling — letterforms with slight texture
const SculptureTitle = () => (
  <div style={{ position: "relative", display: "inline-block", marginBottom: 6 }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300;1,600&display=swap');
      @keyframes dust-settle { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
    `}</style>
    <h1 style={{
      fontFamily: "'Cormorant Garamond', 'Libre Baskerville', Georgia, serif",
      fontSize: "clamp(44px, 5.5vw, 72px)",
      fontWeight: 300,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "#3D2314",
      margin: 0,
      lineHeight: 1,
      // Impressed/intaglio shadow — light above, dark below, like clay pressed text
      textShadow: "-1px -1px 0 rgba(255,245,235,0.6), 1px 1px 2px rgba(61,35,20,0.35)",
      animation: "dust-settle 0.8s ease both",
    }}>
      Sculpture
    </h1>
    {/* Impressed dash — like a clay stamp line */}
    <div style={{
      marginTop: 10,
      display: "flex",
      gap: 4,
      alignItems: "center",
    }}>
      {[40, 8, 20, 8, 60].map((w, i) => (
        <div key={i} style={{
          height: 1,
          width: w,
          background: "#9B6545",
          opacity: 0.4,
          borderRadius: 1,
        }} />
      ))}
    </div>
  </div>
);

export function SculpturePage() {
  return (
    <div style={{ position: "relative" }}>

      {/* Background atmosphere */}
      <CeramicBlobs />
      <FingerprintMarks />
      <VesselSilhouette />

      {/* Custom header */}
      <div style={{ position: "relative", zIndex: 1, padding: "52px 48px 0" }}>

        {/* Category label — stamped feel */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#9B6545",
          opacity: 0.75,
          marginBottom: 20,
        }}>
          {/* Small clay-stamp diamond */}
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect x="1" y="1" width="6" height="6" fill="#9B6545" transform="rotate(45 4 4)" opacity="0.8" />
          </svg>
          Medium
        </div>

        <SculptureTitle />

        {/* Description — like a glaze note card */}
        <div style={{
          position: "relative",
          maxWidth: 520,
          marginTop: 28,
          background: "rgba(210,185,158,0.2)",
          border: "1px solid rgba(155,101,69,0.18)",
          borderTop: "2px solid rgba(155,101,69,0.3)",
          padding: "16px 20px",
        }}>
          {/* Tiny "note" label top-left */}
          <div style={{
            position: "absolute",
            top: -9,
            left: 16,
            background: "#EAE0D2",
            padding: "0 8px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 9,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9B6545",
            opacity: 0.7,
          }}>
            Studio Notes
          </div>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 17,
            fontWeight: 300,
            fontStyle: "italic",
            lineHeight: 1.75,
            color: "rgba(61,35,20,0.68)",
            margin: 0,
            letterSpacing: "0.01em",
          }}>
            Ceramic hand-building and cast forms focused on vessel silhouettes, surface, and the relationship between body, container, and space.
          </p>
        </div>

        {/* Kiln cone / process tags */}
        <div style={{ display: "flex", gap: 8, marginTop: 22, flexWrap: "wrap" }}>
          {["Cone 6 Stoneware", "Raku", "Slip Cast", "Hand Built", "Oxide Glaze"].map((tag) => (
            <div key={tag} style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#9B6545",
              background: "rgba(155,101,69,0.08)",
              border: "1px solid rgba(155,101,69,0.2)",
              padding: "4px 10px",
              opacity: 0.8,
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <GalleryTemplate
          category="Sculpture"
          title=""
          description=""
          theme={{
            accent: "#D97757",
            background: "transparent",
            text: "#3D2314",
          }}
        />
      </div>
    </div>
  );
}