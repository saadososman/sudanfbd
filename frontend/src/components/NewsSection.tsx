import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import type { ArticleItem } from "@/lib/articles";
import type { CmsUiLabels } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export function NewsSection({
  articles,
  locale,
  labels,
  heading
}: {
  articles: ArticleItem[];
  locale: Locale;
  labels: CmsUiLabels;
  heading: {
    kicker?: string;
    title?: string;
    intro?: string;
    viewAllLabel?: string;
  };
}) {
  return (
    <section className="section alt home-news-section">
      <div className="container section-heading">
        {heading.kicker ? <span className="section-kicker">{heading.kicker}</span> : null}
        <h2>{heading.title}</h2>
        {heading.intro ? <p>{heading.intro}</p> : null}
      </div>
      <div className="container">
        {articles.length === 0 ? (
          <div className="panel">{labels.noNews}</div>
        ) : (
          <div className="news-card-grid">
            {articles.map((article) => (
              <NewsCard
                article={article}
                locale={locale}
                labels={labels}
                key={article.id}
              />
            ))}
          </div>
        )}
        {heading.viewAllLabel ? (
          <div className="section-action">
            <Link className="button light" href={`/${locale}/news`}>
              {heading.viewAllLabel}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
