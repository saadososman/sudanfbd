import type { Metadata } from "next";
import { HomeSectionRenderer } from "@/components/HomeSectionRenderer";
import { fetchHomepage } from "@/lib/cms";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homepage = await fetchHomepage(locale);
  const t = dictionary[locale];

  return {
    title: homepage.seo?.metaTitle ?? `${t.brand} | ${t.nav.home}`,
    description: homepage.seo?.metaDescription ?? t.manifesto.paragraphs[0],
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
  const homepage = await fetchHomepage(locale);

  return <HomeSectionRenderer locale={locale} sections={homepage.sections} />;
}
