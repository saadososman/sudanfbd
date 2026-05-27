import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import type { ArticleItem } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";

export function NewsSection({
  articles,
  locale,
  heading
}: {
  articles: ArticleItem[];
  locale: Locale;
  heading?: {
    kicker?: string;
    title?: string;
    intro?: string;
    viewAllLabel?: string;
  };
}) {
  const t = dictionary[locale];

  return (
    <section className="section alt home-news-section">
      <div className="container section-heading">
        <span className="section-kicker">{heading?.kicker ?? t.homeNewsKicker}</span>
        <h2>{heading?.title ?? t.newsTitle}</h2>
        <p>{heading?.intro ?? t.newsIntro}</p>
      </div>
      <div className="container">
        {articles.length === 0 ? (
          <div className="panel">{t.noNews}</div>
        ) : (
          <div className="news-card-grid">
            {articles.map((article) => (
              <NewsCard article={article} locale={locale} key={article.id} />
            ))}
          </div>
        )}
        <div className="section-action">
          <Link className="button light" href={`/${locale}/news`}>
            {heading?.viewAllLabel ?? t.viewAllNews}
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
