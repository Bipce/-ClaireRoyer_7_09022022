const { getManager } = require("typeorm");
const Topic = require("../models/topics");
const Message = require("../models/messages");

const User = require("../models/users");
const HttpError = require("../utils/http-error");

exports.getUsers = async (req, res) => {
  const entityManager = getManager();

  const users = await entityManager.find(User, {
    relations: ["topics"],
  });
  await res.status(200).json(users);
};

exports.modifyUser = async (req, res) => {
  const entityManager = getManager();

  if (req.body.id) throw new HttpError("You are not allowed !", 403);

  const user = await entityManager.findOne(User, req.params.id);
  if (!user) throw new HttpError("User not found !", 404);

  try {
    const updatedUser = await entityManager.update(
      User,
      { id: user.id },
      { ...req.body }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.deleteUser = async (req, res) => {
  const entityManager = getManager();

  if (req.query.recursive === "true") {
    for (const message of req.user.messages) {
      await entityManager.delete(Message, message.id);
    }
    for (const topics of req.user.topics) {
      await entityManager.delete(Topic, topics.id);
    }
  }

  await entityManager.delete(User, req.user.id);

  res.status(200).json("User and all messages has been deleted !");
};
