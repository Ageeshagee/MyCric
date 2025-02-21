import React from "react";
import { Image } from "react-bootstrap";

const ExampleCarouselImage = ({ text, src }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "500px", backgroundColor: "lightgray" }}>
      <Image 
        src={src || "https://via.placeholder.com/800x400"} // Default image if none is provided
        alt={text}
        fluid 
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

export default ExampleCarouselImage;
