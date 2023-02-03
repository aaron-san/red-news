import React from "react";
import GetNewsFeeds from "./GetNewsFeeds";
// import data from "../../data/rss-feeds/fox-news.json";
// import dailyCallerData from "../../data/rss-feeds/daily-caller.json";
// import lasVegasReviewData from "../../data/rss-feeds/las-vegas-review.json";
// import mercuryNewsData from "../../data/rss-feeds/mercury-news.json";
// import oneAmericaNews from "../../data/rss-feeds/one-america-news.json";

import styles from "./NewsFeeds.module.css";

const NewsFeeds = ({ source }) => {
  // IMport data for "source" input given (e.g., fox-news) (use memoization if useful)

  <GetNewsFeeds source={source} />;

  // let categories = [];
  // data.forEach((item) => {
  //   categories = [...categories, ...item.categories];
  // });

  // return (
  //   <div className="div-container">
  //     {data.slice(0, 20).map((item) => {
  //       return (
  //         <div key={item.title} className={styles.headlineContainer}>
  //           <a href={item.guid} className={styles.headline}>
  //             {item.title}
  //           </a>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
};

export default NewsFeeds;
