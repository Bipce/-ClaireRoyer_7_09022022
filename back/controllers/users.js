const { getManager } = require("typeorm");

const User = require("../models/users");

exports.getUsers = async (req, res) => {
  const entityManager = getManager();

  const users = await entityManager.find(User, {
    relations: ["topics"],
  });
  await res.status(200).json(users);
};

// exports.modifyUser = async (req, res) => {
//   const userRepository = getRepository(User);

//   const user = await userRepository.findOne({ id });
//   console.log(user);
// };

// Modify user
// Delete user
