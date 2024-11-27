import React from "react";
import styles from "./ui.module.css";
import { FaFacebook, FaInstagram, FaGoogle } from "react-icons/fa"; // Social media icons
import { MdCopyright } from "react-icons/md"; // Copyright icon

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>
        <h1>Copyright</h1>
        <MdCopyright size={24} />
        <h1>2024- All right reserved by MealManiac</h1>
      </div>
      <div className={styles.socialMedia}>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram size={24} />
        </a>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
          <FaGoogle size={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
