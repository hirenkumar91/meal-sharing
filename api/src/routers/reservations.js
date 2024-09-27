import express from "express";
import knex from "../database_client.js";

const reservRouter = express.Router();
// get all meal
reservRouter.get("/", async (req, res, next) => {
    try{
        const all_reservation = await knex("Reservation").select("*");
    res.json(all_reservation);
    } catch (err) {
        next(err);
      }
});

reservRouter.post("/", async (req, res, next) => {
    try{
        const data=req.body;
        await knex("Reservation").insert(data);
        res.status(200).json({ message: "created successfully" });
    } catch (err) {
        next(err);
      }
});

reservRouter.get("/:id", async (req,res,next) => {
    try{
        const id = req.params.id;
        const reservation = await knex("Reservation").select("*").where({id}).first();
        if (!reservation) {
            res.status(404).json({ message: "reservation not found" });
          } else {
            res.json(reservation);
          }
    } catch (err) {
        next(err);
      }
});

reservRouter.put("/:id", async (req, res, next) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
        const result = await knex("Reservation")
            .where({ id })
            .update(updatedData);
  
        if (result) {
          const updatedReservation = await knex("Reservation").where({ id }).first();
            res.status(200).json({ message: "Reservation updated successfully",
                Reservation: updatedReservation
             });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        next(err);
    }
  });

  reservRouter.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
  
    try {
        const result = await knex("Reservation")
            .where({ id })
            .del();
  
        if (result) {
            res.status(200).json({ message: "Reservation deleted successfully" ,
            });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
    } catch (err) {
        next(err);
    }
  });

export default reservRouter;