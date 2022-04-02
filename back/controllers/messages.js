const { getManager } = require("typeorm");
const HttpError = require("../utils/http-error");

const Message = require("../models/messages");
const Topic = require("../models/topics");
const deleteMessageWithImages = require("../utils/delete-message");

exports.createMessage = async (req, res) => {
  const { content, topicId } = req.body;
  const { files } = req;

  const entityManager = getManager();

  const topic = await entityManager.findOne(Topic, topicId);

  if (!topic) throw new HttpError("Topic not found !", 404);

  let imagesUrl = "";
  if (files) {
    for (let i = 0; i < files.length; i++) {
      imagesUrl += files[i].filename;
      if (i < files.length - 1) imagesUrl += "|";
    }
  }

  const message = {
    created: Date.now(),
    content,
    user: req.user,
    topic,
    imagesUrl,
  };

  try {
    await entityManager.save(Message, message);
    res.status(201).json({ id: message.id });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.deleteMessage = async (req, res) => {
  const entityManager = getManager();

  const message = await entityManager.findOne(Message, req.params.id, {
    relations: ["user"],
  });

  if (!message) throw new HttpError("Message not found !", 404);

  if (req.user.id !== message.user.id && req.user.isAdmin !== 1)
    throw new HttpError("Your are not allowed !", 403);

  delete message.user.password;

  await deleteMessageWithImages(message);
  res.status(200).json(message);
};
