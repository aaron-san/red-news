import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import styles from "./NewsFeeds.module.css";
// import news feed selector from other component and use to make a switch case here

const GetNewsFeeds = ({ source }) => {
  // const [isLoading, setIsLoading] = useState(false);

  // const source = "fox-news";

  let url;
  const [posts, setPosts] = useState([]);
  switch (source) {
    case "fox-news":
      url = "https://moxie.foxnews.com/google-publisher/world.xml";
      break;
    // case "daily-caller":
    //   url = "http://feeds.feedburner.com/dailycaller";
    //   break;
    case "las-vegas-review-journal":
      url = "https://www.reviewjournal.com/feed/";
      break;
    // case "mercury-news":
    //   url = "https://www.mercurynews.com/feed";
    //   break;
    // case "one-america-news":
    //   url = "https://www.oann.com/category/newsroom/feed";
    //   break;
    default:
      url = "https://moxie.foxnews.com/google-publisher/world.xml";
  }

  // Note: some RSS feeds can't be loaded in the browser due to CORS security.
  // To get around this, you can use a proxy.
  // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    // setIsLoading(true);

    const parser = new Parser();

    const fetchPosts = async () => {
      console.log(url);
      const feed = await parser.parseURL(url);
      console.log(feed.items);
      setPosts(feed.items);

      // Add the item to the items array
      // await Promise.all(
      // feed.items.map(async (currentItem) => {
      // Add a new item if it doesn't already exist
      //     if (items.filter((item) => item === currentItem).length <= 1) {
      //       setData((items) => [...items, currentItem]);
      //       // items.push(currentItem);
      //     }
      // })
      // );
    };
    fetchPosts();
  }, [url]);

  // if (isLoading) return <p>Loading...</p>;
  // if (!data) {
  //   return <p>No data loaded</p>;
  // } else {
  // console.log(data);
  return (
    // <ul>
    //   {posts.map((headline) => {
    //     return <li key={headline.title}>{headline.title}</li>;
    //   })}
    // </ul>
    <div className="div-container">
      {posts.slice(0, 15).map((item) => {
        return (
          <div key={item.title} className={styles.headlineContainer}>
            <a href={item.guid} className={styles.headline}>
              {item.title}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default GetNewsFeeds;
