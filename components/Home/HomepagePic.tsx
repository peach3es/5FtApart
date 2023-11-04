import React from "react";
import Image from "next/image";
import SearchBar from "../Search/searchbar";

const HomepagePic = () => {
  const images = [
    "/pictures/homepage/pic1.jpg",
    "/pictures/homepage/pic2.jpg",
    "/pictures/homepage/pic3.jpg",
    "/pictures/homepage/pic4.jpg",
    "/pictures/homepage/pic5.jpg",
  ];

  const randomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <div className="pictures w-full relative p-5">
      <SearchBar/>
      <div className="picture rounded-lg">
        <Image
          src={randomImage}
          alt="5ftapart"
          width={500}
          height={500}
          sizes="100vw"
          style={{
            objectFit: "cover",
            width: "100%",
            height: "70vh",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
};

export default HomepagePic;
