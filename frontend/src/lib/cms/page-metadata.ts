import type { Metadata } from "next";
import { fetchPageBySlug } from "@/lib/cms/pages";
import type { StaticPageSlug } from "@/lib/cms/constants";
import type { Locale } from "@/lib/i18n";

export async function buildStaticPageMetadata(
  locale: Locale,
  slug: StaticPageSlug
): Promise<Metadata> {
  const page = await fetchPageBySlug(locale, slug);

  return {
    title: page.seo?.metaTitle ?? page.title,
    description: page.seo?.metaDescription ?? page.intro
  };
}
