import Database from "better-sqlite3";

const db = new Database(".tmp/data.db", { readonly: true });

const publicRole = db.prepare("SELECT id, type, name FROM up_roles WHERE type = 'public'").get();
console.log("publicRole:", publicRole);

const linked = db
  .prepare(
    `SELECT p.action
     FROM up_permissions p
     JOIN up_permissions_role_lnk l ON l.permission_id = p.id
     WHERE l.role_id = ?
     ORDER BY p.action`
  )
  .all(publicRole.id);
console.log("public linked actions:", linked);

const sectorPerm = db
  .prepare("SELECT * FROM up_permissions WHERE action = 'api::sector.sector.find'")
  .get();
console.log("sector find permission row:", sectorPerm);

db.close();
