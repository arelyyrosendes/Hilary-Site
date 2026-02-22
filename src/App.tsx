import { useState } from "react";
import { ContactPage } from "./pages/Contact";
import { HomePage } from "./pages/Home";
import { PAGES, Page } from "./data/artworks";
import { palette } from "./theme";
import { PaintingPage } from "./pages/Painting";
import { DrawingPage } from "./pages/Drawing";
import { ComicsPage } from "./pages/Comics";
import { DigitalPage } from "./pages/Digital";
import { SculpturePage } from "./pages/Sculpture";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("Home");
  const isComics = activePage === "Comics";
  const isDrawing = activePage === "Drawing";
  const isDigital = activePage === "Digital";
  const isSculpture = activePage === "Sculpture";
  const isPainting = activePage === "Painting";

  return (
    <div style={{ background: palette.cream, minHeight: "100vh", color: palette.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Bangers&family=EB+Garamond:ital,wght@0,400;1,400&family=Space+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${palette.cream}; }
        ::selection { background: ${palette.accent}; color: white; }
        button:focus { outline: 2px solid ${palette.accent}; outline-offset: 2px; }

        .header-root {
          transition: background 0.4s ease, border-color 0.4s ease;
        }
        .nav-logo {
          transition: color 0.3s ease, font-family 0.1s, letter-spacing 0.3s, text-shadow 0.3s;
        }
        .nav-btn {
          transition: color 0.2s, border-color 0.2s, letter-spacing 0.3s;
        }
        /* Halftone overlay on comic header */
        .comic-header-dots {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-image: radial-gradient(circle, rgba(127,90,240,0.35) 1.5px, transparent 1.5px);
          background-size: 10px 10px;
        }
        .comic-header-dots.active { opacity: 1; }

        /* Color bar at bottom of header */
        .comic-header-bar {
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 3px;
          background: repeating-linear-gradient(
            90deg,
            #7F5AF0 0px, #7F5AF0 28px,
            #2CB67D 28px, #2CB67D 56px,
            #FF6B6B 56px, #FF6B6B 84px,
            #FFD166 84px, #FFD166 112px
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .comic-header-bar.active { opacity: 1; }

        /* Sketch ruled-line underlay for drawing header */
        .drawing-header-lines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 19px,
            rgba(26,26,24,0.07) 19px,
            rgba(26,26,24,0.07) 20px
          );
        }
        .drawing-header-lines.active { opacity: 1; }

        /* Left margin rule for drawing header */
        .drawing-margin-rule {
          position: absolute;
          top: 0; bottom: 0; left: 40px;
          width: 1px;
          background: rgba(180,100,80,0.2);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .drawing-margin-rule.active { opacity: 1; }

        /* Digital pixel grid overlay for header */
        .digital-header-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-image:
            linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .digital-header-grid.active { opacity: 1; }

        /* Cyan glow line at bottom of digital header */
        .digital-header-glow {
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, #22D3EE 30%, #818CF8 70%, transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          box-shadow: 0 0 8px rgba(34,211,238,0.6);
        }
        .digital-header-glow.active { opacity: 1; }

        @keyframes cursor-blink-nav { 0%,100%{opacity:1} 50%{opacity:0} }

        /* Sculpture: grain texture overlay for header */
        .sculpture-header-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          mix-blend-mode: multiply;
        }
        .sculpture-header-grain.active { opacity: 1; }

        /* Sculpture: terracotta bottom border */
        .sculpture-header-bar {
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #C97A56 20%, #9B6545 60%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .sculpture-header-bar.active { opacity: 0.5; }

        /* Painting: canvas linen texture overlay */
        .painting-header-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 200px 200px;
          mix-blend-mode: multiply;
        }
        .painting-header-canvas.active { opacity: 1; }

        /* Painting: warm cadmium underline bar */
        .painting-header-bar {
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #C9552A 15%, #D4A227 55%, transparent 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .painting-header-bar.active { opacity: 0.45; }
      `}</style>

      <header
        className="header-root"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: isComics ? "#0f1115" : isDrawing ? "#F0EDE6" : isDigital ? "#080f1a" : isSculpture ? "#EAE0D2" : isPainting ? "#FAF4EB" : palette.cream,
          borderBottom: `1px solid ${isComics ? "rgba(127,90,240,0.25)" : isDrawing ? "rgba(26,26,24,0.12)" : isDigital ? "rgba(34,211,238,0.1)" : isSculpture ? "rgba(155,101,69,0.18)" : isPainting ? "rgba(201,85,42,0.15)" : palette.pale}`,
          padding: "0 48px",
        }}
      >
        {/* Halftone dot overlay */}
        <div className={`comic-header-dots${isComics ? " active" : ""}`} />
        {/* Comic color-register bar */}
        <div className={`comic-header-bar${isComics ? " active" : ""}`} />
        {/* Drawing ruled lines */}
        <div className={`drawing-header-lines${isDrawing ? " active" : ""}`} />
        {/* Drawing margin rule */}
        <div className={`drawing-margin-rule${isDrawing ? " active" : ""}`} />
        {/* Digital grid overlay */}
        <div className={`digital-header-grid${isDigital ? " active" : ""}`} />
        {/* Digital cyan glow bar */}
        <div className={`digital-header-glow${isDigital ? " active" : ""}`} />
        {/* Sculpture grain overlay */}
        <div className={`sculpture-header-grain${isSculpture ? " active" : ""}`} />
        {/* Sculpture terracotta bar */}
        <div className={`sculpture-header-bar${isSculpture ? " active" : ""}`} />
        {/* Painting canvas texture */}
        <div className={`painting-header-canvas${isPainting ? " active" : ""}`} />
        {/* Painting warm bar */}
        <div className={`painting-header-bar${isPainting ? " active" : ""}`} />

        <div style={{ position: "relative", display: "flex", alignItems: "center", height: 64 }}>
          {/* Logo */}
          <button
            onClick={() => setActivePage("Home")}
            className="nav-logo"
            style={{
              fontFamily: isComics ? "'Bangers', 'Impact', sans-serif" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'Libre Baskerville', Georgia, serif",
              fontSize: isComics ? 22 : isDrawing ? 20 : isDigital ? 15 : isSculpture ? 19 : isPainting ? 20 : 18,
              fontWeight: isComics ? 400 : isDrawing ? 400 : isDigital ? 700 : isSculpture ? 300 : isPainting ? 700 : 700,
              fontStyle: isDrawing || isPainting ? "italic" : "normal",
              letterSpacing: isComics ? "0.08em" : isDrawing ? "0.01em" : isDigital ? "0.04em" : isSculpture ? "0.14em" : isPainting ? "-0.01em" : "-0.01em",
              textTransform: isSculpture ? "uppercase" : "none",
              color: isComics ? "#E2E2F5" : isDrawing ? "rgba(26,26,24,0.75)" : isDigital ? "#22D3EE" : isSculpture ? "#5C3520" : isPainting ? "#2A1A0E" : palette.ink,
              textShadow: isComics ? "2px 2px 0 #2CB67D, 0 0 24px rgba(127,90,240,0.5)" : isDigital ? "0 0 20px rgba(34,211,238,0.45)" : isSculpture ? "-1px -1px 0 rgba(255,240,220,0.7), 1px 1px 1px rgba(92,53,32,0.2)" : isPainting ? "1px 1px 0 rgba(201,85,42,0.15)" : "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginRight: "auto",
            }}
          >
            Hilary Cervantes
          </button>

          <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {PAGES.filter((p) => p !== "Home").map((page) => {
              const isActive = activePage === page;
              const isComicsNav = isComics;
              const isDrawingNav = isDrawing;
              const isDigitalNav = isDigital;
              const isSculptureNav = isSculpture;
              const isPaintingNav = isPainting;
              return (
                <button
                  key={page}
                  onClick={() => setActivePage(page)}
                  className="nav-btn"
                  style={{
                    fontFamily: isComicsNav ? "'Courier New', monospace" : isDrawingNav ? "'EB Garamond', Georgia, serif" : isDigitalNav ? "'Space Mono', monospace" : isSculptureNav ? "'Cormorant Garamond', Georgia, serif" : isPaintingNav ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
                    fontSize: isComicsNav ? 11 : isDrawingNav ? 14 : isDigitalNav ? 10 : isSculptureNav ? 12 : isPaintingNav ? 13 : 13,
                    fontStyle: isDrawingNav || isPaintingNav ? "italic" : "normal",
                    fontWeight: isSculptureNav ? 600 : "normal",
                    letterSpacing: isComicsNav ? "0.1em" : isDrawingNav ? "0.03em" : isDigitalNav ? "0.1em" : isSculptureNav ? "0.18em" : isPaintingNav ? "0.02em" : "0.02em",
                    textTransform: isComicsNav || isDigitalNav || isSculptureNav ? "uppercase" : "none",
                    color: isComicsNav
                      ? isActive ? "#7F5AF0" : "rgba(226,226,245,0.82)"
                      : isDrawingNav
                      ? isActive ? "rgba(26,26,24,0.9)" : "rgba(26,26,24,0.45)"
                      : isDigitalNav
                      ? isActive ? "#22D3EE" : "rgba(34,211,238,0.45)"
                      : isSculptureNav
                      ? isActive ? "#5C3520" : "rgba(92,53,32,0.42)"
                      : isPaintingNav
                      ? isActive ? "#2A1A0E" : "rgba(42,26,14,0.42)"
                      : isActive ? palette.ink : palette.muted,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px 0",
                    borderBottom: isActive
                      ? `1px solid ${isComicsNav ? "#7F5AF0" : isDrawingNav ? "rgba(26,26,24,0.35)" : isDigitalNav ? "rgba(34,211,238,0.5)" : isSculptureNav ? "rgba(92,53,32,0.35)" : isPaintingNav ? "rgba(201,85,42,0.5)" : palette.ink}`
                      : "1px solid transparent",
                    textShadow: isDigitalNav && isActive ? "0 0 12px rgba(34,211,238,0.5)" : isSculptureNav && isActive ? "-1px -1px 0 rgba(255,240,220,0.5)" : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.target as HTMLButtonElement).style.color = isComicsNav ? "#7F5AF0" : isDrawingNav ? "rgba(26,26,24,0.9)" : isDigitalNav ? "#22D3EE" : isSculptureNav ? "#5C3520" : isPaintingNav ? "#2A1A0E" : palette.ink;
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.target as HTMLButtonElement).style.color = isComicsNav ? "rgba(226,226,245,0.82)" : isDrawingNav ? "rgba(26,26,24,0.45)" : isDigitalNav ? "rgba(34,211,238,0.45)" : isSculptureNav ? "rgba(92,53,32,0.42)" : isPaintingNav ? "rgba(42,26,14,0.42)" : palette.muted;
                  }}
                >
                  {page}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px 80px" }}>
        {activePage === "Home" && <HomePage setPage={setActivePage} />}
        {activePage === "Contact" && <ContactPage />}
        {activePage === "Painting" && <PaintingPage />}
        {activePage === "Drawing" && <DrawingPage />}
        {activePage === "Comics" && <ComicsPage />}
        {activePage === "Digital" && <DigitalPage />}
        {activePage === "Sculpture" && <SculpturePage />}
      </main>

      <footer
        style={{
          borderTop: `1px solid ${isComics ? "rgba(127,90,240,0.2)" : isDrawing ? "rgba(26,26,24,0.1)" : isDigital ? "rgba(34,211,238,0.08)" : isSculpture ? "rgba(155,101,69,0.15)" : isPainting ? "rgba(201,85,42,0.12)" : palette.pale}`,
          padding: "24px 48px",
          background: isComics ? "#0f1115" : isDrawing ? "#F0EDE6" : isDigital ? "#080f1a" : isSculpture ? "#EAE0D2" : isPainting ? "#FAF4EB" : "transparent",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{
            fontFamily: isComics ? "'Courier New', monospace" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
            fontSize: isDrawing ? 13 : isDigital ? 10 : isSculpture ? 12 : isPainting ? 12 : 11,
            fontStyle: isDrawing || isPainting ? "italic" : "normal",
            fontWeight: isSculpture ? 600 : "normal",
            color: isComics ? "rgba(226,226,245,0.35)" : isDrawing ? "rgba(26,26,24,0.38)" : isDigital ? "rgba(34,211,238,0.3)" : isSculpture ? "rgba(92,53,32,0.38)" : isPainting ? "rgba(42,26,14,0.38)" : palette.muted,
            letterSpacing: isComics ? "0.1em" : isDigital ? "0.1em" : isSculpture ? "0.16em" : "0.06em",
            textTransform: isComics || isDigital || isSculpture ? "uppercase" : "none",
            transition: "color 0.3s",
          }}>
            © 2026 Hilary Cervantes · UCSC Arts
          </div>
          <div style={{
            fontFamily: isComics ? "'Courier New', monospace" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
            fontSize: isDrawing ? 13 : isDigital ? 10 : isSculpture ? 12 : isPainting ? 12 : 11,
            fontStyle: isDrawing || isPainting ? "italic" : "normal",
            fontWeight: isSculpture ? 600 : "normal",
            color: isComics ? "rgba(226,226,245,0.35)" : isDrawing ? "rgba(26,26,24,0.38)" : isDigital ? "rgba(34,211,238,0.3)" : isSculpture ? "rgba(92,53,32,0.38)" : isPainting ? "rgba(42,26,14,0.38)" : palette.muted,
            letterSpacing: isComics ? "0.1em" : isDigital ? "0.1em" : isSculpture ? "0.16em" : "0.06em",
            textTransform: isComics || isDigital || isSculpture ? "uppercase" : "none",
            transition: "color 0.3s",
          }}>
            Santa Cruz, California
          </div>
        </div>
      </footer>
    </div>
  );
}