"use client";

import { useEffect, useState } from "react";
import Feedback from "@/types/feedback";

export default function FeedbackPage() {
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    getAllFeedback();
  }, []);

  async function getAllFeedback() {
    const response = await fetch("/api/feedbacks");
    const data = await response.json();

    setFeedbacks(data.data);
  }

  async function addFeedback() {
    const response = await fetch("/api/feedbacks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    if (response.ok) {
      alert("Feedback added successfully");
      setMessage("");
      getAllFeedback();
    }
  }

  async function deleteFeedback(id: number) {
    const response = await fetch(
      `/api/feedbacks?id=${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      alert("Feedback deleted successfully");
      getAllFeedback();
    }
  }

  return (
    <div>
      <h1>Feedback Form</h1>

      <input type="text" placeholder="Enter feedback" value={message} onChange={(e) => setMessage(e.target.value)} required />

      <button onClick={addFeedback}>Submit</button>
      <hr />

      {
        feedbacks.map((feedback) => (
            <div key={feedback.id}>
                <h4>{feedback.id}</h4>
                <p>{feedback.message}</p>

                <button onClick={() => deleteFeedback(feedback.id) }>Delete</button>
                <hr />
            </div>
      ))}
    </div>
  );
}