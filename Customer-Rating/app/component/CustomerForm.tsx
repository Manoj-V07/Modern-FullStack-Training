"use client"
import { useState } from "react";

function CustomerForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("");

    function handlChangeName(e : any){
        setName(e.target.value);
    }

    function handleChangeEmail(e : any){
        setEmail(e.target.value);
    }

    function handleChangeReview(e : any){
        setReview(e.target.value);
    }

    function handleChangeRating(e : any){
        setRating(e.target.value);
    }

    async function handleSubmit(e : any){
        e.preventDefault();

        try {
                await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    review,
                    rating,
                }),
                });
        } catch(err) {
            console.error("Error caught while inserting : " + err);
        }

        setName("");
        setEmail("");
        setReview("");
        setRating("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Customer Name : </label>
                <input type="name" id="name" value={name} onChange={handlChangeName} required />
                <br />

                <label htmlFor="email">Customer Email : </label>
                <input type="email" id="email" value={email} onChange={handleChangeEmail} required />
                <br />

                <label htmlFor="review">Customer Review : </label>
                <textarea id="review" value={review} onChange={handleChangeReview} required />
                <br />

                <label htmlFor="rating">Customer Rating : </label>
                <input type="number" id="rating" value={rating} onChange={handleChangeRating} min={1} max={5} required />
                <br />

                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    )
}

export default CustomerForm;