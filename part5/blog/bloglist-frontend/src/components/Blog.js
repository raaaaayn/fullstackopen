import React, { useEffect, useState } from "react";
import Togglable from "./toggelable";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  const [blogid, setBlogid] = useState("");
  useEffect(() => {
    setBlogid(blog.id);
  }, []);

  const handleLike = async () => {
    const editedBlog = await blogService.postLike(blogid);
    const result = await blogService.getAll();
    setBlogs(result.sort((prev, next) => next.likes - prev.likes));
  };

  return (
    <div className="blog">
      <div className="compact-blog">
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view">
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes} <button onClick={handleLike}>Like</button>
          </div>
          <div>{blog.user ? blog.user.name : null}</div>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
