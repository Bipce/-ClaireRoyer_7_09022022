const { getConnection } = require("typeorm");
const HttpError = require("../utils/http-error");

const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const connection = getConnection();
  const repository = connection.getRepository(User);

  const { id, email, username, password } = req.body;

  let hash = await bcrypt.hash(password, 10);

  const user = {
    id,
    email,
    username,
    password: hash,
  };

  try {
    await repository.save(user);
    res.status(201).json({ message: "User created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
