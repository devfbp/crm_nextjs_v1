"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const NavigationSlider = () => {
  return (
    <div className="col-lg-4 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Navigation Swiper</h5>
        </div>
        <div className="panel-body position-relative">
          <Swiper
            slidesPerView={1}
            loop={true}
            navigation={{
              prevEl: ".custom-button-prev",
              nextEl: ".custom-button-next",
            }}
            autoplay={false}
            className="navigation-swiper"
            modules={[Navigation, Autoplay]}
          >
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-4.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-5.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-6.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
          <div className="custom-nav-btn-container">
            <button
              className="btn btn-sm btn-icon btn-primary custom-button-prev"
              role="button"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              className="btn btn-sm btn-icon btn-primary custom-button-next"
              role="button"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationSlider;
