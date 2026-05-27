import type { Locale } from "./i18n";

export type SectorCategory = "economic" | "services" | "governance" | "infrastructure" | "social";

export type Sector = {
  slug: string;
  category: SectorCategory;
  icon: string;
  ar: { title: string; summary: string; body: string; outputs: string[] };
  en: { title: string; summary: string; body: string; outputs: string[] };
};

const categories: Record<SectorCategory, { ar: string; en: string }> = {
  economic: { ar: "╪º┘ä╪º┘é╪¬╪╡╪º╪» ┘ê╪º┘ä╪Ñ┘å╪¬╪º╪¼", en: "Economy and Production" },
  services: { ar: "╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä╪ú╪│╪º╪│┘è╪⌐", en: "Essential Services" },
  governance: { ar: "╪º┘ä╪¡┘â┘à ┘ê╪º┘ä┘à╪ñ╪│╪│╪º╪¬", en: "Governance and Institutions" },
  infrastructure: { ar: "╪º┘ä╪¿┘å┘è╪⌐ ╪º┘ä╪¬╪¡╪¬┘è╪⌐ ┘ê╪º┘ä╪¬╪¡┘ê┘ä ╪º┘ä╪▒┘é┘à┘è", en: "Infrastructure and Digital Transformation" },
  social: { ar: "╪º┘ä┘à╪¼╪¬┘à╪╣ ┘ê╪º┘ä╪│┘ä╪º┘à", en: "Society and Peace" }
};

