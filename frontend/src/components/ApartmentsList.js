import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllApartments } from "../redux/apartmentsSlice.js";
import "./apartment_list.css";
import {
  deleteApartment,
  fetchApartments,
} from "../redux/apartmentOperations.js";

const ApartmentsList = () => {
  const dispatch = useDispatch();
  const apartments = useSelector(selectAllApartments);
  const status = useSelector((state) => state.apartments.status);
  const error = useSelector((state) => state.apartments.error);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this apartment?")) {
      dispatch(deleteApartment(id)).then(() => {
        dispatch(fetchApartments());
      });
    }
  };

  let content;

  if (status === "loading") {
    content = <p>Loading apartments...</p>;
  } else if (status === "succeeded") {
    content = (
      <ul className="apartments-list">
        {apartments.map((apartment) => (
          <li key={apartment._id} className="apartment-item">
            <h3>{apartment.title}</h3>
            <p>{apartment.description}</p>
            <p>Price: ${apartment.price}</p>
            <p>Rooms: {apartment.rooms}</p>
            <div className="actions">
              <Link to={`/edit/${apartment._id}`} className="edit-button">
                Edit
              </Link>
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
  } else if (status === "failed") {
    content = <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <div className="apartments-container">
      <h2>Available Apartments</h2>
      <Link to="/add" className="add-button">
        Add New Apartment
      </Link>
      {content}
    </div>
  );
};

export default ApartmentsList;
