export const fallbackDocuments = [
  {
    id: "sample-policy",
    title: "Sudan Development Priorities Brief",
    sector: "research",
    locale: "en",
    url: "/sample-development-brief.pdf",
    publishedAt: "2026-01-01"
  }
] as const;

export function getFallbackDocuments(locale: "ar" | "en") {
  if (locale === "ar") return [];

  return [...fallbackDocuments];
}
