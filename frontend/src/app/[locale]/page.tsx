import type { Metadata } from "next";
import { HomeSectionRenderer } from "@/components/HomeSectionRenderer";
import { fetchHomepageWithSource } from "@/lib/cms/homepage";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { homepage } = await fetchHomepageWithSource(locale);

  return {
    title: homepage.seo?.metaTitle,
    description: homepage.seo?.metaDescription,
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en"
      }
    }
  };
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const { homepage, source } = await fetchHomepageWithSource(locale);
  const sourceLabel = source === "strapi" ? "STRAPI" : "FALLBACK";

  return (
    <>
      <p
        className="cms-source-debug"
        aria-live="polite"
        data-cms-source={source}
      >
        CMS SOURCE: {sourceLabel}
      </p>
      <HomeSectionRenderer locale={locale} sections={homepage.sections} />
    </>
  );
}
