import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import FadeIn from "react-fade-in";
import LazyLoad from "react-lazyload";
import { getSlideshowPaths, getRailPaths } from "./";
import "react-awesome-slider/dist/styles.css";
import styles from "../styles/Home.module.css";

import { useRouter } from "next/router";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const resolveSlideshow = (
  title,
  autoplay,
  media,
  auto_media_select,
  railMedias
) => {
  const images = auto_media_select
    ? getSlideshowPaths(railMedias)
    : getSlideshowPaths(media);

  return (
    <FadeIn>
      <div className={styles.slideshow}>
        <AutoplaySlider
          play={autoplay}
          interval={3000}
          bullets={false}
          media={images}
          style={{ top: "0", position: "relative" }}
        />
        <h1>{title}</h1>
      </div>
    </FadeIn>
  );
};

export const resolveRail = (media) => {
  const images = getRailPaths(media);

  return (
    <LazyLoad height={400}>
      <FadeIn delay={400}>
        <div className={styles["gallery"]}>
          {images.map((image) => (
            <img src={image.src} key={image.src} onClick={() => console.log(image.id)} />
          ))}
        </div>
      </FadeIn>
    </LazyLoad>
  );
};
