export const PAGES = ["Home", "Painting", "Drawing", "Comics", "Digital", "Sculpture", "Contact"] as const;
export type Page = (typeof PAGES)[number];

export const artworks: Record<string, { title: string; medium: string; year: string; color: string }[]> = {
  Painting: [
    { title: "Untitled No. 4", medium: "Oil on canvas", year: "2024", color: "#c8a97e" },
    { title: "Coastal Memory", medium: "Acrylic on canvas", year: "2024", color: "#8fb3c2" },
    { title: "Still Life with Pomegranates", medium: "Oil on panel", year: "2023", color: "#b85c4a" },
    { title: "Study in Ochre", medium: "Oil on linen", year: "2023", color: "#d4a843" },
    { title: "Dusk, Pacific", medium: "Acrylic on canvas", year: "2023", color: "#7a6ba5" },
    { title: "Form Study I", medium: "Oil on panel", year: "2022", color: "#6b8f71" },
  ],
  Drawing: [
    { title: "Figure Study, Tuesday", medium: "Charcoal on newsprint", year: "2024", color: "#c0bab4" },
    { title: "Architecture Series I", medium: "Ink on paper", year: "2024", color: "#e8e0d5" },
    { title: "Portrait of M.", medium: "Graphite on paper", year: "2023", color: "#b8b2aa" },
    { title: "Gesture 12", medium: "Conte crayon", year: "2023", color: "#a09890" },
    { title: "Hands", medium: "Silverpoint", year: "2022", color: "#d0cbc5" },
    { title: "Botanical Sketch", medium: "Pen and ink", year: "2022", color: "#c8d5b5" },
  ],
  Comics: [
    { title: "Night Market", medium: "Ink & digital tone", year: "2024", color: "#2f4858" },
    { title: "Panel Rhythm", medium: "Brush pen on bristol", year: "2024", color: "#5b6c8f" },
    { title: "Memory Sequence", medium: "Pencil roughs", year: "2023", color: "#9a8c7a" },
    { title: "Siren", medium: "Digital full color", year: "2023", color: "#c75555" },
    { title: "Transit", medium: "Risograph 2-color", year: "2022", color: "#e0a040" },
    { title: "Small Stories", medium: "Mini-zine", year: "2022", color: "#6c8f72" },
  ],
  Digital: [
    { title: "Render 001", medium: "Digital illustration", year: "2024", color: "#6a5acd" },
    { title: "Pattern Study", medium: "Generative art", year: "2024", color: "#2e8b72" },
    { title: "Type Specimen", medium: "Motion graphics", year: "2023", color: "#cc4a4a" },
    { title: "Glitch Portrait", medium: "Digital manipulation", year: "2023", color: "#4a80cc" },
    { title: "Color Theory App", medium: "UI/UX design", year: "2022", color: "#e88a2a" },
    { title: "Zine Layout", medium: "Editorial design", year: "2022", color: "#7a9b6a" },
  ],
  Sculpture: [
    { title: "Vessel No. 2", medium: "Stoneware, oxide glaze", year: "2024", color: "#9e8060" },
    { title: "Compression Study", medium: "Plaster and wire", year: "2024", color: "#c0bbb5" },
    { title: "Cast Series I", medium: "Bronze resin", year: "2023", color: "#b8a060" },
    { title: "Accumulation", medium: "Found objects, resin", year: "2023", color: "#88a07a" },
    { title: "Clay Study", medium: "Earthenware, slip", year: "2022", color: "#c87050" },
    { title: "Relief Panel", medium: "Wood and plaster", year: "2022", color: "#a89070" },
  ],
};

export const featuredOnHome = [
  { title: "Coastal Memory", medium: "Acrylic on canvas", year: "2024", color: "#8fb3c2", category: "Painting" },
  { title: "Figure Study, Tuesday", medium: "Charcoal on newsprint", year: "2024", color: "#c0bab4", category: "Drawing" },
  { title: "Night Market", medium: "Ink & digital tone", year: "2024", color: "#2f4858", category: "Comics" },
  { title: "Render 001", medium: "Digital illustration", year: "2024", color: "#6a5acd", category: "Digital" },
  { title: "Vessel No. 2", medium: "Stoneware, oxide glaze", year: "2024", color: "#9e8060", category: "Sculpture" },
  { title: "Still Life with Pomegranates", medium: "Oil on panel", year: "2023", color: "#b85c4a", category: "Painting" },
];
