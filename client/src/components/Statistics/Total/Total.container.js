import React from "react";
import { useSelector } from "react-redux";
import Total from "./Total";

export default function TotalContainer({ totalCostByParameter }) {
  const transactionHistory = useSelector(
    (state) => state.finance.transactionHistory
  );

  const reducer = (arr) => {
    return arr.reduce((count, item) => count + Number(item.amount), 0);
  };

  const sorter = (arr, trType) => {
    return arr.filter(({ type }) => type.includes(trType));
  };

  const costTransactions = sorter(transactionHistory, "-");

  const incomeTransactions = sorter(transactionHistory, "+");

  const totalCost = reducer(costTransactions);
  const totalIncome = reducer(incomeTransactions);
  return (
    <Total
      totalCostByParameter={totalCostByParameter}
      totalCost={totalCost}
      totalIncome={totalIncome}
    />
  );
}
