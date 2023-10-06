import React from "react";
import "styles/carousel.css";
import Image from "next/image";

const Carousel = () => {
  return (
    <div
      id="carouselExampleIndicators"
      class="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          class="active"
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
      <div class="carousel-inner">
        <div class="carousel-item active" style={{ height: "50vh" }}>
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
        <div class="carousel-item">
          <Image
            src="/pictures/homepage/pic2.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            sizes="100vw"
          />
        </div>
        <div class="carousel-item">
          <img src="..." class="d-block w-100" alt="..." />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
