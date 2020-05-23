const express = require("express");
const router = express.Router();

/**
 * @Route         GET api/auth
 * @description   get user logged in
 * @access        Private
 */
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

/**
 * @Route         POST api/auth
 * @description   auth user and get token
 * @access        Public
 */
router.post("/", (req, res) => {
  res.send("Log in user");
});

module.exports = router;
