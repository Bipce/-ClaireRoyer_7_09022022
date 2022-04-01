const { getManager } = require("typeorm");
const Message = require("../models/messages");
const fs = require("fs").promises;

const deleteMessageWithImages = async (message) => {
  if (!message) return;

  const entityManager = getManager();

  if (message.imagesUrl) {
    const images = message.imagesUrl.split("|");
    for (const image of images) {
      try {
        await fs.unlink(`./images/${image}`);
      } catch {}
    }
  }

  await entityManager.delete(Message, message);
};

module.exports = deleteMessageWithImages;
