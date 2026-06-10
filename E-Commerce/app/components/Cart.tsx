"use client"

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
    const {cart} = useContext(CartContext);

    //Calculate the total price of the added items from the cart
    const totalPrice = cart.reduce((acc : any, product : any) => {
        return acc + product.price;
    }, 0)
    return (
        <div>
            {
                cart && cart.map((product : any) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <h4>{product.price}</h4>
                    </div>
                ))
            }
            <h3>Total Price : ${totalPrice}</h3>
        </div>
    )
}