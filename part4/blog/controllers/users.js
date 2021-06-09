const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(request.body.password, saltRounds);

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
  await Blog.findByIdAndDelete(id);
  resp.sendStatus(204);
});

// blogRouter.put("/users/:id", async (req, resp) => {
//   const id = req.params.id;
//   result = await Blog.findByIdAndUpdate(id, req.body);
//   resp.send(200).json(result);
// });

module.exports = userRouter;
