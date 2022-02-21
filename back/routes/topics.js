const express = require("express");
const router = express.Router();
const topicsCtrl = require("../controllers/topics");
const auth = require("../middlewares/auth");

router.post("/", auth, topicsCtrl.createTopic);
router.get("/", auth, topicsCtrl.getTopics);
router.get("/:id", auth, topicsCtrl.getTopic);
router.put("/:id", auth, topicsCtrl.modifyTopic);

// router.get("/:id", topicsCtrl.getTopicsFromUser);

module.exports = router;
