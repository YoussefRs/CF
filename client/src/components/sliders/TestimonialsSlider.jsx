import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "./TestimonialsSlider.css";
import ep from "../../assets/homepage_mats/epingle _1.png";
import ep2 from "../../assets/homepage_mats/epingle_3.png";
import ep3 from "../../assets/homepage_mats/epingle_2.png";

export default function TestimonialsSlider() {
  const testimonials = [
    {
      name: "EMILIANO AQUILANI",
      content:
        "Die Apartments waren unglaublich! Sie waren geräumig, sauber und hatten eine fantastische Lage. Ich werde auf jeden Fall wiederkommen!",
      image: ep3,
    },
    {
      name: "ANNA ITURBE",
      content:
        "Unser Aufenthalt in den Apartments war einfach perfekt! Die Einrichtung war stilvoll, und die Ausstattung ließ keine Wünsche offen. Ich kann sie nur weiterempfehlen!",
      image: ep2,
    },
    {
      name: "LARA ATKINSON",
      content:
        "Wir haben unseren Aufenthalt in diesen Apartments sehr genossen. Sie waren gemütlich eingerichtet und boten alles, was wir für einen angenehmen Aufenthalt brauchten. Wir kommen gerne wieder!",
      image: ep3,
    },
  ];

  return (
    <>
      {" "}
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        autoplay={{
          disableOnInteraction: true,
        }}
        initialSlide={1}
        className=""
      >
        {testimonials.map((testim, i) => (
          <SwiperSlide className="swiper-slide" key={i}>
            <div className="ep-wrapper">
              <img src={testim.image} />
            </div>
            <div className="swiper-image">
              <div className="testimonials_rate d-flex flex-column">
                <span>{testim.name}</span>
                <span>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z"
                      fill="#F1AF07"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z"
                      fill="#F1AF07"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z"
                      fill="#F1AF07"
                    />
                  </svg>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 0L7.95934 4.49139H12.6819L8.86126 7.26722L10.3206 11.7586L6.5 8.98278L2.6794 11.7586L4.13874 7.26722L0.318133 4.49139H5.04066L6.5 0Z"
                      fill="#F1AF07"
                    />
                  </svg>
                </span>
              </div>
              <span className="test_description">{testim.content}</span>
            </div>
            <div className="svg-wrapper">
              <svg
                width="60"
                height="93"
                viewBox="0 0 93 93"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 53.1429H19.9285L6.64275 79.7142H26.5713L39.8571 53.1429V13.2858H0V53.1429Z"
                  fill="#1A1B1A"
                />
                <path
                  d="M53.1429 13.2858V53.1429H73.0715L59.7856 79.7142H79.7142L93 53.1429V13.2858H53.1429Z"
                  fill="#1A1B1A"
                />
              </svg>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
