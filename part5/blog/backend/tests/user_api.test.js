const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./helper_users");

const api = supertest(app);

const initialUser = helper.initialUser;

beforeEach(async () => {
  await User.deleteMany({});
});

describe("test the user api", () => {
  test("gets previous users", async () => {
    const result = await api.get("/api/users").expect(200);
  });

  test("adds a valid user", async () => {
    const result = await api.post("/api/users").send(initialUser).expect(200);
    expect(result.body.username).toBe(initialUser.username);
  });

  test("shouldnt add an user with short password", async () => {
    const mockuser = {
      username: "buttnuster123",
      name: "Butt Nuster",
      password: "12",
    };
    result = await api.post("/api/users").send(mockuser).expect(400);
    expect(result.body).toEqual({
      error: "password length must be greater than 3",
    });
  });

  test("shouldnt add two users with same username", async () => {
    const mockuser1 = {
      username: "poopuinu",
      name: "Butt Nuster",
      password: "123",
    };
    const mockuser2 = {
      username: "poopuinu",
      name: "Butt Nuster",
      password: "123",
    };
    await api.post("/api/users").send(mockuser1).expect(200);
    let result = await api.post("/api/users").send(mockuser2).expect(400);
    expect(result.body).toEqual({ error: "username has already been taken" });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
