const jwt = require("jsonwebtoken");
const HttpError = require("../utils/http-error");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new HttpError("Bad request", 403);
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.userId = userId;
    next();
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
