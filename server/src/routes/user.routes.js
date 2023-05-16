const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  GetDetailsPangolin,
  UpdateDetailsPangolin,
  GetAllPangolin,
} = require("../controllers/user.controllers");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/pangolin/:id_pangolin", verifyToken, GetDetailsPangolin); // add authverification

router.get("/pangolin", verifyToken, GetAllPangolin);

router.patch("/pangolin/:id_pangolin", verifyToken, UpdateDetailsPangolin);

module.exports = router;
