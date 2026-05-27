export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionary = {
  ar: {
    dir: "rtl" as const,
    langName: "العربية"
  },
  en: {
    dir: "ltr" as const,
    langName: "English"
  }
} as const;

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale) {
  return locale === "ar" ? "en" : "ar";
}
