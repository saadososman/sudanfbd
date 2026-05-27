import type { Core } from "@strapi/strapi";
import { seedHomepageHeroStats } from "./bootstrap/seed-homepage-hero-stats";

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.SEED_HOMEPAGE_HERO_STATS !== "true") return;

    try {
      await seedHomepageHeroStats(strapi);
      strapi.log.info("Seeded homepage hero and stats for ar/en locales.");
    } catch (error) {
      strapi.log.warn(
        `Homepage hero/stats seed skipped: ${error instanceof Error ? error.message : "unknown error"}`
      );
    }
  }
};
