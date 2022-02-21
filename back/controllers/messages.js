const { getManager } = require("typeorm");
const HttpError = require("../utils/http-error");

const Message = require("../models/messages");
const Topic = require("../models/topics");
const User = require("../models/users");

exports.createMessage = async (req, res) => {
  const { content, topicId } = req.body;

  const entityManager = getManager();

  const user = await entityManager.findOne(User, req.userId);
  const topic = await entityManager.findOne(Topic, topicId);

  if (!topic) throw new HttpError("Topic not found !", 404);

  const message = {
    datetime: Date.now(),
    content,
    user,
    topic,
  };

  try {
    await entityManager.save(Message, message);
    res.status(201).json({ message: "Message created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
