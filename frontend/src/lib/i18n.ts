export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionary = {
  ar: {
    dir: "rtl",
    langName: "العربية",
    documentsTitle: "مكتبة الوثائق",
    documentsIntro: "ارفع وحمل ملفات PDF الخاصة بالتقارير، السياسات، الدراسات، وخطط العمل.",
    homeNewsKicker: "آخر الأخبار",
    viewAllNews: "عرض كل الأخبار",
    newsTitle: "الأخبار والمقالات",
    newsIntro: "آخر المقالات والتحديثات المنشورة من لوحة Strapi.",
    newsSearch: "ابحث في الأخبار",
    newsLabel: "مقال",
    noNews: "لا توجد مقالات منشورة بعد.",
    readArticle: "قراءة المقال",
    publishedOn: "نُشر في",
    backToNews: "العودة إلى الأخبار",
    adminTitle: "لوحة الإدارة",
    adminIntro: "إدارة الوثائق المنشورة وربطها بالقطاعات عبر واجهة Strapi.",
    readMore: "عرض التفاصيل",
    download: "تحميل PDF",
    search: "بحث",
    upload: "رفع ملف",
    title: "العنوان",
    sector: "القطاع",
    file: "ملف PDF",
    publish: "نشر",
    noDocs: "لا توجد وثائق بعد.",
    statusReady: "جاهز للاتصال بواجهة Strapi."
  },
  en: {
    dir: "ltr",
    langName: "English",
    documentsTitle: "Document Library",
    documentsIntro: "Upload and download PDF reports, policies, studies, and work plans.",
    homeNewsKicker: "Latest news",
    viewAllNews: "View all news",
    newsTitle: "News & Articles",
    newsIntro: "Latest articles and updates published from the Strapi admin panel.",
    newsSearch: "Search news",
    newsLabel: "Article",
    noNews: "No published articles yet.",
    readArticle: "Read article",
    publishedOn: "Published",
    backToNews: "Back to news",
    adminTitle: "Admin Dashboard",
    adminIntro: "Manage published documents and connect them to sectors through the Strapi API.",
    readMore: "View details",
    download: "Download PDF",
    search: "Search",
    upload: "Upload file",
    title: "Title",
    sector: "Sector",
    file: "PDF file",
    publish: "Publish",
    noDocs: "No documents yet.",
    statusReady: "Ready to connect to Strapi."
  }
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale) {
  return locale === "ar" ? "en" : "ar";
}
