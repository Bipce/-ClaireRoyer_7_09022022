const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/", auth, usersCtrl.getUsers);
router.delete("/", auth, usersCtrl.deleteUser);
router.get("/me", auth, usersCtrl.meRequest);

module.exports = router;
