import React, { useState } from "react";
import UpdateChartBtn from "../UpdateChartBtn";
import styles from "./ChartSelection.module.css";
import monthList from "./month.json";
import yearList from "./year.json";

export default function ChartSelection({ updateDiagram }) {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onChangeMonthHandler = (e) => {
    setMonth(e.target.value);
  };

  const onChangeYearHandler = (e) => {
    setYear(e.target.value);
  };

  const updateDiagramHandler = () => {
    updateDiagram({ month, year });
  };

  return (
    <>
      <section className={styles.Section}>
        <select
          name="month"
          className={styles.Select}
          defaultValue="Month"
          onChange={onChangeMonthHandler}
        >
          <option>Month</option>
          {monthList.map(({ value, name }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <select
          name="year"
          className={styles.Select}
          defaultValue="Year"
          onChange={onChangeYearHandler}
        >
          <option>Year</option>
          {yearList.map(({ value }) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </section>
      <UpdateChartBtn updateDiagram={updateDiagramHandler} />
    </>
  );
}
