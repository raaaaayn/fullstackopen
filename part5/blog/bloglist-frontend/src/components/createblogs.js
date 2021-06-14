import React, { useState } from "react";
import blogService from "../services/blogs";

const CreateBlogs = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setAuthor("");
    setUrl("");
    const blogObj = {
      title,
      author,
      url,
    };
    const result = await blogService.postBlog(blogObj);
    console.log("result", result);
    if (result) {
      console.log("result", result);
      props.setBlogs(props.blogs.concat(result));
      props.setNotif(`successfully added ${result.title}`);
      setTimeout(() => {
        props.setNotif(null);
      }, 3000);
    } else {
      props.setAlert("Couldnt add blog");
      setTimeout(() => {
        props.setAlert(null);
      }, 3000);
    }
  };
  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>title:</div>
        <input
          type="text"
          value={title}
          id="title"
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
        <div>
          author:
          <input
            type="text"
            value={author}
            id="author"
            name="Username"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id="url"
            value={url}
            name="Username"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog">create</button>
      </form>
    </div>
  );
};

export default CreateBlogs;
