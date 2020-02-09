import React, { useState } from "react";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./Carousel.css";
import Button from "../FormElements/Button";

export default function Carousel({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const left = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else {
      setActiveIndex(images.length - 1);
    }
  };

  const right = () => {
    if (activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(0);
    }
  };
  return (
    <div className="carousel">
      <div className="carousel__buttons">
        <Button onClick={left}>Back</Button>
        <Button onClick={right}>Next</Button>
      </div>
      <TransitionGroup>
        <CSSTransition timeout={1000} classNames="slide" key={activeIndex}>
          <img
            src={images[activeIndex]}
            alt="imagen"
            className="carousel__img"
          />
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

Carousel.defaultProps = {
  images: [
    "https://images.pexels.com/photos/3577391/pexels-photo-3577391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    "https://images.pexels.com/photos/2929290/pexels-photo-2929290.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  ]
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string)
};
