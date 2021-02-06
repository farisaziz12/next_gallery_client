import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { pathOr } from "ramda";
import { resolveURL } from "../cms";

export default function CTACards({ cards }) {
  const router = useRouter();
  console.log(cards);
  return (
    <div className={styles["cta-card-container"]}>
      {cards.map((card) => {
        const title = pathOr("", ["title"], card);
        const path = pathOr("", ["path"], card);
        const image = pathOr("", ["image", "formats", "small", "url"], card);

        return (
          <div onClick={() => router.push(path)} className={styles["cta-card-border"]}>
            <div
              style={{
                backgroundImage: `url(${image && resolveURL(image)})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
              className={styles["cta-card"]}
            ></div>
            <h1>{title}</h1>
          </div>
        );
      })}
    </div>
  );
}
