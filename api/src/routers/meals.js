import express from "express";
import knex from "../database_client.js";

const mealRouter = express.Router();
// get all meal
mealRouter.get("/", async (req, res, next) => {
  try {
    // Query to get meals and calculate the average review score
    const all_meals = await knex("meal")
      .leftJoin("review", "meal.id", "review.meal_id") // Join with the review table
      .leftJoin("reservation", "meal.id", "reservation.meal_id") // Join with the reservation table
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        knex.raw("meal.price::numeric as price"),
        "meal.location",
        "meal.max_reservations",
        knex.raw(
          "ROUND(COALESCE(AVG(review.stars), 0), 1)::numeric as averageStars"
        ), // Ensure averageStars is a number
        knex.raw(
          "GREATEST(meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0), 0)::numeric as availableReservations"
        ) // Ensure availableReservations is an integer
      )
      .groupBy("meal.id"); // Group by meal ID to calculate the average

    res.json(all_meals);
  } catch (err) {
    next(err);
  }
});

// add new meal

mealRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const data = req.body;
    await knex("meal").insert(data);
    res.status(200).json({ message: "created successfully" });
  } catch (err) {
    next(err);
  }
});

// Get meal by id

// Get meal by id
mealRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const meal = await knex("meal")
      .leftJoin("review", "meal.id", "review.meal_id") // Join with the review table
      .leftJoin("reservation", "meal.id", "reservation.meal_id") // Join with the reservation table
      .select(
        "meal.id",
        "meal.title",
        "meal.description",
        knex.raw("meal.price::numeric as price"),
        "meal.location",
        "meal.max_reservations",
        knex.raw(
          "ROUND(COALESCE(AVG(review.stars), 0), 1)::numeric as averageStars"
        ), // Ensure averageStars is a number
        knex.raw(
          "GREATEST(meal.max_reservations - COALESCE(SUM(reservation.number_of_guests), 0), 0)::numeric as availableReservations"
        ) // Ensure availableReservations is an integer
      )
      .where("meal.id", id) // Filter by the meal ID
      .groupBy("meal.id") // Group by meal ID
      .first(); // Ensure only one result is returned

    if (!meal) {
      res.status(404).json({ message: "Meal not found" });
    } else {
      res.json(meal);
    }
  } catch (err) {
    next(err);
  }
});

// update meal by id

mealRouter.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const result = await knex("meal").where({ id }).update(updatedData);

    if (result) {
      const updatedMeal = await knex("meal").where({ id }).first();
      res
        .status(200)
        .json({ message: "Meal updated successfully", meal: updatedMeal });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (err) {
    next(err);
  }
});

// delete by id

mealRouter.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await knex("meal").where({ id }).del();

    if (result) {
      res.status(200).json({ message: "Meal deleted successfully" });
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (err) {
    next(err);
  }
});

export default mealRouter;
