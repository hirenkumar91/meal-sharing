"use client";
import React, { useEffect, useState } from "react";
import "./meal.css";
import daisyui from "daisyui";

const Meal = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/meal")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }
        return response.json();
      })
      .then((data) => {
        setMeals(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Meal Page</h1>
      {error && <p>Error: {error}</p>}
      <div className="cardDisplay">
        {meals.length === 0 ? (
          <p>No meals available</p>
        ) : (
          meals.map((meal) => (
            <div className="card bg-base-100 w-96 shadow-xl" key={meal.id}>
              <figure className="px-10 pt-10">
                <img src="" alt={meal.title} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{meal.title}</h2>
                <p>{meal.description}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Reservation</button>
                  <button className="btn btn-primary">Review</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Meal;
