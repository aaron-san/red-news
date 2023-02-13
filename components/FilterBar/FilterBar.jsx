import React from "react";
import styles from "./FilterBar.module.css";
import Checkbox from "../Checkbox/Checkbox";

const options = ["Sports", "Entertainment", "Media"];

const filterBar = () => {
  return (
    <div className={styles.filterBarContainer}>
      {options.map((option) => {
        <Checkbox label={option} />;
      })}
    </div>
  );
};

export default filterBar;
