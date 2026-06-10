"use client"

import { CartContext } from "../context/CartContext";
import { useContext } from "react";

const products = [
    {
        id : 1,
        name : "Macbook Air M5",
        price : 1500
    },
    {
        id : 2,
        name : "Google Pixel 10 Pro Max",
        price : 1200
    },
    {
        id : 3,
        name : "Samsung Galaxy S24 Ultra",
        price : 2000
    }
];

export default function Products() {
    
    // In-front of each product - display addToCart Button
    const {cart, setCart} = useContext(CartContext);

    function addToCart(product : any){
        setCart([...cart, product]);
    }

    // Display all the products
    return (
        <div>
            {
                products.map((product) => (
                    <div key={product.id}>
                        <h3>{product.name}</h3>
                        <h4>{product.price}</h4>
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                ))
            }
        </div>
    )
}