import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import { connection } from "next/server";
import { CmsFetchError } from "@/components/CmsFetchError";
import { getStrapiUrl } from "@/lib/env";
import { PageTitle } from "@/components/PageTitle";
import { SectorDirectory } from "@/components/SectorDirectory";
import {
  fetchHomepage,
  fetchSectors,
  fetchSiteConfig,
  getNavLabel,
  getSectorsListingFromHomepage
} from "@/lib/cms";
import { isStrapiFetchError } from "@/lib/cms/errors";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  noStore();
  const { locale } = await params;

  try {
    const homepage = await fetchHomepage(locale);
    const listing = getSectorsListingFromHomepage(homepage);
    const siteConfig = await fetchSiteConfig(locale);

    return {
      title: listing.title
        ? `${listing.title} | ${siteConfig.siteName}`
        : siteConfig.defaultSeo?.metaTitle,
      description: listing.intro || siteConfig.defaultSeo?.metaDescription
    };
  } catch {
    return {};
  }
}

export default async function SectorsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  try {
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
        <footer className="cms-source-debug" data-cms-source="strapi" aria-live="polite">
          <p>STRAPI sectors: {sectors.length}</p>
          <p>CMS URL: {getStrapiUrl() || sectors[0]?.fetchedFromUrl || "(not configured)"}</p>
          <p>CMS locale: {locale}</p>
        </footer>
      </>
    );
  } catch (error) {
    if (isStrapiFetchError(error)) {
      return (
        <CmsFetchError
          title="Unable to load sectors from Strapi"
          message={error.message}
          url={error.url}
          status={error.status}
        />
      );
    }

    throw error;
  }
}
