import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Languages,
  LayoutDashboard,
  Newspaper,
  type LucideIcon
} from "lucide-react";
import type { CmsSiteConfig } from "@/lib/cms/types";
import { dictionary, otherLocale, type Locale } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  FileText,
  LayoutDashboard,
  Newspaper
};

function NavIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={17} />;
}

export function Header({
  locale,
  siteConfig
}: {
  locale: Locale;
  siteConfig: CmsSiteConfig;
}) {
  const alternate = otherLocale(locale);

  return (
    <header className="topbar">
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" href={`/${locale}`}>
          <span className="brand-mark logo-mark">
            <Image
              src={siteConfig.logoUrl || "/logo.jpeg"}
              alt={siteConfig.siteName}
              width={48}
              height={48}
              priority
            />
          </span>
          <span>
            <p className="brand-title">{siteConfig.shortName}</p>
            <p className="brand-subtitle">{siteConfig.brandSubtitle}</p>
          </span>
        </Link>
        <div className="nav-links">
          {siteConfig.navigation
            .filter((item) => item.isVisible)
            .map((item) => {
              const href = item.path ? `/${locale}/${item.path}` : `/${locale}`;

              return (
                <Link
                  className="nav-link"
                  href={href}
                  key={`${item.path}-${item.label}`}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                >
                  <NavIcon name={item.icon} />
                  {item.label}
                </Link>
              );
            })}
        </div>
        <div className="locale-switch" aria-label="Language switcher">
          <Link className="locale-link" href={`/${alternate}`}>
            <Languages size={16} />
            {dictionary[alternate].langName}
          </Link>
        </div>
      </nav>
    </header>
  );
}
