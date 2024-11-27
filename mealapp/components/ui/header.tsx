import React from "react";
import styles from "./ui.module.css";
import Navlinkitem from "./navlinkitem";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navItem}>
        <Link href="/">
          <div className={styles.logo}>
            <h1>MealManiac</h1>
          </div>
        </Link>
      </div>
      <Navlinkitem />
    </div>
  );
};
