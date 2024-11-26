import express from "express";
import knex from "../database_client.js";

const firstMealroute = express.Router();

firstMealroute.get("/", async (req, res, next) => {
  console.log("Received request for /api/first-meal");
  try {
    const first_meals = await knex("meal").orderBy("id", "asc").first();
    res.json(first_meals);
  } catch (err) {
    next(err);
  }
});

export default firstMealroute;
