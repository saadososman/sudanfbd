import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Flag,
  HandCoins,
  ListChecks,
  Network,
  ShieldAlert,
  Target,
  TimerReset,
  Users,
  Wrench,
  type LucideIcon
} from "lucide-react";
import { ManifestoSection } from "@/components/ManifestoSection";
import { NewsSection } from "@/components/NewsSection";
import { ObjectivesSection } from "@/components/ObjectivesSection";
import { SectorGrid } from "@/components/SectorGrid";
import { fetchLatestArticles } from "@/lib/articles";
import { fetchSectors } from "@/lib/cms/sectors";
import type {
  CmsAboutSection,
  CmsContentSection,
  CmsContentTeaserSection,
  CmsCtaBannerSection,
  CmsFrameworkSection,
  CmsMethodologySection,
  CmsMissionValuesSection,
  CmsObjectivesSectionBlock,
  CmsRichContentSection,
  CmsStatsSection,
  CmsTextCard
} from "@/lib/cms/types";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const methodologyIcons = [TimerReset, ClipboardCheck, Network, CheckCircle2];
const frameworkIcons = [
  FileText,
  Target,
  Wrench,
  Users,
  Clock3,
  BarChart3,
  ShieldAlert,
  ListChecks,
  Flag,
  HandCoins
];

export function AboutSectionBlock({
  locale,
  section,
  compact
}: {
  locale: Locale;
  section: CmsAboutSection;
  compact?: boolean;
}) {
  return (
    <ManifestoSection
      locale={locale}
      compact={compact ?? section.compact}
      content={{
        kicker: section.kicker ?? "",
        title: section.title,
        paragraphs: section.paragraphs ?? [],
        points: section.bulletPoints ?? []
      }}
    />
  );
}

