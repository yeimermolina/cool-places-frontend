import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Slides.css";

const Slides = ({ images, interval }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => {
      if (activeIndex < images.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setActiveIndex(0);
      }
    }, interval);

    return () => clearInterval(tick);
  }, [activeIndex, images.length, interval]);

  return (
    <div className="slide">
      <div className="slide__container">
        {images.map((img, index) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.title}
            className={`slide__container_img ${
              index === activeIndex ? "animaShow" : "animaHide"
            }`}
          />
        ))}
        <div className="slide__container_title">
          {images[activeIndex].title}
        </div>
      </div>
    </div>
  );
};

Slides.defaultProps = {
  interval: 5000,
  images: [
    {
      src:
        "https://images.pexels.com/photos/3577391/pexels-photo-3577391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Prueba"
    },
    {
      src:
        "https://images.pexels.com/photos/2929290/pexels-photo-2929290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      title: "Prueba2"
    }
  ]
};

Slides.propTypes = {
  interval: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  )
};

export default Slides;
