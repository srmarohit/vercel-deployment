require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const orderRouter = require("./router/orderRoute");

const app = express();

app.use(express.json());
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    server.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Stop the other process or change PORT in .env.`,
        );
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });

    // Graceful shutdown so restarts don't leave the port occupied
    const shutdown = async () => {
      await mongoose.disconnect();
      server.close(() => process.exit(0));
    };
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
