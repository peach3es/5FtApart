import React from "react";
import "styles/carousel.css";
import Image from "next/legacy/image";

const Carousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <Image
            src="/pictures/homepage/pic1.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            loading="lazy"
            layout="responsive"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/pictures/homepage/pic2.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            loading="lazy"
            layout="responsive"
          />
        </div>
        <div className="carousel-item">
          <Image
            src="/pictures/homepage/pic3.jpg"
            alt="Picture of the author"
            width={500}
            height={500}
            loading="lazy"
            layout="responsive"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
