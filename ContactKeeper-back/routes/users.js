const express = require("express");
const router = express.Router();

/**
 * @Route         POST api/users
 * @description   creates new user
 * @access        Public
 */
router.post("/", (req, res) => {
  res.send("User register");
});

module.exports = router;
