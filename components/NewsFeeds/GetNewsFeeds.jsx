import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import styles from "./NewsFeeds.module.css";
import axios from "axios";
// import $ from "jquery";
// import news feed selector from other component and use to make a switch case here

const GetNewsFeeds = ({ source }) => {
  const [isLoading, setIsLoading] = useState(false);

  let url;
  const [posts, setPosts] = useState([]);
  switch (source) {
    case "fox-news":
      url = "https://moxie.foxnews.com/google-publisher/latest.xml";
      break;
    // case "daily-caller":
    //   url = "http://feeds.feedburner.com/dailycaller";
    //   break;
    case "las-vegas-review-journal":
      url = "https://www.reviewjournal.com/feed/";
      break;
    case "mercury-news":
      url = "https://www.mercurynews.com/feed";
      break;
    // case "one-america-news":
    //   url = "https://www.oann.com/category/newsroom/feed";
    //   break;
    case "daily-wire":
      url = "https://www.dailywire.com/feeds/rss.xml";
      break;
    case "bongino-report":
      url = "https://bonginoreport.com/feed/";
      break;
    case "the-blaze":
      url = "https://www.theblaze.com/feeds/feed.rss";
      break;
    case "american-greatness":
      url = "https://amgreatness.com/feed/";
      break;
    default:
      // url = "https://moxie.foxnews.com/google-publisher/world.xml";
      throw new Error("please choose a news source");
  }

  // Note: some RSS feeds can't be loaded in the browser due to CORS security.
  // To get around this, you can use a proxy.
  // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

  useEffect(() => {
    setIsLoading(true);

    const regPattern =
      /sports|entertainment|media|super-bowl|magic-mike|lebron|basketball|football|nba|nfl|mlb/;
    async function fetchPosts(url) {
      await axios
        // Helps avoid some of the cors problems
        .get("https://corsanywhere.herokuapp.com/" + url)
        .then((res) => {
          const feeds = res.data;
          let parser = new DOMParser();
          let xmlDoc = parser.parseFromString(feeds, "text/xml");

          var items = xmlDoc.querySelectorAll("item");
          let itemsArray = Array.from(items);

          // console.log(items);
          let itemsArr = [];
          itemsArray
            // .forEach((item) => {
            //   console.log(item);
            // })
            .filter((item) => {
              let permalink = item.querySelector("guid").innerHTML;
              return !regPattern.test(permalink);
            })
            .filter((item) => {
              let link = item.querySelector("link");
              // console.log(link);
              if (link) {
                let linkText = link.innerHTML;
                // console.log(linkText);
                return !regPattern.test(linkText.toLocaleLowerCase());
              }
              return true;
            })
            .filter((item) => {
              let categories = [];
              let category = item.querySelectorAll("category");

              Array.from(category).map((el) => {
                categories.push(el.innerHTML.toLocaleLowerCase());
              });
              let categoriesJoined = JSON.stringify(
                categories
                  .join(", ")
                  .replaceAll("<![cdata[", "")
                  .replaceAll("]]", "")
                  .replaceAll(">", "")
              );
              console.log(categoriesJoined);
              return !regPattern.test(categoriesJoined.toLocaleLowerCase());
              // console.log(categoriesJoined);
              // return true;
            })

            .forEach((item) => {
              console.log(item);
              let title = item
                .querySelector("title")
                .innerHTML.replaceAll("<![CDATA[", "")
                .replaceAll("]]>", "");

              // let category = item.querySelector("category");
              // console.log(category);

              let permalink = item.querySelector("guid").innerHTML;

              // console.log(permalink.includes("sports"));
              console.log(regPattern.test(permalink));
              itemsArr = [...itemsArr, { title: title, url: permalink }];
            });
          setPosts(itemsArr);
        });
    }

    fetchPosts(url);
    setIsLoading(false);
  }, [url]);

  if (isLoading) return <p>Loading...</p>;
  if (!posts) {
    return <p>No data loaded</p>;
  } else {
    // console.log(data);
    return (
      <div className="div-container">
        {posts.slice(0, 15).length === 0 ? (
          <div>No data</div>
        ) : (
          posts.slice(0, 20).map((post) => {
            return (
              <div className={styles.headlineContainer} key={post.url}>
                <a href={post.url}>{post.title}</a>
              </div>
            );
          })
        )}
      </div>
    );
  }
};

export default GetNewsFeeds;
