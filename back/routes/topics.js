const express = require("express");
const router = express.Router();
const topicsCtrl = require("../controllers/topics");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");

router.post("/", [auth, multer.array("image")], topicsCtrl.createTopic);
router.get("/", auth, topicsCtrl.getTopics);
router.get("/:id", auth, topicsCtrl.getTopic);
router.put("/:id", auth, topicsCtrl.modifyTopic);
router.delete("/:id", auth, topicsCtrl.deleteTopic);

// router.get("/:id", topicsCtrl.getTopicsFromUser);

module.exports = router;
