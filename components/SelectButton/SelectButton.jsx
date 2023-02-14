import React from "react";
import styles from "./SelectButton.module.css";

const SelectButton = ({ source, setSource }) => {
  const handleChange = (e) => {
    setSource(e.target.value);
    // console.log(e.target.value);
  };

  return (
    <div className={styles.buttonContainer}>
      <select
        name="select-feed"
        id="select-feed-button"
        className={styles.selectButton}
        onChange={handleChange}
      >
        <option value="american-greatness" className={styles.option}>
          American Greatness
        </option>
        <option value="las-vegas-review-journal" className={styles.option}>
          Las Vegas Review
        </option>
        <option value="fox-news" className={styles.option}>
          Fox News
        </option>

        <option value="the-blaze" className={styles.option}>
          The Blaze
        </option>
        <option value="mercury-news" className={styles.option}>
          Mercury News
        </option>
        {/* <option value="one-america-news" className={styles.option}>
          One America News
        </option> */}
        {/* <option value="daily-caller" className={styles.option}>
          Daily Caller
        </option> */}
        <option value="daily-wire" className={styles.option}>
          Daily Wire
        </option>
        <option value="bongino-report" className={styles.option}>
          Bongino Report
        </option>
      </select>
    </div>
  );
};

export default SelectButton;
