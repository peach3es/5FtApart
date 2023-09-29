import React from "react";
import "styles/carousel.css";
import Image from "next/image";

const Carousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <Image
            src="/pictures/homepage/pic1.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
        <div class="carousel-item">
          <Image
            src="/pictures/homepage/pic2.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
        <div class="carousel-item">
          <Image
            src="/pictures/homepage/pic3.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            layout="responsive"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
