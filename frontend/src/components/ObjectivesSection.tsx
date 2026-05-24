import { ArrowUpRight, Blocks, FileCheck2, Network, Scale } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";

const icons = [FileCheck2, Network, Scale, Blocks];

export function ObjectivesSection({ locale }: { locale: Locale }) {
  const objectives = dictionary[locale].objectives;

  return (
    <section className="section objectives-section">
      <div className="container objectives-layout">
        <div className="objectives-copy reveal">
          <span className="section-kicker">{objectives.kicker}</span>
          <h2>{objectives.title}</h2>
          {objectives.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="objectives-grid">
          {objectives.cards.map((card, index) => {
            const Icon = icons[index] || ArrowUpRight;
            return (
              <article className="objective-card reveal" style={{ animationDelay: `${index * 90}ms` }} key={card.title}>
                <span className="objective-icon">
                  <Icon size={23} />
                </span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
                <ArrowUpRight className="objective-arrow" size={18} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
