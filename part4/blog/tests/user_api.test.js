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
  test("shouldnt add an invalid user", async () => {
    const initialuser = {
      username: "buttnuster123",
      name: "Butt Nuster",
    };

    await api.post("/api/users").send(initialuser).expect(500);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
