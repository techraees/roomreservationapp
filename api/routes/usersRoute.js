import express from "express";
import User from "../models/UserModel.js";

// Controllers
import {
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUser,
} from "../controllers/UserCtrl.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

// CREATE GET ALL
router.route("/").get(verifyAdmin, getAllUsers).post(createUser);

// UPDATE DELETE GET
router
  .route("/:id")
  .get(verifyAdmin, getUser)
  .put(verifyAdmin, updateUser)
  .delete(verifyAdmin, deleteUser);

export default router;
