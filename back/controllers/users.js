const { getRepository } = require("typeorm");
const HttpError = require("../utils/http-error");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const userRepository = getRepository(User);

  const { id, email, username, password } = req.body;

  let hash = await bcrypt.hash(password, 10);

  const user = {
    id,
    email,
    username,
    password: hash,
  };

  try {
    await userRepository.save(user);
    res.status(201).json({ message: "User created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.login = async (req, res) => {
  const userRepository = getRepository(User);

  const { email, password } = req.body;

  const user = await userRepository.findOne({ email });
  if (!user) throw new HttpError("User not found !", 404);
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new HttpError("Invalid password.", 401);
  res.status(200).json({
    userId: user._id,
    token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }),
  });
};
