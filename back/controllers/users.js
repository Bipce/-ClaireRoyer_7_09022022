const { getManager } = require("typeorm");

const Topic = require("../models/topics");
const User = require("../models/users");
const Message = require("../models/messages");

const deleteMessageWithImages = require("../utils/delete-message");
const deleteTopicWithImages = require("../utils/delete-topic");
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
    for (const topic of req.user.topics) {
      if (!topic.messages) continue;

      for (const message of topic.messages) {
        await deleteMessageWithImages(message);
      }
    }

    req.user = await entityManager.findOne(User, req.user.id, {
      relations: ["topics", "messages", "topics.messages"],
    });

    for (const topic of req.user.topics) {
      await deleteTopicWithImages(topic);
    }

    for (const message of req.user.messages) {
      await deleteMessageWithImages(message);
    }
  }

  await entityManager.delete(User, req.user.id);

  res.status(200).json("Your acount has been deleted !");
};

exports.meRequest = async (req, res) => {
  res.status(200).json({
    username: req.user.username,
    isAdmin: req.user.isAdmin,
    id: req.user.id,
  });
};
