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
    created: Date.now(),
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

exports.modifyMessage = async (req, res) => {
  const entityManager = getManager();

  if (
    req.body.id ||
    req.body.createMessage ||
    req.body.updated ||
    req.body.userId
  )
    throw new HttpError("You are not allowed !", 403);

  const message = await entityManager.findOne(Message, req.params.id, {
    relations: ["user"],
  });

  if (!message) throw new HttpError("Message not found", 404);

  if (!message.user || req.user.id !== message.user.id)
    throw new HttpError("You are not allowed !", 403);

  try {
    const updatedMessage = await entityManager.update(
      Message,
      { id: message.id },
      { ...req.body, updated: Date.now() }
    );
    res.status(200).json(updatedMessage);
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.deletMessage = async (req, res) => {
  const entityManager = getManager();

  const message = await entityManager.findOne(Message, req.params.id, {
    relations: ["user"],
  });

  if (!message) throw new HttpError("Message not found !", 404);
  console.log(req.user.id, message.user.id);

  if (req.user.id !== message.user.id)
    throw new HttpError("Your are not allowed !", 403);

  await entityManager.delete(Message, message);
  res.status(200).json(message);
};
