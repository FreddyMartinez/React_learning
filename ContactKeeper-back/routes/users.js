const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

/**
 * @Route         POST api/users
 * @description   creates new user
 * @access        Public
 */
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
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

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ msg: "This email is already being used" });
      }

      user = new User({
        name,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      user.save();

      res.send("User created");
    } catch (error) {}
  }
);

module.exports = router;
