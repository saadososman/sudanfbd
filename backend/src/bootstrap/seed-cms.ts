import { seedHomepage } from "./seed-homepage";
import { seedPages } from "./seed-pages";
import { seedSectors } from "./seed-sectors";
import { seedSiteConfig } from "./seed-site-config";
import type { SeedStrapi } from "./helpers";

export async function seedCms(strapi: SeedStrapi) {
  strapi.log.info("Starting full CMS seed (ar/en)...");

  await seedSiteConfig(strapi);
  await seedHomepage(strapi);
  await seedPages(strapi);
  await seedSectors(strapi);

  strapi.log.info("Full CMS seed completed.");
}
