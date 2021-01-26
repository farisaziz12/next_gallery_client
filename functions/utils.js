import { pathOr } from "ramda";
import { prodCMS } from "../cms";

export const getSlideshowPaths = (media) => {
  const paths = media.map((image) => {
    const url = pathOr("", ["url"], image);
    return { source: url ? prodCMS + url : url };
  });
  return paths;
};

export const getRailPaths = (media) => {
  const paths = media.map((image) => {
    const url = pathOr("", ["formats", "large", "url"], image);
    return {
      src: url ? prodCMS + url : url,
    };
  });
  return paths;
};
