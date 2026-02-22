import { artworks, Page } from "../data/artworks";
import { palette } from "../theme";
import { ArtworkCard } from "../components/ArtworkCard";

type GalleryTheme = {
  accent?: string;
  background?: string;
  text?: string;
};

type GalleryProps = {
  category: Page;
  description: string;
  title?: string;
  theme?: GalleryTheme;
};

export function GalleryTemplate({ category, description, title, theme }: GalleryProps) {
  const works = artworks[category] || [];
  const accent = theme?.accent ?? palette.accent;
  const bg = theme?.background ?? "transparent";
  const text = theme?.text ?? palette.ink;

  return (
    <div style={{ background: bg, padding: "50px 48px 64px", margin: "-32px -48px 0", borderRadius: 20 }}>
      <div style={{ padding: "0 0 30px", borderBottom: `1px solid ${palette.pale}` }}>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: palette.muted,
            marginBottom: 12,
          }}
        >
          Medium
        </div>
        <h1
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: "clamp(32px, 4vw, 56px)",
            fontWeight: 400,
            color: text,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          {title ?? category}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            lineHeight: 1.7,
            color: palette.muted,
            maxWidth: 640,
            margin: 0,
          }}
        >
          {description}
        </p>
        <div style={{ width: 44, height: 2, background: accent, marginTop: 24 }} />
      </div>

      <div style={{ paddingTop: 28 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {works.map((art, i) => (
            <ArtworkCard key={i} {...art} />
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: palette.muted,
            letterSpacing: "0.04em",
          }}
        >
          {works.length} works
        </div>
      </div>
    </div>
  );
}
