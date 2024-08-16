import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

const Carousel = ({ imageUrls, animation }) => {
  // State to track the index of the current image
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track if there's an error loading the image
  const [error, setError] = useState(false);
  // Ref to store the interval ID for automatic image change
  const intervalRef = useRef(null);

  useEffect(() => {
    const startInterval = () => {
      // Set up interval to automatically change images every 3 seconds
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 3000);
    };

    startInterval();

    // Clean up interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, [imageUrls.length]);

  const goToPrevious = () => {
    resetInterval();
    // Go to the previous image
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
  };

  const goToNext = () => {
    resetInterval();
    // Go to the next image
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const resetInterval = () => {
    // Reset the interval for automatic image change
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
  };

  const goToImage = (index) => {
    resetInterval();
    // Change to a specific image
    setCurrentIndex(index);
  };

  const animationClass = () => {
    // Determine the CSS class for the current animation type
    switch (animation) {
      case "fade":
        return "fade";
      case "slide":
        return currentIndex % 2 === 0 ? "slide-in-left" : "slide-in-right";
      default:
        return "";
    }
  };

  return (
    <div className="carousel-container">
      {/* Button to go to the previous image */}
      <button className="carousel-button prev" onClick={goToPrevious}>
        &lt;
      </button>
      {/* Display current image with animation */}
      <img
        src={imageUrls[currentIndex]}
        alt="carousel"
        className={`carousel-image ${animationClass()}`}
        onError={() => setError(true)} // Set error state if image fails to load
      />
      {error && <p>Failed to load image</p>}{" "}
      {/* Display error message if there's an issue */}
      {/* Button to go to the next image */}
      <button className="carousel-button next" onClick={goToNext}>
        &gt;
      </button>
      <div className="carousel-indicators">
        {/* Render indicators for each image */}
        {imageUrls.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
