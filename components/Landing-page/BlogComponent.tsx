import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  title: string;
  description: string;
  url: string;
  image: string; // G News API uses 'image' instead of 'urlToImage'
  source: {
    name: string;
  };
}

const BlogComponent = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const url = `https://gnews.io/api/v4/search?q=travel&lang=en&country=in&max=10&apikey=88da46262c9d4a2eac61538a3e45e397`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        // Assuming 'articles' is the key containing blog data in the response
        setBlogs(data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading blogs...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Slice the blogs array to show only the first 4 blogs */}
      {blogs?.slice(0, 4).map((blog, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          {blog.image && (
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md"
              width={600}
              height={300}
            />
          )}
          <h3 className="text-2xl font-bold mt-4">{blog.title}</h3>
          <p className="text-gray-600 mt-2">{blog.description}</p>
          <a
            href={blog.url}
            className="text-blue-500 hover:underline mt-4 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
          <span className="text-sm text-gray-500 block mt-2">
            Source: {blog.source.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BlogComponent;
