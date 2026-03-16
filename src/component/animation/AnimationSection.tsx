"use client";
import "aos/dist/aos.css";
import Aos from "aos";
import React, { useEffect } from "react";
import FadeAnimations from "./FadeAnimations";
import FlipAnimations from "./FlipAnimations";
import ZoomAnimations from "./ZoomAnimations";

const AnimationSection = () => {
  useEffect(() => {
    // Initialize AOS library
    Aos.init({
      duration: 500, // Animation duration in milliseconds
      once: true, // Only animate elements once
    });

    // Clean up AOS library on component unmount
    return () => {
      Aos.refresh(); // Refresh AOS library to remove applied animations
    };
  }, []);
  return (
    <div className="row">
      <FadeAnimations />
      <FlipAnimations />
      <ZoomAnimations />
    </div>
  );
};

export default AnimationSection;
