import React from "react";
import { useDispatch } from "react-redux";
import { financeOperation } from "../../redux/finance";
import AddTransaction from "../AddTransaction";
import styles from "./AddTransactionMobile.module.css";

export default function AddTransactionMobile({ props, history, location }) {
  const dispatch = useDispatch();

  const handleSubmit = (userData) =>
    dispatch(financeOperation.addTransaction(userData));

  const handleGoBack = () => {
    const { state } = location;

    if (state && state.from) {
      return history.push(state.from);
    }

    history.push("/");
  };
  return (
    <div className={styles.mobile_wrapper}>
      <div className={styles.mobile_header}>
        <button
          className={styles.mobile_button}
          onClick={handleGoBack}
        ></button>
        <h2 className={styles.mobile_heading}>{props.type}</h2>
      </div>

      <AddTransaction
        radioButtonData={props.radioButtonData}
        onSubmit={handleSubmit}
        onCloseModal={handleGoBack}
        type={props.type}
      />
    </div>
  );
}
