import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
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
    </main>
  );
}