import type { Locale } from "@/lib/i18n";

export type CmsSeo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
};

export type CmsNavItem = {
  label: string;
  path: string;
  icon?: string;
  order: number;
  isVisible: boolean;
  openInNewTab: boolean;
};

export type CmsSocialPlatform =
  | "x"
  | "facebook"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "other";

export type CmsSocialLink = {
  platform: CmsSocialPlatform;
  url: string;
  label?: string;
  order: number;
  isVisible: boolean;
  openInNewTab: boolean;
};

export type CmsUiLabels = {
  search: string;
  newsSearch: string;
  newsLabel: string;
  noNews: string;
  readArticle: string;
  publishedOn: string;
  backToNews: string;
  readMore: string;
  download: string;
  noDocs: string;
  upload: string;
  publish: string;
  formTitle: string;
  sector: string;
  file: string;
  formLocale: string;
  statusReady: string;
  sectorsSearch: string;
  sectorsEmpty: string;
  viewSector: string;
  adminIntegrationTitle: string;
  adminIntegrationBody: string;
  uploadDisabled: string;
  uploading: string;
  uploadSuccess: string;
  uploadFailed: string;
  sectorScopeKicker: string;
  sectorScopeTitle: string;
  categoryEconomic: string;
  categoryServices: string;
  categoryGovernance: string;
  categoryInfrastructure: string;
  categorySocial: string;
};

export type CmsSiteConfig = {
  siteName: string;
  shortName: string;
  brandSubtitle: string;
  footerTagline: string;
  footerNote: string;
  logoUrl?: string;
  navigation: CmsNavItem[];
  socialLinks: CmsSocialLink[];
  defaultSeo?: CmsSeo;
  uiLabels: CmsUiLabels;
};

export type CmsCtaLink = {
  label: string;
  path: string;
  variant?: "primary" | "secondary" | "light";
  icon?: string;
};

export type CmsTextCard = {
  title: string;
  text?: string;
  icon?: string;
  order?: number;
};

export type CmsStatItem = {
  value: string;
  label: string;
  order?: number;
};

export type CmsHeroSection = {
  __component: "sections.hero-section";
  eyebrow?: string;
  title: string;
  body?: string;
  primaryCta?: CmsCtaLink;
  secondaryCta?: CmsCtaLink;
  imageUrl?: string;
  insightOne?: string;
  insightTwo?: string;
};

export type CmsAboutSection = {
  __component: "sections.about-section";
  kicker?: string;
  title: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  compact?: boolean;
};

export type CmsObjectivesSectionBlock = {
  __component: "sections.objectives-section";
  kicker?: string;
  title: string;
  paragraphs?: string[];
  cards: CmsTextCard[];
};

export type CmsMethodologySection = {
  __component: "sections.methodology-section";
  cards: CmsTextCard[];
  phasesTitle?: string;
  phases?: string[];
};

export type CmsFrameworkSection = {
  __component: "sections.framework-section";
  title?: string;
  items: string[];
};

export type CmsMissionValuesSection = {
  __component: "sections.mission-values-section";
  missionTitle: string;
  missionText: string;
  valuesTitle?: string;
  values: string[];
};

export type CmsRichContentSection = {
  __component: "sections.rich-content-section";
  kicker?: string;
  title: string;
  intro?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  cards?: CmsTextCard[];
  items?: string[];
  phases?: string[];
};

export type CmsStatsSection = {
  __component: "sections.stats-section";
  stats: CmsStatItem[];
};

export type CmsContentTeaserSection = {
  __component: "sections.content-teaser-section";
  kicker?: string;
  title: string;
  intro?: string;
  contentType: "news" | "sectors" | "documents";
  limit?: number;
  viewAllLabel?: string;
  viewAllPath?: string;
};

export type CmsCtaBannerSection = {
  __component: "sections.cta-banner-section";
  title: string;
  body?: string;
  cta?: CmsCtaLink;
};

export type CmsHomeSection =
  | CmsHeroSection
  | CmsStatsSection
  | CmsAboutSection
  | CmsObjectivesSectionBlock
  | CmsMethodologySection
  | CmsFrameworkSection
  | CmsRichContentSection
  | CmsContentTeaserSection
  | CmsCtaBannerSection;

export type CmsPageSection =
  | CmsAboutSection
  | CmsObjectivesSectionBlock
  | CmsMethodologySection
  | CmsFrameworkSection
  | CmsMissionValuesSection
  | CmsRichContentSection
  | CmsStatsSection
  | CmsContentTeaserSection
  | CmsCtaBannerSection;

export type CmsContentSection =
  | CmsAboutSection
  | CmsObjectivesSectionBlock
  | CmsMethodologySection
  | CmsFrameworkSection
  | CmsMissionValuesSection
  | CmsRichContentSection
  | CmsStatsSection
  | CmsContentTeaserSection
  | CmsCtaBannerSection;

export type CmsHomepage = {
  seo?: CmsSeo;
  sections: CmsHomeSection[];
};

export type CmsPage = {
  slug: string;
  title: string;
  intro?: string;
  seo?: CmsSeo;
  sections: CmsPageSection[];
};

export type CmsAnnouncement = {
  id: string;
  title: string;
  message?: string;
  linkLabel?: string;
  linkPath?: string;
  variant: "info" | "success" | "warning" | "urgent";
  priority: number;
};

export type CmsLocale = Locale;

export type SectorCategory =
  | "economic"
  | "services"
  | "governance"
  | "infrastructure"
  | "social";

export type CmsSector = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  outputs: string[];
  category: SectorCategory;
  icon: string;
  coverImageUrl?: string;
  order: number;
  updatedAt?: string;
  publishedAt?: string;
  fetchedFromUrl?: string;
};
