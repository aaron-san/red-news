import React from "react";
import styles from "./SelectButton.module.css";

const SelectButton = ({ source, setSource }) => {
  const handleChange = (e) => {
    setSource(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.buttonContainer}>
      <select
        name="select-feed"
        id="select-feed-button"
        className={styles.selectButton}
        onChange={handleChange}
      >
        <option value="fox-news" className={styles.option}>
          Fox News
        </option>
        <option value="daily-caller" className={styles.option}>
          Daily Caller
        </option>
      </select>
    </div>
  );
};

export default SelectButton;
