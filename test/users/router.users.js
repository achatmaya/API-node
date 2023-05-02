/* eslint-disable no-undef */
const {checkMiddleWear, chekAdmin} = require("../auth/validation_token");
const { createUser,getUser ,getAllUsers,updateUser, delateUser, login, updatePassword,createUserByAdmin, updateOnPassword } = require("./controller.users");

const router = require("express").Router();

router.post("/register", createUser);
router.post("/registerByAdmin", chekAdmin, createUserByAdmin)
router.get("/me",checkMiddleWear, getUser);
router.get("/id",checkMiddleWear, getUser);
router.get("/users", getAllUsers);
router.put("/update", checkMiddleWear, updateUser);
router.delete("/delete", checkMiddleWear, delateUser);
router.put("/newPassword", updateOnPassword );
router.put("/updatePassword", updatePassword );

router.post("/login", login);

module.exports =router;
