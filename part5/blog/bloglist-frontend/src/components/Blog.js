import React, { useEffect, useState } from "react";
import Togglable from "./toggelable";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs, setAlert, setNotif }) => {
  const [blogid, setBlogid] = useState("");
  useEffect(() => {
    setBlogid(blog.id);
  }, []);

  const handleLike = async () => {
    await blogService.postLike(blogid);
    const result = await blogService.getAll();
    setBlogs(result.sort((prev, next) => next.likes - prev.likes));
  };

  const handleDelete = async () => {
    if (window.confirm("do you really want to delete the blog?")) {
      try {
        await blogService.deleteBlog(blogid);
        setBlogs(blogs.filter((blog) => blog.id !== blogid));
        setNotif(`successfully deleted ${blog.title}`);
        setTimeout(() => {
          setNotif(null);
        }, 3000);
      } catch (err) {
        setAlert("Couldnt delete blog");
        setTimeout(() => {
          setAlert(null);
        }, 3000);
      }
    }
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
          <button onClick={handleDelete}>remove</button>
        </div>
      </Togglable>
    </div>
  );
};

export default Blog;
