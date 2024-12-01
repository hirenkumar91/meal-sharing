"use client";

import React from "react";
import { useState, useEffect } from "react";
import { getSelectedMealID } from "./mealstoreage";
import styles from "./mealcard.module.css";

const CardDetails = () => {
  const [selectedmeal, setselectedmeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mealID = getSelectedMealID();

    fetch(`http://localhost:3001/api/meal/${mealID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch meal");
        }
        return response.json();
      })
      .then((data) => {
        setselectedmeal(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Handle loading state
  if (!selectedmeal && !error) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mealSelection}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold headingText">
            {selectedmeal.title}
          </h1>
          <h1 className="text-3xl primaryText">{selectedmeal.description}</h1>
          <h1 className="text-2xl font-bold primaryText">
            {selectedmeal.price} DKK
          </h1>
          <h1 className="text-2xl font-bold primaryText">
            {selectedmeal.location}
          </h1>
          <h1 className="text-2xl font-bold primaryText">
            Max reservation available {selectedmeal.max_reservations} people
          </h1>
        </div>

        <div
          className={`card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ${styles.formCard}`}
        >
          <div>
            <h1 className={styles.formcardTitle}>Grab Your spot Now !</h1>
          </div>
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Number of people</span>
              </label>
              <input
                type="number"
                placeholder="For how many"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking Date</span>
              </label>
              <input
                type="Date"
                placeholder="DD/MM/YYYY"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
