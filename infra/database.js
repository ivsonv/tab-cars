import { Client } from "pg";

export const query = async (queryObject) => {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    ssl: _getSSL()
  });

  try {
    await client.connect();
    return await client.query(queryObject);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
};

function _getSSL() {
  if (process.env.POSTGRES_CA) return { ca: process.env.POSTGRES_CA };

  return process.env.NODE_ENV === "production";
} 

export default { query };
