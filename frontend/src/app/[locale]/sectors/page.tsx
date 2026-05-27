import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { SectorDirectory } from "@/components/SectorDirectory";
import { fetchSectors } from "@/lib/cms";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];

  return {
    title: `${t.sectorsTitle} | ${t.brand}`,
    description: t.sectorsIntro
  };
}

export default async function SectorsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = dictionary[locale];
  const sectors = await fetchSectors(locale);

  const heroIntro =
    locale === "ar"
      ? "خطط قابلة للتنفيذ تدعم بناء السودان واستقراره وتنميته."
      : t.sectorsIntro;

  const heroCrumb = locale === "ar" ? "عن الملتقى" : t.nav.sectors;

  return (
    <>
      <PageTitle title={t.sectorsTitle} intro={heroIntro} crumb={heroCrumb} />

      <section className="section sectors-page-section">
        <div className="container">
          <SectorDirectory locale={locale} sectors={sectors} />
        </div>
      </section>
    </>
  );
}
