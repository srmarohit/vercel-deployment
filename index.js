require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const orderRouter = require("./router/orderRoute");

const app = express();

const isMongoDBConnected = false;

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGO_URI);
    isMongoDBConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    isMongoDBConnected = false;
    console.error("Failed to connect to MongoDB:", err.message);
  }
}

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  connectToMongoDB().catch((err) =>
    console.error("Error connecting to MongoDB:", err),
  );
  next();
});

app.use(express.json());
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

module.exports = app;
