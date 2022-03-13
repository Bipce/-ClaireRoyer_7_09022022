const error = require("../middlewares/error");
const path = require("path");
const express = require("express");

const usersRouter = require("./users");
const topicsRouter = require("./topics");
const messagesRouter = require("./messages");
const authRouter = require("./auth");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });

  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/topics", topicsRouter);
  app.use("/api/messages", messagesRouter);

  app.use(error);
  app.use("/images", express.static(path.join(__dirname, "images")));
};
