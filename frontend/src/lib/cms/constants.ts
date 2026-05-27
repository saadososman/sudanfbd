export const STATIC_PAGE_SLUGS = [
  "about",
  "objectives",
  "methodology",
  "framework"
] as const;

export type StaticPageSlug = (typeof STATIC_PAGE_SLUGS)[number];
