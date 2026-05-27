"use client";

import { FormEvent, useState } from "react";
import { UploadCloud } from "lucide-react";
import { useUiLabels } from "@/components/UiLabelsProvider";
import type { CmsSector } from "@/lib/cms/types";
import { dictionary, type Locale } from "@/lib/i18n";

export function AdminDashboard({
  locale,
  sectors,
  uploadEnabled
}: {
  locale: Locale;
  sectors: CmsSector[];
  uploadEnabled: boolean;
}) {
  const labels = useUiLabels();
  const [status, setStatus] = useState<string>(
    uploadEnabled ? labels.statusReady : labels.uploadDisabled
  );
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadEnabled) {
      return;
    }

    setPending(true);
    setStatus(labels.uploading);

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
      setStatus(labels.uploadSuccess);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      setStatus(message || labels.uploadFailed);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-layout">
      <form className="panel form" onSubmit={onSubmit}>
        <label>
          {labels.formTitle}
          <input className="input" name="title" required disabled={!uploadEnabled} />
        </label>
        <label>
          {labels.sector}
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
          {labels.formLocale}
          <select className="input" name="locale" defaultValue={locale} disabled={!uploadEnabled}>
            <option value="ar">{dictionary.ar.langName}</option>
            <option value="en">{dictionary.en.langName}</option>
          </select>
        </label>
        <label>
          {labels.file}
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
          <UploadCloud size={18} /> {pending ? labels.upload : labels.publish}
        </button>
        <small>{status}</small>
      </form>
      <div className="panel">
        <h2>{labels.adminIntegrationTitle}</h2>
        <p>{labels.adminIntegrationBody}</p>
      </div>
    </div>
  );
}
