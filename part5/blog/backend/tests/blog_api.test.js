const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const helper = require("./helper");
const bcrypt = require("bcrypt");

const api = supertest(app);

const initialBlogs = helper.initialBlogs;
let token = {};

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("abcd", 10);

  const testuser = new User({
    username: "testuser",
    name: "test user",
    passwordHash,
  });

  await testuser.save();

  const result = await api.post("/api/login").send({ username: "testuser", password: "abcd" });
  token = result.body.token;
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
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(response.body.title).toBe("blog3");
  });

  test("check if an invalid blog cannot be added ,title url are missing", async () => {
    const invalidBlog = helper.invalidBlog;
    await api
      .post("/api/blogs")
      .send(invalidBlog)
      .set({ Authorization: `bearer ${token}` })
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
      .set({ Authorization: `bearer ${token}` })
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});

describe("deleting blogs", () => {
  test("checks if a blog can be deleted with valid id", async () => {
    let result = await api.get("/api/blogs");
    const id = result.body[0].id;
    await api
      .delete(`/api/blogs/${id}`)
      .expect(204)
      .set({ Authorization: `bearer ${token}` });
    result = await api.get("/api/blogs");
    expect(result.body).toHaveLength(helper.initialBlogs.length - 1);
  });

  test("should return maformed id when given improper id", async () => {
    const id = "234234fa";
    const result = await api
      .delete(`/api/blogs/${id}`)
      .expect(400)
      .set({ Authorization: `bearer ${token}` });
    expect(result.text).toBe('{"error":"malformatted id"}');
  });
});

describe("editing amount of likes", () => {
  test("should edit the number of likes when given a valid id", async () => {
    const blogsold = await api.get("/api/blogs");
    const id = blogsold.body[0].id;
    const newBlog = await api.put(`/api/blogs/${id}`);
    const blogsnew = await api.get("/api/blogs");
    expect(blogsnew.body[0].likes).not.toBe(blogsold.body[0].likes);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
