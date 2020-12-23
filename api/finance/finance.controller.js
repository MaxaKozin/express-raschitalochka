const User = require("../user/user.model");

const addTransactionController = async (req, res, next) => {
  try {
    const transaction = req.body;
    const { userId } = req.params;

    const user = await User.findUserById(userId);

    const trLength = user.finance.length;
    const transactions = user.finance || [];
    console.log(transactions);

    if (trLength) {
      const { balanceAfter } = user.finance[0];
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
    const { transactionId, patchedData } = req.body.data;
    const { userId } = req.params;
    const user = await User.findUserById(userId);

    const targetTransaction = user.finance.find(
      (tr) => "" + tr._id === "" + transactionId
    );

    const idx = user.finance.indexOf(targetTransaction);

    if (patchedData.amount !== targetTransaction.amount) {
      const balanceDiff =
        patchedData.type === "-"
          ? Number(targetTransaction.amount) - Number(patchedData.amount)
          : Number(patchedData.amount) - Number(targetTransaction.amount);
      const newBalanceAfter =
        patchedData.type === "-"
          ? Number(targetTransaction.balanceAfter) +
            Number(targetTransaction.amount) -
            Number(patchedData.amount)
          : Number(targetTransaction.balanceAfter) +
            Number(patchedData.amount) -
            Number(targetTransaction.amount);
      targetTransaction.balanceAfter = `${newBalanceAfter}`;
      Object.assign(targetTransaction, patchedData);
      user.totalBalance = `${Number(user.totalBalance) + balanceDiff}`;
      user.finance.splice(idx, 1, targetTransaction);
      user.finance.map((tr, index) => {
        if (index < idx) {
          tr.balanceAfter = `${Number(tr.balanceAfter) + balanceDiff}`;
          return tr;
        }
        return tr;
      });

      const updatedUser = await User.updateUser(userId, {
        finance: user.finance,
        totalBalance: user.totalBalance,
      });
      res.status(200).send(updatedUser);
      return;
    }

    Object.assign(targetTransaction, patchedData);
    user.finance.splice(idx, 1, targetTransaction);

    const updatedUser = await User.updateUser(userId, {
      finance: user.finance,
    });
    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteTransactionController = async (req, res, next) => {
  try {
    const { transactionId } = req.body;
    const { userId } = req.params;

    const user = await User.findUserById(userId);

    const targetTransaction = user.finance.find(
      (tr) => "" + tr._id === transactionId
    );
    const idx = user.finance.indexOf(targetTransaction);

    const balanceDiff =
      targetTransaction.type === "-"
        ? Number(targetTransaction.amount)
        : -Number(targetTransaction.amount);

    user.finance.map((tr, index) => {
      if (index < idx) {
        tr.balanceAfter = `${Number(tr.balanceAfter) + balanceDiff}`;
        return tr;
      }
      return tr;
    });

    user.totalBalance = `${Number(user.totalBalance) + balanceDiff}`;
    const newTransactions = user.finance.filter(
      (tr) => "" + tr._id !== transactionId
    );

    const updatedUser = await User.updateUser(userId, {
      finance: newTransactions,
      totalBalance: user.totalBalance,
    });

    res.status(200).send(updatedUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addTransactionController,
  getFinanceController,
  updateTransactionController,
  deleteTransactionController,
};
