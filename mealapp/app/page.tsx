import React from "react";
import styles from "../app/main.module.css";

const Home = () => {
  return (
    <div>
      <div className={`${styles.MainBanner} hero  min-h-screen`}>
        <div className={styles.content}>
          <h1 className="text-5xl font-bold">Join the Meal Maniac Movement</h1>
          <p className="py-6">
            Let’s face it – food is life, and we’re living it to the fullest.
            Ready to get your next meal fix? Join the Meal Maniac crew today,
            and never look at food the same way again.
          </p>
          <p>Eat. Enjoy. Repeat.</p>
        </div>
      </div>
      <div className={styles.TopThreeBanner}>
        <div className="carousel carousel-end rounded-box">
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              alt="Drink"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              alt="Drink"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              alt="Drink"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
