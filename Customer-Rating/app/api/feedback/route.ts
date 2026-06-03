import { NextResponse } from "next/server";
import { pool } from "@/database/db";

export async function POST(req: Request) {
  try {
    const { name, email, review, rating } = await req.json();

    await pool.query(
      `INSERT INTO customer_details
      (name, email, review, rating)
      VALUES ($1,$2,$3,$4)`,
      [name, email, review, rating]
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      {
        status: 500,
      }
    );
  }
}