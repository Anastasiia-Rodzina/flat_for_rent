const mongoose = require("mongoose");

// Define Apartment schema and model
const apartmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rooms: { type: Number, required: true },
  },
  { timestamps: true }
);

const Apartment = mongoose.model("Apartment", apartmentSchema);
module.exports = Apartment;
