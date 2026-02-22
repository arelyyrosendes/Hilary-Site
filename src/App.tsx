import { useEffect, useMemo, useState } from "react";
import { ContactPage } from "./pages/Contact";
import { HomePage } from "./pages/Home";
import { PAGES, Page } from "./data/artworks";
import { palette } from "./theme";
import { PaintingPage } from "./pages/Painting";
import { DrawingPage } from "./pages/Drawing";
import { ComicsPage } from "./pages/Comics";
import { DigitalPage } from "./pages/Digital";
import { SculpturePage } from "./pages/Sculpture";

const SIDEBAR_W = 260;

export default function App() {
  const [activePage, setActivePage] = useState<Page>("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isComics = activePage === "Comics";
  const isDrawing = activePage === "Drawing";
  const isDigital = activePage === "Digital";
  const isSculpture = activePage === "Sculpture";
  const isPainting = activePage === "Painting";

  // Include Home so it shows in the nav instead of being hidden behind the logo only
  const navPages: Page[] = ["Home", ...PAGES.filter(p => p !== "Home")];

  // URL routing helpers: page -> path and path -> page
  const pageToPath = useMemo<Record<Page, string>>(
    () => ({
      Home: "/",
      Painting: "/painting",
      Drawing: "/drawing",
      Comics: "/comics",
      Digital: "/digital",
      Sculpture: "/sculpture",
      Contact: "/contact",
    }),
    []
  );

  // Lenient path -> page resolver (case-insensitive, ignores trailing slash and extra segments)
  const derivePageFromPath = (path: string): Page => {
    const normalized = (path || "/")
      .split("?")[0]
      .replace(/\/+$/, "") || "/";
    const segment = normalized.toLowerCase().split("/")[1] || "";
    switch (segment) {
      case "":
        return "Home";
      case "painting":
        return "Painting";
      case "drawing":
        return "Drawing";
      case "comics":
        return "Comics";
      case "digital":
        return "Digital";
      case "sculpture":
        return "Sculpture";
      case "contact":
        return "Contact";
      default:
        return "Home";
    }
  };

  // Scroll to the top whenever the active page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activePage]);

  const headerBg = isComics ? "#0f1115" : isDrawing ? "#F0EDE6" : isDigital ? "#080f1a" : isSculpture ? "#EAE0D2" : isPainting ? "#FAF4EB" : palette.cream;
  const headerBorder = isComics ? "rgba(127,90,240,0.25)" : isDrawing ? "rgba(26,26,24,0.12)" : isDigital ? "rgba(34,211,238,0.1)" : isSculpture ? "rgba(155,101,69,0.18)" : isPainting ? "rgba(201,85,42,0.15)" : palette.pale;

  const navigate = (page: Page) => {
    const targetPath = pageToPath[page];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
    setActivePage(page);
    setSidebarOpen(false);
  };

  // On first load, sync page to URL path (e.g., /comics keeps you on Comics)
  useEffect(() => {
    setActivePage(derivePageFromPath(window.location.pathname || "/"));
  }, []);

  // Keep page in sync when user hits back/forward
  useEffect(() => {
    const handler = () => setActivePage(derivePageFromPath(window.location.pathname || "/"));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  return (
    <div style={{ background: palette.cream, minHeight: "100vh", color: palette.ink, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Bangers&family=EB+Garamond:ital,wght@0,400;1,400&family=Space+Mono:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${palette.cream}; overflow-x: hidden; }
        ::selection { background: ${palette.accent}; color: white; }
        button:focus { outline: none; }

        .header-root { transition: background 0.4s ease, border-color 0.4s ease; }
        .nav-logo { transition: color 0.3s ease, letter-spacing 0.3s, text-shadow 0.3s; }
        .nav-btn { transition: color 0.2s, border-color 0.2s; }

        /* Theme overlays */
        .comic-header-dots {
          position: absolute; inset: 0; pointer-events: none;
          transition: opacity 0.5s ease;
          background-image: radial-gradient(circle, rgba(127,90,240,0.35) 1.5px, transparent 1.5px);
          background-size: 10px 10px;
        }
        .comic-header-bar {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 3px;
          background: repeating-linear-gradient(90deg, #7F5AF0 0px, #7F5AF0 28px, #2CB67D 28px, #2CB67D 56px, #FF6B6B 56px, #FF6B6B 84px, #FFD166 84px, #FFD166 112px);
          transition: opacity 0.4s ease;
        }
        .drawing-header-lines {
          position: absolute; inset: 0; pointer-events: none; transition: opacity 0.5s ease;
          background-image: repeating-linear-gradient(to bottom, transparent 0px, transparent 19px, rgba(26,26,24,0.07) 19px, rgba(26,26,24,0.07) 20px);
        }
        .drawing-margin-rule {
          position: absolute; top: 0; bottom: 0; left: 40px; width: 1px;
          background: rgba(180,100,80,0.2); transition: opacity 0.5s ease;
        }
        .digital-header-grid {
          position: absolute; inset: 0; pointer-events: none; transition: opacity 0.5s ease;
          background-image: linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .digital-header-glow {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #22D3EE 30%, #818CF8 70%, transparent 100%);
          transition: opacity 0.4s ease; box-shadow: 0 0 8px rgba(34,211,238,0.6);
        }
        .sculpture-header-grain {
          position: absolute; inset: 0; pointer-events: none; transition: opacity 0.5s ease;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
          background-size: 200px 200px; mix-blend-mode: multiply;
        }
        .sculpture-header-bar {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #C97A56 20%, #9B6545 60%, transparent 100%);
          transition: opacity 0.5s ease;
        }
        .painting-header-canvas {
          position: absolute; inset: 0; pointer-events: none; transition: opacity 0.5s ease;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
          background-size: 200px 200px; mix-blend-mode: multiply;
        }
        .painting-header-bar {
          position: absolute; bottom: -1px; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #C9552A 15%, #D4A227 55%, transparent 100%);
          transition: opacity 0.5s ease;
        }

        /* ── MOBILE SIDEBAR SYSTEM ── */

        /* Sidebar panel slides in from left */
        .mobile-sidebar {
          display: none;
          position: fixed;
          top: 0; bottom: 0; left: 0;
          width: ${SIDEBAR_W}px;
          z-index: 200;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          overflow: hidden;
        }
        .mobile-sidebar.open { transform: translateX(0); }

        /* Page content shifts right when open */
        .page-pusher {
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          min-height: 100vh;
        }
        .page-pusher.pushed { transform: translateX(${SIDEBAR_W}px); }

        /* Arrow tab on left edge */
        .sidebar-tab {
          position: fixed;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 210;
          display: none;
          width: 26px;
          height: 52px;
          border-radius: 0 10px 10px 0;
          border: 1px solid rgba(0,0,0,0.1);
          border-left: none;
          cursor: pointer;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          transition: transform 0.38s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        .sidebar-tab.open {
          transform: translateY(-50%) translateX(${SIDEBAR_W}px);
        }
        .sidebar-tab:hover { box-shadow: 3px 0 16px rgba(0,0,0,0.18); }

        /* Scrim */
        .sidebar-scrim {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(2px);
          z-index: 190;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.38s ease;
        }
        .sidebar-scrim.open { opacity: 1; pointer-events: auto; }

        /* Sidebar nav links */
        .sidebar-nav-btn {
          display: block; width: 100%; text-align: left;
          background: none; border: none; cursor: pointer;
          padding: 13px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; letter-spacing: 0.02em;
          border-bottom: 1px solid rgba(0,0,0,0.055);
          transition: background 0.15s;
        }
        .sidebar-nav-btn:hover { background: rgba(0,0,0,0.04); }

        @media (max-width: 768px) {
          .content-padded { padding: 0 20px !important; }
          .footer-padded { padding: 20px !important; }
          .desktop-nav { display: none !important; }
          .mobile-sidebar { display: flex; }
          .sidebar-tab { display: inline-flex; }
          .sidebar-scrim { display: block; }
          header { padding: 0 16px !important; }
          main { padding: 0 16px 80px !important; }
          footer { padding: 24px 16px !important; }
        }

        @keyframes cursor-blink-nav { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* ── MOBILE SIDEBAR ── */}
      <div
        className={`mobile-sidebar${sidebarOpen ? " open" : ""}`}
        style={{ background: headerBg, borderRight: `1px solid ${headerBorder}` }}
      >
        {/* Sidebar top: name + school */}
        <div style={{ padding: "22px 24px 16px", borderBottom: `1px solid ${headerBorder}` }}>
          <button
            onClick={() => navigate("Home")}
            style={{
              fontFamily: isPainting ? "'Playfair Display', Georgia, serif" : isDrawing ? "'EB Garamond', Georgia, serif" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isComics ? "'Bangers', sans-serif" : isDigital ? "'Space Mono', monospace" : "'Libre Baskerville', Georgia, serif",
              fontSize: isComics ? 20 : isSculpture ? 16 : isPainting ? 18 : 17,
              fontWeight: isSculpture ? 300 : 700,
              fontStyle: isDrawing || isPainting ? "italic" : "normal",
              letterSpacing: isSculpture ? "0.12em" : isComics ? "0.06em" : isDigital ? "0.04em" : "-0.01em",
              textTransform: isSculpture ? "uppercase" : "none",
              color: isComics ? "#E2E2F5" : isDigital ? "#22D3EE" : isSculpture ? "#5C3520" : isPainting ? "#2A1A0E" : palette.ink,
              textShadow: isComics ? "2px 2px 0 #2CB67D" : isDigital ? "0 0 16px rgba(34,211,238,0.4)" : "none",
              background: "none", border: "none", cursor: "pointer", display: "block", lineHeight: 1.2,
            }}
          >
            Hilary Cervantes
          </button>
          <div style={{
            marginTop: 6,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase",
            color: isComics ? "rgba(226,226,245,0.35)" : isDigital ? "rgba(34,211,238,0.3)" : "rgba(26,26,24,0.32)",
          }}>
            UCSC Arts · 2026
          </div>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, overflowY: "auto", paddingTop: 4 }}>
          {navPages.map(page => (
            <button
              key={page}
              onClick={() => navigate(page)}
              className="sidebar-nav-btn"
              style={{
                color: isComics
                  ? activePage === page ? "#7F5AF0" : "rgba(226,226,245,0.8)"
                  : isDigital
                  ? activePage === page ? "#22D3EE" : "rgba(34,211,238,0.65)"
                  : isSculpture
                  ? activePage === page ? "#5C3520" : "rgba(92,53,32,0.6)"
                  : isPainting
                  ? activePage === page ? "#C9552A" : "rgba(42,26,14,0.6)"
                  : activePage === page ? palette.accent : palette.ink,
                fontWeight: activePage === page ? 500 : 400,
                borderBottomColor: isComics ? "rgba(226,226,245,0.07)" : isDigital ? "rgba(34,211,238,0.07)" : "rgba(0,0,0,0.055)",
              }}
            >
              {page}
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div style={{
          padding: "14px 24px",
          borderTop: `1px solid ${headerBorder}`,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
          color: isComics ? "rgba(226,226,245,0.22)" : isDigital ? "rgba(34,211,238,0.22)" : "rgba(26,26,24,0.25)",
        }}>
          Santa Cruz, California
        </div>
      </div>

      {/* Scrim */}
      <div className={`sidebar-scrim${sidebarOpen ? " open" : ""}`} onClick={() => setSidebarOpen(false)} />

      {/* ‹ › Arrow tab */}
      <button
        className={`sidebar-tab${sidebarOpen ? " open" : ""}`}
        onClick={() => setSidebarOpen(v => !v)}
        aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
        style={{
          background: headerBg,
          borderColor: `${headerBorder}`,
          color: isComics ? "#E2E2F5" : isDigital ? "#22D3EE" : isSculpture ? "#5C3520" : isPainting ? "#C9552A" : palette.ink,
        }}
      >
        <span style={{
          display: "inline-block",
          transition: "transform 0.35s ease",
          transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
          marginLeft: sidebarOpen ? 0 : "2px",
          fontFamily: "sans-serif",
        }}>
          ›
        </span>
      </button>

      {/* ── PAGE CONTENT (pushes right on mobile) ── */}
      <div className={`page-pusher${sidebarOpen ? " pushed" : ""}`}>

        <header
          className="header-root"
          style={{
            position: "sticky", top: 0, zIndex: 100,
            background: headerBg,
            borderBottom: `1px solid ${headerBorder}`,
            padding: 0,
          }}
        >
          {/* Theme overlays — inline opacity for smooth transition without class toggling */}
          <div className="comic-header-dots" style={{ opacity: isComics ? 1 : 0 }} />
          <div className="comic-header-bar" style={{ opacity: isComics ? 1 : 0 }} />
          <div className="drawing-header-lines" style={{ opacity: isDrawing ? 1 : 0 }} />
          <div className="drawing-margin-rule" style={{ opacity: isDrawing ? 1 : 0 }} />
          <div className="digital-header-grid" style={{ opacity: isDigital ? 1 : 0 }} />
          <div className="digital-header-glow" style={{ opacity: isDigital ? 1 : 0 }} />
          <div className="sculpture-header-grain" style={{ opacity: isSculpture ? 1 : 0 }} />
          <div className="sculpture-header-bar" style={{ opacity: isSculpture ? 0.5 : 0 }} />
          <div className="painting-header-canvas" style={{ opacity: isPainting ? 1 : 0 }} />
          <div className="painting-header-bar" style={{ opacity: isPainting ? 0.45 : 0 }} />

          <div className="content-padded" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", position: "relative", display: "flex", alignItems: "center", height: 64 }}>
            {/* Logo */}
            <button
              onClick={() => navigate("Home")}
              className="nav-logo"
              style={{
                fontFamily: isComics ? "'Bangers', 'Impact', sans-serif" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'Libre Baskerville', Georgia, serif",
                fontSize: isComics ? 22 : isDrawing ? 20 : isDigital ? 15 : isSculpture ? 19 : isPainting ? 20 : 18,
                fontWeight: isComics ? 400 : isSculpture ? 300 : 700,
                fontStyle: isDrawing || isPainting ? "italic" : "normal",
                letterSpacing: isComics ? "0.08em" : isDrawing ? "0.01em" : isDigital ? "0.04em" : isSculpture ? "0.14em" : "-0.01em",
                textTransform: isSculpture ? "uppercase" : "none",
                color: isComics ? "#E2E2F5" : isDrawing ? "rgba(26,26,24,0.75)" : isDigital ? "#22D3EE" : isSculpture ? "#5C3520" : isPainting ? "#2A1A0E" : palette.ink,
                textShadow: isComics ? "2px 2px 0 #2CB67D, 0 0 24px rgba(127,90,240,0.5)" : isDigital ? "0 0 20px rgba(34,211,238,0.45)" : isSculpture ? "-1px -1px 0 rgba(255,240,220,0.7), 1px 1px 1px rgba(92,53,32,0.2)" : isPainting ? "1px 1px 0 rgba(201,85,42,0.15)" : "none",
                background: "none", border: "none", cursor: "pointer", marginRight: "auto",
              }}
            >
              Hilary Cervantes
            </button>

            {/* Desktop nav */}
            <nav className="desktop-nav" style={{ display: "flex", gap: 36, alignItems: "center" }}>
              {navPages.map(page => {
                const isActive = activePage === page;
                return (
                  <button
                    key={page}
                    onClick={() => navigate(page)}
                    className="nav-btn"
                    style={{
                      fontFamily: isComics ? "'Courier New', monospace" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
                      fontSize: isComics ? 11 : isDrawing ? 14 : isDigital ? 10 : isSculpture ? 12 : isPainting ? 13 : 13,
                      fontStyle: isDrawing || isPainting ? "italic" : "normal",
                      fontWeight: isSculpture ? 600 : "normal",
                      letterSpacing: isComics ? "0.1em" : isDrawing ? "0.03em" : isDigital ? "0.1em" : isSculpture ? "0.18em" : "0.02em",
                      textTransform: isComics || isDigital || isSculpture ? "uppercase" : "none",
                      color: isComics ? (isActive ? "#7F5AF0" : "rgba(226,226,245,0.82)") : isDrawing ? (isActive ? "rgba(26,26,24,0.9)" : "rgba(26,26,24,0.45)") : isDigital ? (isActive ? "#22D3EE" : "rgba(34,211,238,0.45)") : isSculpture ? (isActive ? "#5C3520" : "rgba(92,53,32,0.42)") : isPainting ? (isActive ? "#2A1A0E" : "rgba(42,26,14,0.42)") : isActive ? palette.ink : palette.muted,
                      background: "none", border: "none", cursor: "pointer", padding: "4px 0",
                      borderBottom: isActive ? `1px solid ${isComics ? "#7F5AF0" : isDrawing ? "rgba(26,26,24,0.35)" : isDigital ? "rgba(34,211,238,0.5)" : isSculpture ? "rgba(92,53,32,0.35)" : isPainting ? "rgba(201,85,42,0.5)" : palette.ink}` : "1px solid transparent",
                      textShadow: isDigital && isActive ? "0 0 12px rgba(34,211,238,0.5)" : isSculpture && isActive ? "-1px -1px 0 rgba(255,240,220,0.5)" : "none",
                    }}
                    onMouseEnter={e => { if (!isActive) (e.target as HTMLButtonElement).style.color = isComics ? "#7F5AF0" : isDrawing ? "rgba(26,26,24,0.9)" : isDigital ? "#22D3EE" : isSculpture ? "#5C3520" : isPainting ? "#2A1A0E" : palette.ink; }}
                    onMouseLeave={e => { if (!isActive) (e.target as HTMLButtonElement).style.color = isComics ? "rgba(226,226,245,0.82)" : isDrawing ? "rgba(26,26,24,0.45)" : isDigital ? "rgba(34,211,238,0.45)" : isSculpture ? "rgba(92,53,32,0.42)" : isPainting ? "rgba(42,26,14,0.42)" : palette.muted; }}
                  >
                    {page}
                  </button>
                );
              })}
            </nav>
          </div>
        </header>

        <main className="content-padded" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px 80px" }}>
          {activePage === "Home" && <HomePage setPage={navigate} />}
          {activePage === "Contact" && <ContactPage />}
          {activePage === "Painting" && <PaintingPage />}
          {activePage === "Drawing" && <DrawingPage />}
          {activePage === "Comics" && <ComicsPage />}
          {activePage === "Digital" && <DigitalPage />}
          {activePage === "Sculpture" && <SculpturePage />}
        </main>

        <footer style={{
          borderTop: `1px solid ${isComics ? "rgba(127,90,240,0.2)" : isDrawing ? "rgba(26,26,24,0.1)" : isDigital ? "rgba(34,211,238,0.08)" : isSculpture ? "rgba(155,101,69,0.15)" : isPainting ? "rgba(201,85,42,0.12)" : palette.pale}`,
          padding: "24px 48px",
          background: isComics ? "#0f1115" : isDrawing ? "#F0EDE6" : isDigital ? "#080f1a" : isSculpture ? "#EAE0D2" : isPainting ? "#FAF4EB" : "transparent",
          transition: "background 0.4s ease",
        }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {["© 2026 Hilary Cervantes · UCSC Arts", "Santa Cruz, California"].map(text => (
              <div key={text} style={{
                fontFamily: isComics ? "'Courier New', monospace" : isDrawing ? "'EB Garamond', Georgia, serif" : isDigital ? "'Space Mono', monospace" : isSculpture ? "'Cormorant Garamond', Georgia, serif" : isPainting ? "'Playfair Display', Georgia, serif" : "'DM Sans', sans-serif",
                fontSize: isDrawing ? 13 : isDigital ? 10 : isSculpture || isPainting ? 12 : 11,
                fontStyle: isDrawing || isPainting ? "italic" : "normal",
                fontWeight: isSculpture ? 600 : "normal",
                color: isComics ? "rgba(226,226,245,0.35)" : isDrawing ? "rgba(26,26,14,0.38)" : isDigital ? "rgba(34,211,238,0.3)" : isSculpture ? "rgba(92,53,32,0.38)" : isPainting ? "rgba(42,26,14,0.38)" : palette.muted,
                letterSpacing: isComics || isDigital ? "0.1em" : isSculpture ? "0.16em" : "0.06em",
                textTransform: isComics || isDigital || isSculpture ? "uppercase" : "none",
                transition: "color 0.3s",
              }}>{text}</div>
            ))}
          </div>
        </footer>

      </div>{/* end page-pusher */}
    </div>
  );
}
