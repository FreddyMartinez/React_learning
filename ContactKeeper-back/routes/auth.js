const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

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
router.post(
  "/",
  [
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Password with more than 6 characters is required"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: "This email does not exist" });
      }

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
