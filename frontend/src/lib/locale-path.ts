import type { Locale } from "@/lib/i18n";

export function localePath(locale: Locale, path?: string) {
  if (!path) return `/${locale}`;
  return `/${locale}/${path.replace(/^\//, "")}`;
}
