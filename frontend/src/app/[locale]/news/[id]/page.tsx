import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTitle } from "@/components/PageTitle";
import { ArticleContent } from "@/components/ArticleContent";
import { fetchArticle, formatArticleDate } from "@/lib/articles";
import { fetchSiteConfig, getNavLabel } from "@/lib/cms";
import { dictionary, type Locale } from "@/lib/i18n";
import { localePath } from "@/lib/locale-path";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const [article, siteConfig] = await Promise.all([
    fetchArticle(locale, id),
    fetchSiteConfig(locale)
  ]);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | ${siteConfig.siteName}`,
    description: article.excerpt
  };
}

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const [article, siteConfig] = await Promise.all([
    fetchArticle(locale, id),
    fetchSiteConfig(locale)
  ]);
  const t = dictionary[locale];

  if (!article) notFound();

  return (
    <>
      <PageTitle
        title={article.title}
        intro={
          article.publishedAt
            ? `${t.publishedOn} ${formatArticleDate(article.publishedAt, locale)}`
            : undefined
        }
        crumb={getNavLabel(siteConfig, "news")}
      />
      <section className="section">
        <div className="container article-layout">
          <ArticleContent content={article.content} />
          <Link className="button light article-back" href={localePath(locale, "news")}>
            <ArrowLeft size={18} />
            {t.backToNews}
          </Link>
        </div>
      </section>
    </>
  );
}
