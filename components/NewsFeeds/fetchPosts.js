import axios from "axios";

async function fetchPosts(source, URL, setPosts) {
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

    const regPattern =
      /sports|entertainment|media|super-bowl|magic-mike|lebron|basketball|football|nba|nfl|mlb/;
    let itemsArr = [];

    itemsArray
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
        // console.log(categoriesJoined);
        return !regPattern.test(categoriesJoined.toLocaleLowerCase());
      })

      .forEach((item) => {
        let title = item
          .querySelector("title")
          .innerHTML.replaceAll("<![CDATA[", "")
          .replaceAll("]]>", "");
        // console.log(title);
        // console.log(item);

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
          itemsArr = [...itemsArr, { title: title, url: permalink }];
        } else {
          itemsArr = [...itemsArr, { title: title, url: permalink }];
        }

        // console.log(permalink.includes("sports"));
        // console.log(regPattern.test(permalink));
      });
    // itemsArr.forEach((item) => {
    //   console.log(item);
    //   let creator = item.querySelector("creator");
    //   if (creator.innerHTML.includes("Victor Davis Hanson")) {
    //     itemsArr = [...itemsArr, { ...item, creator: "VDH" }];
    //   }
    // });

    // console.log(itemsArr);

    setPosts(itemsArr);
  } catch (err) {
    console.log(err);
  }
}

export default fetchPosts;
