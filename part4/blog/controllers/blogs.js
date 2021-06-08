const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/blogs", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/blogs", async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
  response.status(200).json(result);
  // blog
  //   .save()
  //   .then((result) => {
  //     response.status(201).json(result);
  //   })
  //   .catch((err) => next(err));
});

blogRouter.delete("/blogs/:id", async (req, resp) => {
  const id = req.params.id;
  console.log(id);
  result = await Blog.findByIdAndDelete(id);
  resp.status(204).json(result);
});

module.exports = blogRouter;
