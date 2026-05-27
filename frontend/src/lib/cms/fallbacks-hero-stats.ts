import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import type { CmsHeroSection, CmsStatsSection } from "@/lib/cms/types";

export function getFallbackHeroSection(locale: Locale): CmsHeroSection {
  const t = dictionary[locale];
  const isArabic = locale === "ar";

  return {
    __component: "sections.hero-section",
    eyebrow: t.hero.eyebrow,
    title: t.hero.title,
    body: t.hero.body,
    primaryCta: {
      label: t.hero.sectorsCta,
      path: "sectors",
      variant: "primary"
    },
    secondaryCta: {
      label: t.hero.docsCta,
      path: "documents",
      variant: "secondary",
      icon: "FileText"
    },
    insightOne: isArabic ? "بيانات ومؤشرات" : "Data and indicators",
    insightTwo: isArabic ? "حوكمة وشراكات" : "Governance and partnerships"
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
