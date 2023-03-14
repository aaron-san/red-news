import React, { useState, useEffect } from "react";
import quotesData from "../../data/quotes/quotes";
import styles from "./Quotes.module.css";

function Quotes() {
  // const getQuotesSubset = () => {
  const [quotes, setQuotes] = useState([...quotesData]);

  useEffect(() => {
    // let quotesCopy = [...quotes];
    const randomNum = Math.floor(Math.random() * (quotesData.length - 4));

    const quotesSubset = quotesData.slice(randomNum, randomNum + 4);
    setQuotes(quotesSubset);
  }, []);

  return (
    <div className="container">
      <h4>Quotes</h4>
      {/* <ul> */}
      {quotes.map((quote) => {
        return (
          <div key={quote + Math.random()} className={styles.quote}>
            {/* Topic Quote Author */}
            {quote.Quote}{" "}
            <span className={styles.author}>{`- ${quote.Author}`}</span>
          </div>
        );
      })}
      {/* </ul> */}
    </div>
  );
}

export default Quotes;
