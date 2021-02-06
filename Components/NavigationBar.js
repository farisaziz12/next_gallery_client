import React, { useState } from "react";
import { useRouter } from "next/router";
import { Menu } from "antd";
import "antd/dist/antd.css";
import styles from "../styles/Home.module.css";
import { pathOr } from "ramda";
import { resolveDropdown } from "../cms";

const { SubMenu } = Menu;

export default function NavigationBar({ title, navItems, navDropdowns }) {
  const router = useRouter();
  return (
    <div>
      <h1 className={styles["nav-title"]}>{title}</h1>
      <Menu mode="horizontal">
        <Menu.Item onClick={() => router.push("/")} key="home">
          Home
        </Menu.Item>
        {navItems.map((item) => {
          const name = pathOr("", ["route", "name"], item);
          const path = pathOr("", ["route", "path"], item);
          return (
            <Menu.Item key={name} onClick={() => router.push(path)}>
              {name}
            </Menu.Item>
          );
        })}

        {/* {navDropdowns.map((dropdown) => {
          resolveDropdown(dropdown.id).then((data) => {
            return (
              <SubMenu
                title={<span className="submenu-title-wrapper">{dropdown.title}</span>}
              >
                {}
                  data.routes.map((route) => (
                    <Menu.Item key={route.name} onClick={() => router.push(route.path)}>
                      {route.name}
                    </Menu.Item>
                  ))}
              </SubMenu>
            );
          });
        })} */}
      </Menu>
    </div>
  );
}
