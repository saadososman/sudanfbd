import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import type { CmsHomepage, CmsHomeSection } from "@/lib/cms/types";

export function getFallbackHomepage(locale: Locale): CmsHomepage {
  const t = dictionary[locale];
  const isArabic = locale === "ar";

  return {
    seo: {
      metaTitle: `${t.brand} | ${t.nav.home}`,
      metaDescription: t.manifesto.paragraphs[0]
    },
    sections: [
      {
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
      },
      {
        __component: "sections.stats-section",
        stats: t.stats.map((stat, index) => ({
          value: stat.split(" ")[0],
          label: stat,
          order: index
        }))
      },
      {
        __component: "sections.about-section",
        kicker: t.manifesto.kicker,
        title: t.manifesto.title,
        paragraphs: [...t.manifesto.paragraphs],
        bulletPoints: [...t.manifesto.points]
      },
      {
        __component: "sections.objectives-section",
        kicker: t.objectives.kicker,
        title: t.objectives.title,
        paragraphs: [...t.objectives.paragraphs],
        cards: t.objectives.cards.map((card, index) => ({
          title: card.title,
          text: card.text,
          order: index
        }))
      },
      {
        __component: "sections.content-teaser-section",
        kicker: isArabic ? "محاور العمل" : "Workstreams",
        title: t.sectorsTitle,
        intro: t.sectorsIntro,
        contentType: "sectors",
        limit: 6,
        viewAllLabel: isArabic ? "عرض كل القطاعات" : "View all sectors",
        viewAllPath: "sectors"
      },
      {
        __component: "sections.content-teaser-section",
        kicker: t.homeNewsKicker,
        title: t.newsTitle,
        intro: t.newsIntro,
        contentType: "news",
        limit: 3,
        viewAllLabel: t.viewAllNews,
        viewAllPath: "news"
      },
      {
        __component: "sections.cta-banner-section",
        title: isArabic
          ? "الملتقى السوداني للبناء والتنمية"
          : "Sudanese Forum for Building and Development",
        body: isArabic
          ? "يوظف الخبرات السودانية داخل البلاد وخارجها لإنتاج سياسات وخطط قابلة للتنفيذ تخدم بناء الدولة السودانية الحديثة"
          : "A national platform bringing together Sudanese expertise to prepare practical visions and plans that support reconstruction, development, and stability during the transitional period."
      }
    ] satisfies CmsHomeSection[]
  };
}
