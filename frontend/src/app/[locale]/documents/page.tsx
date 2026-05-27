import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { PdfLibrary } from "@/components/PdfLibrary";
import { fetchDocuments } from "@/lib/api";
import { fetchSiteConfig, getNavLabel } from "@/lib/cms";
import { dictionary, type Locale } from "@/lib/i18n";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [siteConfig, t] = [await fetchSiteConfig(locale), dictionary[locale]];

  return {
    title: `${t.documentsTitle} | ${siteConfig.siteName}`,
    description: t.documentsIntro
  };
}

export default async function DocumentsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = dictionary[locale];
  const [siteConfig, documents] = await Promise.all([
    fetchSiteConfig(locale),
    fetchDocuments(locale)
  ]);

  return (
    <>
      <PageTitle
        title={t.documentsTitle}
        intro={t.documentsIntro}
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
