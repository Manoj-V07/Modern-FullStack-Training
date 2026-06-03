import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

export const pool = new Pool({
  connectionString,
});
