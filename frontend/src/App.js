import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import ApartmentForm from "./components/ApartmentForm.js";
import ApartmentsList from "./components/ApartmentsList.js";

const App = () => {
  return (
    <div className="app-container">
      <h1>Welcome to Flat forRent !</h1>
      <Routes>
        <Route path="/" element={<ApartmentsList />} />
        <Route path="/add" element={<ApartmentForm />} />
        <Route path="/edit/:id" element={<ApartmentForm />} />
      </Routes>
    </div>
  );
};

export default App;
