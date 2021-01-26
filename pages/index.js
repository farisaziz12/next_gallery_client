import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import "react-awesome-slider/dist/styles.css";
import { loaderOptions } from "../lotties";
import { getHome } from "../cms";
import { resolveSlideshow, resolveRail } from "../functions";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { pathOr } from "ramda";

export default function Home({ data }) {
  const rails = pathOr([], ["rails"], data);
  const slideshow = pathOr(undefined, ["slideshow"], data);
  const backgroundColor = pathOr("none", ["background_color", "hex"], data);
  const autoplay = pathOr(false, ["slideshow", "autoplay"], data);
  const slideshowMedia = pathOr([], ["slideshow", "media"], data);
  ``;
  const slideshowTitle = pathOr([], ["slideshow", "title"], data);

  return (
    <div className={styles.main} style={{ backgroundColor: backgroundColor }}>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {data ? (
          <div>
            {slideshow &&
              resolveSlideshow(slideshowTitle, autoplay, slideshowMedia)}
            {rails[0] &&
              rails.map((rail) => (
                <div key={rail.id}>
                  <h1>{rail.header}</h1>
                  {resolveRail(rail.media)}
                </div>
              ))}
          </div>
        ) : (
          <Lottie options={loaderOptions} height={400} width={400} />
        )}
      </main>

      {data && <footer className={styles.footer}>Powered by Faris</footer>}
    </div>
  );
}

export async function getStaticProps() {
  const data = await getHome();

  return {
    props: {
      data,
    },
  };
}
