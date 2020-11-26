import React from 'react';
import styles from './UpdateChartBtn.module.css';

export default function UpdateChartBtn({ updateDiagram }) {
  return (
    <button
      type="button"
      className={styles.UpdateChartBtn}
      onClick={updateDiagram}
    >
      Update Diagram
    </button>
  )
}
