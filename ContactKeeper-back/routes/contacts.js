const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");

/**
 * @Route         GET api/contacts
 * @description   Get all users contacts
 * @access        Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      dat: -1
    });
    res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * @Route         POST api/contacts
 * @description   Add new contact
 * @access        Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("email", "Please enter a valid email").isEmail()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

/**
 * @Route         POST api/contacts/:id
 * @description   Update contact
 * @access        Private
 */
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized request" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true } // this option returns the object after being updated
    );

    res.json(contact);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/**
 * @Route         DELETE api/contacts/:id
 * @description   Update contact
 * @access        Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Unauthorized request" });
    }

    await Contact.findByIdAndRemove(req.params.id);

    res.json({ msg: "Contact deleted" });
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
