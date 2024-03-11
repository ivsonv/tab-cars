import database from "@/infra/database";

export default async function status(request, response) {
  const openConnections = await _openConnections();
  const maxConnections = await _maxConnections();
  const version = await _version();

  response.status(200).json({
    updated_at: new Date().toISOString(),
    database: {
      available_connections: maxConnections - openConnections,
      open_connections: openConnections,
      max_connections: maxConnections,
      version: version,
    },
  });
}

async function _version() {
  const result = await database.query("SHOW server_version;");
  return result.rows[0].server_version;
}

async function _maxConnections() {
  const result = await database.query("SHOW max_connections;");
  return Number(result.rows[0].max_connections);
}

async function _openConnections() {
  const result = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1",
    values: [process.env.POSTGRES_DB],
  });
  return result.rows[0].count;
}
