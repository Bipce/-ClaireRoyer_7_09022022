const { getRepository } = require("typeorm");
const HttpError = require("../utils/http-error");

const Topic = require("../models/topics");
const User = require("../models/users");

exports.createTopic = async (req, res) => {
  const { title, content } = req.body;

  const userRepository = getRepository(User);
  const topicRepository = getRepository(Topic);

  const user = await userRepository.findOne(req.userId);

  const topic = {
    title,
    datetime: Date.now(),
    user,
    content,
  };

  try {
    await topicRepository.save(topic);
    res.status(201).json({ message: "Topic created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};

exports.getTopic = async (req, res) => {
  const topicRepository = getRepository(Topic);

  const topic = await topicRepository.findOne(req.params.id, {
    relations: ["user", "messages"],
  });
  if (!topic) throw new HttpError("Topic not found!", 404);
  res.status(201).json(topic);
};

exports.getTopics = async (req, res) => {
  const topicRepository = getRepository(Topic);

  const topics = await topicRepository.find({ relations: ["messages"] });
  await res.status(200).json(topics);
};

exports.modifyTopic = async (req, res) => {
  const topicRepository = getRepository(Topic);

  const topic = await topicRepository.findOne(req.params.id, {
    relations: ["user"],
  });
  if (!topic) throw new HttpError("Not found !", 404);

  if (req.userId !== topic.user.id)
    throw new HttpError("You are not allowed !", 403);

  const updatedTopic = await topicRepository.update(
    { id: topic.id },
    { ...req.body }
  );
  res.status(200).json(updatedTopic);
  throw new HttpError(error, 400);
};
