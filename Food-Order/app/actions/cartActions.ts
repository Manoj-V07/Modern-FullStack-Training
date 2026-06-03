"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addToCart(
    foodId: number,
    foodName: string
) {
    const cookieStore = await cookies();

    const userId =
        cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/login");
    }

    // Step 1: check if item already exists
    const existing = await db.query(
        `
        SELECT *
        FROM cart
        WHERE user_id = $1
        AND food_id = $2
        `,
        [userId, foodId]
    );

    if (existing.rows.length > 0) {
        // Step 2: update quantity
        await db.query(
            `
            UPDATE cart
            SET quantity = quantity + 1
            WHERE user_id = $1
            AND food_id = $2
            `,
            [userId, foodId]
        );
    } else {
        // Step 3: insert new item
        await db.query(
            `
            INSERT INTO cart
            (user_id, food_id, food_name, quantity)
            VALUES ($1, $2, $3, 1)
            `,
            [userId, foodId, foodName]
        );
    }
}