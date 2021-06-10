const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const token = request.token;
  console.log(token);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  logger.info(user);

  const blogReq = request.body;
  const blog = new Blog({
    title: blogReq.title,
    author: blogReq.author,
    url: blogReq.url,
    likes: blogReq.likes,
    user: user._id,
  });

  const result = await blog.save();
  console.log(result);
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(200).json(result);
});

blogRouter.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  resp.sendStatus(204);
});

blogRouter.put("/:id", async (req, resp) => {
  const id = req.params.id;
  result = await Blog.findByIdAndUpdate(id, req.body);
  resp.send(200).json(result);
});

module.exports = blogRouter;
