import type { Locale } from "@/lib/i18n";
import type { SectorCategory } from "@/lib/cms/types";

const categories: Record<SectorCategory, { ar: string; en: string }> = {
  economic: { ar: "الاقتصاد والإنتاج", en: "Economy and Production" },
  services: { ar: "الخدمات الأساسية", en: "Essential Services" },
  governance: { ar: "الحكم والمؤسسات", en: "Governance and Institutions" },
  infrastructure: {
    ar: "البنية التحتية والتحول الرقمي",
    en: "Infrastructure and Digital Transformation"
  },
  social: { ar: "المجتمع والسلام", en: "Society and Peace" }
};

export function categoryLabel(category: SectorCategory, locale: Locale) {
  return categories[category][locale];
}
