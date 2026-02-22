import { palette } from "../theme";

export function ContactPage() {
  return (
    <div style={{ padding: "60px 0" }}>
      <div style={{ maxWidth: 560 }}>
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
          Get in Touch
        </div>
        <h1
          style={{
            fontFamily: "'Libre Baskerville', Georgia, serif",
            fontSize: 48,
            fontWeight: 400,
            color: palette.ink,
            margin: "0 0 40px",
            letterSpacing: "-0.02em",
          }}
        >
          Contact
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {[
            { label: "Email", value: "hicervan@ucsc.edu" },
            { label: "Instagram", value: "@" },
            { label: "Location", value: "Santa Cruz, CA" },
            { label: "Available for", value: "Commissions, collaborations, and freelance design" },
          ].map(({ label, value }) => (
            <div key={label} style={{ borderBottom: `1px solid ${palette.pale}`, paddingBottom: 20 }}>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: palette.muted,
                  marginBottom: 6,
                }}
              >
                {label}
              </div>
              <div style={{ fontFamily: "'Libre Baskerville', Georgia, serif", fontSize: 17, color: palette.ink }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: palette.muted, lineHeight: 1.7 }}>
            Currently in my senior year at UCSC, completing a degree in Arts. Open to opportunities in Santa Cruz and/or Los Angeles.
          </div>
        </div>
      </div>
    </div>
  );
}
