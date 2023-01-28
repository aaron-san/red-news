import React from "react";
import japanese from "../data/json/japaneseWords.json";
import styles from "./JapaneseWords.module.css";

function JapaneseWords() {
  return (
    <div>
      <h4>Japanese Words</h4>
      <ul>
        {japanese.slice(0, 10).map((word) => {
          return (
            <li key={word.English} className={styles.japaneseWord}>
              {word["Dictionary（じしょ形）"]}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default JapaneseWords;
