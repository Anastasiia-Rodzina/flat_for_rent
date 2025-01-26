const express = require("express");
const Apartment = require("./ApartmentModel");

const router = express.Router();

// Get all apartments
router.get("/", async (req, res) => {
  try {
    const apartments = await Apartment.find();
    res.status(200).json(apartments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartments", error });
  }
});

// Get a single apartment by ID
router.get("/:id", async (req, res) => {
  try {
    const apartment = await Apartment.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json(apartment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching apartment", error });
  }
});

// Create a new apartment
router.post("/", async (req, res) => {
  try {
    const newApartment = new Apartment(req.body);
    const savedApartment = await newApartment.save();
    res.status(201).json(savedApartment);
  } catch (error) {
    res.status(400).json({ message: "Error creating apartment", error });
  }
});

// Update an existing apartment
router.put("/:id", async (req, res) => {
  try {
    const updatedApartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json(updatedApartment);
  } catch (error) {
    res.status(400).json({ message: "Error updating apartment", error });
  }
});

// Delete an apartment
router.delete("/:id", async (req, res) => {
  try {
    const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);
    if (!deletedApartment) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    res.status(200).json({ message: "Apartment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting apartment", error });
  }
});

module.exports = router;
