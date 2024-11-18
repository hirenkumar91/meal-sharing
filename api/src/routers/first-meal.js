import express from "express";
import knex from "../database_client.js";

const firstMealroute = express.Router();

firstMealroute.get("/", async (req, res, next) => {
  console.log("Received request for /api/first-meal");
  try {
    const firstMeals = await knex("meal").orderBy("id").first();
    res.json(firstMeals);
  } catch (err) {
    next(err);
  }
});

export default firstMealroute;
