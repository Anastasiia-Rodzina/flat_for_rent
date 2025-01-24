import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      <h1>Welcome to Flat forRent !</h1>
      <Routes>
        <Route path="/" />
        <Route path="/add" />
        <Route path="/edit/:id" />
      </Routes>
    </div>
  );
};

export default App;
