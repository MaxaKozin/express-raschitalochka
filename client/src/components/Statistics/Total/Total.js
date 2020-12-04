//Important!!! need to be strongly reviewed, refactoring
import React from "react";
import T from "prop-types";
import styles from "./Total.module.css";

export default function Total({
  totalCostByParameter,
  totalCost,
  totalIncome,
}) {
  return (
    <ul className={styles.List}>
      {totalCostByParameter ? (
        <>
          <li>
            <span className={styles.Name}>Total Costs selected:</span>
            <span className={(styles.Value, styles.Costs)}>
              {totalCostByParameter}
            </span>
          </li>
          <li>
            <span className={styles.Name}>Total Costs:</span>
            <span className={(styles.Value, styles.Costs)}>{totalCost}</span>
          </li>
        </>
      ) : (
        <li>
          <span className={styles.Name}>Total Costs:</span>
          <span className={(styles.Value, styles.Costs)}>{totalCost}</span>
        </li>
      )}
      <li>
        <span className={styles.Name}>Total Income:</span>
        <span className={(styles.Value, styles.Income)}>{totalIncome}</span>
      </li>
    </ul>
  );
}

Total.defaultProps = {
  totalCost: 0.0,
  totalIncome: 0.0,
};

Total.propTypes = {
  totalCost: T.number,
  totalIncome: T.number,
};

{
  /* <li>
      <span className={styles.Name}>
        {totalCostByParameter ? 'Total Costs selected' : 'Total Costs'}:
      </span>
      <span className={(styles.Value, styles.Costs)}>
        {totalCostByParameter ? totalCostByParameter : totalCost}
      </span>
    </li> */
}

// const getCostTransactions = (transactionHistory) => {
//   return transactionHistory.filter(({ type }) => type.includes("-"));
// };

// const costTransactions = getCostTransactions(transactionHistory);

// const getTotalCost = (costTransactions) => {
//   return costTransactions.reduce((count, item) => count + item.amount, 0);
// };

// const totalCost = getTotalCost(costTransactions);
// const getIncomeTransactions = (transactionHistory) => {
//   return transactionHistory.filter(({ type }) => type.includes("+"));
// };

// const incomeTransactions = getIncomeTransactions(transactionHistory);

// const getTotalIncome = (incomeTransactions) => {
//   return incomeTransactions.reduce((count, item) => count + item.amount, 0);
// };

// const totalIncome = getTotalIncome(incomeTransactions);

// const mapStateToProps = state => ({
//   totalCost: financeSelectors.getTotalCost(state),
//   totalIncome: financeSelectors.getTotalIncome(state),
// });
//was changed to hooks
// const getTotalBalance = state => state.finance.totalBalance;

// const getTransactionHistory = state => state.finance.transactionHistory;

// const getCostTransactions = createSelector([getTransactionHistory], items => {
//   return items.filter(({ type }) => type.includes('-'));
// });

// const getIncomeTransactions = createSelector([getTransactionHistory], items => {
//   return items.filter(({ type }) => type.includes('+'));
// });

// const getTotalCost = createSelector([getCostTransactions], items => {
//   return items.reduce((count, item) => count + item.amount, 0);
// });

// const getTotalIncome = createSelector([getIncomeTransactions], items => {
//   return items.reduce((count, item) => count + item.amount, 0);
// });
