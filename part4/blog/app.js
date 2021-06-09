// connects to mongodb and uses middlewares for app and shit
const http = require("http");
const express = require("express");
require("express-async-errors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const app = express();
const cors = require("cors");

const Blog = require("./models/blog");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connnected to mongodb");
    logger.info("---");
  })
  .catch((err) => logger.error(err.messege));

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
