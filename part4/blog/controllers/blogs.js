const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogRouter.get("/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogRouter.post("/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((err) => logger.error(err));
});

module.exports = blogRouter;