"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { NewsCard } from "@/components/NewsCard";
import { useUiLabels } from "@/components/UiLabelsProvider";
import type { ArticleItem } from "@/lib/articles";
import type { Locale } from "@/lib/i18n";

export function NewsFeed({
  articles,
  locale
}: {
  articles: ArticleItem[];
  locale: Locale;
}) {
  const labels = useUiLabels();
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
          <span className="status">{labels.search}</span>
          <input
            className="input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.newsSearch}
          />
        </label>
        <Search aria-hidden size={22} color="var(--green)" />
      </div>
      {filtered.length === 0 ? (
        <div className="panel">{labels.noNews}</div>
      ) : (
        <div className="news-card-grid">
          {filtered.map((article) => (
            <NewsCard
              article={article}
              locale={locale}
              labels={labels}
              key={article.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
