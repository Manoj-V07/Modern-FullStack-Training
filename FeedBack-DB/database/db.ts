import { Pool } from "pg";

const connectionString =
  process.env.DATABASE_URL ??
  `postgresql://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DB_NAME}`;

const pool = new Pool({
  connectionString,
});

export async function insertFeedback(blogId: string, feedback: string) {
  await pool.query("INSERT INTO feedbacks (blogid, feedback) VALUES ($1, $2)", [
    blogId,
    feedback,
  ]);
}