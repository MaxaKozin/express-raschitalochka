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
