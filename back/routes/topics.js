const express = require("express");
const router = express.Router();
const topicsCtrl = require("../controllers/topics");
const auth = require("../middlewares/auth");

router.post("/", auth, topicsCtrl.createTopic);
// router.get("/", topicsCtrl.getTopic);

module.exports = router;
