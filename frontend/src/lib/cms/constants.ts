export const CONTENT_PAGE_SLUGS = [
  "about",
  "objectives",
  "methodology",
  "framework"
] as const;

export const LISTING_PAGE_SLUGS = ["documents", "admin"] as const;

export const PAGE_SLUGS = [
  ...CONTENT_PAGE_SLUGS,
  ...LISTING_PAGE_SLUGS
] as const;

export type ContentPageSlug = (typeof CONTENT_PAGE_SLUGS)[number];
export type ListingPageSlug = (typeof LISTING_PAGE_SLUGS)[number];
export type PageSlug = (typeof PAGE_SLUGS)[number];

/** @deprecated Use ContentPageSlug */
export type StaticPageSlug = ContentPageSlug;

export const STATIC_PAGE_SLUGS = CONTENT_PAGE_SLUGS;
