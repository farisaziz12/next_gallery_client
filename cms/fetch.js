export const prodCMS = "http://157.230.113.206";
import { pathOr } from "ramda";
import { get } from "../functions";
import { Menu } from "antd";

const { SubMenu } = Menu;

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

  return data;
};

export const resolveDropdown = async (id) => {
  try {
    const data = await get(prodCMS + "/nav-dropdowns/" + id);

    return data.routes;
  } catch (error) {
    return [];
  }
};
