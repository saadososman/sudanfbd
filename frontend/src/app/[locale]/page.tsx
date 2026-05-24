import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BarChart3, FileText, ShieldCheck } from "lucide-react";
import { ManifestoSection } from "@/components/ManifestoSection";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { SectorGrid } from "@/components/SectorGrid";
import { dictionary, type Locale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = dictionary[locale];
  return {
    title: `${t.brand} | ${t.nav.home}`,
    description: t.manifesto.paragraphs[0],
    alternates: {
      languages: {
        ar: "/ar",
        en: "/en"
      }
    }
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = dictionary[locale];
  const isArabic = locale === "ar";
  const closingTitle = isArabic ? "الملتقى السوداني للبناء والتنمية" : "Sudanese Forum for Building and Development";
  const closingText = isArabic
    ? "يوظف الخبرات السودانية داخل البلاد وخارجها لإنتاج سياسات وخطط قابلة للتنفيذ تخدم بناء الدولة السودانية الحديثة"
    : "A national platform bringing together Sudanese expertise to prepare practical visions and plans that support reconstruction, development, and stability during the transitional period.";

  return (
    <>
      <section className="hero">
        <div className="container hero-inner home-hero">
          <div className="hero-copy reveal">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1>{t.hero.title}</h1>
            <p>{t.hero.body}</p>
            <div className="hero-actions">
              <Link className="button" href={`/${locale}/sectors`}>
                {t.hero.sectorsCta}
                <ArrowUpRight size={18} />
              </Link>
              <Link className="button secondary" href={`/${locale}/documents`}>
                <FileText size={18} />
                {t.hero.docsCta}
              </Link>
            </div>
          </div>
          <div className="hero-visual reveal delay-1" aria-hidden="true">
            <div className="logo-orbit">
              <Image src="/logo.jpeg" alt="" width={420} height={420} priority />
            </div>
            <div className="hero-insight insight-a">
              <BarChart3 size={20} />
              <span>{isArabic ? "بيانات ومؤشرات" : "Data and indicators"}</span>
            </div>
            <div className="hero-insight insight-b">
              <ShieldCheck size={20} />
              <span>{isArabic ? "حوكمة وشراكات" : "Governance and partnerships"}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container stats">
          {t.stats.map((stat, index) => (
            <div className="stat reveal" style={{ animationDelay: `${index * 80}ms` }} key={stat}>
              <strong>{stat.split(" ")[0]}</strong>
              <span>{stat}</span>
            </div>
          ))}
        </div>
      </section>
      <ManifestoSection locale={locale} />
      <ObjectivesSection locale={locale} />
      <section className="section">
        <div className="container section-heading">
          <span className="section-kicker">{isArabic ? "محاور العمل" : "Workstreams"}</span>
          <h2>{t.sectorsTitle}</h2>
          <p>{t.sectorsIntro}</p>
        </div>
        <div className="container">
          <SectorGrid locale={locale} limit={6} />
          <div className="section-action">
            <Link className="button light" href={`/${locale}/sectors`}>
              {isArabic ? "عرض كل القطاعات" : "View all sectors"}
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section home-closing-section">
        <div className="container home-closing-banner reveal">
          <h2>{closingTitle}</h2>
          <p>{closingText}</p>
        </div>
      </section>
    </>
  );
}
