"use client";

import React, { useEffect, useState } from "react";
import "./meal.css";
import Link from "next/link";
import { setSelectedMealID } from "./carddetails/mealstoreage";

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

  if (!meals && !error) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="pagenav">
        <div className="form-control searchBar">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>

      {error && <p>Error: {error}</p>}
      <div className="cardDisplay">
        {meals.length === 0 ? (
          <p>No meals available</p>
        ) : (
          meals.map((meal) => (
            <div
              className="card bg-base-100 w-96 shadow-xl flex justify-between"
              key={meal.id}
            >
              <figure className="px-10 pt-10">
                <img src="#" alt={meal.title} className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{meal.title}</h2>
                <p>{meal.description}</p>
                <div className="card-actions">
                  <Link
                    href="/meal/carddetails"
                    className="btn btn-primary"
                    onClick={() => setSelectedMealID(meal.id)}
                  >
                    More
                  </Link>
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
