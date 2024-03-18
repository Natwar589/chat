const express = require("express");
const { protect } = require("../middlewere/authmiddlerwere");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removefromgroup,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);

router.route("/groupremove").put(protect, removefromgroup);

module.exports = router;
