import React, { useState, useEffect } from "react";
import japanese from "../data/japanese/japanese.json";
import styles from "./JapaneseWords.module.css";

function JapaneseWords() {
  // const getQuotesSubset = () => {
  const [jWords, setJWords] = useState([...japanese]);

  useEffect(() => {
    // let jWords = [...japanese];
    const randomNum = Math.floor(Math.random() * (japanese.length - 3));

    const jWordsSubset = japanese.slice(randomNum, randomNum + 3);
    setJWords(jWordsSubset);
  }, []);

  return (
    <div className={styles.japaneseContainer}>
      <h4>Japanese Words</h4>
      {jWords.map((word) => {
        return (
          <div
            key={word.English + word["Dictionary（じしょ形）"]}
            className={styles.japaneseWord}
          >
            <span className={styles.japanese}>{word.Japanese}</span>
            <span className={styles.furigana}>
              {word["Dictionary（じしょ形）"]}
            </span>
            <span className={styles.english}>{word.English}</span>
          </div>
        );
      })}
    </div>
  );
}

export default JapaneseWords;
