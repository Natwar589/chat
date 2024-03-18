import React from "react";
import images from "../assests/Slide1.jpg";
import images1 from "../assests/Slide2.jpg";
import images2 from "../assests/Slide3.jpg";
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
