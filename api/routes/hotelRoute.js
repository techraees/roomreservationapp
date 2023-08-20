import express from "express";
import Hotel from "../models/HotelModel.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedHotel) {
      res.status(200).json(updatedHotel);
    } else {
      res.status(400).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Hotel.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.status(200).json("hotel has been Deleted", deletedUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
router.get("/:id", async (req, res, next) => {
  return next();
  try {
    const singleUser = await Hotel.findById(req.params.id);
    if (singleUser) {
      res.status(200).json(singleUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const users = await Hotel.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
