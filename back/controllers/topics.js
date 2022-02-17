const { getRepository } = require("typeorm");
const HttpError = require("../utils/http-error");

const Topic = require("../models/topics");
const User = require("../models/users");

exports.createTopic = async (req, res) => {
  const userRepository = getRepository(User);
  const topicRepository = getRepository(Topic);

  const { title, message } = req.body;

  //   const test = await topicRepository.find({ relations: ["user"] });
  //   console.log(test[0].user.email);
  //   return res.json();

  const user = await userRepository.findOne(req.userId);
  console.log(user);

  const topic = {
    title,
    datetime: Date.now(),
    user,
    message,
  };

  try {
    await topicRepository.save(topic);
    res.status(201).json({ message: "Topic created !" });
  } catch (error) {
    throw new HttpError(error, 400);
  }
};
