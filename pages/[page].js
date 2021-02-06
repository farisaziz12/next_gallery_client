import React from "react";
import Lottie from "react-lottie";
import "react-awesome-slider/dist/styles.css";
import { loaderOptions } from "../lotties";
import { getPage, getNavbar } from "../cms";
import { resolveSlideshow, resolveRail } from "../functions";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { pathOr } from "ramda";
import NavigationBar from "../Components/NavigationBar";

export default function App({ page, navBar }) {
  const navTitle = pathOr("", ["title"], navBar);
  const navItems = pathOr([], ["nav_items"], navBar);
  const navDropdowns = pathOr([], ["nav_dropdowns"], navBar);
  const rails = pathOr([], ["rails"], page);
  const slideshow = pathOr(undefined, ["slideshow"], page);
  const backgroundColor = pathOr("none", ["background_color", "hex"], page);
  const slideshowAutoplay = pathOr(false, ["slideshow", "autoplay"], page);
  const slideshowAutoMediaSelect = pathOr(
    false,
    ["slideshow", "auto_media_select"],
    page
  );
  const slideshowMedia = pathOr([], ["slideshow", "media"], page);
  const slideshowTitle = pathOr("", ["slideshow", "title"], page);
  const railMedias = rails.map((rail) => rail.media).flat();

  return (
    <div
      className={styles.container}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <Head>
        <title>App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavigationBar
          title={navTitle}
          navItems={navItems}
          navDropdowns={navDropdowns}
        />
        {page ? (
          <div>
            {slideshow &&
              resolveSlideshow(
                slideshowTitle,
                slideshowAutoplay,
                slideshowMedia,
                slideshowAutoMediaSelect,
                railMedias
              )}
            {rails[0] &&
              rails.map((rail) => (
                <div>
                  <h1 className={styles["rail-header"]}>{rail.header}</h1>
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
  const navBar = await getNavbar();

  return { page, navBar };
};
