import React, { useEffect } from "react";
import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import logo from "../../assets/homepage_mats/logo.png";
import name from "../../assets/homepage_mats/name.png";
import house from "../../assets/homepage_mats/Vector.png";
import RangeSlider from "../../components/sliders/RangeSlider";
import Logo from "../../assets/homepage_mats/Group_50.png";
import Cards from "../../components/cards/Cards";
import TestimonialsSlider from "../../components/sliders/TestimonialsSlider";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import MultiFunc from "../../components/multi/MultiFunc";
import { apartmentList } from "../../Dummy/AppData";

export default function Home() {
  // const apartmentList = useSelector((state) => state.apartments.apartments.apartments);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* <Navbar /> */}
      {/* <div className="home_container"> */}
      <div className="_home">
        {/* <div className="wrapper">
          <div className="wrapper_ctr">
            <div className="layer"></div>
            <div className="_home_content">
              <div className="_home_img">
                <img src={logo} />
                <img src={name} />
              </div>
              <div className="_home_text">
                <h1>Town lofts</h1>
                <span>
                  am{" "}
                  <svg
                    width="476"
                    height="46"
                    viewBox="0 0 476 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_20_12)">
                      <path
                        d="M16.283 46H0.337402V0H7.93872C9.08177 0 10.2248 0 11.425 0C12.6252 0 13.7683 0.109524 14.8542 0.164286C15.9401 0.219048 16.9117 0.328571 17.8261 0.438095C18.7406 0.547619 19.3693 0.657143 19.8836 0.821429C22.7413 1.5881 25.0274 2.95714 26.7991 4.92857C28.5709 6.79048 29.4282 9.14524 29.4282 11.9381C29.4282 13.6357 28.9709 15.2238 28.1136 16.6476C27.4278 18.0714 26.2276 19.4405 24.513 20.7C30.0568 23.219 32.8002 27.1619 32.8002 32.4738C32.8002 35.2119 32.1143 37.5667 30.7427 39.5381C29.1995 41.6738 27.4278 43.3167 25.3703 44.4667C23.1413 45.4524 20.0551 46 16.2259 46H16.283ZM13.8255 18.181C15.9973 18.181 17.7118 17.6881 18.9692 16.7024C19.998 15.7714 20.5123 14.5667 20.5123 13.0333C20.5123 11.5 19.998 10.35 18.9692 9.63809C17.8833 8.7619 16.3402 8.37857 14.2827 8.37857H9.48185V18.181H13.8255ZM14.0541 37.6214C17.8833 37.6214 20.4552 37.1833 21.884 36.3619C23.2557 35.3762 23.9415 34.0071 23.9415 32.3095C23.9415 30.3929 23.1985 28.8595 21.7125 27.6C20.0551 26.45 17.4832 25.9024 13.8826 25.9024H9.539V37.6214H14.1112H14.0541Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M59.3762 46C52.575 46 46.8598 43.7548 42.2875 39.2643C37.7153 34.6095 35.4292 29.2429 35.4292 23.1095C35.4292 18.7833 36.5151 14.8952 38.6298 11.4452C40.6873 7.94048 43.602 5.14762 47.317 3.06667C51.0319 0.985714 55.0326 0 59.3191 0C65.7202 0 71.264 2.24524 75.9505 6.73571C80.6942 11.3357 83.0374 16.7571 83.0374 23.1095C83.0374 29.4619 80.7513 35.0476 76.1791 39.4286C71.5497 43.8095 65.9488 46 59.3191 46H59.3762ZM59.3762 38.0595C61.4337 38.0595 63.2626 37.6762 65.0343 36.9643C66.8061 36.2524 68.3492 35.1571 69.8352 33.7333C72.8071 30.9405 74.2931 27.4357 74.2931 23.1095C74.2931 18.7833 72.8071 15.4429 69.8352 12.431C66.9775 9.58333 63.434 8.10476 59.1476 8.10476C54.8611 8.10476 51.2605 9.52857 48.5172 12.431C45.6595 15.169 44.2307 18.7286 44.2307 23.1095C44.2307 27.9833 46.0596 31.8714 49.7745 34.7738C52.575 36.9643 55.7756 38.0595 59.3762 38.0595Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M122.187 46H112.357L103.612 30.2833H98.2972V46H89.0956V0H106.699C110.985 0 114.643 1.42381 117.672 4.32619C120.701 7.22857 122.187 10.7333 122.187 14.8405V15.2786C122.187 21.5214 119.044 26.0667 112.814 29.0238L122.187 46ZM105.784 21.6857C107.613 21.6857 109.213 21.0286 110.528 19.7143C111.842 18.4548 112.528 16.8667 112.528 15.0048C112.528 13.1429 111.842 11.6643 110.528 10.4595C109.213 9.2 107.613 8.59762 105.784 8.59762H98.24V21.7405H105.784V21.6857Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M152.764 0H161.68V29.1881C161.68 31.5429 161.222 33.7333 160.308 35.7595C159.393 37.7857 158.136 39.5929 156.536 41.1262C154.936 42.6595 153.05 43.8643 150.935 44.7405C148.82 45.6167 146.534 46.0548 144.077 46.0548C141.619 46.0548 139.333 45.6167 137.218 44.7405C135.104 43.8643 133.218 42.6595 131.617 41.1262C130.017 39.5929 128.76 37.8405 127.845 35.7595C126.931 33.6786 126.474 31.5429 126.474 29.1881V0H135.389V29.3524C135.389 30.5024 135.618 31.5976 136.075 32.5833C136.532 33.569 137.161 34.4452 137.961 35.2119C138.761 35.9786 139.676 36.5262 140.705 36.9643C141.733 37.4024 142.876 37.6214 144.077 37.6214C145.277 37.6214 146.42 37.4024 147.449 36.9643C148.477 36.5262 149.392 35.9238 150.192 35.2119C150.992 34.5 151.621 33.569 152.078 32.5833C152.535 31.5976 152.764 30.5024 152.764 29.3524V0Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M180.769 46C174.368 46 169.452 42.8238 166.08 36.4167L173.567 32.1452C175.739 36.0881 178.254 38.0595 180.997 38.0595C182.426 38.0595 183.741 37.6762 184.827 36.8548C185.798 35.9786 186.313 35.0476 186.313 34.0071C186.313 32.9667 185.97 31.981 185.284 30.9405C184.827 30.4476 184.198 29.8452 183.341 29.0786C182.483 28.3119 181.455 27.4357 180.14 26.45C177.682 24.4786 175.682 22.781 174.082 21.3024C172.482 19.8238 171.339 18.5643 170.596 17.5238C169.052 15.3881 168.252 13.3071 168.252 11.2262C168.252 8.15952 169.452 5.53095 171.853 3.28571C174.368 1.09524 177.34 0 180.769 0C183.112 0 185.341 0.547619 187.341 1.64286C188.37 2.13571 189.456 2.84762 190.599 3.77857C191.742 4.70952 192.885 5.80476 194.142 7.17381L187.57 12.65C185.341 9.69286 183.112 8.21429 180.769 8.21429C179.454 8.21429 178.54 8.4881 178.025 9.03571C177.34 9.58333 176.939 10.2405 176.939 11.1167C176.939 11.7738 177.168 12.431 177.568 13.0881C177.968 13.5262 178.711 14.1833 179.797 15.1143C180.883 16.0452 182.255 17.1952 183.969 18.619C185.97 20.2071 187.513 21.5214 188.541 22.4524C189.227 23.0548 189.742 23.4929 190.085 23.7119C193.228 26.6143 194.771 29.9 194.771 33.6786C194.771 37.4571 193.514 40.3595 190.942 42.6595C188.37 44.9595 184.998 46.1095 180.769 46.1095V46Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M215.117 46C208.716 46 203.801 42.8238 200.429 36.4167L207.916 32.1452C210.088 36.0881 212.603 38.0595 215.346 38.0595C216.775 38.0595 218.089 37.6762 219.175 36.8548C220.147 35.9786 220.661 35.0476 220.661 34.0071C220.661 32.9667 220.318 31.981 219.632 30.9405C219.175 30.4476 218.547 29.8452 217.689 29.0786C216.832 28.3119 215.803 27.4357 214.489 26.45C212.031 24.4786 210.031 22.781 208.431 21.3024C206.83 19.8238 205.687 18.5643 204.944 17.5238C203.401 15.3881 202.601 13.3071 202.601 11.2262C202.601 8.15952 203.801 5.53095 206.202 3.28571C208.716 1.09524 211.688 0 215.117 0C217.461 0 219.69 0.547619 221.69 1.64286C222.719 2.13571 223.805 2.84762 224.948 3.77857C226.091 4.70952 227.234 5.80476 228.491 7.17381L221.919 12.65C219.69 9.69286 217.461 8.21429 215.117 8.21429C213.803 8.21429 212.888 8.4881 212.374 9.03571C211.688 9.58333 211.288 10.2405 211.288 11.1167C211.288 11.7738 211.517 12.431 211.917 13.0881C212.317 13.5262 213.06 14.1833 214.146 15.1143C215.232 16.0452 216.603 17.1952 218.318 18.619C220.318 20.2071 221.861 21.5214 222.89 22.4524C223.576 23.0548 224.09 23.4929 224.433 23.7119C227.577 26.6143 229.12 29.9 229.12 33.6786C229.12 37.4571 227.862 40.3595 225.291 42.6595C222.719 44.9595 219.347 46.1095 215.117 46.1095V46Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M234.835 0H243.751V46H234.835V0Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M277.928 0L278.157 0.657143L273.47 12.2667L266.955 28.0929H279.929L276.842 20.5905L281.529 8.98095L296.503 46H286.844L283.301 36.581H263.64L259.639 46H250.266L268.784 0H277.986H277.928Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M331.252 46H322.05V0H339.653C343.94 0 347.54 1.42381 350.627 4.32619C353.713 7.22857 355.256 10.7333 355.256 14.7857V15.3881C355.256 19.4405 353.713 22.9452 350.627 25.8476C347.54 28.6952 343.94 30.1738 339.653 30.1738H331.252V46ZM338.739 21.5762C340.682 21.5762 342.225 20.9738 343.483 19.769C344.74 18.5643 345.369 17.031 345.369 15.2238C345.369 13.4167 344.74 11.8286 343.483 10.5143C342.225 9.25476 340.625 8.59762 338.739 8.59762H331.252V21.631H338.739V21.5762Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M378.689 0L378.917 0.657143L374.231 12.2667L367.715 28.0929H380.689L377.603 20.5905L382.289 8.98095L397.263 46H387.604L384.061 36.581H364.4L360.4 46H351.027L369.544 0H378.746H378.689Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M435.842 46H426.011L417.267 30.2833H411.952V46H402.75V0H420.353C424.64 0 428.297 1.42381 431.326 4.32619C434.356 7.22857 435.842 10.7333 435.842 14.8405V15.2786C435.842 21.5214 432.698 26.0667 426.468 29.0238L435.842 46ZM419.439 21.6857C421.268 21.6857 422.868 21.0286 424.182 19.7143C425.497 18.4548 426.183 16.8667 426.183 15.0048C426.183 13.1429 425.497 11.6643 424.182 10.4595C422.868 9.2 421.268 8.59762 419.439 8.59762H411.894V21.7405H419.439V21.6857Z"
                        fill="#F7D86A"
                      />
                      <path
                        d="M474.991 0L458.474 23.1095L474.991 46H464.075L449.329 25.4643V46H440.185V0H449.329V20.5905L464.075 0H474.991Z"
                        fill="#F7D86A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_20_12">
                        <rect width="476" height="46" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
              <div className="_price_wrapper">
                <div className="price">
                  <input placeholder="search..." />
                  <div className="price_range">
                    <span>Price Range</span>
                    <RangeSlider
                      min={0}
                      max={1000}
                      onChange={({ min, max }) =>
                        console.log(`min = ${min}, max = ${max}`)
                      }
                    />
                  </div>
                  <div className="_counter">
                    <span>Rooms</span>
                    <div className="_counter_btns">
                      <button>+</button>
                      <span>0</span>
                      <button>-</button>
                    </div>
                  </div>
                  <div className="_filter">
                    <svg
                      width="39"
                      height="39"
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.4863 28.0312C16.9684 26.8402 18.1361 26 19.5 26C20.8639 26 22.0316 26.8402 22.5137 28.0312H34.125C34.7981 28.0312 35.3438 28.5769 35.3438 29.25C35.3438 29.9231 34.7981 30.4688 34.125 30.4688H22.5137C22.0316 31.6598 20.8639 32.5 19.5 32.5C18.1361 32.5 16.9684 31.6598 16.4863 30.4688H4.875C4.20193 30.4688 3.65625 29.9231 3.65625 29.25C3.65625 28.5769 4.20193 28.0312 4.875 28.0312H16.4863ZM35.3438 19.5C35.3438 20.1731 34.7981 20.7188 34.125 20.7188H17.875C17.2019 20.7188 16.6562 20.1731 16.6562 19.5C16.6562 18.8269 17.2019 18.2812 17.875 18.2812H34.125C34.7981 18.2812 35.3438 18.8269 35.3438 19.5ZM11.375 22.75C10.0111 22.75 8.84341 21.9099 8.36127 20.7188H4.875C4.20193 20.7188 3.65625 20.1731 3.65625 19.5C3.65625 18.8269 4.20193 18.2812 4.875 18.2812H8.36127C8.84341 17.0901 10.0111 16.25 11.375 16.25C13.17 16.25 14.625 17.705 14.625 19.5C14.625 21.295 13.17 22.75 11.375 22.75ZM19.5 10.9688C20.1731 10.9688 20.7188 10.4231 20.7188 9.75C20.7188 9.07693 20.1731 8.53125 19.5 8.53125H6.5C5.82693 8.53125 5.28125 9.07693 5.28125 9.75C5.28125 10.4231 5.82693 10.9688 6.5 10.9688H19.5ZM35.3438 9.75C35.3438 10.4231 34.7981 10.9688 34.125 10.9688H29.0138C28.5316 12.1599 27.3639 13 26 13C24.2051 13 22.75 11.545 22.75 9.75C22.75 7.95502 24.2051 6.5 26 6.5C27.3639 6.5 28.5316 7.34012 29.0138 8.53125H34.125C34.7981 8.53125 35.3438 9.07693 35.3438 9.75Z"
                        fill="white"
                        fillOpacity="0.73"
                      />
                    </svg>
                    <span>FILTER</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <section class="landingpage">
          <div class="container d-flex align-items-center">
            <div class="lp-alignment">
              <img
                src={Logo}
                style={{maxWidth: 250}}
                srcSet={`${Logo} 1x, ${Logo} 2x, ${Logo} 3x`}
                alt="Logo"
              />
              <h1 class="_title_">Town Lofts</h1>
              <span class="_title_">am BORUSSIA PARK</span>
              <div className="">
                <MultiFunc />
              </div>
            </div>
          </div>
        </section>

        {apartmentList && (
          <div className="_cards_container" id="properties">
            <div className="cards_layer"></div>
            <div className="card_ctr">
              {apartmentList?.map((card, i) => (
                <Cards card={card} key={i} />
              ))}
            </div>
          </div>
        )}
        <section className="_search_container">
          <div className="search_ctr">
            <div className="img_ctr">
              <div className="_floating_img">
                <div className="floating_boxes">
                  <div className="guy_box">
                    <img
                      className="img-circle"
                      src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg"
                      alt=""
                    />
                    <p>
                      Indulge In the luxury of living in this stunning home that
                      combines elegance
                    </p>
                  </div>
                  <div className="girl_box">
                    <img src="https://i.ibb.co/8x9xK4H/team.jpg" alt="" />
                    <p>hello i want to rent</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="search_content">
              <div className="_content">
                <div className="search_title">
                  <h1>
                    Just Click, <span>Big Move</span> !
                  </h1>
                </div>
                <div className="search_description">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quibusdam quod, aliquid repudiandae vero cumque eligendi
                    modi iusto ut delectus distinctio reiciendis autem quia,
                    accusamus, minus aspernatur rerum sunt a maxime.
                  </p>
                </div>
                <div className="search_boxes">
                  <div className="_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="78"
                      height="55"
                      fill="#07D25F"
                      className="bi bi-house-door-fill"
                      viewBox="0 0 20 16"
                      stroke="white"
                    >
                      <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                    </svg>
                    <p>Searching for houses</p>
                  </div>
                  <div className="_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="78"
                      height="55"
                      fill="#07D25F"
                      className="bi bi-person-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      <path
                        fill-rule="evenodd"
                        d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                    <p>Create you profile</p>
                  </div>
                  <div className="_box">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="78"
                      height="55"
                      fill="#07D25F"
                      className="bi bi-credit-card-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                    </svg>

                    <p>deal and pay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="_testimonial_container" id="testimonails">
          <p>testimonials</p>
          <div className="testo_ctr">
            <TestimonialsSlider />
          </div>
        </div>

        {/* <section className="_testimonial_container">
            <p>testimonials</p>
          <div className="_testimonial_content">
            <div className="testo_ctr">
              <div className="testo_left"></div>
              <div className="testo_right"></div>
            </div>
          </div>
        </section> */}
        <div className="_socials_container" id="followus">
          <div className="socials_ctr">
            <div className="join_flower_ctr">
              <div className="join_ctr">
                <div className="join_title">
                  <span>Join Us</span>
                </div>
                <h5>
                  stay connected with us! follow us on social media to stay in
                  the loop with our latest updates
                </h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Culpa, explicabo quibusdam. Fugiat a ad atque soluta
                  necessitatibus unde corporis consequatur molestiae maxime
                  obcaecati neque corrupti id, praesentium nam amet minima.
                </p>
              </div>
              <div className="flower_ctr">
                <div className="_flower_box">
                  <div className="leaf" id="leaf1">
                    <svg
                      width="50"
                      height="70"
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1_243)">
                        <path
                          d="M70 35C70 52.4699 57.2004 66.9498 40.4688 69.5748V45.1172H48.624L50.1758 35H40.4688V28.4348C40.4688 25.6662 41.825 22.9688 46.1727 22.9688H50.5859V14.3555C50.5859 14.3555 46.5801 13.6719 42.7506 13.6719C34.7566 13.6719 29.5312 18.5172 29.5312 27.2891V35H20.6445V45.1172H29.5312V69.5748C12.7996 66.9498 0 52.4699 0 35C0 15.6707 15.6707 0 35 0C54.3293 0 70 15.6707 70 35Z"
                          fill="#1877F2"
                        />
                        <path
                          d="M48.624 45.1172L50.1758 35H40.4688V28.4346C40.4688 25.6668 41.8247 22.9688 46.1725 22.9688H50.5859V14.3555C50.5859 14.3555 46.5806 13.6719 42.7513 13.6719C34.7565 13.6719 29.5312 18.5172 29.5312 27.2891V35H20.6445V45.1172H29.5312V69.5747C31.3132 69.8543 33.1395 70 35 70C36.8605 70 38.6868 69.8543 40.4688 69.5747V45.1172H48.624Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_243">
                          <rect width="70" height="70" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="leaf" id="leaf2">
                    <svg
                      width="50"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1_331)">
                        <path
                          d="M3.75001 4.08249C-0.96499 8.97999 9.86457e-06 14.1825 9.86457e-06 29.9875C9.86457e-06 43.1125 -2.28999 56.27 9.69501 59.3675C13.4375 60.33 46.5975 60.33 50.335 59.3625C55.325 58.075 59.385 54.0275 59.94 46.97C60.0175 45.985 60.0175 14.0075 59.9375 13.0025C59.3475 5.48499 54.72 1.15249 48.6225 0.274994C47.225 0.0724939 46.945 0.0124939 39.775 -6.07967e-06C14.3425 0.0124939 8.76751 -1.12001 3.75001 4.08249Z"
                          fill="url(#paint0_linear_1_331)"
                        />
                        <path
                          d="M29.995 7.84755C20.9175 7.84755 12.2975 7.04005 9.00499 15.4901C7.64499 18.9801 7.84249 23.5126 7.84249 30.0026C7.84249 35.6976 7.65999 41.0501 9.00499 44.5126C12.29 52.9676 20.98 52.1576 29.99 52.1576C38.6825 52.1576 47.645 53.0626 50.9775 44.5126C52.34 40.9876 52.14 36.5226 52.14 30.0026C52.14 21.3476 52.6175 15.7601 48.42 11.5651C44.17 7.31505 38.4225 7.84755 29.985 7.84755H29.995ZM28.01 11.8401C46.945 11.8101 49.355 9.70506 48.025 38.9476C47.5525 49.2901 39.6775 48.1551 29.9975 48.1551C12.3475 48.1551 11.84 47.6501 11.84 29.9926C11.84 12.1301 13.24 11.8501 28.01 11.8351V11.8401ZM41.82 15.5176C40.3525 15.5176 39.1625 16.7076 39.1625 18.1751C39.1625 19.6426 40.3525 20.8326 41.82 20.8326C43.2875 20.8326 44.4775 19.6426 44.4775 18.1751C44.4775 16.7076 43.2875 15.5176 41.82 15.5176ZM29.995 18.6251C23.7125 18.6251 18.62 23.7201 18.62 30.0026C18.62 36.2851 23.7125 41.3776 29.995 41.3776C36.2775 41.3776 41.3675 36.2851 41.3675 30.0026C41.3675 23.7201 36.2775 18.6251 29.995 18.6251ZM29.995 22.6176C39.7575 22.6176 39.77 37.3876 29.995 37.3876C20.235 37.3876 20.22 22.6176 29.995 22.6176Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_331"
                          x1="3.86506"
                          y1="56.1677"
                          x2="59.6287"
                          y2="7.90493"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FFDD55" />
                          <stop offset="0.5" stop-color="#FF543E" />
                          <stop offset="1" stop-color="#C837AB" />
                        </linearGradient>
                        <clipPath id="clip0_1_331">
                          <rect width="60" height="60" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="leaf" id="leaf3"></div>
                  <div className="leaf" id="leaf4">
                    <svg
                      width="50"
                      height="66"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_1_334)">
                        <path
                          d="M33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 51.2254 14.7746 66 33 66Z"
                          fill="#FF0000"
                        />
                        <path
                          d="M43.7988 20.5859H22.2012C21.3381 20.5859 20.4835 20.756 19.6861 21.0864C18.8888 21.4169 18.1644 21.9012 17.5543 22.5117C16.9441 23.1222 16.4603 23.8469 16.1304 24.6445C15.8005 25.442 15.631 26.2968 15.6316 27.1599V38.8401C15.631 39.7032 15.8005 40.558 16.1304 41.3556C16.4603 42.1531 16.9441 42.8779 17.5543 43.4884C18.1644 44.0989 18.8888 44.5832 19.6861 44.9136C20.4835 45.244 21.3381 45.4141 22.2012 45.4141H43.7988C44.6619 45.4141 45.5166 45.244 46.3139 44.9136C47.1113 44.5832 47.8357 44.0989 48.4458 43.4884C49.0559 42.8779 49.5397 42.1531 49.8696 41.3556C50.1995 40.558 50.369 39.7032 50.3684 38.8401V27.1599C50.369 26.2968 50.1995 25.442 49.8696 24.6445C49.5397 23.8469 49.0559 23.1222 48.4458 22.5117C47.8357 21.9012 47.1113 21.4169 46.3139 21.0864C45.5166 20.756 44.6619 20.5859 43.7988 20.5859ZM28.4234 38.3234V27.6766L37.5766 33L28.4234 38.3234Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_334">
                          <rect width="66" height="66" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="contact_ctr">
              <div className="_contact_box">
                <span>Contact Us</span>
                <div className="contact_inputs">
                  <div className="contact_fields">
                    <input placeholder="first name.." />
                    <input placeholder="last name.." />
                    <input placeholder="phone.." />
                    <input placeholder="email.." />
                  </div>
                  <div className="message_field">
                    <textarea placeholder="message..."></textarea>
                  </div>
                </div>
                <button>Send</button>
              </div>
            </div> */}
          </div>
        </div>
        <div className="_contact_ctr" id="contact_us">
          <div className="_contact_box">
            <span>Contact Us</span>
            <div className="contact_inputs">
              <div className="contact_fields">
                <input placeholder="first name.." />
                <input placeholder="last name.." />
                <input placeholder="phone.." />
                <input placeholder="email.." />
              </div>
              <div className="message_field">
                <textarea placeholder="message..."></textarea>
              </div>
            </div>
            <button>Send</button>
          </div>
        </div>
        <Footer />
      </div>
      {/* </div> */}
    </>
  );
}
