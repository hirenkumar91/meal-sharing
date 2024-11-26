import React from "react";
import styles from "./ui.module.css";
import Navlinkitem from "./navlinkitem";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navItem}>
        <Link href="/">
          <img src="../logo.png" alt="" />
          <h1 className={styles.logo}>MealManiac</h1>
        </Link>
      </div>
      <Navlinkitem />
    </div>
  );
};
