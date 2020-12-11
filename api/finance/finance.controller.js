const { updateTransactionRequest } = require("../../client/src/redux/finance/finance-action");
const User = require("../user/user.model");

const addTransactionController = async (req, res, next) => {
  try {
    const transaction = req.body;
    const { userId } = req.params;

    const user = await User.findUserById(userId);

    const trLength = user.finance.length;
    const transactions = user.finance || [];

    if (trLength) {
      const { balanceAfter } = user.finance[trLength - 1];
      const newBalanceAfter =
        transaction.type === "+"
          ? `${Number(balanceAfter) + Number(transaction.amount)}`
          : Number(balanceAfter) - Number(transaction.amount);
      const newTransaction = {
        ...transaction,
        balanceAfter: newBalanceAfter,
      };
      transactions.unshift(newTransaction);
      await User.updateUser(req.user._id, { finance: transactions });
      await User.updateUser(req.user._id, { totalBalance: newBalanceAfter });
    }

    if (!trLength) {
      const newTransaction = {
        ...transaction,
        balanceAfter: transaction.amount,
      };
      transactions.unshift(newTransaction);
      await User.updateUser(req.user._id, { finance: transactions });
      await User.updateUser(req.user._id, {
        totalBalance: `${newTransaction.amount}`,
      });
    }

    const response = await User.findUserById(userId);
    const { finance, totalBalance, typeTotalBalance } = response;
    res.status(200).send({ finance, totalBalance, typeTotalBalance });
  } catch (err) {
    next(err);
  }
};

const getFinanceController = async (req, res, next) => {
  try {
    const transactions = req.user.finance;
    const { userId } = req.params;
    const user = await User.findUserById(userId);
    const { totalBalance, typeTotalBalance } = user;
    const response = {
      finance: transactions,
      totalBalance: totalBalance || "0",
      typeTotalBalance,
      userId,
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};




const updateTransactionController = async (req, res, next) => {
  try {
    const { transactionId, patchedData } = req.body
    const { userId } = req.params;
    const user = await User.findUserById(userId);
    const findTransaction = user.finance.transactionHistory.find(transaction => transaction._id === transactionId);
    if (patchedData.amount !== findTransaction.amount) {
      const patchedTransaction = {
        ...findTransaction,
        ...patchedData,
        balanceAfter: Number(findTransaction.balanceAfter) + (Number(patchedData.amount) - Number(findTransaction.amount)),
      }
      const newTransactions = user.finance.transactionHistory.splice(indexOf(findTransaction), 1, patchedTransaction)
      const newFinance = {
        ...user.finance,
        finance: {
          transactionHistory: newTransactions,
          totalBalance: patchedTransaction.balanceAfter,
        }
      }

      const { finance } = await User.updateUser(userId, { finance: newFinance });
      res.status(200).send(finance)
    }
    const patchedTransaction = {
      ...findTransaction,
      ...patchedData
    }
    const newTransactions = user.finance.transactionHistory.splice(indexOf(findTransaction), 1, patchedTransaction)
    const newFinance = {
      ...user.finance,
      finance: {
        transactionHistory: newTransactions,
      }
    }
    const { finance } = await User.updateUser(userId, { finance: newFinance });
    res.status(200).send(finance);
  } catch (error) {
    next(error)
  }
}

const deleteTransactionController = async (req, res, next) => {
  try {
    console.log(req);
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addTransactionController,
  getFinanceController,
  updateTransactionController,
  deleteTransactionController,
};
