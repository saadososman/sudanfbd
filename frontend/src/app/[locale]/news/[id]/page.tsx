import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ArticleContent } from "@/components/ArticleContent";
import { PageTitle } from "@/components/PageTitle";
import { fetchArticle, fetchArticles, formatArticleDate } from "@/lib/articles";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateStaticParams() {
  const articles = await fetchArticles();

  return articles.flatMap((article) => [
    { locale: "ar", id: article.id },
    { locale: "en", id: article.id }
  ]);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const article = await fetchArticle(id);
  const t = dictionary[locale];

  if (!article) {
    return { title: t.newsTitle };
  }

  return {
    title: `${article.title} | ${t.brand}`,
    description: article.excerpt || t.newsIntro
  };
}

export default async function NewsArticlePage({
  params
}: {
  params: Promise<{ locale: Locale; id: string }>;
}) {
  const { locale, id } = await params;
  const t = dictionary[locale];
  const article = await fetchArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <PageTitle
        title={article.title}
        intro={
          article.publishedAt
            ? `${t.publishedOn} ${formatArticleDate(article.publishedAt, locale)}`
            : t.newsIntro
        }
        crumb={t.nav.news}
      />
      <section className="section">
        <div className="container article-page-layout">
          <article className="panel article-detail reveal">
            <ArticleContent content={article.content} />
          </article>
          <Link className="button light article-back-link" href={`/${locale}/news`}>
            {t.backToNews}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
