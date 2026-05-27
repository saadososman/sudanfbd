import type { Metadata } from "next";
import { PageTitle } from "@/components/PageTitle";
import { NewsFeed } from "@/components/NewsFeed";
import { fetchArticles } from "@/lib/articles";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];

  return {
    title: `${t.newsTitle} | ${t.brand}`,
    description: t.newsIntro
  };
}

export default async function NewsPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = dictionary[locale];
  const articles = await fetchArticles();

  return (
    <>
      <PageTitle title={t.newsTitle} intro={t.newsIntro} crumb={t.nav.news} />
      <section className="section">
        <div className="container">
          <NewsFeed articles={articles} locale={locale} />
        </div>
      </section>
    </>
  );
}
