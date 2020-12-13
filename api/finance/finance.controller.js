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
    const { transactionId, patchedData } = req.body.data
    const { userId } = req.params;
    const user = await User.findUserById(userId);

    const findTransaction = user.finance.find(transaction => ("" + transaction._id) === ("" + transactionId));

    if (patchedData.amount !== findTransaction.amount) {
      const patchedTransaction = new Object(findTransaction)
      const newBalanceAfter = Number(findTransaction.balanceAfter) + (Number(patchedData.amount) - Number(findTransaction.amount))
      const patchBalance = {
        balanceAfter: newBalanceAfter
      }
      Object.assign(findTransaction, patchedData, patchBalance)

      await user.finance.splice(user.finance.indexOf(findTransaction), 1, patchedTransaction)

      const updatedUser = await User.updateUser(userId, {
        finance: user.finance,
        totalBalance: patchedTransaction.balanceAfter,
      });
      res.status(200).send(updatedUser)
      return
    }

    const patchedTransaction = new Object(findTransaction)
    Object.assign(patchedTransaction, patchedData)

    console.log("patchedTransaction:  ", patchedTransaction);
    user.finance.splice(user.finance.indexOf(findTransaction), 1, patchedTransaction);

    const updatedUser = await User.updateUser(userId, { finance: user.finance });
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error)
  }
}

const deleteTransactionController = async (req, res, next) => {
  try {
    const { transactionId } = req.body
    const { userId } = req.params;

    const user = await User.findUserById(userId);

    const newTransactionHistory = user.finance.filter
      (transaction => '' + transaction._id !== '' + transactionId)

    const deletedTransaction = user.finance.find
      (transaction => '' + transaction._id === '' + transactionId)
    let newTotalBalance;
    if (deletedTransaction.type === '+') {
      newTotalBalance = Number(user.totalBalance) - Number(deletedTransaction.amount)
    } else {
      newTotalBalance = Number(user.totalBalance) + Number(deletedTransaction.amount)
    }

    const updatedUser = await User.updateUser(userId, {
      finance: newTransactionHistory,
      totalBalance: newTotalBalance
    })

    res.status(200).send(updatedUser)
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
