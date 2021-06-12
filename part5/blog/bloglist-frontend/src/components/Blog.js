import React from "react";
import Togglable from "./toggelable";
const Blog = ({ blog }) => (
  <div className="blog">
    <div className="compact-blog">
      {blog.title} {blog.author}
    </div>
    <Togglable buttonLabel="view">
      <div>
        <div>{blog.url}</div>
        <div>
          Likes: {blog.likes} <button>Like</button>
        </div>
        <div>{blog.user ? blog.user.name : null}</div>
      </div>
    </Togglable>
  </div>
);

export default Blog;
