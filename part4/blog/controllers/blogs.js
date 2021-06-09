const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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
