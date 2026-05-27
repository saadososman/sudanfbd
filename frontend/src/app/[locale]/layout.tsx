import { notFound } from "next/navigation";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { UiLabelsProvider } from "@/components/UiLabelsProvider";
import { fetchActiveAnnouncements, fetchSiteConfig } from "@/lib/cms";
import { dictionary, isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const t = dictionary[locale];
  const [siteConfig, announcements] = await Promise.all([
    fetchSiteConfig(locale),
    fetchActiveAnnouncements(locale)
  ]);

  return (
    <html lang={locale} dir={t.dir}>
      <body>
        <UiLabelsProvider labels={siteConfig.uiLabels}>
          <div className="site-shell">
            <Header locale={locale} siteConfig={siteConfig} />
            <AnnouncementBanner locale={locale} announcements={announcements} />
            <main className="main">{children}</main>
            <Footer siteConfig={siteConfig} />
          </div>
        </UiLabelsProvider>
      </body>
    </html>
  );
}
