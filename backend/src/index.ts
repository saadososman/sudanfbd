import type { Core } from "@strapi/strapi";
import { asSeedStrapi } from "./bootstrap/helpers";
import { seedCms } from "./bootstrap/seed-cms";
import { seedHomepageHeroStats } from "./bootstrap/seed-homepage-hero-stats";
import { seedSiteConfig } from "./bootstrap/seed-site-config";

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.SEED_CMS === "true") {
      try {
        await seedCms(asSeedStrapi(strapi));
      } catch (error) {
        strapi.log.warn(
          `Full CMS seed skipped: ${error instanceof Error ? error.message : "unknown error"}`
        );
      }
      return;
    }

    if (process.env.SEED_HOMEPAGE_HERO_STATS === "true") {
      try {
        await seedHomepageHeroStats(asSeedStrapi(strapi));
        strapi.log.info("Seeded homepage hero and stats for ar/en locales.");
      } catch (error) {
        strapi.log.warn(
          `Homepage hero/stats seed skipped: ${error instanceof Error ? error.message : "unknown error"}`
        );
      }
    }

    if (process.env.SEED_SITE_CONFIG === "true") {
      try {
        await seedSiteConfig(asSeedStrapi(strapi));
        strapi.log.info("Seeded site config navbar/footer for ar/en locales.");
      } catch (error) {
        strapi.log.warn(
          `Site config seed skipped: ${error instanceof Error ? error.message : "unknown error"}`
        );
      }
    }
  }
};
