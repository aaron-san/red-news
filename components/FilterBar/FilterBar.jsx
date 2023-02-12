import React from "react";
import styles from "./FilterBar.module.css";
import Checkbox from "../Checkbox/Checkbox";

const filterBar = () => {
  return (
    <div className={styles.filterBarContainer}>
      <Checkbox label="Sports" />
      <Checkbox label="Entertainment" />
      <Checkbox label="Media" />
    </div>
  );
};

export default filterBar;
