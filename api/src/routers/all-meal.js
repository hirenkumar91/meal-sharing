import express from "express";
import knex from "../database_client.js";

const allMealroute = express.Router();

allMealroute.get("/", async (req, res, next) => {
  try {
    const all_meals = await knex("meal").orderBy("id");
    res.json(all_meals);
  } catch (err) {
    next(err);
  }
});

export default allMealroute;
