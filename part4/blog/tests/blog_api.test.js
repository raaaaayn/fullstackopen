const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./helper");

const api = supertest(app);

describe("blogs api tests", () => {
  const initialBlogs = helper.initialBlogs;
  beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObj = new Blog(initialBlogs[0]);
    await blogObj.save();
    blogObj = new Blog(initialBlogs[0]);
    await blogObj.save();
  });
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a valid blog can be added", async () => {
    const validBlog = helper.validBlog;
    await api
      .post("/api/blogs")
      .send(validBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("an invalid blog cannot be added", async () => {
    const invalidBlog = helper.invalidBlog;
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
  test("checks if id property exists", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});
