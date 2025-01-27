import React from "react";
import "./filter.css";

const Filter = ({ priceRange, setPriceRange, roomsFilter, setRoomsFilter }) => {
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prevRange) => {
      const updatedRange = [...prevRange];
      updatedRange[name === "minPrice" ? 0 : 1] = Number(value);
      return updatedRange;
    });
  };

  const handleRoomChange = (e) => {
    setRoomsFilter(Number(e.target.value));
  };

  return (
    <div className="filter">
      <div className="filter-group">
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="number"
          id="minPrice"
          name="minPrice"
          value={priceRange[0]}
          onChange={handlePriceChange}
          min="0"
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="number"
          id="maxPrice"
          name="maxPrice"
          value={priceRange[1]}
          onChange={handlePriceChange}
          min="0"
          className="filter-input"
        />
      </div>
      <div className="filter-group">
        <label htmlFor="rooms">Rooms:</label>
        <select
          id="rooms"
          value={roomsFilter}
          onChange={handleRoomChange}
          className="filter-select"
        >
          <option value={0}>All</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
