import React, { useEffect, useState } from "react";
import styles from "./NewsFeeds.module.css";
import axios from "axios";

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
    const regPattern =
      /sports|entertainment|media|super-bowl|magic-mike|lebron|basketball|football|nba|nfl|mlb/;

    // const url = "https://red-news-feeds.onrender.com/amgreatness";
    // console.log(URL);
    async function fetchPosts(URL) {
      try {
        const rawData = await axios.get(URL);
        const data = rawData.data;
        // console.log(rawData);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        // console.log(xmlDoc);

        var items = xmlDoc.querySelectorAll("item");
        // console.log(items);
        let itemsArray = Array.from(items);
        // console.log(itemsArray);

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
            if (link) {
              let linkText = link.innerHTML;
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
            return !regPattern.test(categoriesJoined.toLocaleLowerCase());
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
            }
          });

        // } else if (source === "daily-signal") {
        //   // let creator = item.querySelector("creator");
        //   // console.log(
        //   //   creator.innerHTML.toLocaleLowerCase().includes("ben shapiro")
        //   // );
        //   // console.log(item);
        //   itemsArr = [...itemsArr, { title: title, url: permalink }];
        // } else if (source === "daily-wire") {
        //   ////
        //   // Ben Shapiro's articles appear to be locked and for paid members only
        //   ////
        //   // console.log(item);
        //   // let creator = item.querySelector("creator");
        //   // console.log(
        //   //   creator.innerHTML.toLocaleLowerCase().includes("ben shapiro")
        //   // );
        //   // console.log(item);
        //   itemsArr = [...itemsArr, { title: title, url: permalink }];
        // } else {
        //   itemsArr = [...itemsArr, { title: title, url: permalink }];
        // }

        // console.log(permalink.includes("sports"));
        // console.log(regPattern.test(permalink));

        // itemsArr.forEach((item) => {
        // let creator = item.querySelector("creator");
        // if (creator.innerHTML.includes("Victor Davis Hanson")) {
        //   itemsArr = [...itemsArr, { ...item, creator: "VDH" }];
        // }
        // });
        // });
        // }}

        setPosts(itemsArr);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPosts(URL);

    // setIsLoading(false);
  }, [URL, source]);

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
