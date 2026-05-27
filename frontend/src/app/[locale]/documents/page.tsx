import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { PdfLibrary } from "@/components/PdfLibrary";
import { fetchDocuments } from "@/lib/api";
import { fetchPageBySlug, fetchSiteConfig, getNavLabel } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [page, siteConfig] = await Promise.all([
    fetchPageBySlug(locale, "documents"),
    fetchSiteConfig(locale)
  ]);

  return {
    title: page.seo?.metaTitle ?? `${page.title} | ${siteConfig.siteName}`,
    description: page.seo?.metaDescription ?? page.intro
  };
}

export default async function DocumentsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [page, siteConfig, documents] = await Promise.all([
    fetchPageBySlug(locale, "documents"),
    fetchSiteConfig(locale),
    fetchDocuments(locale)
  ]);

  return (
    <>
      <PageTitle
        title={page.title}
        intro={page.intro}
        crumb={getNavLabel(siteConfig, "documents")}
      />
      <section className="section">
        <div className="container">
          <PdfLibrary documents={documents} locale={locale} />
        </div>
      </section>
    </>
  );
}
