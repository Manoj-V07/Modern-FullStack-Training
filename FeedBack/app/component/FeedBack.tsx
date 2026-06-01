import fs from "fs/promises";
import path from "path";

type FeedBackProps = {
    params: {
    id: string;
    };
};

export async function saveFeedback(formData: FormData) {
    'use server';

    const feedback = formData.get("feedback")?.toString().trim() ?? "";
    const postId = formData.get("postId")?.toString() ?? "";

    if (!feedback) {
        return;
    }

    const filePath = path.join(process.cwd(), "app", "data", "feedback.json");

    let feedbacks: Array<{ postId: string; feedback: string }> = [];

    try {
        const feedbackData = await fs.readFile(filePath, "utf-8");
        const parsedFeedbacks = JSON.parse(feedbackData);

        if (Array.isArray(parsedFeedbacks)) {
            feedbacks = parsedFeedbacks;
        }
    } catch {
        feedbacks = [];
    }

    feedbacks.push({
        postId,
        feedback,
    });

    await fs.writeFile(filePath, JSON.stringify(feedbacks, null, 2), "utf-8");
}

async function FeedBack({ params }: FeedBackProps) {
        const { id } = params;

        return (
                <div>
                        <form action={saveFeedback}>
                                <input type="hidden" name="postId" value={id} />
                                <label htmlFor="feedback">Feedback : </label>
                                <input type="text" name="feedback" />

                                <br />
                                <br />

                                <button type="submit">Submit Feedback</button>
                        </form>
                </div>
        )
}

export default FeedBack;