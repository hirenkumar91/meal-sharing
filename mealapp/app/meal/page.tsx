"use client";

import React, { useEffect, useState } from "react";
import "./meal.css";
import { setSelectedMealID } from "./carddetails/mealstoreage";
import { fetchMeals, Meal } from "../utils/fetchData";
import Card from "@/components/mealcard";

const Meal = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMeals();
        setMeals(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            value={searchQuery}
            onChange={handleSearchChange}
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
      </div>

      <div className="cardDisplay">
        {filteredMeals.length === 0 ? (
          <p>No meals available</p>
        ) : (
          filteredMeals.map((meal) => (
            <Card
              key={meal.id}
              meal={meal}
              setSelectedMealID={setSelectedMealID}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Meal;
