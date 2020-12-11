import React, { useState, useEffect } from "react";
import RadioBtn from "../RadioButton";
import styles from "./AddTransaction.module.css";

export default function AddTransaction({
  onSubmit,
  onCloseModal,
  radioButtonData,
  type,
  cat, am, dt, cmts, chkd
}) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [comments, setComments] = useState("");
  const [checked, setChecked] = useState("");

  useEffect(() => {
    setCategory(cat || '');
    setAmount(am || '')
    if (dt) {
      setDate(dt.split("T")[0])
    }
    setComments(cmts || '')
    setChecked(chkd || '')
  }, [am, cat, chkd, cmts, dt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, amount, date, comments, type });
    onCloseModal();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.heading_wrapper}>
        <div className={styles.amount_wrapper}>
          <input
            className={styles.amount}
            type="number"
            name="amount"
            min="0"
            max="99999"
            step="0.01"
            value={amount}
            onChange={({ target: { value } }) => setAmount(value)}
            required
          />
        </div>
        <div className={styles.date_wrapper}>
          <input
            className={styles.date}
            name="date"
            type="date"
            value={date}
            required
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
      </div>
      <div className={styles.categories_wrapper}>
        <h2 className={styles.categories_title}>Categories</h2>
        {radioButtonData.map((value) => (
          <RadioBtn
            value={value}
            key={value}
            onChange={({ target: { value } }) => { setCategory(value); setChecked(value) }}
            checked={value === checked ? true : false}
          />
        ))}
      </div>
      <div className={styles.comments_wrapper}>
        <h2 className={styles.comments_heading}>Comments</h2>
        <textarea
          className={styles.comments}
          type="text"
          name="comments"
          value={comments}
          onChange={({ target: { value } }) => setComments(value)}
        />
      </div>
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}
