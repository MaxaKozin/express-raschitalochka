import React from 'react';
import svg from '../../assets/icons/navigation.svg';
import styles from './NavBar.module.css';

export default function SvgIcons({ id }) {
  return (
    <>
      <svg className={styles.icon}>
        <use href={`${svg}#${id}`}></use>
      </svg>
    </>
  );
};
