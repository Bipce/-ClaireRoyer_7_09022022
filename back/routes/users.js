const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/users");

router.post("/signup", usersCtrl.signup);

module.exports = router;

// router.post("/", async (req, res) => {
//   const { id, email, username, password } = req.body;

//   const user = await User.findOne(email);
// });
