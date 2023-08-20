import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importing Routes
import usersRoute from "./routes/usersRoute.js";
import hotelsRoute from "./routes/hotelRoute.js";
import authRoute from "./routes/authRoute.js";
import roomsRoute from "./routes/roomsRoute.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose Disconnected");
});

// Middlewares
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(500).json("Hello Error Handler");
});

app.listen(8000, () => {
  connect();
  console.log(`Server connected successfully with ${8000}`);
});
