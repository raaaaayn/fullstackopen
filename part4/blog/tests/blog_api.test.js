const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./helper");

const api = supertest(app);

const initialBlogs = helper.initialBlogs;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("when blogs are already present in the database", () => {
  test("checks if blogs are returned as json with status 200", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("check if all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(initialBlogs.length);
  });
  test("checks if id property exists", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });
});

describe("adding blogs", () => {
  test("checks if a valid blog can be added", async () => {
    const validBlog = helper.validBlog;
    const response = await api
      .post("/api/blogs")
      .send(validBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.title).toBe("blog3");
  });

  test("check if an invalid blog cannot be added ,title url are missing", async () => {
    const invalidBlog = helper.invalidBlog;
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  test("checks if likes is missing defaults to 0 and uploads it to db", async () => {
    let blog = helper.invalidBlog2;
    if (!blog.likes) {
      blog = { ...blog, likes: 0 };
    }
    await api
      .post("/api/blogs")
      .send(blog)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting blogs", () => {
  test("checks if a blog can be delete with valid id", async () => {
    let result = await api.get("/api/blogs");
    const id = result.body[0].id;
    console.log(id);
    await api.delete(`/api/blogs/${id}`).expect(204);
    result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length - 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
