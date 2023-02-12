import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = ({ label }) => {
  return (
    <div>
      <label className={styles.checkboxWrapper}>
        <input type="checkbox" className={styles.checkbox} />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
