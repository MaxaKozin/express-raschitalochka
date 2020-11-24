const { Router } = require("express");
const {
  addTransactionController,
  getFinanceController,
} = require("./finance.controller");
const { verifyTokenMdlw } = require("../../middlewares/auth.verifyTokenMdlw");

const financeRouter = Router();

financeRouter.get("/:userId", verifyTokenMdlw, getFinanceController);
financeRouter.post("/:userId", verifyTokenMdlw, addTransactionController);

module.exports = financeRouter;
