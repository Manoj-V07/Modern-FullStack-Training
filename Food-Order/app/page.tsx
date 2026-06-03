"use client";

import { useEffect, useState } from "react";
import { Food } from "@/types/food";
import { addToCart } from "@/app/actions/cartActions";

export default function HomePage() {
    const [foods, setFoods] = useState<Food[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("");

    useEffect(() => {
        getFoods();
    }, []);

    async function getFoods() {
        const response = await fetch("/api/foods");
        const data = await response.json();

        setFoods(data);
    }

    const filteredFoods = foods.filter((food) =>
            food.name.toLowerCase().includes(search.toLowerCase())
        ).filter((food) => {
            if (category === "") return true;

            if (category === "veg")
                return food.is_veg;

            return !food.is_veg;
        });

    if (sort === "low-to-high") {
        filteredFoods.sort(
            (a, b) => a.price - b.price
        );
    }

    if (sort === "high-to-low") {
        filteredFoods.sort(
            (a, b) => b.price - a.price
        );
    }

    return (
        <div>
            <h1>Food Menu</h1>

            <label htmlFor="search">Search : </label>
            <input type="text" placeholder="Search Food" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <br /><br />

            <label htmlFor="category">Category : </label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
            </select>
            <br /><br />

            <label htmlFor="sort">Sort : </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="">Default</option>
                <option value="low-to-high">Price Low To High</option>
                <option value="high-to-low">Price High To Low</option>
            </select>
            <br /><br />

            {filteredFoods.map((food) => (
                <div key={food.id}>
                    <h3>{food.name}</h3>
                    <p>Price: ₹{food.price}</p>
                    <p>{food.description}</p>
                    <p>Rating : {food.rating}</p>
                    <p>{food.is_veg ? "Veg" : "Non-Veg"}</p>
                    <button onClick={async () => {await addToCart(food.id,food.name);}}>Add To Cart</button>
                    <hr />
                </div>
            ))}
        </div>
    );
}