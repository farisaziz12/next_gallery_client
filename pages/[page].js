import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import "react-awesome-slider/dist/styles.css";
import { loaderOptions } from "../lotties";
import { getPage } from "../cms";
import { resolveSlideshow, resolveRail } from "../functions";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { pathOr } from "ramda";

export default function App({ page }) {
  const rails = pathOr([], ["rails"], page);
  const slideshow = pathOr(undefined, ["slideshow"], page);
  const backgroundColor = pathOr("none", ["background_color", "hex"], page);
  const slideshowAutoplay = pathOr(false, ["slideshow", "autoplay"], page);
  const slideshowMedia = pathOr([], ["slideshow", "media"], page);
  const slideshowTitle = pathOr(undefined, ["slideshow", "title"], page);

  return (
    <div className={styles.container}>
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className={styles.main}
        style={{ backgroundColor: backgroundColor }}
      >
        {page ? (
          <div>
            {slideshow &&
              resolveSlideshow(
                slideshowTitle,
                slideshowAutoplay,
                slideshowMedia
              )}
            {rails[0] &&
              rails.map((rail) => (
                <div>
                  <h1>{rail.header}</h1>
                  {resolveRail(rail.media)}
                </div>
              ))}
          </div>
        ) : (
          <>
            <Lottie options={loaderOptions} height="40vw" width="40vw" />
            <h1 style={{ textAlign: "center" }}>
              Error 404 <br />
              Page Not Found
            </h1>
          </>
        )}
      </main>

      {page && <footer className={styles.footer}>Powered by Faris</footer>}
    </div>
  );
}

App.getInitialProps = async ({ query }) => {
  const page = await getPage(query.page);

  return { page };
};
