import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { NewsFeed } from "@/components/NewsFeed";
import { fetchArticles } from "@/lib/articles";
import {
  fetchHomepage,
  fetchSiteConfig,
  getNavLabel,
  getNewsListingFromHomepage
} from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [homepage, siteConfig] = await Promise.all([
    fetchHomepage(locale),
    fetchSiteConfig(locale)
  ]);
  const listing = getNewsListingFromHomepage(homepage);

  return {
    title: listing.title
      ? `${listing.title} | ${siteConfig.siteName}`
      : siteConfig.defaultSeo?.metaTitle,
    description: listing.intro || siteConfig.defaultSeo?.metaDescription
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const [homepage, siteConfig, articles] = await Promise.all([
    fetchHomepage(locale),
    fetchSiteConfig(locale),
    fetchArticles(locale)
  ]);
  const listing = getNewsListingFromHomepage(homepage);

  return (
    <>
      <PageTitle
        title={listing.title}
        intro={listing.intro}
        crumb={getNavLabel(siteConfig, "news")}
      />
      <section className="section">
        <div className="container">
          <NewsFeed articles={articles} locale={locale} />
        </div>
      </section>
    </>
  );
}
