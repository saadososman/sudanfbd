import Link from "next/link";
import { ArrowUpRight, Newspaper } from "lucide-react";
import type { ArticleItem } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";
import type { CmsUiLabels } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export function NewsCard({
  article,
  locale,
  labels
}: {
  article: ArticleItem;
  locale: Locale;
  labels: CmsUiLabels;
}) {
  return (
    <Link className="news-card" href={`/${locale}/news/${article.id}`}>
      <div className="news-card-media">
        {article.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.coverImageUrl} alt="" />
        ) : (
          <div className="news-card-fallback" aria-hidden="true">
            <Newspaper size={34} />
          </div>
        )}
      </div>
      <div className="news-card-body">
        <p className="news-card-date">
          {article.publishedAt
            ? `${labels.publishedOn} ${formatArticleDate(article.publishedAt, locale)}`
            : labels.newsLabel}
        </p>
        <h3>{article.title}</h3>
        {article.excerpt ? <p>{article.excerpt}</p> : null}
        <span className="news-card-link">
          {labels.readArticle}
          <ArrowUpRight size={17} />
        </span>
      </div>
    </Link>
  );
}
