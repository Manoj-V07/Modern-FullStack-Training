import Link from "next/link";
import { notFound } from "next/navigation";
import FeedBack from "@/app/component/FeedBack";

type BlogDetailProps = {
  params: Promise<{
    id: string;
  }>;
};

async function BlogDetail({ params }: BlogDetailProps) {
    const { id } = await params;
    const response = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!response.ok) {
        notFound();
    }

    const post = await response.json();

    return (
        <main>
            <Link href="/">Back to posts</Link>
            <h1>{post.title}</h1>
            <p>{post.body}</p>

            <br />

            <FeedBack params={{ id: String(post.id) }} />
        </main>
    );
}

export default BlogDetail;