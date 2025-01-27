import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectApartmentById } from "../redux/apartmentsSlice.js";
import "./apartment_form.css";
import { addApartment, updateApartment } from "../redux/apartmentOperations.js";

const ApartmentForm = () => {
  const { id } = useParams();
  const apartmentToEdit = useSelector((state) =>
    selectApartmentById(state, id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rooms: 1,
  });

  useEffect(() => {
    if (id && apartmentToEdit) {
      setFormData({
        title: apartmentToEdit.title || "",
        description: apartmentToEdit.description || "",
        price: apartmentToEdit.price || "",
        rooms: apartmentToEdit.rooms || 1,
      });
    }
  }, [id, apartmentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "rooms" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateApartment({ id, ...formData }));
    } else {
      dispatch(addApartment(formData));
    }
    navigate("/");
  };

  return (
    <div className="form-container">
      <h3 className="form-title">{id ? "Edit Apartment" : "Add Apartment"}</h3>
      <form onSubmit={handleSubmit} className="apartment-form">
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
          <option className="form-option" value={1}>
            1
          </option>
          <option className="form-option" value={2}>
            2
          </option>
          <option className="form-option" value={3}>
            3
          </option>
        </select>

        <button type="submit" className="form-button">
          {id ? "Update Apartment" : "Add Apartment"}
        </button>
      </form>
    </div>
  );
};

export default ApartmentForm;
