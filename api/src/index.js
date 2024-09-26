import "dotenv/config";
import express from "express";
import cors from "cors";

// Import all route//
import nestedRouter from "./routers/nested.js";
import allMealroute from "./routers/all-meal.js";
import futureMealroute from "./routers/future-meal.js";
import pastMealroute from "./routers/past-meal.js";
import firstMealroute from "./routers/first-meal.js";
import lastMealroute from "./routers/last-meal.js";
import mealRouter from "./routers/meals.js";



const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Meal Sharing API!");
});

const apiRouter = express.Router();
app.use("/api",apiRouter);

// use route
apiRouter.use("/nested", nestedRouter);
apiRouter.use("/all-meal", allMealroute);
apiRouter.use("/future-Meal", futureMealroute);
apiRouter.use("/past-Meal", pastMealroute);
apiRouter.use("/first-meal",firstMealroute);
apiRouter.use("/last-meal",lastMealroute);
apiRouter.use("/meal",mealRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error("Error occurred:", err.message); // Log the error message
  res.status(err.status || 500).json({ message: "An error occurred", error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API listening on port ${process.env.PORT}`);
});
