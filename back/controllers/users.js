const { getRepository } = require("typeorm");

const User = require("../models/users");

exports.getUsers = async (req, res) => {
  const userRepository = getRepository(User);

  const users = await userRepository.find({ relations: ["topics"] });
  await res.status(200).json(users);
};
