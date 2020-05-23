const express = require("express");
const router = express.Router();

/**
 * @Route         GET api/contacts
 * @description   Get all users contacts
 * @access        Private
 */
router.get("/", (req, res) => {
  res.send("User contacts");
});

/**
 * @Route         POST api/contacts
 * @description   Update contact
 * @access        Private
 */
router.post("/", (req, res) => {
  res.send("New contact added");
});

/**
 * @Route         POST api/contacts/:id
 * @description   Add new contact
 * @access        Private
 */
router.put("/:id", (req, res) => {
  res.send("Contact updated");
});

/**
 * @Route         DELETE api/contacts/:id
 * @description   Update contact
 * @access        Private
 */
router.delete("/:id", (req, res) => {
  res.send("Contact deleted");
});

module.exports = router;
