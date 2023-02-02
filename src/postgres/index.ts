import {Pool} from "pg";

const {DB_PORT,
    DB_NAME,
    DB_HOST,
    DB_USER,
    DB_PASSWORD} = process.env;

const pool = new Pool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
  });

export default pool;