import React from "react";
// import quotes from "../data/quotes";
import quotes from "../data/json/quotes";

function Quotes() {
  return (
    <div>
      <h4>Quotes</h4>
      <ul>
        {quotes.map((quote) => {
          return (
            <li key={quote + Math.random()} className="quote">
              {quote.Quote}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Quotes;
