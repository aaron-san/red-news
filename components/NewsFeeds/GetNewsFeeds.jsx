import React, { useEffect, useState } from "react";
import Parser from "rss-parser";

// import news feed selector from other component and use to make a switch case here

const GetNewsFeeds = async () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const source = "fox-news";
  let link;

  switch (source) {
    case "fox-news":
      link = "https://moxie.foxnews.com/google-publisher/world.xml";
      break;
    case "daily-caller":
      link = "http://feeds.feedburner.com/dailycaller";
      break;
    case "las-vegas-review-journal":
      link = "https://www.reviewjournal.com/feed/";
      break;
    case "mercury-news":
      link = "https://www.mercurynews.com/feed/";
      break;
    case "one-america-news":
      link = "https://www.oann.com/category/newsroom/feed";
      break;
    default:
      link = link = "https://www.oann.com/category/newsroom/feed";
  }

  useEffect(() => {
    setIsLoading(true);

    const getData = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL(
        "https://moxie.foxnews.com/google-publisher/us.xml"
      );

      // Add the item to the items array
      await Promise.all(
        feed.items.map(async (currentItem) => {
          // Add a new item if it doesn't already exist
          if (items.filter((item) => item === currentItem).length <= 1) {
            setData((items) => [...items, currentItem]);
            // items.push(currentItem);
          }
        })
      );
    };
    getData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) {
    return <p>No data loaded</p>;
  } else {
    return (
      <ul>
        {data.map((headline) => {
          <li key={headline.title}>{headline.title}</li>;
        })}
      </ul>
    );
  }
};

export default GetNewsFeeds;
