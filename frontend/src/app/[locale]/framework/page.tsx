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
  return buildStaticPageMetadata(locale, "framework");
}

export default async function FrameworkPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const page = await fetchPageBySlug(locale, "framework");
  const t = dictionary[locale];

  return (
    <>
      <PageTitle
        title={page.title}
        intro={page.intro ?? t.framework.intro}
        crumb={t.nav.framework}
      />
      <PageSectionRenderer locale={locale} sections={page.sections} />
    </>
  );
}
