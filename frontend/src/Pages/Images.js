import React from "react";
import images from "../public/Slide1.jpg";
import images1 from "../public/Slide2.jpg";
import images2 from "../public/Slide3.jpg";
const Images = () => {
  return (
    <div className="image-component">
      <img src={images} />
      <img src={images1} />
      <img src={images2} />
    </div>
  );
};

export default Images;
