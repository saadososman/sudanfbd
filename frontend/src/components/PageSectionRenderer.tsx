import { ContentSectionRenderer } from "@/components/ContentSectionRenderer";
import type { CmsPageSection } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n";

export async function PageSectionRenderer({
  locale,
  sections,
  compactManifesto = false
}: {
  locale: Locale;
  sections: CmsPageSection[];
  compactManifesto?: boolean;
}) {
  return (
    <ContentSectionRenderer
      locale={locale}
      sections={sections}
      compactAbout={compactManifesto}
    />
  );
}
