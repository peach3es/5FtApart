import React from "react";
import "styles/carousel.css";
import Image from "next/image";
import SearchBar from "../searchbar/searchbar";

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <SearchBar />
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ height: "70vh" }}>
          <Image
            src="/pictures/homepage/pic1.jpg"
            alt="Picture of the author"
            quality={100}
            width={500}
            height={500}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/pictures/homepage/pic2.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            sizes="100vw"
          />
        </div>
        <div className="carousel-item">
          <img src="..." className="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
