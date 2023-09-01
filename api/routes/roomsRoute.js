import express from "express";
import Room from "../models/RoomsModel.js";

// Controllers
import {
  createRoom,
  deleteRoom,
  updateRoom,
  getAllRooms,
  getRoom,
} from "../controllers/RoomCtrl.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

//  GET ALL
router.route("/").get(verifyAdmin, getAllRooms);

// CREATE
router.route("/:hotelId").post(verifyAdmin, createRoom);

// UPDATE DELETE GET
router.route("/:id").get(verifyUser, getRoom).put(verifyUser, updateRoom);
router.route("/:id/:hotelId").delete(verifyUser, deleteRoom);

export default router;
