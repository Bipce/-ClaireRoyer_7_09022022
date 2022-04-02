const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/messages");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.post("/", [auth, multer.array("image")], messagesCtrl.createMessage);
router.delete("/:id", auth, messagesCtrl.deleteMessage);

module.exports = router;
