const express = require("express");
const { protect } = require("../middlewere/authmiddlerwere");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageControllers");
const router = express.Router();
console.log("h");
router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
