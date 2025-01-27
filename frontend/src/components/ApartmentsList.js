import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAllApartments } from "../redux/apartmentsSlice.js";
import "./apartment_list.css";
import {
  deleteApartment,
  fetchApartments,
} from "../redux/apartmentOperations.js";
import Filter from "./Filter"; // Імпортуємо компонент Filters

const ApartmentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const apartments = useSelector(selectAllApartments);
  const status = useSelector((state) => state.apartments.status);
  const error = useSelector((state) => state.apartments.error);

  const [priceRange, setPriceRange] = useState([0, 10000]); // Діапазон цін
  const [roomsFilter, setRoomsFilter] = useState(0); // Кількість кімнат (0 = всі)

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this apartment?"
    );
    if (!confirmDelete) return;

    try {
      await dispatch(deleteApartment(id)).unwrap();
      dispatch(fetchApartments());
    } catch (err) {
      console.error("Failed to delete the apartment:", err.message);
      alert("Failed to delete the apartment. Please try again.");
    }
  };

  // Фільтрація квартир за ціною та кількістю кімнат
  const filteredApartments = apartments.filter((apartment) => {
    const isPriceInRange =
      apartment.price >= priceRange[0] && apartment.price <= priceRange[1];
    const isRoomMatch = roomsFilter === 0 || apartment.rooms === roomsFilter;
    return isPriceInRange && isRoomMatch;
  });

  let content;

  if (status === "loading") {
    content = <p>Loading apartments...</p>;
  } else if (status === "succeeded") {
    if (filteredApartments.length === 0) {
      content = <p>No apartments.</p>;
    } else {
      content = (
        <ul className="apartments-list-container">
          {filteredApartments.map((apartment) => (
            <li key={apartment._id} className="apartment-card">
              <h3>{apartment.title}</h3>
              <p className="apartment-description">{apartment.description}</p>
              <p>Price: ${apartment.price}</p>
              <p>Rooms: {apartment.rooms}</p>
              <div className="actions">
                <button
                  onClick={() => handleEdit(apartment._id)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(apartment._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  } else if (status === "failed") {
    content = <p>Error: {error?.message || "Something went wrong."}</p>;
  }

  return (
    <div className="apartments-container">
      <h2>Available Apartments</h2>
      <button onClick={() => navigate("/add")} className="add-button">
        Add New Apartment
      </button>
      {apartments && apartments.length > 2 && (
        <Filter
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          roomsFilter={roomsFilter}
          setRoomsFilter={setRoomsFilter}
        />
      )}
      {content}
    </div>
  );
};

export default ApartmentsList;
