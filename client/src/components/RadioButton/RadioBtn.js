import React from 'react';

import styles from './RadioBtn.module.css';

export default function RadioButton({ value, onChange, checked }) {
  return (
    <label className={styles.label}>
      <input
        type="radio"
        className={styles.radio_button}
        name="category"
        value={value}
        onChange={onChange}
        checked={checked}
        required
      />
      {value}
    </label>
  );
};
