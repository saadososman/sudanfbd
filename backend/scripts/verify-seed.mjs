import Database from "better-sqlite3";

const db = new Database(".tmp/data.db", { readonly: true });

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name")
  .all()
  .map((row) => row.name);

function summarizeTable(tableName) {
  if (!tables.includes(tableName)) {
    return { tableName, status: "missing table" };
  }

  const columns = db.prepare(`PRAGMA table_info(${tableName})`).all().map((col) => col.name);
  const hasLocale = columns.includes("locale");
  const hasPublishedAt = columns.includes("published_at");

  if (hasLocale) {
    const rows = db
      .prepare(
        `SELECT locale, ${hasPublishedAt ? "published_at" : "NULL as published_at"}, document_id FROM ${tableName} ORDER BY locale`
      )
      .all();

    return {
      tableName,
      rowCount: rows.length,
      rows: rows.map((row) => ({
        locale: row.locale,
        state: row.published_at ? "published" : "draft",
        documentId: String(row.document_id).slice(0, 12)
      }))
    };
  }

  const count = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get().count;
  return { tableName, rowCount: count };
}

const siteConfig = summarizeTable("site_configs");
const homepage = summarizeTable("homepages");
const pages = summarizeTable("pages");
const sectors = summarizeTable("sectors");

console.log(JSON.stringify({ siteConfig, homepage, pages, sectors }, null, 2));

if (tables.includes("homepages_cmps")) {
  const sectionCounts = db
    .prepare(
      `SELECT h.locale, COUNT(c.id) as section_count
       FROM homepages h
       LEFT JOIN homepages_cmps c ON c.entity_id = h.id
       GROUP BY h.locale
       ORDER BY h.locale`
    )
    .all();
  console.log("homepageSections:", sectionCounts);

  const sectionTypes = db
    .prepare(
      `SELECT h.locale, c.component_type, COUNT(*) as count
       FROM homepages h
       JOIN homepages_cmps c ON c.entity_id = h.id
       WHERE h.published_at IS NOT NULL
       GROUP BY h.locale, c.component_type
       ORDER BY h.locale, c.component_type`
    )
    .all();
  console.log("homepageSectionTypes:", sectionTypes);
}

if (tables.includes("site_configs")) {
  const siteNames = db.prepare("SELECT locale, site_name FROM site_configs").all();
  console.log("siteNames:", siteNames);
}

if (tables.includes("pages")) {
  const pageSlugs = db
    .prepare(
      `SELECT locale, slug, published_at IS NOT NULL as published
       FROM pages
       ORDER BY slug, locale`
    )
    .all();
  console.log("pagesBySlug:", pageSlugs);
}

if (tables.includes("sectors")) {
  const sectorCounts = db
    .prepare(
      `SELECT locale, COUNT(DISTINCT document_id) as unique_sectors
       FROM sectors
       WHERE published_at IS NOT NULL
       GROUP BY locale`
    )
    .all();
  console.log("publishedSectorCounts:", sectorCounts);
}

db.close();
