const { getManager } = require("typeorm");
const HttpError = require("../utils/http-error");

const Topic = require("../models/topics");
const Message = require("../models/messages");

exports.createTopic = async (req, res) => {
  const { title, content } = req.body;
  const { files } = req;

  const entityManager = getManager();

  let imagesUrl = "";
  if (files) {
    for (let i = 0; i < files.length; i++) {
      imagesUrl += files[i].filename;
      if (i < files.length - 1) imagesUrl += "|";
    }
  }

  const topic = {
    title,
    created: Date.now(),
    user: req.user,
    content,
    imagesUrl,
  };

  try {
    await entityManager.save(Topic, topic);
    res.status(201).json({ id: topic.id });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.modifyTopic = async (req, res) => {
  const entityManager = getManager();

  if (req.body.id || req.body.created || req.body.updated || req.body.userId)
    throw new HttpError("You are not allowed !", 403);

  const topic = await entityManager.findOne(Topic, req.params.id, {
    relations: ["user"],
  });

  if (!topic) throw new HttpError("Not found !", 404);

  if (!topic.user || req.user.id !== topic.user.id)
    throw new HttpError("You are not allowed !", 403);

  try {
    const updatedTopic = await entityManager.update(
      Topic,
      { id: topic.id },
      { ...req.body, updated: Date.now() }
    );
    res.status(200).json(updatedTopic);
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.deleteTopic = async (req, res) => {
  const entityManager = getManager();

  const topic = await entityManager.findOne(Topic, req.params.id, {
    relations: ["user", "messages"],
  });

  if (!topic) throw new HttpError("Not found !", 404);

  if (req.user.id !== topic.user.id && req.user.isAdmin !== 1)
    throw new HttpError("You are not allowed !", 403);

  for (const message of topic.messages) {
    await entityManager.delete(Message, message.id);
  }

  await entityManager.delete(Topic, topic.id);
  res.status(200).json(topic);
};

exports.getTopic = async (req, res) => {
  const entityManager = getManager();

  const topic = await entityManager.findOne(Topic, req.params.id, {
    relations: ["user", "messages", "messages.user"],
  });

  if (!topic) throw new HttpError("Topic not found!", 404);
  res.status(201).json(topic);
};

exports.getTopics = async (req, res) => {
  const entityManager = getManager();

  const topics = await entityManager.find(Topic, {
    relations: ["user"],
  });

  if (!topics) throw new HttpError("Topic not found!", 404);
  res.status(200).json(topics);
};
