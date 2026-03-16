"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { membersData } from "@/data/data";

const ChatSlider = () => {
  return (
    <div>
      <Swiper
        slidesPerView={6}
        navigation={{
          prevEl: ".owl-prev",
          nextEl: ".owl-next",
        }}
        effect={"slide"}
        spaceBetween={5}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="active-members owl-carousel"
        breakpoints={{
          0: {
            slidesPerView: 7,
          },
          575: {
            slidesPerView: 8,
          },
          1000: {
            slidesPerView: 6,
          },
        }}
      >
        {membersData.map((item) => (
          <SwiperSlide className="single-member" key={item.id}>
            <button className="btn-flush avatar">
              <img src={item.imgSrc} alt="User" />
              <span className="active-status active"></span>
            </button>
          </SwiperSlide>
        ))}

        <div className="owl-nav">
          <button type="button" role="presentation" className="owl-prev">
            <i className="fa-light fa-angle-left"></i>
          </button>
          <button type="button" role="presentation" className="owl-next">
            <i className="fa-light fa-angle-right"></i>
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default ChatSlider;
