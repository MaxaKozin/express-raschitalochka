import React from 'react';
import T from 'prop-types';
import styles from './ChartWrapper.module.css';

export default function ChartWrapper({ children }) {
  <div className={styles.ChartWrapper}>{children}</div>
};

ChartWrapper.propTypes = {
  children: T.node.isRequired,
};
