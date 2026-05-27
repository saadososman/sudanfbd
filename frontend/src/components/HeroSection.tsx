import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import type { CmsHeroSection } from "@/lib/cms/types";
import { localePath } from "@/lib/locale-path";
import type { Locale } from "@/lib/i18n";

const iconMap: Record<string, LucideIcon> = {
  FileText
};

function CtaIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = iconMap[name];
  if (!Icon) return null;
  return <Icon size={18} />;
}

export function HeroSection({
  locale,
  section
}: {
  locale: Locale;
  section: CmsHeroSection;
}) {
  return (
    <section className="hero">
      <div className="container hero-inner home-hero">
        <div className="hero-copy reveal">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h1>{section.title}</h1>
          {section.body ? <p>{section.body}</p> : null}
          <div className="hero-actions">
            {section.primaryCta ? (
              <Link className="button" href={localePath(locale, section.primaryCta.path)}>
                {section.primaryCta.label}
                <ArrowUpRight size={18} />
              </Link>
            ) : null}
            {section.secondaryCta ? (
              <Link
                className="button secondary"
                href={localePath(locale, section.secondaryCta.path)}
              >
                <CtaIcon name={section.secondaryCta.icon} />
                {section.secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="hero-visual reveal delay-1" aria-hidden="true">
          <div className="logo-orbit">
            {section.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={section.imageUrl} alt="" />
            ) : (
              <Image src="/logo.jpeg" alt="" width={420} height={420} priority />
            )}
          </div>
          {section.insightOne ? (
            <div className="hero-insight insight-a">
              <BarChart3 size={20} />
              <span>{section.insightOne}</span>
            </div>
          ) : null}
          {section.insightTwo ? (
            <div className="hero-insight insight-b">
              <ShieldCheck size={20} />
              <span>{section.insightTwo}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
