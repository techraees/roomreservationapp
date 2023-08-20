import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("HELLO! This is auth Get REquest");
});

router.get("/register", (req, res) => {
  res.send("HELLO! This is auth register endpoint");
});

export default router;
