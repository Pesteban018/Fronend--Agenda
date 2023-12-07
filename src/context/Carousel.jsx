import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 3000, 
  };

  
  return (
    <div className="relative">
      <div className="carousel-container  max-w-screen-xl">
        <Slider {...settings}>
          <div className="w-full">
            <img src="\src\img\agenda2.jpg" alt="Imagen 1" className="w-auto h-auto" />
          </div>
          <div className="w-full">
            <img src="\src\img\agenda1.jpg" alt="Imagen 2" className="w-full" />
          </div>
          <div className="w-full">
            <img src="\src\img\agenda3.jpg" alt="Imagen 3" className="w-full" />
          </div>
        </Slider>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1 text-white text-center">
        <div className="">
          <h1 className=" text-center text-3xl font-semibold">
            Crea tu cuenta para poder acceder a tu agenda personal
          </h1>
        </div>
        <a href="#">
              <Link to="/register">
                {" "}
               <button className="bg-green-500 text-white mt-8 py-2 px-4 rounded-full hover:bg-green-600 ">
          Acceder
        </button>
              </Link>
            </a>
      </div>
    </div>
  );
};

export default Carousel;
