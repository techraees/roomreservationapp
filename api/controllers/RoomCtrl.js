import Room from "../models/RoomsModel.js";
import Hotel from "../models/HotelModel.js";
import { createError } from "../utils/error.js";

// Create
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const saveRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: saveRoom._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(saveRoom);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (updatedRoom) {
      res.status(200).json(updatedRoom);
    } else {
      res.status(400).json("Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const deletedUser = await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    if (deletedUser) {
      res.status(200).json("Room has been Deleted", deletedUser);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Room
export const getRoom = async (req, res, next) => {
  try {
    const singleRoom = await Room.findById(req.params.id);
    if (singleRoom) {
      res.status(200).json(singleRoom);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Rooms
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (rooms) {
      res.status(200).json(rooms);
    } else {
      res.status(400).json("USER not found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
