const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blogReq = request.body;
  const blog = new Blog({
    title: blogReq.title,
    author: blogReq.author,
    url: blogReq.url,
    likes: blogReq.likes,
    user: user._id,
  });
  if (user) {
    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(200).json(result);
  } else {
    response
      .status(401)
      .json({ error: "you have to loging to be able to create blogs" });
  }
});

blogRouter.delete("/:id", middleware.userExtractor, async (req, resp) => {
  const user = req.user;
  const blog = await Blog.findById(req.params.id);
  if (!blog || !user) {
    resp.sendStatus(404);
  } else if (user.id.toString() === blog.user.toString()) {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    resp.sendStatus(204);
  } else {
    resp.sendStatus(401);
  }
});

blogRouter.put("/:id", async (req, resp) => {
  const id = req.params.id;
  result = await Blog.findByIdAndUpdate(id, req.body);
  if (result) {
    resp.status(200).json(result);
  } else {
    resp.sendStatus(404);
  }
});

module.exports = blogRouter;
