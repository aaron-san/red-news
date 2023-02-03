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
        <option value="las-vegas-review-journal" className={styles.option}>
          Las Vegas Review
        </option>
        {/* <option value="one-america-news" className={styles.option}>
          One America News
        </option> */}
      </select>
    </div>
  );
};

export default SelectButton;
