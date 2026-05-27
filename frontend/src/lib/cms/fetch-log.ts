import type { Locale } from "@/lib/i18n";

export type StrapiFetchMeta = {
  status: number | null;
  dataLength: number;
};

export function measureStrapiDataLength(payload: unknown): number {
  if (!payload || typeof payload !== "object") return 0;

  const record = payload as { data?: unknown };
  if (Array.isArray(record.data)) return record.data.length;
  if (record.data && typeof record.data === "object") return 1;
  return 0;
}

export function logStrapiFetch(
  label: string,
  locale: Locale,
  meta: StrapiFetchMeta,
  usedFallback: boolean
) {
  console.log(
    `[CMS] ${label} locale=${locale} status=${meta.status ?? "n/a"} dataLength=${meta.dataLength} fallback=${usedFallback}`
  );
}
