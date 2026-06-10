"use client"

import { createContext, useState } from "react";

// Create the Cart Context
export const CartContext = createContext<any>(null);

//Create the  CartContextProvider 
export const CartProvider = ({children} : any) => {
    const [cart, setCart] = useState([]);
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

// Wrap the entire app component into Cart Provider