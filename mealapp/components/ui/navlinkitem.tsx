"use client";

import React, { useState } from "react";
import styles from "./ui.module.css";
import Link from "next/link";

const Navlinkitem = () => {
  // State to track the active link
  const [activeLink, setActiveLink] = useState("/");

  // Function to handle link click
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={styles.navItem}>
      <div className={styles.navLinks}>
        <Link
          href="/"
          className={`${styles.navlinkitem} ${activeLink === "/" ? styles.active : ""}`}
          onClick={() => handleLinkClick("/")}
        >
          Home
        </Link>

        <Link
          href="/meal"
          className={`${styles.navlinkitem} ${activeLink === "/meal" ? styles.active : ""}`}
          onClick={() => handleLinkClick("/meal")}
        >
          Our Meal
        </Link>

        <Link
          href="/Reservation"
          className={`${styles.navlinkitem} ${activeLink === "/Reservation" ? styles.active : ""}`}
          onClick={() => handleLinkClick("/Reservation")}
        >
          Make Reservation
        </Link>
      </div>
    </div>
  );
};

export default Navlinkitem;
