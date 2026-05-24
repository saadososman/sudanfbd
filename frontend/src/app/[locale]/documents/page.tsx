import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { PdfLibrary } from "@/components/PdfLibrary";
import { fetchDocuments } from "@/lib/api";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return { title: `${t.documentsTitle} | ${t.brand}`, description: t.documentsIntro };
}

export default async function DocumentsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];
  const documents = await fetchDocuments();

  return (
    <>
      <PageTitle title={t.documentsTitle} intro={t.documentsIntro} crumb={t.nav.documents} />
      <section className="section">
        <div className="container">
          <PdfLibrary documents={documents} locale={locale} />
        </div>
      </section>
    </>
  );
}
