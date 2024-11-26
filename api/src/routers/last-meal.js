import express from "express";
import knex from "../database_client.js";

const lastMealroute = express.Router();

lastMealroute.get("/", async (req, res, next) => {
  console.log("Received request for /api/last-meal");
  try {
    const last_meals = await knex("meal")
      .where("id", ">", 0)
      .orderBy("id", "desc")
      .first();
    res.json(last_meals);
  } catch (err) {
    next(err);
  }
});

export default lastMealroute;
