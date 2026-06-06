'use server'

import prisma from "@/lib/prisma"

export default async function storeProducts(products: any[]) {
    try {
        const dataToInsert = products.map((product) => ({
            prod_name: product.title,
            description: product.description,
            price: product.price,
        }))

        await prisma.product.createMany({
            data: dataToInsert,
            skipDuplicates: true, 
        })
        
        return { success: true }
    } catch (error) {
        console.error("Database insertion failed:", error)
        return { success: false, error: "Failed to save products" }
    }
}