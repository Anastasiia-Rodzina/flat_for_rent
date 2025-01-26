const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const apartmentRoutes = require("./apartmentRoutes");

// Initialize Express app
const app = express();
app.use(cors());

// Middleware for parsing JSON requests
app.use(express.json());

app.use("/api/apartments", apartmentRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

connectDB();

// Define basic routes
app.get("/", (req, res) => {
  res.send("Welcome to the Apartment Rental Management Platform!");
});

// Define port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
