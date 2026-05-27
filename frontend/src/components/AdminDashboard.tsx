"use client";

import { FormEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import type { CmsSector } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";
import { dictionary } from "@/lib/i18n";

export function AdminDashboard({
  locale,
  sectors,
  uploadEnabled
}: {
  locale: Locale;
  sectors: CmsSector[];
  uploadEnabled: boolean;
}) {
  const t = dictionary[locale];
  const [status, setStatus] = useState<string>(
    uploadEnabled
      ? t.statusReady
      : locale === "ar"
        ? "الرفع غير مفعّل. أضف STRAPI_API_TOKEN في إعدادات الخادم."
        : "Upload disabled. Add STRAPI_API_TOKEN on the server."
  );
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadEnabled) {
      return;
    }

    setPending(true);
    setStatus(locale === "ar" ? "جاري الرفع..." : "Uploading...");

    try {
      const response = await fetch("/api/admin/documents", {
        method: "POST",
        body: new FormData(event.currentTarget)
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "Upload failed");
      }

      event.currentTarget.reset();
      setStatus(
        locale === "ar" ? "تم رفع الوثيقة بنجاح." : "Document uploaded successfully."
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setStatus(
        message ||
          (locale === "ar"
            ? "تعذر رفع الوثيقة. تحقق من Strapi والرمز المميز."
            : "Upload failed. Check Strapi and the API token.")
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-layout">
      <form className="panel form" onSubmit={onSubmit}>
        <label>
          {t.title}
          <input className="input" name="title" required disabled={!uploadEnabled} />
        </label>
        <label>
          {t.sector}
          <select
            className="input"
            name="sector"
            defaultValue={sectors[0]?.slug}
            disabled={!uploadEnabled}
          >
            {sectors.map((sector) => (
              <option value={sector.slug} key={sector.slug}>
                {sector.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          {t.langName}
          <select className="input" name="locale" defaultValue={locale} disabled={!uploadEnabled}>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </label>
        <label>
          {t.file}
          <input
            className="input"
            type="file"
            name="file"
            accept="application/pdf"
            required
            disabled={!uploadEnabled}
          />
        </label>
        <button className="button" disabled={pending || !uploadEnabled} type="submit">
          <UploadCloud size={18} /> {pending ? t.upload : t.publish}
        </button>
        <small>{status}</small>
      </form>
      <div className="panel">
        <h2>{locale === "ar" ? "تكامل Strapi" : "Strapi Integration"}</h2>
        <p>
          {locale === "ar"
            ? "يتم الرفع عبر مسار Next.js المحمي /api/admin/documents باستخدام STRAPI_API_TOKEN على الخادم فقط. لا حاجة لصلاحيات create العامة في Strapi."
            : "Uploads go through the protected Next.js route /api/admin/documents using STRAPI_API_TOKEN on the server only. Public create permissions on Strapi are not required."}
        </p>
      </div>
    </div>
  );
}
