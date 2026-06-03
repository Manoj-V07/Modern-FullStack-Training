import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
    request: Request
) {
    const body =
        await request.json();

    const cookieStore =
        await cookies();

    const userId =
        cookieStore.get("userId")
            ?.value;

    await db.query(
        `
        INSERT INTO cart
        (user_id,
            food_id,
            food_name,
            quantity
        )
        VALUES
        (
            $1,
            $2,
            $3,
            1
        )
        `,
        [
            userId,
            body.foodId,
            body.foodName,
        ]
    );

    return NextResponse.json({
        success: true,
    });
}