import type { Metadata } from "next";
import { PageSectionRenderer } from "@/components/PageSectionRenderer";
import { PageTitle } from "@/components/PageTitle";
import { buildStaticPageMetadata } from "@/lib/cms/page-metadata";
import { fetchPageBySlug } from "@/lib/cms/pages";
import { fetchSiteConfig, getNavLabel } from "@/lib/cms/site-config";
import type { Locale } from "@/lib/i18n";

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
  const [page, siteConfig] = await Promise.all([
    fetchPageBySlug(locale, "framework"),
    fetchSiteConfig(locale)
  ]);

  return (
    <>
      <PageTitle
        title={page.title}
        intro={page.intro}
        crumb={getNavLabel(siteConfig, "framework")}
      />
      <PageSectionRenderer locale={locale} sections={page.sections} />
    </>
  );
}
