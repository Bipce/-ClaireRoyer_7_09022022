const { getManager } = require("typeorm");
const HttpError = require("../utils/http-error");

const Message = require("../models/messages");
const Topic = require("../models/topics");

exports.createMessage = async (req, res) => {
  const { content, topicId } = req.body;

  const entityManager = getManager();

  const topic = await entityManager.findOne(Topic, topicId);

  if (!topic) throw new HttpError("Topic not found !", 404);

  const message = {
    datetime: Date.now(),
    content,
    user: req.user,
    topic,
  };

  try {
    await entityManager.save(Message, message);
    res.status(201).json({ id: message.id });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
