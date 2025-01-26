import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectApartmentById } from "../redux/apartmentsSlice.js";
import "./apartment_form.css";
import {
  addApartment,
  deleteApartment,
  updateApartment,
} from "../redux/apartmentOperations.js";

const ApartmentForm = () => {
  const { id } = useParams(); // Get the ID from the URL for editing an apartment
  const apartmentToEdit = useSelector((state) =>
    selectApartmentById(state, id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize form state with default values or values from the apartment being edited
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rooms: 1,
  });

  useEffect(() => {
    if (apartmentToEdit) {
      setFormData({
        title: apartmentToEdit.title,
        description: apartmentToEdit.description,
        price: apartmentToEdit.price,
        rooms: apartmentToEdit.rooms,
      });
    }
  }, [apartmentToEdit]);

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "rooms" || name === "price" ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateApartment({ id, ...formData })); // Dispatch update action
    } else {
      dispatch(addApartment(formData)); // Dispatch add action
    }
    navigate("/"); // Redirect to the apartments list
  };

  // Handle apartment deletion
  const handleDelete = () => {
    if (id) {
      dispatch(deleteApartment(id)); // Dispatch delete action
      navigate("/"); // Redirect to the apartments list
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{id ? "Edit Apartment" : "Add Apartment"}</h2>
      <form onSubmit={handleSubmit} className="apartment-form">
        {/* Title Input */}
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={90}
          required
          className="form-input"
        />

        {/* Description Input */}
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={335}
          required
          className="form-textarea"
        ></textarea>

        {/* Price Input */}
        <label htmlFor="price" className="form-label">
          Price:
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min={0}
          required
          className="form-input"
        />

        {/* Rooms Input */}
        <label htmlFor="rooms" className="form-label">
          Number of Rooms:
        </label>
        <select
          id="rooms"
          name="rooms"
          value={formData.rooms}
          onChange={handleChange}
          required
          className="form-select"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>

        {/* Submit Button */}
        <button type="submit" className="form-button">
          {id ? "Update Apartment" : "Add Apartment"}
        </button>
      </form>

      {/* Delete Button */}
      {id && (
        <button onClick={handleDelete} className="delete-button">
          Delete Apartment
        </button>
      )}
    </div>
  );
};

export default ApartmentForm;
