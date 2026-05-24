import Link from "next/link";
import Image from "next/image";
import { FileText, Languages, LayoutDashboard } from "lucide-react";
import { dictionary, otherLocale, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const alternate = otherLocale(locale);

  return (
    <header className="topbar">
      <nav className="nav" aria-label="Primary navigation">
        <Link className="brand" href={`/${locale}`}>
          <span className="brand-mark logo-mark">
            <Image src="/logo.jpeg" alt={t.brand} width={48} height={48} priority />
          </span>
          <span>
            <p className="brand-title">{t.shortBrand}</p>
            <p className="brand-subtitle">{locale === "ar" ? "بناء وتنمية" : "Building & Development"}</p>
          </span>
        </Link>
        <div className="nav-links">
          <Link className="nav-link" href={`/${locale}`}>{t.nav.home}</Link>
          <Link className="nav-link" href={`/${locale}/about`}>{t.nav.about}</Link>
          <Link className="nav-link" href={`/${locale}/objectives`}>{t.nav.objectives}</Link>
          <Link className="nav-link" href={`/${locale}/sectors`}>{t.nav.sectors}</Link>
          <Link className="nav-link" href={`/${locale}/methodology`}>{t.nav.methodology}</Link>
          <Link className="nav-link" href={`/${locale}/framework`}>{t.nav.framework}</Link>
          <Link className="nav-link" href={`/${locale}/documents`}><FileText size={17} /> {t.nav.documents}</Link>
          <Link className="nav-link" href={`/${locale}/admin`}><LayoutDashboard size={17} /> {t.nav.admin}</Link>
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
