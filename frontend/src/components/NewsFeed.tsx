"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import type { ArticleItem } from "@/lib/articles";
import { formatArticleDate } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";

export function NewsFeed({
  articles,
  locale
}: {
  articles: ArticleItem[];
  locale: Locale;
}) {
  const t = dictionary[locale];
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return articles;

    return articles.filter((article) =>
      `${article.title} ${article.excerpt}`.toLowerCase().includes(normalized)
    );
  }, [articles, query]);

  return (
    <div>
      <div className="doc-toolbar">
        <label>
          <span className="status">{t.search}</span>
          <input
            className="input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.newsSearch}
          />
        </label>
        <Search aria-hidden size={22} color="var(--green)" />
      </div>
      <div className="doc-list">
        {filtered.length === 0 ? (
          <div className="panel">{t.noNews}</div>
        ) : (
          filtered.map((article) => (
            <article className="doc-row news-row" key={article.id}>
              <div>
                <h3>{article.title}</h3>
                <p>
                  {article.publishedAt
                    ? `${t.publishedOn} ${formatArticleDate(article.publishedAt, locale)}`
                    : t.newsLabel}
                </p>
                {article.excerpt ? <p className="news-excerpt">{article.excerpt}</p> : null}
              </div>
              <Link className="button light" href={`/${locale}/news/${article.id}`}>
                {t.readArticle}
                <ArrowUpRight size={18} />
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
