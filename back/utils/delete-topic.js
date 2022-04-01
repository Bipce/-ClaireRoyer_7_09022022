const { getManager } = require("typeorm");
const Topic = require("../models/topics");
const fs = require("fs").promises;

const deleteTopicWithImages = async (topic) => {
  if (!topic) return;

  const entityManager = getManager();
  if (topic.imagesUrl) {
    const images = topic.imagesUrl.split("|");
    for (const image of images) {
      try {
        await fs.unlink(`./images/${image}`);
      } catch {}
    }
  }

  await entityManager.delete(Topic, topic.id);
};

module.exports = deleteTopicWithImages;
