const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  GetDetailsPangolin,
  UpdateDetailsPangolin,
  GetAllPangolin,
  getFriendsByUserId,
  getUserRoleById
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const { changeRole } = require("../controllers/role.controller")

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/pangolin/:id_pangolin", verifyToken, GetDetailsPangolin);

router.get("/pangolin", verifyToken, GetAllPangolin);

router.patch("/pangolin/:id_pangolin", verifyToken, UpdateDetailsPangolin);

router.patch("/pangolin/:id_pangolin/role", verifyToken , changeRole);

router.get("/pangolin/friends/:id_pangolin", getFriendsByUserId )

router.get("/pangolin/role/:id_pangolin", getUserRoleById )


module.exports = router;
