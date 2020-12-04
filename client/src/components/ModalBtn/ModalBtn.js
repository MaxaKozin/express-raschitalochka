import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Modal from "../Modal/Modal";
import styles from "./ModalBtn.module.css";
import AddTransaction from "../AddTransaction";
import { costs, income } from "./categoryValues";
import { financeOperation } from "../../redux/finance";
import { transactionTypes } from "../../common";

export default function ModalBtn() {
  const [componentInModal, setComponentInModal] = useState("");
  const dispatch = useDispatch();

  const addTranasactionSubmit = (userData) =>
    dispatch(financeOperation.addTransaction(userData));

  const closeModal = () => {
    setComponentInModal("");
  };

  const setModalContent = (type) => {
    setComponentInModal(type);
  };

  const isMobile = useSelector((state) => state.isMobile);

  return (
    <>
      <div className={styles.modalBtnBox}>
        {isMobile ? (
          <>
            <NavLink className={styles.modalBtn} exact to={"/addincome"}>
              Add Income
            </NavLink>
            <NavLink className={styles.modalBtn} exact to={"/addcost"}>
              Add Cost
            </NavLink>
          </>
        ) : (
          <>
            <button
              className={styles.modalBtn}
              onClick={() => setModalContent(transactionTypes.addIncome)}
            >
              {transactionTypes.addIncome}
            </button>
            <button
              className={styles.modalBtn}
              onClick={() => setModalContent(transactionTypes.addCost)}
            >
              {transactionTypes.addCost}
            </button>
          </>
        )}
      </div>

      {componentInModal && (
        <Modal title={componentInModal} onClose={closeModal}>
          {componentInModal === transactionTypes.addIncome ? (
            <AddTransaction
              radioButtonData={income}
              onSubmit={addTranasactionSubmit}
              onCloseModal={closeModal}
              type={transactionTypes.addIncome}
            />
          ) : (
            <AddTransaction
              radioButtonData={costs}
              onSubmit={addTranasactionSubmit}
              onCloseModal={closeModal}
              type={transactionTypes.addCost}
            />
          )}
        </Modal>
      )}
    </>
  );
}
