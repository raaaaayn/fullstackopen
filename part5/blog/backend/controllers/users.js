const userRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
  });
  response.json(users.map((user) => user.toJSON()));
});

userRouter.post("/", async (request, response) => {
  const password = request.body.password;
  if (password.length < 3) {
    response
      .status(400)
      .json({ error: "password length must be greater than 3" });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username: request.body.username,
    name: request.body.username,
    passwordHash,
  });
  const result = await user.save();
  response.status(200).json(result);
});

userRouter.delete("/:id", async (req, resp) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  resp.sendStatus(204);
});

// blogRouter.put("/users/:id", async (req, resp) => {
//   const id = req.params.id;
//   result = await Blog.findByIdAndUpdate(id, req.body);
//   resp.send(200).json(result);
// });

module.exports = userRouter;
