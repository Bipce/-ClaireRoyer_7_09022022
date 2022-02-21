const { getRepository } = require("typeorm");
const HttpError = require("../utils/http-error");

const Message = require("../models/messages");
const Topic = require("../models/topics");
const User = require("../models/users");

exports.createMessage = async (req, res) => {
  const { content, topicId } = req.body;

  const userRepository = getRepository(User);
  const topicRepository = getRepository(Topic);
  const messageRepository = getRepository(Message);

  const user = await userRepository.findOne(req.userId);
  const topic = await topicRepository.findOne(topicId);

  if (!topic) throw new HttpError("Error", 404);

  const message = {
    datetime: Date.now(),
    content,
    user,
    topic,
  };

  try {
    await messageRepository.save(message);
    res.status(201).json({ message: "Message created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
