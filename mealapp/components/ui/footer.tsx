import React from "react";
import styles from "./ui.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div>
        <h1 >
          <i>C</i>MealManiac
        </h1>
      </div>
      <div>
        <i>Facebook</i>
        <i>Instagram</i>
      </div>
    </div>
  );
};

export default Footer;
