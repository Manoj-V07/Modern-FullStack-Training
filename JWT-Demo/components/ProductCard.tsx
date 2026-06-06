function ProductCard({ product }: { product: any }) {
    return (
        <div>
            <h3>{product.title}</h3>
            <h6>{product.description}</h6>
            <p>${product.price}</p>
        </div>
    )
}

export default ProductCard