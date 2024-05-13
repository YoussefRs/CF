import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import logo from "../../assets/homepage_mats/logo.png";
import logo2 from "../../assets/homepage_mats/name.png";
import DashContent from "./DashComponents/DashContent/DashContent";
import BookingsContent from "./DashComponents/BookingsContent/BookingsContent";
import AppartementsContent from "./DashComponents/AppartementsContent/AppartementsContent";
import CustomersContent from "./DashComponents/CustomersContent/CustomersContent";
import InvoiceContent from "./DashComponents/InvoiceContent/InvoiceContent";
import HelpContent from "./DashComponents/HelpContent/HelpContent";
import { useModal } from "../../hooks/useModal";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AcceptContent from "./DashComponents/AcceptContent/AcceptContent";

function Dashboard() {
  const user = useSelector((state) => state?.auth?.user?.user);
  const navigate = useNavigate();
  const [isNavClosed, setIsNavClosed] = useState(true);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { showModal, openModal, closeModal } = useModal();
  const [menuActive, setMenuActive] = useState(false);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  const handleMenuButtonClick = () => {
    setIsNavClosed(!isNavClosed);
    setIsNavOpen(!isNavOpen);
  };

  const handlePageContentClick = () => {
    if (window.innerWidth <= 991) {
      setIsNavClosed(true);
    }
  };
  const handleHelpPage = () => {
    handleClick(4);
    openModal();
  };

  const toggleDropMenu = () => {
    setMenuActive(!menuActive);
  };
  const logout = () => {
    localStorage.removeItem("user");
  };
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 991) {
  //       setIsNavClosed(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className={`_dash_container ${isNavClosed ? "nav-closed" : ""}`}>
      <div className="header">
        <div className="header-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="City Flat" />
          <img
            src={logo2}
            alt="City Flat"
            id="header-logo-2"
            className={isNavOpen ? "header-logo-2-max" : "header-logo-2-min"}
          />
        </div>
        <div className="header-search">
          <button className="button-menu" onClick={handleMenuButtonClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 385 385">
              <path d="M12 120.3h361a12 12 0 000-24H12a12 12 0 000 24zM373 180.5H12a12 12 0 000 24h361a12 12 0 000-24zM373 264.7H132.2a12 12 0 000 24H373a12 12 0 000-24z" />
            </svg>
          </button>
          <div className="dash_nav_icons d-flex gap-3">
            <button onClick={() => navigate("/")}>
              <svg
                width="70"
                height="49"
                viewBox="0 0 106 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_i_0_1)">
                  <rect
                    width="106"
                    height="49"
                    rx="24.5"
                    fill="#1B1D23"
                    fillOpacity="0.09"
                  />
                </g>
                <rect
                  x="0.25"
                  y="0.25"
                  width="105.5"
                  height="48.5"
                  rx="24.25"
                  stroke="#0DB254"
                  strokeOpacity="0.72"
                  strokeWidth="0.5"
                />
                <g clipPath="url(#clip0_0_1)">
                  <path
                    d="M24.5153 17.6094L17.2653 24.8594C17.0954 25.0293 17 25.2598 17 25.5001C17 25.7404 17.0954 25.9709 17.2653 26.1408L24.5153 33.3908C24.5989 33.4774 24.6989 33.5464 24.8095 33.5939C24.9201 33.6414 25.039 33.6664 25.1593 33.6674C25.2796 33.6685 25.399 33.6456 25.5104 33.6C25.6217 33.5544 25.7229 33.4871 25.808 33.402C25.8931 33.317 25.9604 33.2158 26.006 33.1044C26.0515 32.993 26.0745 32.8737 26.0734 32.7534C26.0724 32.633 26.0474 32.5141 25.9999 32.4035C25.9524 32.293 25.8833 32.193 25.7968 32.1094L20.0937 26.4063L45.0936 26.4063C45.3339 26.4063 45.5644 26.3109 45.7344 26.1409C45.9043 25.971 45.9998 25.7404 45.9998 25.5001C45.9998 25.2597 45.9043 25.0292 45.7344 24.8593C45.5644 24.6893 45.3339 24.5938 45.0936 24.5938L20.0937 24.5938L25.7968 18.8908C25.9619 18.7199 26.0532 18.491 26.0511 18.2534C26.0491 18.0157 25.9538 17.7884 25.7857 17.6204C25.6177 17.4524 25.3904 17.3571 25.1528 17.355C24.9152 17.353 24.6863 17.4443 24.5153 17.6094Z"
                    fill="white"
                  />
                </g>
                <path
                  d="M76.1554 30.7488V37H70.8446V30.7488C70.8446 30.0383 71.1243 29.3569 71.6223 28.8545C72.1203 28.352 72.7957 28.0698 73.5 28.0698C74.2043 28.0698 74.8797 28.352 75.3777 28.8545C75.8757 29.3569 76.1554 30.0383 76.1554 30.7488ZM84.6085 19.2914L73.9868 12.1472C73.8423 12.0512 73.673 12 73.5 12C73.327 12 73.1577 12.0512 73.0132 12.1472L62.3915 19.2914C62.2345 19.3978 62.1154 19.5521 62.0517 19.7318C61.988 19.9114 61.983 20.1069 62.0375 20.2896C62.0919 20.4724 62.2029 20.6327 62.3542 20.7471C62.5055 20.8616 62.6892 20.9241 62.8783 20.9256H63.7634V34.3209C63.7634 35.0315 64.0432 35.7129 64.5412 36.2153C65.0392 36.7177 65.7146 37 66.4189 37H69.0743V30.7488C69.0743 29.5646 69.5406 28.4289 70.3706 27.5915C71.2005 26.7542 72.3262 26.2837 73.5 26.2837C74.6738 26.2837 75.7995 26.7542 76.6294 27.5915C77.4594 28.4289 77.9257 29.5646 77.9257 30.7488V37H80.5811C81.2854 37 81.9608 36.7177 82.4588 36.2153C82.9568 35.7129 83.2366 35.0315 83.2366 34.3209V20.9256H84.1217C84.3108 20.9241 84.4945 20.8616 84.6458 20.7471C84.7971 20.6327 84.9081 20.4724 84.9625 20.2896C85.017 20.1069 85.012 19.9114 84.9483 19.7318C84.8846 19.5521 84.7655 19.3978 84.6085 19.2914Z"
                  fill="url(#paint0_linear_0_1)"
                />
                <defs>
                  <filter
                    id="filter0_i_0_1"
                    x="-5"
                    y="-3"
                    width="111"
                    height="52"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dx="-5" dy="-3" />
                    <feGaussianBlur stdDeviation="4.7" />
                    <feComposite
                      in2="hardAlpha"
                      operator="arithmetic"
                      k2="-1"
                      k3="1"
                    />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.14915 0 0 0 0 0.159363 0 0 0 0 0.19 0 0 0 1 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="shape"
                      result="effect1_innerShadow_0_1"
                    />
                  </filter>
                  <linearGradient
                    id="paint0_linear_0_1"
                    x1="80.7339"
                    y1="31.5122"
                    x2="65.5535"
                    y2="17.6589"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#07D25F" />
                    <stop offset="1" stopColor="#028139" />
                  </linearGradient>
                  <clipPath id="clip0_0_1">
                    <rect
                      width="29"
                      height="29"
                      fill="white"
                      transform="translate(17 40) rotate(-90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            {/* <svg
              width="35"
              height="49"
              viewBox="0 0 49 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_i_0_1)">
                <rect
                  width="49"
                  height="49"
                  rx="24.5"
                  fill="#1B1D23"
                  fillOpacity="0.09"
                />
              </g>
              <rect
                x="0.25"
                y="0.25"
                width="48.5"
                height="48.5"
                rx="24.25"
                stroke="#0DB254"
                strokeOpacity="0.72"
                strokeWidth="0.5"
              />
              <path
                d="M24.3333 25.3254C28.3834 25.3254 31.6667 22.0421 31.6667 17.992C31.6667 13.9419 28.3834 10.6587 24.3333 10.6587C20.2832 10.6587 17 13.9419 17 17.992C17 22.0421 20.2832 25.3254 24.3333 25.3254Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.3333 27.584C29.712 27.584 27.584 29.712 27.584 32.3333C27.584 34.9547 29.712 37.084 32.3333 37.084C34.9547 37.084 37.084 34.9547 37.084 32.3333C37.084 29.712 34.9547 27.584 32.3333 27.584ZM32.3333 29.584C33.8507 29.584 35.084 30.816 35.084 32.3333C35.084 33.8507 33.8507 35.084 32.3333 35.084C30.816 35.084 29.5827 33.8507 29.5827 32.3333C29.5827 30.816 30.816 29.584 32.3333 29.584Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.333 28.5826V26.3333C33.333 25.7813 32.885 25.3333 32.333 25.3333C31.781 25.3333 31.333 25.7813 31.333 26.3333V28.5839C31.333 29.1346 31.781 29.5839 32.333 29.5839C32.885 29.5826 33.333 29.1346 33.333 28.5826Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M35.692 30.3894L37.2827 28.7974C37.6734 28.4081 37.6734 27.7734 37.2827 27.3841C36.8934 26.9934 36.2587 26.9934 35.8694 27.3841L34.2774 28.9747C33.888 29.3654 33.888 29.9987 34.2774 30.3894C34.668 30.7787 35.3014 30.7787 35.692 30.3894Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M36.0827 33.3333H38.3333C38.8853 33.3333 39.3333 32.8853 39.3333 32.3333C39.3333 31.7813 38.8853 31.3333 38.3333 31.3333H36.0827C35.532 31.3333 35.084 31.7813 35.084 32.3333C35.0827 32.8853 35.532 33.3333 36.0827 33.3333Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.2774 35.692L35.8694 37.2827C36.2587 37.6734 36.8934 37.6734 37.2827 37.2827C37.6734 36.8934 37.6734 36.2587 37.2827 35.8694L35.692 34.2774C35.3014 33.888 34.668 33.888 34.2774 34.2774C33.888 34.668 33.888 35.3014 34.2774 35.692Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.333 36.0828V38.3334C31.333 38.8854 31.781 39.3334 32.333 39.3334C32.885 39.3334 33.333 38.8854 33.333 38.3334V36.0828C33.333 35.5321 32.885 35.0841 32.333 35.0828C31.781 35.0828 31.333 35.5321 31.333 36.0828Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.9745 34.2774L27.3838 35.8694C26.9932 36.2587 26.9932 36.8934 27.3838 37.2827C27.7732 37.6734 28.4078 37.6734 28.7972 37.2827L30.3892 35.692C30.7785 35.3014 30.7785 34.668 30.3892 34.2774C29.9985 33.888 29.3652 33.888 28.9745 34.2774Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M28.5823 31.3333H26.333C25.781 31.3333 25.333 31.7813 25.333 32.3333C25.333 32.8853 25.781 33.3333 26.333 33.3333H28.5823C29.1343 33.3333 29.5837 32.8853 29.5823 32.3333C29.5823 31.7813 29.1343 31.3333 28.5823 31.3333Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M30.3892 28.9747L28.7972 27.3841C28.4078 26.9934 27.7732 26.9934 27.3838 27.3841C26.9932 27.7734 26.9932 28.4081 27.3838 28.7974L28.9745 30.3894C29.3652 30.7787 29.9985 30.7787 30.3892 30.3894C30.7785 29.9987 30.7785 29.3654 30.3892 28.9747Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.2478 38.0079C25.5358 37.0933 25.5998 35.7666 26.4412 34.9266L26.6998 34.6666H26.3332C25.0452 34.6666 23.9998 33.6213 23.9998 32.3333C23.9998 31.0453 25.0452 29.9999 26.3332 29.9999H26.6998L26.4412 29.7399C25.5665 28.8666 25.5318 27.4679 26.3372 26.5519C25.6838 26.5013 25.0145 26.4746 24.3332 26.4746C19.9038 26.4746 15.9825 27.5826 13.5478 29.2426C11.6905 30.5093 10.6665 32.1186 10.6665 33.8079V35.7413C10.6665 36.3426 10.9052 36.9199 11.3305 37.3439C11.7558 37.7693 12.3318 38.0079 12.9332 38.0079H26.2478Z"
                fill="white"
              />
              <defs>
                <filter
                  id="filter0_i_0_1"
                  x="-5"
                  y="-3"
                  width="54"
                  height="52"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="-5" dy="-3" />
                  <feGaussianBlur stdDeviation="4.7" />
                  <feComposite
                    in2="hardAlpha"
                    operator="arithmetic"
                    k2="-1"
                    k3="1"
                  />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0.14915 0 0 0 0 0.159363 0 0 0 0 0.19 0 0 0 1 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="shape"
                    result="effect1_innerShadow_0_1"
                  />
                </filter>
              </defs>
            </svg> */}
            <div className="profile">
              <div className="img-box">
                <svg
                  width="35"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g filter="url(#filter0_i_0_1)">
                    <rect
                      width="49"
                      height="49"
                      rx="24.5"
                      fill="#1B1D23"
                      fillOpacity="0.09"
                    />
                  </g>
                  <rect
                    x="0.25"
                    y="0.25"
                    width="48.5"
                    height="48.5"
                    rx="24.25"
                    stroke="#0DB254"
                    strokeOpacity="0.72"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M24.3333 25.3254C28.3834 25.3254 31.6667 22.0421 31.6667 17.992C31.6667 13.9419 28.3834 10.6587 24.3333 10.6587C20.2832 10.6587 17 13.9419 17 17.992C17 22.0421 20.2832 25.3254 24.3333 25.3254Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M32.3333 27.584C29.712 27.584 27.584 29.712 27.584 32.3333C27.584 34.9547 29.712 37.084 32.3333 37.084C34.9547 37.084 37.084 34.9547 37.084 32.3333C37.084 29.712 34.9547 27.584 32.3333 27.584ZM32.3333 29.584C33.8507 29.584 35.084 30.816 35.084 32.3333C35.084 33.8507 33.8507 35.084 32.3333 35.084C30.816 35.084 29.5827 33.8507 29.5827 32.3333C29.5827 30.816 30.816 29.584 32.3333 29.584Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M33.333 28.5826V26.3333C33.333 25.7813 32.885 25.3333 32.333 25.3333C31.781 25.3333 31.333 25.7813 31.333 26.3333V28.5839C31.333 29.1346 31.781 29.5839 32.333 29.5839C32.885 29.5826 33.333 29.1346 33.333 28.5826Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M35.692 30.3894L37.2827 28.7974C37.6734 28.4081 37.6734 27.7734 37.2827 27.3841C36.8934 26.9934 36.2587 26.9934 35.8694 27.3841L34.2774 28.9747C33.888 29.3654 33.888 29.9987 34.2774 30.3894C34.668 30.7787 35.3014 30.7787 35.692 30.3894Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M36.0827 33.3333H38.3333C38.8853 33.3333 39.3333 32.8853 39.3333 32.3333C39.3333 31.7813 38.8853 31.3333 38.3333 31.3333H36.0827C35.532 31.3333 35.084 31.7813 35.084 32.3333C35.0827 32.8853 35.532 33.3333 36.0827 33.3333Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M34.2774 35.692L35.8694 37.2827C36.2587 37.6734 36.8934 37.6734 37.2827 37.2827C37.6734 36.8934 37.6734 36.2587 37.2827 35.8694L35.692 34.2774C35.3014 33.888 34.668 33.888 34.2774 34.2774C33.888 34.668 33.888 35.3014 34.2774 35.692Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M31.333 36.0828V38.3334C31.333 38.8854 31.781 39.3334 32.333 39.3334C32.885 39.3334 33.333 38.8854 33.333 38.3334V36.0828C33.333 35.5321 32.885 35.0841 32.333 35.0828C31.781 35.0828 31.333 35.5321 31.333 36.0828Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.9745 34.2774L27.3838 35.8694C26.9932 36.2587 26.9932 36.8934 27.3838 37.2827C27.7732 37.6734 28.4078 37.6734 28.7972 37.2827L30.3892 35.692C30.7785 35.3014 30.7785 34.668 30.3892 34.2774C29.9985 33.888 29.3652 33.888 28.9745 34.2774Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28.5823 31.3333H26.333C25.781 31.3333 25.333 31.7813 25.333 32.3333C25.333 32.8853 25.781 33.3333 26.333 33.3333H28.5823C29.1343 33.3333 29.5837 32.8853 29.5823 32.3333C29.5823 31.7813 29.1343 31.3333 28.5823 31.3333Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M30.3892 28.9747L28.7972 27.3841C28.4078 26.9934 27.7732 26.9934 27.3838 27.3841C26.9932 27.7734 26.9932 28.4081 27.3838 28.7974L28.9745 30.3894C29.3652 30.7787 29.9985 30.7787 30.3892 30.3894C30.7785 29.9987 30.7785 29.3654 30.3892 28.9747Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M26.2478 38.0079C25.5358 37.0933 25.5998 35.7666 26.4412 34.9266L26.6998 34.6666H26.3332C25.0452 34.6666 23.9998 33.6213 23.9998 32.3333C23.9998 31.0453 25.0452 29.9999 26.3332 29.9999H26.6998L26.4412 29.7399C25.5665 28.8666 25.5318 27.4679 26.3372 26.5519C25.6838 26.5013 25.0145 26.4746 24.3332 26.4746C19.9038 26.4746 15.9825 27.5826 13.5478 29.2426C11.6905 30.5093 10.6665 32.1186 10.6665 33.8079V35.7413C10.6665 36.3426 10.9052 36.9199 11.3305 37.3439C11.7558 37.7693 12.3318 38.0079 12.9332 38.0079H26.2478Z"
                    fill="white"
                  />
                  <defs>
                    <filter
                      id="filter0_i_0_1"
                      x="-5"
                      y="-3"
                      width="54"
                      height="52"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dx="-5" dy="-3" />
                      <feGaussianBlur stdDeviation="4.7" />
                      <feComposite
                        in2="hardAlpha"
                        operator="arithmetic"
                        k2="-1"
                        k3="1"
                      />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.14915 0 0 0 0 0.159363 0 0 0 0 0.19 0 0 0 1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="shape"
                        result="effect1_innerShadow_0_1"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <></>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="sidebar">
          <nav className={isNavOpen ? "nav-max" : "nav-min"} id="sidebar_nav">
            {/*      
          <br />
      <hr /> */}

            <ul className="">
              <li onClick={() => handleClick(0)}>
                <Link
                  to="/dashboard"
                  className={activeIndex === 0 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="bi bi-pc-display-horizontal"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5M12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25" />
                    </svg>
                  </div>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li onClick={() => handleClick(1)}>
                <Link
                  to="/dashboard/bookings"
                  className={activeIndex === 1 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      fill="currentColor"
                    >
                      <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                    </svg>
                  </div>
                  <span>Buchungen</span>
                </Link>
              </li>
              <li onClick={() => handleClick(3)}>
                <Link
                  to="/dashboard/accept"
                  className={activeIndex === 3 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      fill="currentColor"
                    >
                      <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                    </svg>
                  </div>
                  <span>Akzeptieren</span>
                </Link>
              </li>
              <li onClick={() => handleClick(2)}>
                <Link
                  to="/dashboard/apartments"
                  className={activeIndex === 2 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      fill="currentColor"
                    >
                      <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                    </svg>
                  </div>
                  <span>Apartments</span>
                </Link>
              </li>

              <li onClick={() => handleClick(4)}>
                <Link
                  to="/dashboard/customers"
                  className={activeIndex === 4 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      fill="currentColor"
                    >
                      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                    </svg>
                  </div>
                  <span>Kunden</span>
                </Link>
              </li>
              <li
                onClick={() => {
                  handleHelpPage(), handleClick(5);
                }}
              >
                <Link
                  to="/dashboard/help"
                  className={activeIndex === 5 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                    >
                      <path d="M367.2 412.5C335.9 434.9 297.5 448 256 448s-79.9-13.1-111.2-35.5l58-58c15.8 8.6 34 13.5 53.3 13.5s37.4-4.9 53.3-13.5l58 58zm90.7 .8c33.8-43.4 54-98 54-157.3s-20.2-113.9-54-157.3c9-12.5 7.9-30.1-3.4-41.3S425.8 45 413.3 54C369.9 20.2 315.3 0 256 0S142.1 20.2 98.7 54c-12.5-9-30.1-7.9-41.3 3.4S45 86.2 54 98.7C20.2 142.1 0 196.7 0 256s20.2 113.9 54 157.3c-9 12.5-7.9 30.1 3.4 41.3S86.2 467 98.7 458c43.4 33.8 98 54 157.3 54s113.9-20.2 157.3-54c12.5 9 30.1 7.9 41.3-3.4s12.4-28.8 3.4-41.3zm-45.5-46.1l-58-58c8.6-15.8 13.5-34 13.5-53.3s-4.9-37.4-13.5-53.3l58-58C434.9 176.1 448 214.5 448 256s-13.1 79.9-35.5 111.2zM367.2 99.5l-58 58c-15.8-8.6-34-13.5-53.3-13.5s-37.4 4.9-53.3 13.5l-58-58C176.1 77.1 214.5 64 256 64s79.9 13.1 111.2 35.5zM157.5 309.3l-58 58C77.1 335.9 64 297.5 64 256s13.1-79.9 35.5-111.2l58 58c-8.6 15.8-13.5 34-13.5 53.3s4.9 37.4 13.5 53.3zM208 256a48 48 0 1 1 96 0 48 48 0 1 1 -96 0z" />
                    </svg>
                  </div>
                  <span>Hilfe</span>
                </Link>
              </li>
              <li onClick={() => handleClick(6)}>
                <Link
                  to="/dashboard/invoice"
                  className={activeIndex === 6 ? "active" : ""}
                >
                  <div>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      fill="currentColor"
                    >
                      <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM112 256H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
                    </svg>
                  </div>
                  <span>Rechnungen</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* <nav className={isNavOpen ? "nav-max" : "nav-min"}>
          <header>
            <a className="box nav-link" href="#"></a>
            <h1>Title</h1>
          </header>
          <button
            id="toggle-nav-btn"
            className="circle"
            onClick={toggleNav}
          ></button>
          <br />
          <hr />
          <ul className="menu">
            <li>
              <a className="nav-link" href="#">
                <div className="box"></div>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <div className="box"></div>
                <span>Account</span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                <div className="box"></div>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav> */}

        <div
          className={`page-content scrollable-container ${
            isNavOpen ? "page-content-max" : "page-content-min"
          }`}
          // onClick={handlePageContentClick}
        >
          {activeIndex === 0 && <DashContent />}
          {activeIndex === 1 && <BookingsContent />}
          {activeIndex === 2 && <AppartementsContent />}
          {activeIndex === 3 && <AcceptContent />}
          {activeIndex === 4 && <CustomersContent set />}
          {activeIndex === 5 && (
            <HelpContent showModal={showModal} closeModal={closeModal} />
          )}
          {activeIndex === 6 && <InvoiceContent />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
