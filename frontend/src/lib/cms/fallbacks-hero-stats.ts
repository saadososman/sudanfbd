import { getContentFallback } from "@/lib/cms/fallbacks-content";
import type { CmsHeroSection, CmsStatsSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export function getFallbackHeroSection(locale: Locale): CmsHeroSection {
  const content = getContentFallback(locale);

  return {
    __component: "sections.hero-section",
    eyebrow: content.hero.eyebrow,
    title: content.hero.title,
    body: content.hero.body,
    primaryCta: {
      label: content.hero.sectorsCta,
      path: "sectors",
      variant: "primary"
    },
    secondaryCta: {
      label: content.hero.docsCta,
      path: "documents",
      variant: "secondary",
      icon: "FileText"
    },
    insightOne: content.insightOne,
    insightTwo: content.insightTwo
  };
}

export function getFallbackStatsSection(locale: Locale): CmsStatsSection {
  const isArabic = locale === "ar";

  return {
    __component: "sections.stats-section",
    stats: [
      {
        value: "33",
        label: isArabic ? "33 قطاعا" : "33 sectors",
        order: 0
      },
      {
        value: "2",
        label: isArabic ? "لغتان" : "Two languages",
        order: 1
      },
      {
        value: "PDF",
        label: isArabic ? "مكتبة PDF" : "PDF library",
        order: 2
      },
      {
        value: isArabic ? "إدارة" : "Admin",
        label: isArabic ? "لوحة إدارة" : "Admin dashboard",
        order: 3
      }
    ]
  };
}