const charterSectors: Array<{ slug: string; category: SectorCategory; icon: string; ar: string; en: string }> = [
  { slug: "economy-public-finance-investment-trade", category: "economic", icon: "chart", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪º┘é╪¬╪╡╪º╪» ┘ê╪º┘ä┘à╪º┘ä┘è╪⌐ ╪º┘ä╪╣╪º┘à╪⌐ ┘ê╪º┘ä╪º╪│╪¬╪½┘à╪º╪▒ ┘ê╪º┘ä╪¬╪¼╪º╪▒╪⌐ (┘è╪┤┘à┘ä ╪º┘ä╪º┘é╪¬╪╡╪º╪» ╪º┘ä╪▒┘é┘à┘è ┘ê╪º┘ä╪¬╪¼╪º╪▒╪⌐ ╪º┘ä╪Ñ┘ä┘â╪¬╪▒┘ê┘å┘è╪⌐)", en: "Economy, Public Finance, Investment, and Trade Sector (including Digital Economy and E-Commerce)" },
  { slug: "banking-financial-services", category: "economic", icon: "bank", ar: "┘é╪╖╪º╪╣ ╪º┘ä┘à╪╡╪º╪▒┘ü ┘ê╪º┘ä╪«╪»┘à╪º╪¬ ╪º┘ä┘à╪º┘ä┘è╪⌐", en: "Banking and Financial Services Sector" },
  { slug: "industries-industrial-production", category: "economic", icon: "factory", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╡┘å╪º╪╣╪º╪¬ ┘ê╪º┘ä╪Ñ┘å╪¬╪º╪¼ ╪º┘ä╪╡┘å╪º╪╣┘è (┘è╪┤┘à┘ä ╪º┘ä╪╡┘å╪º╪╣╪º╪¬ ╪º┘ä╪¬╪¡┘ê┘è┘ä┘è╪⌐ ┘ê╪º┘ä┘é┘è┘à╪⌐ ╪º┘ä┘à╪╢╪º┘ü╪⌐)", en: "Industries and Industrial Production Sector (including Manufacturing and Value Addition)" },
  { slug: "entrepreneurship-smes", category: "economic", icon: "blocks", ar: "┘é╪╖╪º╪╣ ╪▒┘è╪º╪»╪⌐ ╪º┘ä╪ú╪╣┘à╪º┘ä ┘ê╪º┘ä┘à╪┤╪▒┘ê╪╣╪º╪¬ ╪º┘ä╪╡╪║┘è╪▒╪⌐ ┘ê╪º┘ä┘à╪¬┘ê╪│╪╖╪⌐", en: "Entrepreneurship and SMEs Sector" },
  { slug: "food-security-supply-chains", category: "economic", icon: "sprout", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪ú┘à┘å ╪º┘ä╪║╪░╪º╪ª┘è ┘ê╪│┘ä╪º╪│┘ä ╪º┘ä╪Ñ┘à╪»╪º╪»", en: "Food Security and Supply Chains Sector" },
  { slug: "agriculture-development", category: "economic", icon: "sprout", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪▓╪▒╪º╪╣╪⌐ ┘ê╪º┘ä╪¬┘å┘à┘è╪⌐ ╪º┘ä╪▓╪▒╪º╪╣┘è╪⌐ (┘è╪┤┘à┘ä ╪º┘ä╪¬╪«╪▓┘è┘å╪î ╪º┘ä┘å┘é┘ä╪î ╪¬┘é┘ä┘è┘ä ╪º┘ä┘ü╪º┘é╪»╪î ┘ê╪▒╪¿╪╖ ╪º┘ä╪Ñ┘å╪¬╪º╪¼ ╪¿╪º┘ä╪ú╪│┘ê╪º┘é)", en: "Agriculture and Agricultural Development Sector (including Storage, Transport, Loss Reduction, and Market Linkages)" },
  { slug: "livestock", category: "economic", icon: "leaf", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪½╪▒┘ê╪⌐ ╪º┘ä╪¡┘è┘ê╪º┘å┘è╪⌐", en: "Livestock Sector" },
  { slug: "oil-mining", category: "economic", icon: "fuel", ar: "┘é╪╖╪º╪╣ ╪º┘ä┘å┘ü╪╖ ┘ê╪º┘ä╪¬╪╣╪»┘è┘å", en: "Oil and Mining Sector" },
  { slug: "water-resources-irrigation", category: "services", icon: "waves", ar: "┘é╪╖╪º╪╣ ╪º┘ä┘à┘ê╪º╪▒╪» ╪º┘ä┘à╪º╪ª┘è╪⌐ ┘ê╪º┘ä╪▒┘è", en: "Water Resources and Irrigation Sector" },
  { slug: "electricity-renewable-energy", category: "infrastructure", icon: "bolt", ar: "┘é╪╖╪º╪╣ ╪º┘ä┘â┘ç╪▒╪¿╪º╪í ┘ê╪º┘ä╪╖╪º┘é╪⌐ ╪º┘ä┘à╪¬╪¼╪»╪»╪⌐", en: "Electricity and Renewable Energy Sector" },
  { slug: "infrastructure-roads-bridges-transport", category: "infrastructure", icon: "road", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¿┘å┘è╪⌐ ╪º┘ä╪¬╪¡╪¬┘è╪⌐ (╪º┘ä╪╖╪▒┘é ┘ê╪º┘ä╪¼╪│┘ê╪▒ ┘ê╪º┘ä┘å┘é┘ä ┘ê╪º┘ä┘à┘ê╪º╪╡┘ä╪º╪¬)", en: "Infrastructure Sector (Roads, Bridges, Transport, and Mobility)" },
  { slug: "aviation-ports-maritime-river-transport", category: "infrastructure", icon: "globe", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╖┘è╪▒╪º┘å ┘ê╪º┘ä┘à┘ê╪º┘å╪ª ┘ê╪º┘ä┘å┘é┘ä ╪º┘ä╪¿╪¡╪▒┘è ┘ê╪º┘ä┘å┘ç╪▒┘è", en: "Aviation, Ports, Maritime, and River Transport Sector" },
  { slug: "telecommunications-digital-government-digital-infrastructure", category: "infrastructure", icon: "monitor", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪º╪¬╪╡╪º┘ä╪º╪¬ ┘ê╪º┘ä╪¡┘â┘ê┘à╪⌐ ╪º┘ä╪▒┘é┘à┘è╪⌐ ┘ê╪º┘ä╪¿┘å┘è╪⌐ ╪º┘ä╪▒┘é┘à┘è╪⌐", en: "Telecommunications, Digital Government, and Digital Infrastructure Sector" },
  { slug: "data-statistics-information", category: "governance", icon: "clipboard", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¿┘è╪º┘å╪º╪¬ ┘ê╪º┘ä╪Ñ╪¡╪╡╪º╪í ┘ê╪º┘ä┘à╪╣┘ä┘ê┘à╪º╪¬", en: "Data, Statistics, and Information Sector" },
  { slug: "health", category: "services", icon: "heart", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╡╪¡╪⌐", en: "Health Sector" },
  { slug: "drinking-water", category: "services", icon: "droplet", ar: "┘é╪╖╪º╪╣ ┘à┘è╪º┘ç ╪º┘ä╪┤╪▒╪¿", en: "Drinking Water Sector" },
  { slug: "education-research", category: "services", icon: "graduation", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¬╪╣┘ä┘è┘à (╪º┘ä╪╣╪º┘à ┘ê╪º┘ä┘ü┘å┘è ┘ê╪º┘ä┘à┘ç┘å┘è ┘ê╪º┘ä╪╣╪º┘ä┘è ┘ê╪º┘ä╪¿╪¡╪½ ╪º┘ä╪╣┘ä┘à┘è)", en: "Education Sector (General, Technical, Vocational, Higher Education, and Scientific Research)" },
  { slug: "governance-administrative-reform-strategy-policy-quality", category: "governance", icon: "clipboard", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¡┘â┘à ┘ê╪º┘ä╪Ñ╪╡┘ä╪º╪¡ ╪º┘ä╪Ñ╪»╪º╪▒┘è ┘ê╪º┘ä╪¬╪«╪╖┘è╪╖ ╪º┘ä╪º╪│╪¬╪▒╪º╪¬┘è╪¼┘è ┘ê╪º┘ä╪│┘è╪º╪│╪º╪¬ ╪º┘ä╪╣╪º┘à╪⌐ ┘ê╪º┘ä╪¼┘ê╪»╪⌐ ┘ê╪º┘ä┘à╪╣╪º┘è┘è╪▒", en: "Governance, Administrative Reform, Strategic Planning, Public Policy, Quality, and Standards Sector" },
  { slug: "legal-constitutional-transitional-justice", category: "governance", icon: "scale", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪Ñ╪╡┘ä╪º╪¡╪º╪¬ ╪º┘ä┘é╪º┘å┘ê┘å┘è╪⌐ ┘ê╪º┘ä╪»╪│╪¬┘ê╪▒ ┘ê╪º┘ä╪╣╪»╪º┘ä╪⌐ ╪º┘ä╪º┘å╪¬┘é╪º┘ä┘è╪⌐", en: "Legal Reforms, Constitution, and Transitional Justice Sector" },
  { slug: "security-defense", category: "governance", icon: "shield-check", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪ú┘à┘å ┘ê╪º┘ä╪»┘ü╪º╪╣", en: "Security and Defense Sector" },
  { slug: "housing-urban-rural-development", category: "infrastructure", icon: "building", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪Ñ╪│┘â╪º┘å ┘ê╪º┘ä╪¬╪«╪╖┘è╪╖ ╪º┘ä╪╣┘à╪▒╪º┘å┘è ┘ê╪º┘ä╪¬┘å┘à┘è╪⌐ ╪º┘ä╪▒┘è┘ü┘è╪⌐ ┘ê╪º┘ä╪¡╪╢╪▒┘è╪⌐ ╪º┘ä┘à╪¬┘â╪º┘à┘ä╪⌐", en: "Housing, Urban Planning, and Integrated Rural and Urban Development Sector" },
  { slug: "social-development-social-support", category: "social", icon: "handshake", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¬┘å┘à┘è╪⌐ ╪º┘ä╪º╪¼╪¬┘à╪º╪╣┘è╪⌐ ┘ê╪º┘ä╪»╪╣┘à ╪º┘ä╪º╪¼╪¬┘à╪º╪╣┘è", en: "Social Development and Social Support Sector" },
  { slug: "media-culture-arts", category: "social", icon: "palette", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪Ñ╪╣┘ä╪º┘à ┘ê╪º┘ä╪½┘é╪º┘ü╪⌐ ┘ê╪º┘ä┘ü┘å┘ê┘å", en: "Media, Culture, and Arts Sector" },
  { slug: "foreign-relations-cooperation-migration-diaspora", category: "governance", icon: "globe", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╣┘ä╪º┘é╪º╪¬ ╪º┘ä╪«╪º╪▒╪¼┘è╪⌐ ┘ê╪º┘ä╪¬╪╣╪º┘ê┘å ╪º┘ä╪»┘ê┘ä┘è ┘ê╪º┘ä┘ç╪¼╪▒╪⌐ ┘ê╪┤╪ñ┘ê┘å ╪º┘ä┘à╪║╪¬╪▒╪¿┘è┘å", en: "Foreign Relations, International Cooperation, Migration, and Diaspora Affairs Sector" },
  { slug: "environment", category: "services", icon: "leaf", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪¿┘è╪ª╪⌐", en: "Environment Sector" },
  { slug: "peace-national-reconciliation", category: "social", icon: "handshake", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪│┘ä╪º┘à ┘ê╪º┘ä┘à╪╡╪º┘ä╪¡╪⌐ ╪º┘ä┘ê╪╖┘å┘è╪⌐", en: "Peace and National Reconciliation Sector" },
  { slug: "disaster-emergency-management", category: "services", icon: "shield", ar: "┘é╪╖╪º╪╣ ╪Ñ╪»╪º╪▒╪⌐ ╪º┘ä┘â┘ê╪º╪▒╪½ ┘ê╪º┘ä╪╖┘ê╪º╪▒╪ª", en: "Disaster and Emergency Management Sector" },
  { slug: "women-issues", category: "social", icon: "network", ar: "┘é╪╖╪º╪╣ ┘é╪╢╪º┘è╪º ╪º┘ä┘à╪▒╪ú╪⌐", en: "WomenΓÇÖs Issues Sector" },
  { slug: "anti-corruption", category: "governance", icon: "scale", ar: "┘é╪╖╪º╪╣ ┘à┘â╪º┘ü╪¡╪⌐ ╪º┘ä┘ü╪│╪º╪»", en: "Anti-Corruption Sector" },
  { slug: "youth-issues", category: "social", icon: "network", ar: "┘é╪╖╪º╪╣ ┘é╪╢╪º┘è╪º ╪º┘ä╪┤╪¿╪º╪¿", en: "Youth Issues Sector" },
  { slug: "press", category: "social", icon: "palette", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╡╪¡╪º┘ü╪⌐", en: "Press Sector" },
  { slug: "sanitation-rainwater-drainage", category: "infrastructure", icon: "waves", ar: "┘é╪╖╪º╪╣ ╪º┘ä╪╡╪▒┘ü ╪º┘ä╪╡╪¡┘è ┘ê╪¬╪╡╪▒┘è┘ü ┘à┘è╪º┘ç ╪º┘ä╪ú┘à╪╖╪º╪▒", en: "Sanitation and Rainwater Drainage Sector" },
  { slug: "civil-society-ngos", category: "social", icon: "network", ar: "┘é╪╖╪º╪╣ ╪º┘ä┘à╪¼╪¬┘à╪╣ ╪º┘ä┘à╪»┘å┘è ┘ê╪º┘ä┘à┘å╪╕┘à╪º╪¬ ╪║┘è╪▒ ╪º┘ä╪¡┘â┘ê┘à┘è╪⌐", en: "Civil Society and Non-Governmental Organizations Sector" }
];

function buildSummary(title: string, locale: Locale) {
  return locale === "ar"
    ? `${title} ╪╢┘à┘å ┘é╪╖╪º╪╣╪º╪¬ ╪º┘ä┘à┘è╪½╪º┘é╪î ┘ê┘è╪╣┘à┘ä ╪╣┘ä┘ë ╪Ñ┘å╪¬╪º╪¼ ┘é╪▒╪º╪▒╪º╪¬ ╪¬┘å┘ü┘è╪░┘è╪⌐ ┘ê╪«╪╖╪╖ ┘é╪╡┘è╪▒╪⌐ ┘ê┘à╪¬┘ê╪│╪╖╪⌐ ╪º┘ä┘à╪»┘ë ┘é╪º╪¿┘ä╪⌐ ┘ä┘ä╪¬╪╖╪¿┘è┘é.`
    : `${title} is one of the charter sectors, focused on executive decisions and short- to medium-term implementable plans.`;
}

function buildBody(title: string, locale: Locale) {
  return locale === "ar"
    ? `┘è╪▒┘â╪▓ ${title} ╪╣┘ä┘ë ╪¬╪¡┘ä┘è┘ä ╪º┘ä╪ú┘ê┘ä┘ê┘è╪º╪¬ ╪º┘ä╪╣╪º╪¼┘ä╪⌐╪î ╪Ñ╪╣╪»╪º╪» ╪¡╪▓┘à╪⌐ ┘é╪▒╪º╪▒╪º╪¬ ╪¬┘å┘ü┘è╪░┘è╪⌐ ┘ä┘ä┘à╪ª╪⌐ ┘è┘ê┘à ╪º┘ä╪ú┘ê┘ä┘ë╪î ┘ê╪¿┘å╪º╪í ╪«╪╖╪╖ ┘à╪▒╪¡┘ä┘è╪⌐ ┘ê┘ü┘é ╪Ñ╪╖╪º╪▒ ┘à┘ê╪¡╪» ┘è╪┤┘à┘ä ╪º┘ä╪ú┘ç╪»╪º┘ü╪î ╪ó┘ä┘è╪º╪¬ ╪º┘ä╪¬┘å┘ü┘è╪░╪î ╪º┘ä╪¼┘ç╪º╪¬ ╪º┘ä┘à╪│╪ñ┘ê┘ä╪⌐╪î ┘à╪ñ╪┤╪▒╪º╪¬ ╪º┘ä╪ú╪»╪º╪í╪î ╪º┘ä┘à╪«╪º╪╖╪▒╪î ┘à╪╡╪º╪»╪▒ ╪º┘ä╪¬┘à┘ê┘è┘ä╪î ┘ê╪º┘ä┘à╪«╪▒╪¼╪º╪¬ ╪º┘ä┘à╪¬┘ê┘é╪╣╪⌐.`
    : `${title} focuses on urgent priorities, preparing a package of executive decisions for the first 100 days, and building phased plans using a unified framework covering objectives, implementation mechanisms, responsible entities, KPIs, risks, funding sources, and expected outputs.`;
}

export const sectors: Sector[] = charterSectors.map((item) => ({
  slug: item.slug,
  category: item.category,
  icon: item.icon,
  ar: {
    title: item.ar,
    summary: buildSummary(item.ar, "ar"),
    body: buildBody(item.ar, "ar"),
    outputs: ["┘é╪▒╪º╪▒╪º╪¬ ╪¬┘å┘ü┘è╪░┘è╪⌐ ┘ä┘ä┘à╪ª╪⌐ ┘è┘ê┘à", "╪«╪╖╪⌐ ┘é╪╡┘è╪▒╪⌐ ┘ê┘à╪¬┘ê╪│╪╖╪⌐ ╪º┘ä┘à╪»┘ë", "┘à╪ñ╪┤╪▒╪º╪¬ ╪ú╪»╪º╪í ┘ê┘à╪«╪º╪╖╪▒", "┘à╪«╪▒╪¼╪º╪¬ ┘é╪º╪¿┘ä╪⌐ ┘ä┘ä╪º╪│╪¬╪«╪»╪º┘à"]
  },
  en: {
    title: item.en,
    summary: buildSummary(item.en, "en"),
    body: buildBody(item.en, "en"),
    outputs: ["100-day executive decisions", "Short- and medium-term plan", "KPIs and risks", "Usable outputs"]
  }
}));

export function getSector(slug: string) {
  return sectors.find((sector) => sector.slug === slug);
}

export function sectorText(sector: Sector, locale: Locale) {
  return sector[locale];
}

export function categoryLabel(category: SectorCategory, locale: Locale) {
  return categories[category][locale];
}

export const sectorCategories = Object.entries(categories).map(([value, label]) => ({
  value: value as SectorCategory,
  label
}));
