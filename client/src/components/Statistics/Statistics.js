import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "./Chart";
import ChartSelection from "./ChartSelection";
import Legend from "./Legend";
import Total from "./Total";
import styles from "./Statistics.module.css";

const Statistics = () => {
  const [colors, setColors] = useState([
    "#ecb22a",
    "#e28b20",
    "#d25925",
    "#67b7d0",
    "#5593d7",
    "#3e6ba8",
    "#9cc254",
    "#73ad57",
    "#507c3a",
  ]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [costTransactions, setCostTransactions] = useState([]);
  const transactions = useSelector((state) => state.finance.transactionHistory);
  const filteredTransactions = transactions.filter(
    (transaction) => transaction.type === "-"
  );

  useEffect(() => {
    setCostTransactions(filteredTransactions);
  }, []);

  getDataByMonth = (month, items) =>
    items.filter(({ date }) => {
      const isItemInMonth = new Date(date).getMonth() === Number(month);
      return isItemInMonth;
    });

  getDataByYear = (year, items) =>
    items.filter(({ date }) => {
      const isItemInYear = new Date(date).getFullYear() === Number(year);
      return isItemInYear;
    });

  getDataForComponent = ({ year, month, data }) => {
    const isYearExist = !Number.isNaN(+year) === true && !!year === true;
    const isMonthExist = !Number.isNaN(+month) === true && !!month === true;
    if (isYearExist && isMonthExist)
      return getDataByMonth(month, getDataByYear(year, data));

    if (isYearExist) return getDataByYear(year, data);

    if (isMonthExist) return getDataByMonth(month, data);

    return data;
  };

  getUniqueCategory = (items) =>
    Array.from(new Set(items.flatMap((item) => item.category).sort()));

  getAmountsCategory = (categories, transactions) =>
    categories.map((category) =>
      transactions
        .filter((transaction) => transaction.category.includes(category))
        .map((category) => category.amount)
        .reduce((count, amount) => count + amount, 0)
    );

  getCategoriesTransactions = () => {
    const data = getDataForComponent({ month, year, data: costTransactions });
    const categories = getUniqueCategory(data);
    const amount = getAmountsCategory(categories, data);
    return { categories, amount };
  };

  getDataTransactionsForRender = ({ categories, amount }) =>
    categories
      .map((category, index) =>
        amount[index]
          ? {
              id: uuidv4(),
              category,
              amount: amount[index],
              fill: colors[index],
            }
          : { category }
      )
      .sort((a, b) => {
        return b.amount > a.amount ? 1 : -1;
      });

  updateDiagram = ({ year, month }) => {
    setYear(year);
    setMonth(month);
  };

  const chartData = getDataTransactionsForRender(getCategoriesTransactions());

  return (
    <>
      <div className={styles.Statistics + " main_container"}>
        <h2 className={styles.Title}>Cost Diagram</h2>
        <div className={styles.Wrapper}>
          <div className={styles.Chart}>
            <Chart data={chartData} />
          </div>
          <div className={styles.Data}>
            <ChartSelection updateDiagram={updateDiagram} />
            <Legend data={chartData} />
            <Total />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
