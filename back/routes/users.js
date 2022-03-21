const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth, usersCtrl.getUsers);
router.put("/:id", auth, usersCtrl.modifyUser);
router.delete("/:id", auth, usersCtrl.deleteUser);
router.get("/me", auth, usersCtrl.meRequest);

module.exports = router;
