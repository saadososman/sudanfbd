import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { ManifestoSection } from "@/components/ManifestoSection";
import { NewsSection } from "@/components/NewsSection";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { SectorGrid } from "@/components/SectorGrid";
import { fetchLatestArticles } from "@/lib/articles";
import { fetchSectors } from "@/lib/cms/sectors";
import type {
  CmsContentTeaserSection,
  CmsCtaBannerSection,
  CmsHomeSection,
  CmsRichContentSection,
  CmsStatsSection
} from "@/lib/cms/types";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

function StatsSection({ section }: { section: CmsStatsSection }) {
  return (
    <section className="section">
      <div className="container stats">
        {section.stats.map((stat, index) => (
          <div
            className="stat reveal"
            style={{ animationDelay: `${index * 80}ms` }}
            key={`${stat.value}-${stat.label}`}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RichContentSection({
  locale,
  section
}: {
  locale: Locale;
  section: CmsRichContentSection;
}) {
  if (section.cards?.length) {
    return (
      <ObjectivesSection
        locale={locale}
        content={{
          kicker: section.kicker ?? "",
          title: section.title,
          paragraphs: section.paragraphs ?? [],
          cards: section.cards.map((card) => ({
            title: card.title,
            text: card.text ?? ""
          }))
        }}
      />
    );
  }

  return (
    <ManifestoSection
      locale={locale}
      content={{
        kicker: section.kicker ?? "",
        title: section.title,
        paragraphs: section.paragraphs ?? [],
        points: section.bulletPoints ?? []
      }}
    />
  );
}

function ContentTeaserSection({
  locale,
  section,
  sectors,
  articles
}: {
  locale: Locale;
  section: CmsContentTeaserSection;
  sectors: Awaited<ReturnType<typeof fetchSectors>>;
  articles: Awaited<ReturnType<typeof fetchLatestArticles>>;
}) {
  const viewAllPath = section.viewAllPath ?? section.contentType;
  const limit = section.limit ?? 3;

  if (section.contentType === "news") {
    return (
      <NewsSection
        articles={articles.slice(0, limit)}
        locale={locale}
        heading={{
          kicker: section.kicker,
          title: section.title,
          intro: section.intro,
          viewAllLabel: section.viewAllLabel
        }}
      />
    );
  }

  if (section.contentType === "sectors") {
    return (
      <section className="section">
        <div className="container section-heading">
          {section.kicker ? (
            <span className="section-kicker">{section.kicker}</span>
          ) : null}
          <h2>{section.title}</h2>
          {section.intro ? <p>{section.intro}</p> : null}
        </div>
        <div className="container">
          <SectorGrid locale={locale} sectors={sectors} limit={limit} />
          {section.viewAllLabel ? (
            <div className="section-action">
              <Link className="button light" href={localePath(locale, viewAllPath)}>
                {section.viewAllLabel}
                <ArrowUpRight size={18} />
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container section-heading">
        {section.kicker ? <span className="section-kicker">{section.kicker}</span> : null}
        <h2>{section.title}</h2>
        {section.intro ? <p>{section.intro}</p> : null}
      </div>
      <div className="container section-action">
        <Link className="button light" href={localePath(locale, viewAllPath)}>
          {section.viewAllLabel ?? section.title}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}

function CtaBannerSection({
  locale,
  section
}: {
  locale: Locale;
  section: CmsCtaBannerSection;
}) {
  return (
    <section className="section home-closing-section">
      <div className="container home-closing-banner reveal">
        <h2>{section.title}</h2>
        {section.body ? <p>{section.body}</p> : null}
        {section.cta ? (
          <Link className="button light" href={localePath(locale, section.cta.path)}>
            {section.cta.label}
            <ArrowUpRight size={18} />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

export async function HomeSectionRenderer({
  locale,
  sections
}: {
  locale: Locale;
  sections: CmsHomeSection[];
}) {
  const needsSectors = sections.some(
    (section) =>
      section.__component === "sections.content-teaser-section" &&
      section.contentType === "sectors"
  );
  const needsNews = sections.some(
    (section) =>
      section.__component === "sections.content-teaser-section" &&
      section.contentType === "news"
  );

  const newsLimit = sections.reduce((max, section) => {
    if (
      section.__component === "sections.content-teaser-section" &&
      section.contentType === "news"
    ) {
      return Math.max(max, section.limit ?? 3);
    }
    return max;
  }, 3);

  const sectors = needsSectors ? await fetchSectors(locale) : [];
  const articles = needsNews ? await fetchLatestArticles(newsLimit) : [];

  return sections.map((section, index) => {
    switch (section.__component) {
      case "sections.hero-section":
        return <HeroSection locale={locale} section={section} key={`hero-${index}`} />;
      case "sections.stats-section":
        return <StatsSection section={section} key={`stats-${index}`} />;
      case "sections.rich-content-section":
        return (
          <RichContentSection locale={locale} section={section} key={`rich-${index}`} />
        );
      case "sections.content-teaser-section":
        return (
          <ContentTeaserSection
            locale={locale}
            section={section}
            sectors={sectors}
            articles={articles}
            key={`teaser-${section.contentType}-${index}`}
          />
        );
      case "sections.cta-banner-section":
        return (
          <CtaBannerSection locale={locale} section={section} key={`cta-${index}`} />
        );
      default:
        return null;
    }
  });
}
