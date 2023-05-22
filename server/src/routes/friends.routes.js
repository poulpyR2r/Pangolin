const express = require("express");
const router = express.Router();

const {
  AddFriends,
  RemoveFriends,
} = require("../controllers/friends.controller");

const { GetDetailsFriends } = require("../controllers/user.controller");

router.patch("/add-friend/:id_pangolin/:id_friend", AddFriends);

router.patch("/remove-friend/:id_pangolin/:id_friend", RemoveFriends);

router.get("/get-friend/:id_friend", GetDetailsFriends);

module.exports = router;
