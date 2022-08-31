import React from "react";
import "./City.scss";

function City() {
  return (
    <li className="city">
      <h2 className="city-name" data-name="New York,US">
        <span>New York</span>
        <sup>US</sup>
      </h2>
      <div className="city-temp">
        27<sup>°C</sup>
      </div>
      <figure>
        <img
          className="city-icon"
          src="#"
          alt="scattered clouds"
        />
        <figcaption>scattered clouds</figcaption>
      </figure>
    </li>
  );
}

export default City;
