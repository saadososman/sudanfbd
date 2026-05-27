import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { SectorDirectory } from "@/components/SectorDirectory";
import {
  fetchHomepage,
  fetchSectors,
  fetchSiteConfig,
  getNavLabel,
  getSectorsListingFromHomepage
} from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const homepage = await fetchHomepage(locale);
  const listing = getSectorsListingFromHomepage(homepage);
  const siteConfig = await fetchSiteConfig(locale);

  return {
    title: listing.title
      ? `${listing.title} | ${siteConfig.siteName}`
      : siteConfig.defaultSeo?.metaTitle,
    description: listing.intro || siteConfig.defaultSeo?.metaDescription
  };
}

export default async function SectorsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [homepage, sectors, siteConfig] = await Promise.all([
    fetchHomepage(locale),
    fetchSectors(locale),
    fetchSiteConfig(locale)
  ]);
  const listing = getSectorsListingFromHomepage(homepage);

  return (
    <>
      <PageTitle
        title={listing.title}
        intro={listing.intro}
        crumb={getNavLabel(siteConfig, "sectors")}
      />

      <section className="section sectors-page-section">
        <div className="container">
          <SectorDirectory locale={locale} sectors={sectors} />
        </div>
      </section>
    </>
  );
}
