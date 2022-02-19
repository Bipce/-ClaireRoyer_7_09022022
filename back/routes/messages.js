const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/messages");
const auth = require("../middlewares/auth");

router.post("/", auth, messagesCtrl.createMessage);

module.exports = router;
