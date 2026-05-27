import type { Metadata } from "next";
import { fetchPageBySlug } from "@/lib/cms/pages";
import type { StaticPageSlug } from "@/lib/cms/fallbacks-pages";
import { dictionary, type Locale } from "@/lib/i18n";

export async function buildStaticPageMetadata(
  locale: Locale,
  slug: StaticPageSlug
): Promise<Metadata> {
  const page = await fetchPageBySlug(locale, slug);
  const t = dictionary[locale];

  return {
    title: page.seo?.metaTitle ?? `${page.title} | ${t.brand}`,
    description: page.seo?.metaDescription ?? page.intro
  };
}
