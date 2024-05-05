const express = require("express");
const passport = require("passport");
const {
  httpRegisterUser,
  httpLoginUser,
  httpGetAllUsers,
  httpGetUser,
  httpUpdateOneUser,
  httpDeleteOneUser,
  httpChangePassword,
} = require("../Controllers/user.controller");
const { verifyToken, verifyAdmin } = require("../Middlewares/authorization_handler");

/** Defining the router */
const userRouter = express.Router();

/** Handling requests */

userRouter.route("/register").post(httpRegisterUser);
userRouter.route("/login").post(httpLoginUser);
userRouter.route("/").get(httpGetAllUsers);
userRouter
  .route("/:id")
  .get(httpGetUser)
  .put(httpUpdateOneUser)
  .delete(httpDeleteOneUser);
userRouter.route("/password/:param").put(httpChangePassword);
module.exports = { userRouter };
