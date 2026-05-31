"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Blog } from "@/types/blog";

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/posts"
        );

        const data = await response.json();

        setBlogs(
          Array.isArray(data.posts)
            ? data.posts.map((post: { id: number; title: string; body: string }) => ({
                id: post.id,
                title: post.title,
                content: post.body,
              }))
            : []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Blog Posts</h1>
      <br />

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}