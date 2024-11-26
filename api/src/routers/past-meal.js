import express from "express";
import knex from "../database_client.js";

const pastMealroute = express.Router();

pastMealroute.get("/", async (req, res, next) => {
  console.log("Received request for /api/all-meal");
  try {
    const pastMeal_meals = await knex("meal")
      .where("when", "<", new Date())
      .orderBy("id");
    res.json(pastMeal_meals);
  } catch (err) {
    next(err);
  }
});

export default pastMealroute;
