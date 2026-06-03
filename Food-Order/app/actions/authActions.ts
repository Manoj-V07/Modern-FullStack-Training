"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await db.query(
    `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`,
    [name, email, password]
  );

  redirect("/login");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await db.query(
    `SELECT * FROM users WHERE email = $1 AND password = $2`,
    [email, password]
  );

  if (result.rows.length === 0) {
    throw new Error("Invalid Credentials");
  }

  const user = result.rows[0];

  const cookieStore = await cookies();

  cookieStore.set("userId", user.id.toString(), {
    httpOnly: true,
    path: "/",
  });

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();

  cookieStore.delete("userId");

  redirect("/login");
}