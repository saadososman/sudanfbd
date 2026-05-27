export { fetchActiveAnnouncements } from "@/lib/cms/announcements";
export {
  fetchArticles,
  fetchArticle,
  fetchLatestArticles,
  formatArticleDate
} from "@/lib/cms/articles";
export {
  fetchDocuments,
  getFallbackDocuments
} from "@/lib/cms/documents";
export { uploadDocumentWithToken } from "@/lib/cms/strapi-admin";
export { fetchSiteConfig } from "@/lib/cms/site-config";
export { fetchHomepage } from "@/lib/cms/homepage";
export { getFallbackHomepage } from "@/lib/cms/fallbacks-homepage";
export {
  getFallbackHeroSection,
  getFallbackStatsSection
} from "@/lib/cms/fallbacks-hero-stats";
export { mergeHeroSection, mergeStatsSection } from "@/lib/cms/hero-stats-merge";
export { mergeHomepageWithCms } from "@/lib/cms/homepage-merge";
export {
  getFallbackAboutSection,
  getFallbackFrameworkSection,
  getFallbackMethodologySection,
  getFallbackMissionValuesSection,
  getFallbackObjectivesSection
} from "@/lib/cms/fallbacks-content-sections";
export { mergePageWithCms } from "@/lib/cms/page-merge";
export { mergeSiteConfigWithCms, mergeNavigation } from "@/lib/cms/site-config-merge";
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