import express from "express";
import knex from "../database_client.js";

const futureMealroute = express.Router();

futureMealroute.get("/", async (req, res, next) => {
  console.log("Received request for /api/all-meal");
  try {
    const futureMeal_meals = await knex("meal")
      .where("when", ">", knex.fn.now())
      .orderBy("id");
    res.json(futureMeal_meals);
  } catch (err) {
    next(err);
  }
});

export default futureMealroute;
