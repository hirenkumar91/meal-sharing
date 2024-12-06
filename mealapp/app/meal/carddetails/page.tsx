"use client";

import React, { useState, useEffect } from "react";
import { getSelectedMealID } from "./mealstoreage";
import styles from "./mealcard.module.css";

// Define the type for the selectedmeal object
interface Meal {
  title: string;
  description: string;
  price: number;
  location: string;
  max_reservations: number;
  averagestars: number;
  availablereservations: number; // Include available reservations
}

const CardDetails = () => {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const mealID = getSelectedMealID();
    if (!mealID) {
      setError("No meal ID found.");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3001/api/meal/${mealID}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch meal");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedMeal(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handle loading state
  if (loading) {
    return <div>Loading meal details...</div>; // You can replace this with a spinner
  }

  // Handle error state
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className={styles.mealSelection}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          {selectedMeal ? (
            <>
              <h1 className="text-5xl font-bold headingText">
                {selectedMeal.averagestars}
              </h1>
              <h1 className="text-5xl font-bold headingText">
                {selectedMeal.title}
              </h1>
              <h1 className="text-3xl primaryText">
                {selectedMeal.description}
              </h1>
              <h1 className="text-2xl font-bold primaryText">
                {selectedMeal.price} DKK
              </h1>
              <h1 className="text-2xl font-bold primaryText">
                {selectedMeal.location}
              </h1>
              <h1 className="text-2xl font-bold primaryText">
                Max reservations: {selectedMeal.max_reservations}
              </h1>
              <h1 className="text-2xl font-bold primaryText">
                Available reservations: {selectedMeal.availablereservations}
              </h1>
            </>
          ) : (
            <p>Loading meal details...</p>
          )}
        </div>

        {/* Reservation Form */}
        <div
          className={`card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ${styles.formCard}`}
        >
          <div>
            <h1 className={styles.formcardTitle}>Grab Your Spot Now!</h1>
          </div>
          <form
            className="card-body"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Reservation submitted!");
            }}
          >
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
                <span className="label-text">Number of People</span>
              </label>
              <input
                type="number"
                placeholder="For how many"
                className="input input-bordered"
                min={1}
                max={selectedMeal?.availablereservations || 1} // Restrict to available reservations
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Booking Date</span>
              </label>
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                disabled={
                  !selectedMeal || selectedMeal.availablereservations === 0
                }
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
