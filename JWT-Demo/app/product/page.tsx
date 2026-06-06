'use client'

import Productcard from "@/components/ProductCard"
import storeProducts from "@/app/actions/storeProduct"
import { useState, useEffect } from "react"

const page = () => {

    const [products, setProducts] = useState([])
    useEffect(() => {
        async function getData() {
            const response = await fetch('https://fakestoreapi.com/products')
            const data = await response.json()
            setProducts(data)
        }
        getData()
    }, [])

    useEffect(() =>{
        storeProducts(products)
    }, [products])

    return (
        <div>
            {products.map((product: any) => (
                <Productcard product={product} key={product.id} />
            ))}
        </div>
    )
}

export default page