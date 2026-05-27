import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CmsAnnouncement } from "@/lib/cms/types";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

export function AnnouncementBanner({
  locale,
  announcements
}: {
  locale: Locale;
  announcements: CmsAnnouncement[];
}) {
  if (!announcements.length) return null;

  return (
    <div className="announcement-stack" aria-live="polite">
      {announcements.map((announcement) => (
        <section
          className={`announcement-banner announcement-${announcement.variant}`}
          key={announcement.id}
          role="status"
        >
          <div className="container announcement-inner">
            <div className="announcement-copy">
              <strong>{announcement.title}</strong>
              {announcement.message ? <p>{announcement.message}</p> : null}
            </div>
            {announcement.linkLabel && announcement.linkPath ? (
              <Link
                className="announcement-link"
                href={localePath(locale, announcement.linkPath)}
              >
                {announcement.linkLabel}
                <ArrowUpRight size={16} />
              </Link>
            ) : null}
          </div>
        </section>
      ))}
    </div>
  );
}
