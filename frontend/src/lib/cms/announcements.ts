import { strapiFetch, unwrapCollectionItems } from "@/lib/cms/client";
import type { CmsAnnouncement } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

const announcementVariants = ["info", "success", "warning", "urgent"] as const;

function isAnnouncementVariant(
  value: unknown
): value is CmsAnnouncement["variant"] {
  return (
    typeof value === "string" &&
    (announcementVariants as readonly string[]).includes(value)
  );
}

function getAnnouncementId(item: Record<string, unknown>) {
  const id = item.documentId ?? item.id;
  return id ? String(id) : "";
}

function isWithinSchedule(startsAt?: string, endsAt?: string, now = Date.now()) {
  if (startsAt) {
    const start = Date.parse(startsAt);
    if (!Number.isNaN(start) && now < start) return false;
  }

  if (endsAt) {
    const end = Date.parse(endsAt);
    if (!Number.isNaN(end) && now > end) return false;
  }

  return true;
}

function mapAnnouncementItem(item: Record<string, unknown>): CmsAnnouncement | null {
  const fields =
    item.attributes && typeof item.attributes === "object"
      ? (item.attributes as Record<string, unknown>)
      : item;

  const id = getAnnouncementId(item);
  const title = fields.title;

  if (!id || typeof title !== "string" || !title) return null;
  if (fields.isActive === false) return null;

  const startsAt = typeof fields.startsAt === "string" ? fields.startsAt : undefined;
  const endsAt = typeof fields.endsAt === "string" ? fields.endsAt : undefined;

  if (!isWithinSchedule(startsAt, endsAt)) return null;

  return {
    id,
    title,
    message: typeof fields.message === "string" ? fields.message : undefined,
    linkLabel: typeof fields.linkLabel === "string" ? fields.linkLabel : undefined,
    linkPath: typeof fields.linkPath === "string" ? fields.linkPath : undefined,
    variant: isAnnouncementVariant(fields.variant) ? fields.variant : "info",
    priority: typeof fields.priority === "number" ? fields.priority : 0
  };
}

export async function fetchActiveAnnouncements(locale: Locale): Promise<CmsAnnouncement[]> {
  const payload = await strapiFetch<{ data?: Record<string, unknown>[] | null }>(
    "/api/announcements?filters[isActive][$eq]=true&sort[0]=priority:desc&sort[1]=createdAt:desc&pagination[pageSize]=5",
    { locale, revalidate: 120, tags: [`announcements-${locale}`] }
  );

  if (!payload) return [];

  return unwrapCollectionItems(payload)
    .map((item) => mapAnnouncementItem(item as Record<string, unknown>))
    .filter((item): item is CmsAnnouncement => item !== null)
    .sort((a, b) => b.priority - a.priority);
}
