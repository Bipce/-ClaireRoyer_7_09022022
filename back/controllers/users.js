const { getManager } = require("typeorm");

const User = require("../models/users");

const deleteMessageWithImages = require("../utils/delete-message");
const deleteTopicWithImages = require("../utils/delete-topic");

exports.getUsers = async (req, res) => {
  const entityManager = getManager();

  const users = await entityManager.find(User, {
    relations: ["topics"],
  });

  for (const user of users) {
    delete user.password;
  }

  await res.status(200).json(users);
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
