import express from "express";
const router = express.Router();

// Controllers
import { login, register } from "../controllers/authCtrl.js";

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
