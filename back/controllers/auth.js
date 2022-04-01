const { getManager } = require("typeorm");
const HttpError = require("../utils/http-error");
const jwt = require("jsonwebtoken");

const User = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const entityManager = getManager();

  const { email, username, password } = req.body;

  let hash = await bcrypt.hash(password, 10);

  const user = {
    email,
    username,
    password: hash,
  };

  try {
    await entityManager.save(User, user);
    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET),
      user: { username: user.username },
    });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.login = async (req, res) => {
  const entityManager = getManager();

  const { email, password } = req.body;

  const user = await entityManager.findOne(User, { email });
  if (!user) throw new HttpError("User not found !", 404);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new HttpError("Invalid password.", 401);
  const options = {};
  if (process.env.NODE_ENV === "production") {
    options.expiresIn = "24h";
  }
  res.status(200).json({
    userId: user._id,
    isAdmin: user.isAdmin,
    token: jwt.sign({ userId: user.id }, process.env.JWT_SECRET, options),
    user: { username: user.username, isAdmin: user.isAdmin, id: user.id },
  });
};
