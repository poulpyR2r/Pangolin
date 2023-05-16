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
const { changeRole } = require("../controllers/role.controller")

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/pangolin/:id_pangolin", verifyToken, GetDetailsPangolin);

router.get("/pangolin", verifyToken, GetAllPangolin);

router.patch("/pangolin/:id_pangolin", verifyToken, UpdateDetailsPangolin);

router.patch("/pangolin/:id_pangolin/role",verifyToken , changeRole);

module.exports = router;
