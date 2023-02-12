import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Quotes from "../components/Quotes";
import JapaneseWords from "../components/JapaneseWords";
import NewsFeeds from "../components/NewsFeeds/NewsFeeds";
import GetNewsFeeds from "../components/NewsFeeds/GetNewsFeeds";
import SelectButton from "../components/SelectButton/SelectButton";
import FilterBar from "../components/FilterBar/FilterBar";
// import cors from "cors";
// const cors = require("cors");
// app.use(cors());

export default function Home() {
  // Set the news source
  const [source, setSource] = useState("fox-news");

  return (
    <div className={styles.container}>
      {/* <Quotes /> */}
      {/* <JapaneseWords /> */}
      <Head>
        <title>Red News</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.header}>
        <h1 className={styles.title}>Red News</h1>
        <SelectButton source={source} setSource={setSource} />
      </div>

      <main className={styles.main}>
        {/* <NewsFeeds source={source} /> */}
        <GetNewsFeeds source={source} />
        {/* <p>-----------------------------------------</p> */}
        {/* <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth...</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.j...</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy...</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>Instantly deploy with Vercel.</p>
          </a>
        </div> */}
      </main>

      <FilterBar />
      <footer className={styles.footer}>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
        <p>Copyright FinCoder {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
