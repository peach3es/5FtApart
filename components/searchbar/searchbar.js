import React from "react";
import "styles/searchbar.css";

export default function SearchBar() {
  return (
    <div className="searchcontainer position-absolute top-50 start-50 z-3 translate-middle">
      <div className="search">
        <input
          type="text"
          className="property-search"
          placeholder="Region, City, Street"
        />
      </div>
      <div className="sale-type"></div>
      <div className="property-types"></div>
      <div className="price-range"></div>
    </div>
  );
}
