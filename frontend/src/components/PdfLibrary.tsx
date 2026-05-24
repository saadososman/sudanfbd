"use client";

import { useMemo, useState } from "react";
import { Download, Search } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import type { DocumentItem } from "@/lib/api";

export function PdfLibrary({ documents, locale }: { documents: DocumentItem[]; locale: Locale }) {
  const t = dictionary[locale];
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return documents;
    return documents.filter((doc) => `${doc.title} ${doc.sector}`.toLowerCase().includes(normalized));
  }, [documents, query]);

  return (
    <div>
      <div className="doc-toolbar">
        <label>
          <span className="status">{t.search}</span>
          <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search} />
        </label>
        <Search aria-hidden size={22} color="var(--green)" />
      </div>
      <div className="doc-list">
        {filtered.length === 0 ? (
          <div className="panel">{t.noDocs}</div>
        ) : (
          filtered.map((doc) => (
            <article className="doc-row" key={doc.id}>
              <div>
                <h3>{doc.title}</h3>
                <p>{doc.sector || "General"} · {doc.locale?.toUpperCase()}</p>
              </div>
              <a className="button light" href={doc.url} download>
                <Download size={18} /> {t.download}
              </a>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
