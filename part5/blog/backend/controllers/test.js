const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/", async (req, resp) => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  resp.sendStatus(204);
});

module.exports = router;
