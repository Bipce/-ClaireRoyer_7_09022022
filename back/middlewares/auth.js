const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");
const { getManager } = require("typeorm");
const User = require("../models/users");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new HttpError("Bad request", 403);
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const entityManager = getManager();

    const user = await entityManager.findOne(User, decodedToken.userId, {
      relations: ["topics", "messages", "topics.messages"],
    });
    if (!user) throw new HttpError("You are not allowed !", 403);
    req.user = user;
    next();
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
