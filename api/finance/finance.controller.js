const User = require("../user/user.model");

const addTransactionController = async (req, res, next) => {
  const newTransaction = req.body;

  //Write logic for calculating total balance

  const transactions = req.user.finance || [];
  transactions.push(newTransaction);
  await User.updateUser(req.user._id, { finance: transactions });
};

module.exports = {
  addTransactionController,
};
