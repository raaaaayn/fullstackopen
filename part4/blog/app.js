// connects to mongodb and uses middlewares for app and shit
const http = require("http");
const express = require("express");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

const app = express();
const cors = require("cors");

const Blog = require("./models/blog");

const blogRouter = require("./controllers/blogs");

const mongoUrl = config.MONGODB_URL;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connnected to mongodb"));

app.use(cors());
app.use(express.json());
app.use("/api", blogRouter);

module.exports = app;
