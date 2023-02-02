import { Pool } from "pg";

const { DB_PORT, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_URI, NODE_ENV } =
  process.env;

const pool = new Pool({
  ...(NODE_ENV === "development"
    ? {
        host: DB_HOST,
        user: DB_USER,
        database: DB_NAME,
        port: Number(DB_PORT),
        password: DB_PASSWORD,
      }
    : {
        connectionString: DB_URI,
      }),
});

export default pool;
