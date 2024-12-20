const {
  signupUser,
  loginUser,
  verifyToken,
  verifyUser,
} = require("../controllers/auth.controllers");

const router = require("express").Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken, verifyUser);
module.exports = router;
