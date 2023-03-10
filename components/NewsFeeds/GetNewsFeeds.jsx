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
    case "daily-signal":
      url = "https://dailysignal.com/feed/";
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
    // setIsLoading(true);

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
              // console.log(categoriesJoined);
              return !regPattern.test(categoriesJoined.toLocaleLowerCase());
              // console.log(categoriesJoined);
              // return true;
            })

            .forEach((item) => {
              // console.log(item);
              let title = item
                .querySelector("title")
                .innerHTML.replaceAll("<![CDATA[", "")
                .replaceAll("]]>", "");

              let permalink = item.querySelector("guid").innerHTML;

              if (source === "american-greatness") {
                let creator = item.querySelector("creator");
                if (creator.innerHTML.includes("Victor Davis Hanson")) {
                  itemsArr = [
                    ...itemsArr,
                    { ...item, title: title, url: permalink, creator: "VDH" },
                  ];
                } else {
                  itemsArr = [...itemsArr, { title: title, url: permalink }];
                }
              } else if (source === "daily-signal") {
                // let creator = item.querySelector("creator");
                // console.log(
                //   creator.innerHTML.toLocaleLowerCase().includes("ben shapiro")
                // );
                // console.log(item);
                itemsArr = [...itemsArr, { title: title, url: permalink }];
              } else if (source === "daily-wire") {
                ////
                // Ben Shapiro's articles appear to be locked and for paid members only
                ////
                // console.log(item);
                // let creator = item.querySelector("creator");
                // console.log(
                //   creator.innerHTML.toLocaleLowerCase().includes("ben shapiro")
                // );
                // console.log(item);
                itemsArr = [...itemsArr, { title: title, url: permalink }];
              } else {
                itemsArr = [...itemsArr, { title: title, url: permalink }];
              }

              // console.log(permalink.includes("sports"));
              // console.log(regPattern.test(permalink));

              // itemsArr.forEach((item) => {
              // let creator = item.querySelector("creator");
              // if (creator.innerHTML.includes("Victor Davis Hanson")) {
              //   itemsArr = [...itemsArr, { ...item, creator: "VDH" }];
              // }
              // });
            });
          setPosts(itemsArr);
        });
    }

    // Comment out for offline work
    fetchPosts(url);
    // setIsLoading(false);
  }, [url]);

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
                  <a href={post.url}>{post.title}</a>
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
