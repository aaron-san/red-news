import React, { useEffect, useState } from "react";
import styles from "./NewsFeeds.module.css";

import fetchPosts from "./fetchPosts";

// Set the news source

const GetNewsFeeds = ({ source }) => {
  let URL;
  switch (source) {
    case "fox-news":
      URL = "https://red-news-feeds.onrender.com/foxnews";
      // console.log(URL);
      break;
    case "daily-signal":
      // URL = "https://dailysignal.com/feed/";
      URL = "https://red-news-feeds.onrender.com/dailysignal";
      break;
    // case "daily-caller":
    //   url = "http://feeds.feedburner.com/dailycaller";
    //   break;
    // case "las-vegas-review-journal":
    //   URL = "https://www.reviewjournal.com/feed/";
    //   break;
    // case "mercury-news":
    //   url = "https://www.mercurynews.com/feed";
    //   break;
    // case "one-america-news":
    //   url = "https://www.oann.com/category/newsroom/feed";
    //   break;
    // case "daily-wire":
    //   URL = "https://www.dailywire.com/feeds/rss.xml";
    //   break;
    // case "bongino-report":
    //   URL = "https://bonginoreport.com/feed/";
    //   break;
    // case "the-blaze":
    //   URL = "https://www.theblaze.com/feeds/feed.rss";
    //   break;
    case "american-greatness":
      URL = "https://red-news-feeds.onrender.com/amgreatness";
      // console.log(URL);
      break;
    default:
      throw new Error("please choose a news source");
  }

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts(source, URL, setPosts);
    // console.log(posts);
  }, [URL]);

  if (posts) {
    // setIsLoading(false);
    return (
      <div className="container">
        {posts.slice(0, 20).length === 0 ? (
          <div className={styles.loading_container}>
            <div className={styles.loading}>Loading</div>
            <div className={styles.loadingDotsOne}>.</div>
            <div className={styles.loadingDotsTwo}>.</div>
            <div className={styles.loadingDotsThree}>.</div>
          </div>
        ) : (
          posts.slice(0, 20).map((post) => {
            if (post.creator === "VDH") {
              return (
                <div
                  className={styles.VDHContainer}
                  key={post.url + post.creator}
                >
                  <a href={post.url} target="_blank">
                    {post.title}
                  </a>
                </div>
              );
            } else {
              return (
                <div
                  className={styles.headlineContainer}
                  key={post.url + post.creator}
                >
                  <a href={post.url}>{post.title}</a>
                </div>
              );
            }
          })
        )}
      </div>
    );
  } else {
    return <p>No data loaded</p>;
  }
};

export default GetNewsFeeds;
