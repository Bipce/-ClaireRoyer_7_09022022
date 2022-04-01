const multer = require("multer");
const HttpError = require("../utils/http-error");
const { v4: uuid } = require("uuid");

const MINE_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, "images"),
  filename: (req, file, callback) => {
    const extension = MINE_TYPES[file.mimetype];
    const error = !extension ? new HttpError("", 400) : null;
    callback(error, uuid() + "." + extension);
  },
});

module.exports = multer({ storage });
