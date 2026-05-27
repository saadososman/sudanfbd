import type { Metadata } from "next";
import { PageSectionRenderer } from "@/components/PageSectionRenderer";
import { PageTitle } from "@/components/PageTitle";
import { buildStaticPageMetadata } from "@/lib/cms/page-metadata";
import { fetchPageBySlug } from "@/lib/cms/pages";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildStaticPageMetadata(locale, "about");
}

export default async function AboutPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await fetchPageBySlug(locale, "about");
  const t = dictionary[locale];

  return (
    <>
      <PageTitle
        title={page.title}
        intro={page.intro ?? t.manifesto.paragraphs[0]}
        crumb={t.nav.about}
      />
      <PageSectionRenderer locale={locale} sections={page.sections} compactManifesto />
    </>
  );
}
