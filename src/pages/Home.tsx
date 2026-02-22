import { featuredOnHome, Page } from "../data/artworks";
import { palette } from "../theme";
import { ArtworkCard } from "../components/ArtworkCard";

export function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div style={{ padding: "60px 0 50px", borderBottom: `1px solid ${palette.pale}` }}>
        <div style={{ maxWidth: 680 }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: palette.muted,
              marginBottom: 20,
            }}
          >
            Arts · University of California, Santa Cruz · Class of 2026
          </div>
          <h1
            style={{
              fontFamily: "'Libre Baskerville', Georgia, serif",
              fontSize: "clamp(36px, 5vw, 68px)",
              fontWeight: 400,
              lineHeight: 1.08,
              color: palette.ink,
              margin: "0 0 24px",
              letterSpacing: "-0.02em",
            }}
          >
            Hilary Cervantes
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17,
              lineHeight: 1.65,
              color: palette.muted,
              maxWidth: 520,
              margin: 0,
            }}
          >
            Working between painting, Comics, and digital media — exploring memory, landscape, and the material limits of images. Currently completing my senior thesis at UCSC.
          </p>
        </div>
        <div style={{ width: 60, height: 2, background: palette.accent, marginTop: 36 }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "36px 0 24px" }}>
        <div style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 13, color: palette.ink, letterSpacing: "0.01em" }}>
          Selected Works, 2022–2024
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: palette.muted, cursor: "pointer" }}>
          View All
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {featuredOnHome.map((art, i) => (
          <ArtworkCard key={i} {...art} onClick={() => setPage(art.category as Page)} />
        ))}
      </div>

      <div style={{ marginTop: 60, paddingTop: 40, borderTop: `1px solid ${palette.pale}` }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: palette.muted,
            marginBottom: 24,
          }}
        >
          Browse by Medium
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["Painting", "Drawing", "Comics", "Digital", "Sculpture"] as Page[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setPage(cat)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                letterSpacing: "0.04em",
                color: palette.ink,
                background: "transparent",
                border: `1px solid ${palette.pale}`,
                padding: "9px 20px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.background = palette.ink;
                (e.target as HTMLButtonElement).style.color = palette.cream;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.background = "transparent";
                (e.target as HTMLButtonElement).style.color = palette.ink;
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
