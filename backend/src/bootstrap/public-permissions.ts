import type { Core } from "@strapi/strapi";

const PUBLIC_READ_ACTIONS = [
  "api::site-config.site-config.find",
  "api::homepage.homepage.find",
  "api::page.page.find",
  "api::page.page.findOne",
  "api::sector.sector.find",
  "api::sector.sector.findOne",
  "api::article.article.find",
  "api::article.article.findOne",
  "api::news-item.news-item.find",
  "api::news-item.news-item.findOne",
  "api::forum-document.forum-document.find",
  "api::forum-document.forum-document.findOne",
  "api::announcement.announcement.find",
  "api::announcement.announcement.findOne",
  "plugin::upload.content-api.find",
  "plugin::upload.content-api.findOne"
] as const;

export async function configurePublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query("plugin::users-permissions.role").findOne({
    where: { type: "public" },
    populate: ["permissions"]
  });

  if (!publicRole) {
    strapi.log.warn("Public role not found; skipping public permissions bootstrap.");
    return;
  }

  const existingActions = new Set(
    (publicRole.permissions ?? []).map((permission: { action: string }) => permission.action)
  );

  let added = 0;

  for (const action of PUBLIC_READ_ACTIONS) {
    if (existingActions.has(action)) continue;

    await strapi.db.query("plugin::users-permissions.permission").create({
      data: {
        action,
        role: publicRole.id
      }
    });
    added++;
  }

  if (added > 0) {
    strapi.log.info(`Public API read permissions enabled (${added} actions).`);
  }
}
