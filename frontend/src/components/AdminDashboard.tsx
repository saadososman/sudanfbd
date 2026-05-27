"use client";

import { FormEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { CmsSector } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";
import { uploadDocument } from "@/lib/api";

export function AdminDashboard({
  locale,
  sectors
}: {
  locale: Locale;
  sectors: CmsSector[];
}) {
  const t = dictionary[locale];
  const [status, setStatus] = useState<string>(t.statusReady);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setStatus(locale === "ar" ? "جاري الرفع..." : "Uploading...");

    try {
      await uploadDocument(new FormData(event.currentTarget));
      event.currentTarget.reset();
      setStatus(locale === "ar" ? "تم رفع الوثيقة بنجاح." : "Document uploaded successfully.");
    } catch (error) {
      setStatus(locale === "ar" ? "تعذر الاتصال بسترابي. شغل الخادم الخلفي أولا." : "Could not reach Strapi. Start the backend first.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-layout">
      <form className="panel form" onSubmit={onSubmit}>
        <label>
          {t.title}
          <input className="input" name="title" required />
        </label>
        <label>
          {t.sector}
          <select className="input" name="sector" defaultValue={sectors[0]?.slug}>
            {sectors.map((sector) => (
              <option value={sector.slug} key={sector.slug}>
                {sector.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.langName}
          <select className="input" name="locale" defaultValue={locale}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </label>
        <label>
          {t.file}
          <input className="input" type="file" name="file" accept="application/pdf" required />
        </label>
        <button className="button" disabled={pending} type="submit">
          <UploadCloud size={18} /> {pending ? t.upload : t.publish}
        </button>
        <small>{status}</small>
      </form>
      <div className="panel">
        <h2>{locale === "ar" ? "تكامل Strapi" : "Strapi Integration"}</h2>
        <p>
          {locale === "ar"
            ? "تعتمد لوحة الإدارة على /api/upload لرفع ملفات PDF ثم /api/forum-documents لحفظ بيانات الوثيقة."
            : "The admin dashboard uses /api/upload for PDF files, then /api/forum-documents to store document metadata."}
        </p>
      </div>
    </div>
  );
}
