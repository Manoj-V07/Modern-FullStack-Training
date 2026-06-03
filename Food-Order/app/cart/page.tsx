import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function CartPage() {
    const cookieStore = await cookies();

    const userId =
        cookieStore.get("userId")?.value;

    if (!userId) {
        redirect("/login");
    }

    const result = await db.query(
        `
        SELECT *
        FROM cart
        WHERE user_id = $1
        `,
        [userId]
    );

    const cartItems = result.rows;

    return (
        <div>
            <h1>Cart Items</h1>

            {cartItems.length === 0 ? (
                <p>No items in cart</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id}>
                        <h3>
                            {item.food_name}
                        </h3>

                        <p>
                            Quantity:{" "}
                            {
                                item.quantity
                            }
                        </p>

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}