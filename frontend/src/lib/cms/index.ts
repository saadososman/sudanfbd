export { fetchActiveAnnouncements } from "@/lib/cms/announcements";
export { fetchSiteConfig } from "@/lib/cms/site-config";
export { fetchHomepage } from "@/lib/cms/homepage";
export { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
export { fetchPageBySlug, isStaticPageSlug } from "@/lib/cms/pages";
export { getFallbackPage, STATIC_PAGE_SLUGS } from "@/lib/cms/fallbacks-pages";
export { buildStaticPageMetadata } from "@/lib/cms/page-metadata";
export {
  fetchSectorBySlug,
  fetchSectorIdBySlug,
  fetchSectors,
  fetchSectorSlugs,
  getFallbackSectors
} from "@/lib/cms/sectors";
export { getFallbackSiteConfig } from "@/lib/cms/fallbacks";
export type {
  CmsAboutSection,
  CmsAnnouncement,
  CmsContentSection,
  CmsHomepage,
  CmsHomeSection,
  CmsMethodologySection,
  CmsFrameworkSection,
  CmsMissionValuesSection,
  CmsNavItem,
  CmsObjectivesSectionBlock,
  CmsPage,
  CmsPageSection,
  CmsSector,
  CmsSiteConfig,
  SectorCategory
} from "@/lib/cms/types";
export type { StaticPageSlug } from "@/lib/cms/fallbacks-pages";