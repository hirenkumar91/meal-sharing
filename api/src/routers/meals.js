import express from "express";
import knex from "../database_client.js";

const mealRouter = express.Router();
// get all meal
mealRouter.get("/", async (req, res, next) => {
    try{
        const all_meals = await knex("meal").select("*");
    res.json(all_meals);
    } catch (err) {
        next(err);
      }
});

// add new meal

mealRouter.post("/", async (req, res, next) => {
    try{
        console.log(req.body);
        const data=req.body;
        await knex("meal").insert(data);
        res.status(200).json({ message: "created successfully" });
    } catch (err) {
        next(err);
      }
});

// Get meal by id

mealRouter.get("/:id", async (req,res,next) => {
    try{
        const id = req.params.id;
        const meal = await knex("meal").select("*").where("id",id).first();
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
      const result = await knex("meal")
          .where({ id })
          .update(updatedData);

      if (result) {
        const updatedMeal = await knex("meal").where({ id }).first();
          res.status(200).json({ message: "Meal updated successfully",
            meal: updatedMeal
           });
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
      const result = await knex("meal")
          .where({ id })
          .del();

      if (result) {
          res.status(200).json({ message: "Meal deleted successfully" ,
          });
      } else {
          res.status(404).json({ message: "Meal not found" });
      }
  } catch (err) {
      next(err);
  }
});





export default mealRouter;