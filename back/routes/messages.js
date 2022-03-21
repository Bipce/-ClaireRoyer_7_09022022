const express = require("express");
const router = express.Router();
const messagesCtrl = require("../controllers/messages");
const auth = require("../middlewares/auth");

router.post("/", auth, messagesCtrl.createMessage);
router.put("/:id", auth, messagesCtrl.modifyMessage);
router.delete("/:id", auth, messagesCtrl.deletMessage);
router.get("/", auth, messagesCtrl.getMessages);
router.get("/:id", auth, messagesCtrl.getMessage);

module.exports = router;
