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
  economic: { ar: "الاقتصاد والإنتاج", en: "Economy and Production" },
  services: { ar: "الخدمات الأساسية", en: "Essential Services" },
  governance: { ar: "الحكم والمؤسسات", en: "Governance and Institutions" },
  infrastructure: { ar: "البنية التحتية والتحول الرقمي", en: "Infrastructure and Digital Transformation" },
  social: { ar: "المجتمع والسلام", en: "Society and Peace" }
};

const charterSectors: Array<{ slug: string; category: SectorCategory; icon: string; ar: string; en: string }> = [
  { slug: "economy-public-finance-investment-trade", category: "economic", icon: "chart", ar: "قطاع الاقتصاد والمالية العامة والاستثمار والتجارة (يشمل الاقتصاد الرقمي والتجارة الإلكترونية)", en: "Economy, Public Finance, Investment, and Trade Sector (including Digital Economy and E-Commerce)" },
  { slug: "banking-financial-services", category: "economic", icon: "bank", ar: "قطاع المصارف والخدمات المالية", en: "Banking and Financial Services Sector" },
  { slug: "industries-industrial-production", category: "economic", icon: "factory", ar: "قطاع الصناعات والإنتاج الصناعي (يشمل الصناعات التحويلية والقيمة المضافة)", en: "Industries and Industrial Production Sector (including Manufacturing and Value Addition)" },
  { slug: "entrepreneurship-smes", category: "economic", icon: "blocks", ar: "قطاع ريادة الأعمال والمشروعات الصغيرة والمتوسطة", en: "Entrepreneurship and SMEs Sector" },
  { slug: "food-security-supply-chains", category: "economic", icon: "sprout", ar: "قطاع الأمن الغذائي وسلاسل الإمداد", en: "Food Security and Supply Chains Sector" },
  { slug: "agriculture-development", category: "economic", icon: "sprout", ar: "قطاع الزراعة والتنمية الزراعية (يشمل التخزين، النقل، تقليل الفاقد، وربط الإنتاج بالأسواق)", en: "Agriculture and Agricultural Development Sector (including Storage, Transport, Loss Reduction, and Market Linkages)" },
  { slug: "livestock", category: "economic", icon: "leaf", ar: "قطاع الثروة الحيوانية", en: "Livestock Sector" },
  { slug: "oil-mining", category: "economic", icon: "fuel", ar: "قطاع النفط والتعدين", en: "Oil and Mining Sector" },
  { slug: "water-resources-irrigation", category: "services", icon: "waves", ar: "قطاع الموارد المائية والري", en: "Water Resources and Irrigation Sector" },
  { slug: "electricity-renewable-energy", category: "infrastructure", icon: "bolt", ar: "قطاع الكهرباء والطاقة المتجددة", en: "Electricity and Renewable Energy Sector" },
  { slug: "infrastructure-roads-bridges-transport", category: "infrastructure", icon: "road", ar: "قطاع البنية التحتية (الطرق والجسور والنقل والمواصلات)", en: "Infrastructure Sector (Roads, Bridges, Transport, and Mobility)" },
  { slug: "aviation-ports-maritime-river-transport", category: "infrastructure", icon: "globe", ar: "قطاع الطيران والموانئ والنقل البحري والنهري", en: "Aviation, Ports, Maritime, and River Transport Sector" },
  { slug: "telecommunications-digital-government-digital-infrastructure", category: "infrastructure", icon: "monitor", ar: "قطاع الاتصالات والحكومة الرقمية والبنية الرقمية", en: "Telecommunications, Digital Government, and Digital Infrastructure Sector" },
  { slug: "data-statistics-information", category: "governance", icon: "clipboard", ar: "قطاع البيانات والإحصاء والمعلومات", en: "Data, Statistics, and Information Sector" },
  { slug: "health", category: "services", icon: "heart", ar: "قطاع الصحة", en: "Health Sector" },
  { slug: "drinking-water", category: "services", icon: "droplet", ar: "قطاع مياه الشرب", en: "Drinking Water Sector" },
  { slug: "education-research", category: "services", icon: "graduation", ar: "قطاع التعليم (العام والفني والمهني والعالي والبحث العلمي)", en: "Education Sector (General, Technical, Vocational, Higher Education, and Scientific Research)" },
  { slug: "governance-administrative-reform-strategy-policy-quality", category: "governance", icon: "clipboard", ar: "قطاع الحكم والإصلاح الإداري والتخطيط الاستراتيجي والسياسات العامة والجودة والمعايير", en: "Governance, Administrative Reform, Strategic Planning, Public Policy, Quality, and Standards Sector" },
  { slug: "legal-constitutional-transitional-justice", category: "governance", icon: "scale", ar: "قطاع الإصلاحات القانونية والدستور والعدالة الانتقالية", en: "Legal Reforms, Constitution, and Transitional Justice Sector" },
  { slug: "security-defense", category: "governance", icon: "shield-check", ar: "قطاع الأمن والدفاع", en: "Security and Defense Sector" },
  { slug: "housing-urban-rural-development", category: "infrastructure", icon: "building", ar: "قطاع الإسكان والتخطيط العمراني والتنمية الريفية والحضرية المتكاملة", en: "Housing, Urban Planning, and Integrated Rural and Urban Development Sector" },
  { slug: "social-development-social-support", category: "social", icon: "handshake", ar: "قطاع التنمية الاجتماعية والدعم الاجتماعي", en: "Social Development and Social Support Sector" },
  { slug: "media-culture-arts", category: "social", icon: "palette", ar: "قطاع الإعلام والثقافة والفنون", en: "Media, Culture, and Arts Sector" },
  { slug: "foreign-relations-cooperation-migration-diaspora", category: "governance", icon: "globe", ar: "قطاع العلاقات الخارجية والتعاون الدولي والهجرة وشؤون المغتربين", en: "Foreign Relations, International Cooperation, Migration, and Diaspora Affairs Sector" },
  { slug: "environment", category: "services", icon: "leaf", ar: "قطاع البيئة", en: "Environment Sector" },
  { slug: "peace-national-reconciliation", category: "social", icon: "handshake", ar: "قطاع السلام والمصالحة الوطنية", en: "Peace and National Reconciliation Sector" },
  { slug: "disaster-emergency-management", category: "services", icon: "shield", ar: "قطاع إدارة الكوارث والطوارئ", en: "Disaster and Emergency Management Sector" },
  { slug: "women-issues", category: "social", icon: "network", ar: "قطاع قضايا المرأة", en: "Women’s Issues Sector" },
  { slug: "anti-corruption", category: "governance", icon: "scale", ar: "قطاع مكافحة الفساد", en: "Anti-Corruption Sector" },
  { slug: "youth-issues", category: "social", icon: "network", ar: "قطاع قضايا الشباب", en: "Youth Issues Sector" },
  { slug: "press", category: "social", icon: "palette", ar: "قطاع الصحافة", en: "Press Sector" },
  { slug: "sanitation-rainwater-drainage", category: "infrastructure", icon: "waves", ar: "قطاع الصرف الصحي وتصريف مياه الأمطار", en: "Sanitation and Rainwater Drainage Sector" },
  { slug: "civil-society-ngos", category: "social", icon: "network", ar: "قطاع المجتمع المدني والمنظمات غير الحكومية", en: "Civil Society and Non-Governmental Organizations Sector" }
];

function buildSummary(title: string, locale: Locale) {
  return locale === "ar"
    ? `${title} ضمن قطاعات الميثاق، ويعمل على إنتاج قرارات تنفيذية وخطط قصيرة ومتوسطة المدى قابلة للتطبيق.`
    : `${title} is one of the charter sectors, focused on executive decisions and short- to medium-term implementable plans.`;
}

function buildBody(title: string, locale: Locale) {
  return locale === "ar"
    ? `يركز ${title} على تحليل الأولويات العاجلة، إعداد حزمة قرارات تنفيذية للمئة يوم الأولى، وبناء خطط مرحلية وفق إطار موحد يشمل الأهداف، آليات التنفيذ، الجهات المسؤولة، مؤشرات الأداء، المخاطر، مصادر التمويل، والمخرجات المتوقعة.`
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
    outputs: ["قرارات تنفيذية للمئة يوم", "خطة قصيرة ومتوسطة المدى", "مؤشرات أداء ومخاطر", "مخرجات قابلة للاستخدام"]
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
