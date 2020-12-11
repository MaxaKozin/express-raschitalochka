const { Router } = require("express");
const {
  addTransactionController,
  getFinanceController,
  updateTransactionController,
  deleteTransactionController
} = require("./finance.controller");
const { verifyTokenMdlw } = require("../../middlewares/auth.verifyTokenMdlw");

const financeRouter = Router();

financeRouter.get("/:userId", verifyTokenMdlw, getFinanceController);
financeRouter.post("/:userId", verifyTokenMdlw, addTransactionController);
financeRouter.patch("/:userId", verifyTokenMdlw, updateTransactionController);
// financeRouter.delete("/:userId", verifyTokenMdlw, deleteTransactionController);

module.exports = financeRouter;
