import type { Metadata } from "next";
import { HomeSectionRenderer } from "@/components/HomeSectionRenderer";
import { fetchHomepage } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homepage = await fetchHomepage(locale);

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
  const homepage = await fetchHomepage(locale);

  return <HomeSectionRenderer locale={locale} sections={homepage.sections} />;
}
