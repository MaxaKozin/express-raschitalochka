const { Router } = require("express");

const { verifyTokenMdlw } = require("../../middlewares/auth.verifyTokenMdlw")

const {
  loginController,
  registrationController,
  logoutController,
} = require("./auth.controller");

const authRouter = Router();

authRouter.post("/register", registrationController);
authRouter.post("/login", loginController);
authRouter.post("/logout", verifyTokenMdlw, logoutController);

module.exports = authRouter;
