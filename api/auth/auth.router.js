const { Router } = require("express");

const {
  loginController,
  registrationController,
  logoutController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;
