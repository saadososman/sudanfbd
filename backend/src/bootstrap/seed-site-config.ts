type Locale = "ar" | "en";

type NavSeed = {
  label: string;
  path: string;
  icon?: string;
  order: number;
  isVisible: boolean;
  openInNewTab: boolean;
};

const siteConfigSeed: Record<
  Locale,
  {
    siteName: string;
    shortName: string;
    brandSubtitle: string;
    footerTagline: string;
    footerNote: string;
    navigation: NavSeed[];
  }
> = {
  ar: {
    siteName: "الملتقى السوداني للبناء والتنمية",
    shortName: "الملتقى السوداني للبناء والتنمية",
    brandSubtitle: "بناء وتنمية",
    footerTagline:
      "موقع معرفي ومؤسسي يدعم التخطيط، الشراكات، ونشر الوثائق التنموية عبر قطاعات السودان الحيوية.",
    footerNote: "ألوان مستوحاة من علم السودان وهوية البناء المؤسسي.",
    navigation: [
      { label: "الرئيسية", path: "", order: 0, isVisible: true, openInNewTab: false },
      { label: "عن الملتقى", path: "about", order: 1, isVisible: true, openInNewTab: false },
      { label: "الأهداف", path: "objectives", order: 2, isVisible: true, openInNewTab: false },
      { label: "القطاعات", path: "sectors", order: 3, isVisible: true, openInNewTab: false },
      { label: "منهجية العمل", path: "methodology", order: 4, isVisible: true, openInNewTab: false },
      { label: "إطار التخطيط", path: "framework", order: 5, isVisible: true, openInNewTab: false },
      { label: "الأخبار", path: "news", icon: "Newspaper", order: 6, isVisible: true, openInNewTab: false },
      { label: "المكتبة", path: "documents", icon: "FileText", order: 7, isVisible: true, openInNewTab: false },
      { label: "الإدارة", path: "admin", icon: "LayoutDashboard", order: 8, isVisible: true, openInNewTab: false }
    ]
  },
  en: {
    siteName: "Sudanese Forum for Building and Development",
    shortName: "Sudanese Forum for Building and Development",
    brandSubtitle: "Building & Development",
    footerTagline:
      "An institutional knowledge platform for planning, partnerships, and development publications across Sudan's priority sectors.",
    footerNote:
      "Colors inspired by Sudan's flag and institutional development identity.",
    navigation: [
      { label: "Home", path: "", order: 0, isVisible: true, openInNewTab: false },
      { label: "About", path: "about", order: 1, isVisible: true, openInNewTab: false },
      { label: "Objectives", path: "objectives", order: 2, isVisible: true, openInNewTab: false },
      { label: "Sectors", path: "sectors", order: 3, isVisible: true, openInNewTab: false },
      { label: "Methodology", path: "methodology", order: 4, isVisible: true, openInNewTab: false },
      { label: "Planning Framework", path: "framework", order: 5, isVisible: true, openInNewTab: false },
      { label: "News", path: "news", icon: "Newspaper", order: 6, isVisible: true, openInNewTab: false },
      { label: "Library", path: "documents", icon: "FileText", order: 7, isVisible: true, openInNewTab: false },
      { label: "Admin", path: "admin", icon: "LayoutDashboard", order: 8, isVisible: true, openInNewTab: false }
    ]
  }
};

export async function seedSiteConfig(strapi: {
  documents: (uid: string) => {
    findFirst: (params: Record<string, unknown>) => Promise<{ siteName?: string } | null>;
    create: (params: Record<string, unknown>) => Promise<unknown>;
    update: (params: Record<string, unknown>) => Promise<unknown>;
    publish: (params: Record<string, unknown>) => Promise<unknown>;
  };
}) {
  const siteConfig = strapi.documents("api::site-config.site-config");

  for (const locale of ["ar", "en"] as const) {
    const existing = await siteConfig.findFirst({ locale, status: "published" });
    const seed = siteConfigSeed[locale];

    if (existing?.siteName?.trim()) continue;

    if (existing) {
      const documentId = (existing as { documentId?: string }).documentId;
      if (!documentId) continue;

      await siteConfig.update({ documentId, locale, data: seed });
      await siteConfig.publish({ documentId, locale });
      continue;
    }

    const created = await siteConfig.create({ locale, data: seed });
    const documentId = (created as { documentId?: string }).documentId;
    if (documentId) {
      await siteConfig.publish({ documentId, locale });
    }
  }
}
