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
      transactions.push(newTransaction);
      await User.updateUser(req.user._id, { finance: transactions });
      await User.updateUser(req.user._id, { totalBalance: newBalanceAfter });
    }

    if (!trLength) {
      const newTransaction = {
        ...transaction,
        balanceAfter: transaction.amount,
      };
      transactions.push(newTransaction);
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

module.exports = {
  addTransactionController,
  getFinanceController,
};
