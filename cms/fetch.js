// export const prodCMS = "http://188.166.158.2";
export const prodCMS = "http://localhost:1337";
import { pathOr } from "ramda";
import { get } from "../functions";

export const getMain = async () => {
  const data = await get(prodCMS + "/main");

  return data;
};

export const getHome = async () => {
  const data = await getMain();
  const home = pathOr(undefined, ["page"], data);

  return home;
};
export const getPage = async (page) => {
  const data = await get(prodCMS + "/routes?path=/" + page);

  const pageData = pathOr(undefined, [0, "page"], data);

  return pageData;
};
