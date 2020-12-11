import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../../Modal';
import AddTransaction from '../../AddTransaction';
import { costs, income } from "../../ModalBtn/categoryValues";
import { financeOperation } from '../../../redux/finance';
import styles from './TableRow.module.css';

export default function TableRow({ date, type, category, comments, amount, balanceAfter, _id }) {
  const [componentInModal, setComponentInModal] = useState("");
  const dispatch = useDispatch();

  const updateTransactionSubmit = (patchedData) => {
    dispatch(financeOperation.updateTransaction(_id, patchedData));
    console.log(patchedData, _id);

  }

  const closeModal = () => {
    setComponentInModal("");
  }

  const onEditClick = (type) => {
    if (type === '+') {
      setComponentInModal("Add Income");
    } else {
      setComponentInModal("Add Cost");
    }
  }

  const localDate = new Date(date).toLocaleDateString();

  return (
    <>
      <ul className={styles.row}>
        <li className={styles.cell}>{localDate}</li>
        <li className={styles.cell}>{type}</li>
        <li className={styles.cell}>{category}</li>
        <li className={styles.cell}>{comments}</li>
        <li className={styles.cell}
          style={{ color: type === '+' ? '#75c16e' : '#ff6c00' }}>{amount}</li>
        <li className={styles.cell}>{balanceAfter}</li>
        <li className={styles.cell + ' ' + styles.btnBlock}>
          <div className={styles.btn + ' ' + styles.btnEdit}
            onClick={() => onEditClick(_id, type)}>
            <span>EDIT</span>
          </div>
          <div className={styles.btn + ' ' + styles.btnDel}>
            <span>DEL</span>
          </div>
        </li>
      </ul>

      {
        componentInModal && (
          <Modal title={componentInModal} onClose={closeModal}>
            {componentInModal === "Add Income" ? (
              <AddTransaction
                radioButtonData={income}
                onSubmit={updateTransactionSubmit}
                onCloseModal={closeModal}
                type={"Add Income"}
                am={amount}
                dt={date}
                cat={category}
                cmts={comments}
                chkd={category}
              />
            ) : (
                <AddTransaction
                  radioButtonData={costs}
                  onSubmit={updateTransactionSubmit}
                  onCloseModal={closeModal}
                  type={"Add Cost"}
                  am={amount}
                  dt={date}
                  cat={category}
                  cmts={comments}
                  chkd={category}
                />
              )}
          </Modal>
        )
      }
    </>
  )
}
