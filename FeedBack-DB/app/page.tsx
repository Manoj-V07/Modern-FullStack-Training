"use client"
import { useState , useEffect } from "react";
import Blog from "@/types/blog";
import Link from "next/link";

export default function Home() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const fetchData = async() => {
      
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();

        setBlogs(
          Array.isArray(data.posts) 
          ? data.posts.map((post: {id : number, title : string, body : string}) => ({
              id : post.id,
              title : post.title,
              body : post.body,
          }))
          : []
        );

      } catch(err) {
        console.log("Error occured while fetching the data " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading) {
    return <h2>Loading.......</h2>;
  }

  return (
    <div>
      <h2>Blog Title : </h2>
      {
        blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <h4>{blog.title}</h4>
            </Link>
          </li>
        ))
      }
    </div>
  );
}
