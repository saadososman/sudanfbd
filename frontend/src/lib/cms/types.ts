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

export type CmsSiteConfig = {
  siteName: string;
  shortName: string;
  brandSubtitle: string;
  footerTagline: string;
  footerNote: string;
  logoUrl?: string;
  navigation: CmsNavItem[];
  defaultSeo?: CmsSeo;
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
  | CmsRichContentSection
  | CmsStatsSection
  | CmsContentTeaserSection
  | CmsCtaBannerSection;

export type CmsHomepage = {
  seo?: CmsSeo;
  sections: CmsHomeSection[];
};

export type CmsPageSection =
  | CmsRichContentSection
  | CmsStatsSection
  | CmsContentTeaserSection
  | CmsCtaBannerSection;

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
  categoryLabel: string;
  icon: string;
  coverImageUrl?: string;
  order: number;
};
