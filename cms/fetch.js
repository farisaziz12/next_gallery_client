export const prodCMS = "http://157.230.113.206";
import { pathOr } from "ramda";
import { get } from "../functions";

export const resolveURL = (path) => {
  return prodCMS + path;
};

export const getMain = async () => {
  const data = await get(prodCMS + "/main");

  return data;
};

export const getHome = async () => {
  const data = await getMain();
  const home = pathOr(null, ["page"], data);

  return home;
};
export const getPage = async (page) => {
  const data = await get(prodCMS + "/routes?path=/" + page);

  const pageData = pathOr(null, [0, "page"], data);

  return pageData;
};

export const getNavbar = async () => {
  const data = await get(prodCMS + "/navbar");
  const navBarData = pathOr(null, [0], data);

  return navBarData;
};
