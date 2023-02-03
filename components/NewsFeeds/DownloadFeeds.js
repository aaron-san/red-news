const fs = require("fs");
const Parser = require("rss-parser");

const links = [
  {
    name: "fox-news",
    link: "https://moxie.foxnews.com/google-publisher/world.xml",
  },
  {
    name: "daily-caller",
    link: "http://feeds.feedburner.com/dailycaller",
  },
  {
    name: "las-vegas-review",
    link: "https://www.reviewjournal.com/feed/",
  },
  {
    name: "mercury-news",
    link: "https://www.mercurynews.com/feed/",
  },
  {
    name: "one-america-news",
    link: "https://www.oann.com/category/newsroom/feed",
  },
];

async function getFeeds(link) {
  const parser = new Parser();
  const feed = await parser.parseURL(link.link);

  let items = [];

  // Clean up the string and replace reserved characters
  // const fileName = `${feed.title
  //   .replace(/\s+/g, "-")
  //   .replace(/[/\\?\\.%*:|"<>]/g, "")
  //   .toLowerCase()}.json`;

  const fileName = link.name + ".json";
  // Create a data check to see if it already exists (and if so, just read the file in the directory)
  // console.log(fs.existsSync(fileName));
  // if (fs.existsSync("./data/rss-feeds/" + fileName)) {
  //   items = require("./data/rss-feeds/" + fileName);
  // }

  // Add the item to the items array
  await Promise.all(
    feed.items.map(async (currentItem) => {
      // Add a new item if it doesn't already exist
      if (items.filter((item) => item === currentItem).length <= 1) {
        items.push(currentItem);
      }
    })
  );
  // Save the file
  fs.writeFileSync("./data/rss-feeds/" + fileName, JSON.stringify(items));
}

links.forEach((link) => {
  getFeeds(link);
});
