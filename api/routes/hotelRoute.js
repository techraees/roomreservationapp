import express from "express";
import Hotel from "../models/HotelModel.js";

// Controllers
import {
  createHotel,
  deleteHotel,
  updateHotel,
  getAllHotels,
  getHotel,
  countByCity,
  countByType,
} from "../controllers/HotelCtrl.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE GET ALL
router.route("/").get(verifyAdmin, getAllHotels).post(verifyAdmin, createHotel);

// UPDATE DELETE GET
router
  .route("/:id")
  .get(verifyUser, getHotel)
  .put(verifyUser, updateHotel)
  .delete(verifyUser, deleteHotel);

// Featured
router.route("/filter/countByCity").get(countByCity);
router.route("/filter/countByType").get(countByType);
export default router;
