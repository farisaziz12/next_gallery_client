import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import FadeIn from "react-fade-in";
import LazyLoad from "react-lazyload";
import Imgix from "react-imgix";
import { getSlideshowPaths, getRailPaths } from "./";
import "react-awesome-slider/dist/styles.css";
import styles from "../styles/Home.module.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export const resolveSlideshow = (title, autoplay, media) => {
  const images = getSlideshowPaths(media);

  return (
    <FadeIn delay={400}>
      <div className={styles.slideshow}>
        <AutoplaySlider
          play={autoplay}
          interval={3000}
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
    <LazyLoad>
      <FadeIn delay={400}>
        <div className={styles["gallery"]}>
          {images.map((image) => (
            <Imgix
              src={image.src}
              key={image.id}
              imgixParams={{
                fit: "crop",
                fm: "jpg",
              }}
              width="600"
              height="600"
            />
          ))}
        </div>
      </FadeIn>
    </LazyLoad>
  );
};
