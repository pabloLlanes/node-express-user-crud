const { Router } = require("express");
const { isEmailResgistered } = require("../../middlewares/verifyEmail");
//const { check } = require("express-validator");
const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  hardDeleteUser,
} = require("./users.controller");

const router = Router();

//get all users
router.get("/", getAllUsers);

//get a single user
router.get("/:id", getSingleUser);

//post
router.post("/", isEmailResgistered, createUser);

//put
router.put("/:id", updateUser);

//delete user
router.delete("/:id", deleteUser);

//delete user
router.delete("/delete/:id", hardDeleteUser);

module.exports = router;
