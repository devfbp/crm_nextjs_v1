"use client";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CustomPaginationSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  return (
    <div className="col-lg-4 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pagination Custom Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            pagination={pagination}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="pagination-custom-swiper"
            modules={[Autoplay, Pagination]}
          >
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-3.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-4.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <img src="assets/images/slider-5.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default CustomPaginationSlider;
