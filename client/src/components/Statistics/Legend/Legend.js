import React from "react";
import T from "prop-types";
import styles from "./Legend.module.css";

export default function Legend({ data }) {
  return (
    <table className={styles.Table}>
      <thead className={styles.Thead}>
        <tr>
          <th>Categories</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className={styles.Tbody}>
        {data &&
          data.map(({ id, category, amount, fill }) => (
            <tr key={id}>
              <td className={styles.Category}>
                <div
                  style={{
                    backgroundColor: fill,
                  }}
                  className={styles.ColorScale}
                ></div>
                {category}
              </td>
              <td className={styles.Amount}>{amount}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

Legend.propTypes = {
  data: T.array.isRequired,
};
