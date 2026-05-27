type Locale = "ar" | "en";

type HeroSeed = {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: { label: string; path: string; variant: "primary" };
  secondaryCta: { label: string; path: string; variant: "secondary"; icon: string };
  insightOne: string;
  insightTwo: string;
};

type StatSeed = { value: string; label: string; order: number };

const homepageHeroStatsSeed: Record<
  Locale,
  { hero: HeroSeed; stats: StatSeed[] }
> = {
  ar: {
    hero: {
      eyebrow: "منصة وطنية للتنمية",
      title: "الملتقى السوداني للبناء والتنمية",
      body: "موقع معرفي ومؤسسي يدعم التخطيط، الشراكات، ونشر الوثائق التنموية عبر قطاعات السودان الحيوية.",
      primaryCta: {
        label: "استعرض القطاعات",
        path: "sectors",
        variant: "primary"
      },
      secondaryCta: {
        label: "المكتبة الرقمية",
        path: "documents",
        variant: "secondary",
        icon: "FileText"
      },
      insightOne: "بيانات ومؤشرات",
      insightTwo: "حوكمة وشراكات"
    },
    stats: [
      { value: "33", label: "33 قطاعا", order: 0 },
      { value: "2", label: "لغتان", order: 1 },
      { value: "PDF", label: "مكتبة PDF", order: 2 },
      { value: "إدارة", label: "لوحة إدارة", order: 3 }
    ]
  },
  en: {
    hero: {
      eyebrow: "National development platform",
      title: "Sudanese Forum for Building and Development",
      body: "An institutional knowledge platform for planning, partnerships, and development publications across Sudan's priority sectors.",
      primaryCta: {
        label: "Explore sectors",
        path: "sectors",
        variant: "primary"
      },
      secondaryCta: {
        label: "Digital library",
        path: "documents",
        variant: "secondary",
        icon: "FileText"
      },
      insightOne: "Data and indicators",
      insightTwo: "Governance and partnerships"
    },
    stats: [
      { value: "33", label: "33 sectors", order: 0 },
      { value: "2", label: "Two languages", order: 1 },
      { value: "PDF", label: "PDF library", order: 2 },
      { value: "Admin", label: "Admin dashboard", order: 3 }
    ]
  }
};

function hasHeroOrStatsSections(sections: unknown) {
  if (!Array.isArray(sections)) return false;

  return sections.some((section) => {
    if (!section || typeof section !== "object") return false;
    const component = (section as { __component?: string }).__component;
    return (
      component === "sections.hero-section" || component === "sections.stats-section"
    );
  });
}

export async function seedHomepageHeroStats(strapi: {
  documents: (uid: string) => {
    findFirst: (params: Record<string, unknown>) => Promise<{ sections?: unknown } | null>;
    create: (params: Record<string, unknown>) => Promise<unknown>;
    update: (params: Record<string, unknown>) => Promise<unknown>;
    publish: (params: Record<string, unknown>) => Promise<unknown>;
  };
}) {
  const homepage = strapi.documents("api::homepage.homepage");

  for (const locale of ["ar", "en"] as const) {
    const existing = await homepage.findFirst({
      locale,
      status: "published"
    });

    const seed = homepageHeroStatsSeed[locale];
    const sections = [
      {
        __component: "sections.hero-section",
        ...seed.hero
      },
      {
        __component: "sections.stats-section",
        stats: seed.stats
      }
    ];

    if (existing?.sections && hasHeroOrStatsSections(existing.sections)) {
      continue;
    }

    if (existing) {
      const updated = await homepage.update({
        documentId: (existing as { documentId?: string }).documentId,
        locale,
        data: { sections }
      });

      const documentId =
        (updated as { documentId?: string }).documentId ??
        (existing as { documentId?: string }).documentId;

      if (documentId) {
        await homepage.publish({ documentId, locale });
      }

      continue;
    }

    const created = await homepage.create({
      locale,
      data: { sections }
    });

    const documentId = (created as { documentId?: string }).documentId;
    if (documentId) {
      await homepage.publish({ documentId, locale });
    }
  }
}