export function ObjectivesSectionBlock({
  locale,
  section
}: {
  locale: Locale;
  section: CmsObjectivesSectionBlock;
}) {
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

export function MethodologyCardsBlock({ cards }: { cards: CmsTextCard[] }) {
  return (
    <section className="section charter-section">
      <div className="container method-grid">
        {cards.map((card, index) => {
          const Icon = methodologyIcons[index] || CheckCircle2;
          return (
            <article
              className="method-card reveal"
              style={{ animationDelay: `${index * 90}ms` }}
              key={card.title}
            >
              <span className="method-icon">
                <Icon size={26} />
              </span>
              <h2>{card.title}</h2>
              <p>{card.text}</p>
              <ArrowUpRight className="method-arrow" size={18} />
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function MethodologyPhasesBlock({
  kicker,
  phases
}: {
  kicker?: string;
  phases: string[];
}) {
  return (
    <section className="section alt">
      <div className="container timeline-panel">
        {kicker ? <span className="section-kicker">{kicker}</span> : null}
        <div className="timeline-list">
          {phases.map((phase, index) => (
            <div className="timeline-item" key={phase}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <span>{phase}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MethodologySectionBlock({ section }: { section: CmsMethodologySection }) {
  return (
    <>
      {section.cards.length ? <MethodologyCardsBlock cards={section.cards} /> : null}
      {section.phases?.length ? (
        <MethodologyPhasesBlock kicker={section.phasesTitle} phases={section.phases} />
      ) : null}
    </>
  );
}

export function FrameworkSectionBlock({ section }: { section: CmsFrameworkSection }) {
  return (
    <section className="section framework-section">
      <div className="container framework-grid">
        {section.items.map((item, index) => {
          const Icon: LucideIcon = frameworkIcons[index] || FileText;
          return (
            <article
              className="framework-card reveal"
              style={{ animationDelay: `${index * 55}ms` }}
              key={item}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon size={24} />
              <h2>{item}</h2>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function MissionValuesSectionBlock({ section }: { section: CmsMissionValuesSection }) {
  return (
    <section className="section">
      <div className="container split">
        <div>
          <h2>{section.missionTitle}</h2>
          <p>{section.missionText}</p>
        </div>
        <div className="panel">
          {section.valuesTitle ? <h2>{section.valuesTitle}</h2> : null}
          <ul className="feature-list">
            {section.values.map((value) => (
              <li key={value}>
                <CheckCircle2 size={20} /> <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatsSectionBlock({ section }: { section: CmsStatsSection }) {
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

function isAboutMissionLegacySection(section: CmsRichContentSection) {
  return (
    Boolean(section.bulletPoints?.length) &&
    Boolean(section.paragraphs?.length) &&
    !section.cards?.length &&
    !section.items?.length &&
    !section.phases?.length
  );
}

function LegacyRichContentSection({
  locale,
  section,
  compact
}: {
  locale: Locale;
  section: CmsRichContentSection;
  compact?: boolean;
}) {
  if (section.items?.length) {
    return <FrameworkSectionBlock section={{ __component: "sections.framework-section", items: section.items }} />;
  }

  if (section.phases?.length) {
    return <MethodologyPhasesBlock kicker={section.kicker} phases={section.phases} />;
  }

  if (section.cards?.length && !section.paragraphs?.length) {
    return <MethodologyCardsBlock cards={section.cards} />;
  }

  if (isAboutMissionLegacySection(section)) {
    return (
      <MissionValuesSectionBlock
        section={{
          __component: "sections.mission-values-section",
          missionTitle: section.title,
          missionText: section.paragraphs?.[0] ?? "",
          valuesTitle: section.kicker,
          values: section.bulletPoints ?? []
        }}
      />
    );
  }

  if (section.cards?.length) {
    return (
      <ObjectivesSectionBlock
        locale={locale}
        section={{
          __component: "sections.objectives-section",
          kicker: section.kicker,
          title: section.title,
          paragraphs: section.paragraphs,
          cards: section.cards
        }}
      />
    );
  }

  return (
    <AboutSectionBlock
      locale={locale}
      compact={compact}
      section={{
        __component: "sections.about-section",
        kicker: section.kicker,
        title: section.title,
        paragraphs: section.paragraphs,
        bulletPoints: section.bulletPoints,
        compact
      }}
    />
  );
}

function ContentTeaserSectionBlock({
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

function CtaBannerSectionBlock({
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

function renderContentSection(
  locale: Locale,
  section: CmsContentSection,
  index: number,
  options: {
    compactAbout?: boolean;
    sectors: Awaited<ReturnType<typeof fetchSectors>>;
    articles: Awaited<ReturnType<typeof fetchLatestArticles>>;
  }
) {
  switch (section.__component) {
    case "sections.about-section":
      return (
        <AboutSectionBlock
          locale={locale}
          section={section}
          compact={options.compactAbout && index === 0}
          key={`about-${index}`}
        />
      );
    case "sections.objectives-section":
      return (
        <ObjectivesSectionBlock locale={locale} section={section} key={`objectives-${index}`} />
      );
    case "sections.methodology-section":
      return <MethodologySectionBlock section={section} key={`methodology-${index}`} />;
    case "sections.framework-section":
      return <FrameworkSectionBlock section={section} key={`framework-${index}`} />;
    case "sections.mission-values-section":
      return <MissionValuesSectionBlock section={section} key={`mission-${index}`} />;
    case "sections.rich-content-section":
      return (
        <LegacyRichContentSection
          locale={locale}
          section={section}
          compact={options.compactAbout && index === 0}
          key={`legacy-rich-${index}`}
        />
      );
    case "sections.stats-section":
      return <StatsSectionBlock section={section} key={`stats-${index}`} />;
    case "sections.content-teaser-section":
      return (
        <ContentTeaserSectionBlock
          locale={locale}
          section={section}
          sectors={options.sectors}
          articles={options.articles}
          key={`teaser-${section.contentType}-${index}`}
        />
      );
    case "sections.cta-banner-section":
      return (
        <CtaBannerSectionBlock locale={locale} section={section} key={`cta-${index}`} />
      );
    default:
      return null;
  }
}

export async function ContentSectionRenderer({
  locale,
  sections,
  compactAbout = false
}: {
  locale: Locale;
  sections: CmsContentSection[];
  compactAbout?: boolean;
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
  const articles = needsNews ? await fetchLatestArticles(locale, newsLimit) : [];

  return sections.map((section, index) =>
    renderContentSection(locale, section, index, {
      compactAbout,
      sectors,
      articles
    })
  );
}
