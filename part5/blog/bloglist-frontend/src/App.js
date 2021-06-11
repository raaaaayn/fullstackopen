import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedinUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const userObj = { username, password };
    const result = await loginService.login(userObj);
    setUser(result);
    setUsername("");
    setPassword("");
    if (result) {
      window.localStorage.setItem("loggedinUser", JSON.stringify(result));
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.localStorage.removeItem("loggedinUser");
  };

  const loginForm = () => (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <h3>{user.username} logged in</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h1>blogs</h1>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
