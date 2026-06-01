import { insertFeedback } from "@/database/db";
import SubmitButton from "../component/SubmitButton";

type FeedBackProps = {
    params: {
    id: string;
    };
};

export async function saveFeedback(formData: FormData) {
    'use server';

    const feedback = formData.get("feedback")?.toString().trim() ?? "";
    const blogId = formData.get("postId")?.toString() ?? "";

    if (!feedback) {
        return;
    }

    await insertFeedback(blogId, feedback);
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

                                <SubmitButton />
                        </form>
                </div>
        )
}

export default FeedBack;