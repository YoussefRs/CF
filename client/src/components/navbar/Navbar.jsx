import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/homepage_mats/logo_h.png";
import { Modal } from "react-bootstrap";
import LoginRegister from "../modals/LoginRegister";
import loader from "../../assets/homepage_mats/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../../hooks/useModal";




export default function Navbar({setShow, show}) {
  const user = useSelector((state) => state?.auth?.user?.user);
  const {loginModal, openLoginModal, closeLoginModal} = useModal();

  const navigate = useNavigate();
  const location = useLocation();

  // Check if the current route is "/"
  const isHomePage = location.pathname === "/";
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuActive, setMenuActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const admin = JSON.parse(localStorage.getItem("user"));

  const onHide = () => {
    closeLoginModal();
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const toggleDropMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    closeLoginModal();
    setActiveIndex(0);
  };
  const toggleLogin = () => {
    setShow(true);
    setIsActive(false);
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: id === "home" || id === "properties" ? "start" : "center",
        // inline: "nearest",
      });
    }
  };

  return (
    <>
      <nav className="_nav">
        <div className="_nav_ctr">
          <ul>
            <li className="big-screens">
              {/* <a href="#" id="_nav_img">
            <img src={logo} />
            <img src={name} />
          </a> */}
              <a href="/" className="nav_logo_ctr">
                <img src={Logo} />
              </a>
              <div className="nav__links d-flex gap-xl-5 gap-3">
                <a
                  onClick={() => {
                    handleItemClick(0);
                    if (isHomePage) {
                      scrollToSection("home");
                    } else {
                      navigate("/");
                    }
                  }}
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 0 ? 1 : 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="56"
                      transform="matrix(1 0 0 -1 0 44)"
                      fill="#028139"
                    />
                    <path
                      d="M22.1476 41.6376C22.4951 41.2016 22.7967 40.7326 23.0456 40.3309C23.0866 40.2649 23.1286 40.1984 23.1687 40.1342C23.4421 39.699 23.7009 39.2883 23.847 38.8003C24.0096 38.2589 24.0431 37.6827 23.9451 37.1345C23.6339 35.399 22.0321 34.052 20.2192 34.0014C20.1815 34.0005 20.1433 34 20.1056 34C18.401 34 16.729 35.0616 16.1841 36.5062C15.9997 36.9947 15.9526 37.5474 16.0483 38.1042C16.21 39.0468 16.7441 39.955 17.2456 40.7194C17.7279 41.4544 18.3223 42.1962 19.0624 42.9882L19.0845 43.0122C19.8227 43.8069 20.0179 43.9674 20.0674 44C20.5821 43.4984 21.0455 42.9475 21.4938 42.4147C21.6465 42.2328 21.8045 42.0451 21.9629 41.8615C22.0241 41.7905 22.0859 41.7154 22.1476 41.6381V41.6376ZM17.9466 39.538C17.3979 39.0115 17.0957 38.3118 17.0957 37.5673C17.0957 36.8228 17.3979 36.1231 17.9466 35.5966C18.4953 35.0702 19.2245 34.7802 20.0004 34.7802C20.7212 34.7802 21.4014 35.0303 21.9341 35.4876V35.4867H20.0301V40.3531C20.0202 40.3531 20.0103 40.3531 20.0004 40.3531C19.2245 40.3531 18.4953 40.0631 17.9466 39.5367V39.538ZM19.7464 42.544L19.9123 42.0976L19.9594 41.9705C19.8666 41.9289 19.802 41.8384 19.802 41.7335C19.802 41.5888 19.9241 41.4716 20.0749 41.4716C20.2258 41.4716 20.3479 41.5888 20.3479 41.7335C20.3479 41.8362 20.2861 41.9248 20.1961 41.9678L20.2442 42.0976L20.4101 42.544M20.1235 40.3517V37.2566H21.4721V37.1761H20.1235V35.569H21.9336V39.647C21.4316 40.0781 20.798 40.325 20.1235 40.3522V40.3517Z"
                      fill="#DEC25F"
                    />
                  </svg>
                  <span
                    style={{ color: activeIndex === 0 ? "#DEC25F" : "white" }}
                  >
                    Home
                  </span>
                  <svg
                    width="40"
                    height="43"
                    viewBox="0 0 40 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ opacity: activeIndex === 0 ? 1 : 0 }}
                  >
                    <rect
                      width="40"
                      height="43"
                      transform="matrix(1 0 0 -1 0 43)"
                      fill="#028139"
                    />
                  </svg>
                </a>
                <a
                  onClick={() => {
                    handleItemClick(1);
                    scrollToSection("properties");
                  }}
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 1 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="56"
                      transform="matrix(1 0 0 -1 0 44)"
                      fill="#028139"
                    />
                    <path
                      d="M22.1476 41.6376C22.4951 41.2016 22.7967 40.7326 23.0456 40.3309C23.0866 40.2649 23.1286 40.1984 23.1687 40.1342C23.4421 39.699 23.7009 39.2883 23.847 38.8003C24.0096 38.2589 24.0431 37.6827 23.9451 37.1345C23.6339 35.399 22.0321 34.052 20.2192 34.0014C20.1815 34.0005 20.1433 34 20.1056 34C18.401 34 16.729 35.0616 16.1841 36.5062C15.9997 36.9947 15.9526 37.5474 16.0483 38.1042C16.21 39.0468 16.7441 39.955 17.2456 40.7194C17.7279 41.4544 18.3223 42.1962 19.0624 42.9882L19.0845 43.0122C19.8227 43.8069 20.0179 43.9674 20.0674 44C20.5821 43.4984 21.0455 42.9475 21.4938 42.4147C21.6465 42.2328 21.8045 42.0451 21.9629 41.8615C22.0241 41.7905 22.0859 41.7154 22.1476 41.6381V41.6376ZM17.9466 39.538C17.3979 39.0115 17.0957 38.3118 17.0957 37.5673C17.0957 36.8228 17.3979 36.1231 17.9466 35.5966C18.4953 35.0702 19.2245 34.7802 20.0004 34.7802C20.7212 34.7802 21.4014 35.0303 21.9341 35.4876V35.4867H20.0301V40.3531C20.0202 40.3531 20.0103 40.3531 20.0004 40.3531C19.2245 40.3531 18.4953 40.0631 17.9466 39.5367V39.538ZM19.7464 42.544L19.9123 42.0976L19.9594 41.9705C19.8666 41.9289 19.802 41.8384 19.802 41.7335C19.802 41.5888 19.9241 41.4716 20.0749 41.4716C20.2258 41.4716 20.3479 41.5888 20.3479 41.7335C20.3479 41.8362 20.2861 41.9248 20.1961 41.9678L20.2442 42.0976L20.4101 42.544M20.1235 40.3517V37.2566H21.4721V37.1761H20.1235V35.569H21.9336V39.647C21.4316 40.0781 20.798 40.325 20.1235 40.3522V40.3517Z"
                      fill="#DEC25F"
                    />
                  </svg>
                  <span
                    style={{ color: activeIndex === 1 ? "#DEC25F" : "white" }}
                  >
                    Properties
                  </span>
                  <svg
                    width="40"
                    height="43"
                    viewBox="0 0 40 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 1 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="43"
                      transform="matrix(1 0 0 -1 0 43)"
                      fill="#028139"
                    />
                  </svg>
                </a>
                <a
                  onClick={() => {
                    handleItemClick(3);
                    scrollToSection("testimonails");
                  }}
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 3 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="56"
                      transform="matrix(1 0 0 -1 0 44)"
                      fill="#028139"
                    />
                    <path
                      d="M22.1476 41.6376C22.4951 41.2016 22.7967 40.7326 23.0456 40.3309C23.0866 40.2649 23.1286 40.1984 23.1687 40.1342C23.4421 39.699 23.7009 39.2883 23.847 38.8003C24.0096 38.2589 24.0431 37.6827 23.9451 37.1345C23.6339 35.399 22.0321 34.052 20.2192 34.0014C20.1815 34.0005 20.1433 34 20.1056 34C18.401 34 16.729 35.0616 16.1841 36.5062C15.9997 36.9947 15.9526 37.5474 16.0483 38.1042C16.21 39.0468 16.7441 39.955 17.2456 40.7194C17.7279 41.4544 18.3223 42.1962 19.0624 42.9882L19.0845 43.0122C19.8227 43.8069 20.0179 43.9674 20.0674 44C20.5821 43.4984 21.0455 42.9475 21.4938 42.4147C21.6465 42.2328 21.8045 42.0451 21.9629 41.8615C22.0241 41.7905 22.0859 41.7154 22.1476 41.6381V41.6376ZM17.9466 39.538C17.3979 39.0115 17.0957 38.3118 17.0957 37.5673C17.0957 36.8228 17.3979 36.1231 17.9466 35.5966C18.4953 35.0702 19.2245 34.7802 20.0004 34.7802C20.7212 34.7802 21.4014 35.0303 21.9341 35.4876V35.4867H20.0301V40.3531C20.0202 40.3531 20.0103 40.3531 20.0004 40.3531C19.2245 40.3531 18.4953 40.0631 17.9466 39.5367V39.538ZM19.7464 42.544L19.9123 42.0976L19.9594 41.9705C19.8666 41.9289 19.802 41.8384 19.802 41.7335C19.802 41.5888 19.9241 41.4716 20.0749 41.4716C20.2258 41.4716 20.3479 41.5888 20.3479 41.7335C20.3479 41.8362 20.2861 41.9248 20.1961 41.9678L20.2442 42.0976L20.4101 42.544M20.1235 40.3517V37.2566H21.4721V37.1761H20.1235V35.569H21.9336V39.647C21.4316 40.0781 20.798 40.325 20.1235 40.3522V40.3517Z"
                      fill="#DEC25F"
                    />
                  </svg>
                  <span
                    style={{ color: activeIndex === 3 ? "#DEC25F" : "white" }}
                  >
                    Testimonials
                  </span>
                  <svg
                    width="40"
                    height="43"
                    viewBox="0 0 40 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 3 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="43"
                      transform="matrix(1 0 0 -1 0 43)"
                      fill="#028139"
                    />
                  </svg>
                </a>
                <a
                  onClick={() => {
                    handleItemClick(2);
                    scrollToSection("followus");
                  }}
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 2 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="56"
                      transform="matrix(1 0 0 -1 0 44)"
                      fill="#028139"
                    />
                    <path
                      d="M22.1476 41.6376C22.4951 41.2016 22.7967 40.7326 23.0456 40.3309C23.0866 40.2649 23.1286 40.1984 23.1687 40.1342C23.4421 39.699 23.7009 39.2883 23.847 38.8003C24.0096 38.2589 24.0431 37.6827 23.9451 37.1345C23.6339 35.399 22.0321 34.052 20.2192 34.0014C20.1815 34.0005 20.1433 34 20.1056 34C18.401 34 16.729 35.0616 16.1841 36.5062C15.9997 36.9947 15.9526 37.5474 16.0483 38.1042C16.21 39.0468 16.7441 39.955 17.2456 40.7194C17.7279 41.4544 18.3223 42.1962 19.0624 42.9882L19.0845 43.0122C19.8227 43.8069 20.0179 43.9674 20.0674 44C20.5821 43.4984 21.0455 42.9475 21.4938 42.4147C21.6465 42.2328 21.8045 42.0451 21.9629 41.8615C22.0241 41.7905 22.0859 41.7154 22.1476 41.6381V41.6376ZM17.9466 39.538C17.3979 39.0115 17.0957 38.3118 17.0957 37.5673C17.0957 36.8228 17.3979 36.1231 17.9466 35.5966C18.4953 35.0702 19.2245 34.7802 20.0004 34.7802C20.7212 34.7802 21.4014 35.0303 21.9341 35.4876V35.4867H20.0301V40.3531C20.0202 40.3531 20.0103 40.3531 20.0004 40.3531C19.2245 40.3531 18.4953 40.0631 17.9466 39.5367V39.538ZM19.7464 42.544L19.9123 42.0976L19.9594 41.9705C19.8666 41.9289 19.802 41.8384 19.802 41.7335C19.802 41.5888 19.9241 41.4716 20.0749 41.4716C20.2258 41.4716 20.3479 41.5888 20.3479 41.7335C20.3479 41.8362 20.2861 41.9248 20.1961 41.9678L20.2442 42.0976L20.4101 42.544M20.1235 40.3517V37.2566H21.4721V37.1761H20.1235V35.569H21.9336V39.647C21.4316 40.0781 20.798 40.325 20.1235 40.3522V40.3517Z"
                      fill="#DEC25F"
                    />
                  </svg>
                  <span
                    style={{ color: activeIndex === 2 ? "#DEC25F" : "white" }}
                  >
                    Follow us
                  </span>
                  <svg
                    width="40"
                    height="43"
                    viewBox="0 0 40 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 2 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="43"
                      transform="matrix(1 0 0 -1 0 43)"
                      fill="#028139"
                    />
                  </svg>
                </a>
                <a
                  onClick={() => {
                    handleItemClick(4);
                    scrollToSection("contact_us");
                  }}
                >
                  <svg
                    width="40"
                    height="44"
                    viewBox="0 0 40 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 4 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="56"
                      transform="matrix(1 0 0 -1 0 44)"
                      fill="#028139"
                    />
                    <path
                      d="M22.1476 41.6376C22.4951 41.2016 22.7967 40.7326 23.0456 40.3309C23.0866 40.2649 23.1286 40.1984 23.1687 40.1342C23.4421 39.699 23.7009 39.2883 23.847 38.8003C24.0096 38.2589 24.0431 37.6827 23.9451 37.1345C23.6339 35.399 22.0321 34.052 20.2192 34.0014C20.1815 34.0005 20.1433 34 20.1056 34C18.401 34 16.729 35.0616 16.1841 36.5062C15.9997 36.9947 15.9526 37.5474 16.0483 38.1042C16.21 39.0468 16.7441 39.955 17.2456 40.7194C17.7279 41.4544 18.3223 42.1962 19.0624 42.9882L19.0845 43.0122C19.8227 43.8069 20.0179 43.9674 20.0674 44C20.5821 43.4984 21.0455 42.9475 21.4938 42.4147C21.6465 42.2328 21.8045 42.0451 21.9629 41.8615C22.0241 41.7905 22.0859 41.7154 22.1476 41.6381V41.6376ZM17.9466 39.538C17.3979 39.0115 17.0957 38.3118 17.0957 37.5673C17.0957 36.8228 17.3979 36.1231 17.9466 35.5966C18.4953 35.0702 19.2245 34.7802 20.0004 34.7802C20.7212 34.7802 21.4014 35.0303 21.9341 35.4876V35.4867H20.0301V40.3531C20.0202 40.3531 20.0103 40.3531 20.0004 40.3531C19.2245 40.3531 18.4953 40.0631 17.9466 39.5367V39.538ZM19.7464 42.544L19.9123 42.0976L19.9594 41.9705C19.8666 41.9289 19.802 41.8384 19.802 41.7335C19.802 41.5888 19.9241 41.4716 20.0749 41.4716C20.2258 41.4716 20.3479 41.5888 20.3479 41.7335C20.3479 41.8362 20.2861 41.9248 20.1961 41.9678L20.2442 42.0976L20.4101 42.544M20.1235 40.3517V37.2566H21.4721V37.1761H20.1235V35.569H21.9336V39.647C21.4316 40.0781 20.798 40.325 20.1235 40.3522V40.3517Z"
                      fill="#DEC25F"
                    />
                  </svg>
                  <span
                    style={{ color: activeIndex === 4 ? "#DEC25F" : "white" }}
                  >
                    Contact Us
                  </span>
                  <svg
                    width="40"
                    height="43"
                    viewBox="0 0 40 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      opacity: activeIndex === 4 ? 1 : "0",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <rect
                      width="40"
                      height="43"
                      transform="matrix(1 0 0 -1 0 43)"
                      fill="#028139"
                    />
                  </svg>
                </a>
              </div>
              <div>
                {!user ? (
                  <>
                    <button className="btn login" onClick={() => openLoginModal()}>
                      Log In
                    </button>
                    <button
                      className="btn register"
                      onClick={() => openLoginModal()}
                    >
                      sign up
                    </button>
                  </>
                ) : (
                  <>
                    <div className="profile" onClick={toggleDropMenu}>
                      <div className="img-box">
                        <svg
                          width="49"
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
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
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
                    </div>
                    <div className={`menu ${menuActive ? "active" : ""}`}>
                      <ul>
                        {user?.role === "admin" && (
                          <li>
                            <a href="/dashboard">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-clipboard-data"
                                viewBox="0 0 16 16"
                              >
                                <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                              </svg>
                              &nbsp;dashboard
                            </a>
                          </li>
                        )}
                        <li>
                          <a href="/profil">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-person-circle"
                              viewBox="0 0 16 16"
                            >
                              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                              <path
                                fillRule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                              />
                            </svg>
                            &nbsp;Profile
                          </a>
                        </li>
                        <li>
                          <a href="/" onClick={logout}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-box-arrow-right"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                              />
                              <path
                                fillRule="evenodd"
                                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                              />
                            </svg>
                            &nbsp;Sign Out
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </li>
            <li className="small-screens">
              <button onClick={toggleMenu}>
                <i>
                  <svg
                    width="42"
                    height="42"
                    viewBox="0 0 42 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="42"
                      height="42"
                      fill="#DDDCDC"
                      fillOpacity="0.1"
                    />
                    <path
                      d="M35.9375 11.2188C35.9375 11.4923 35.8289 11.7546 35.6355 11.948C35.4421 12.1414 35.1798 12.25 34.9062 12.25H8.09375C7.82025 12.25 7.55794 12.1414 7.36455 11.948C7.17115 11.7546 7.0625 11.4923 7.0625 11.2188C7.0625 10.9452 7.17115 10.6829 7.36455 10.4895C7.55794 10.2961 7.82025 10.1875 8.09375 10.1875H34.9062C35.1798 10.1875 35.4421 10.2961 35.6355 10.4895C35.8289 10.6829 35.9375 10.9452 35.9375 11.2188ZM30.7812 19.4688H8.09375C7.82025 19.4688 7.55794 19.5774 7.36455 19.7708C7.17115 19.9642 7.0625 20.2265 7.0625 20.5C7.0625 20.7735 7.17115 21.0358 7.36455 21.2292C7.55794 21.4226 7.82025 21.5312 8.09375 21.5312H30.7812C31.0548 21.5312 31.3171 21.4226 31.5105 21.2292C31.7039 21.0358 31.8125 20.7735 31.8125 20.5C31.8125 20.2265 31.7039 19.9642 31.5105 19.7708C31.3171 19.5774 31.0548 19.4688 30.7812 19.4688ZM21.5 28.75H8.09375C7.82025 28.75 7.55794 28.8586 7.36455 29.052C7.17115 29.2454 7.0625 29.5077 7.0625 29.7812C7.0625 30.0548 7.17115 30.3171 7.36455 30.5105C7.55794 30.7039 7.82025 30.8125 8.09375 30.8125H21.5C21.7735 30.8125 22.0358 30.7039 22.2292 30.5105C22.4226 30.3171 22.5312 30.0548 22.5312 29.7812C22.5312 29.5077 22.4226 29.2454 22.2292 29.052C22.0358 28.8586 21.7735 28.75 21.5 28.75Z"
                      fill="#DEC25F"
                      fillOpacity="0.5"
                    />
                  </svg>
                </i>
              </button>
              <header className="__nav_sidemenu">
                <nav className={isActive ? "active" : ""}>
                  <ul>
                    <li>
                      <a
                        onClick={() => {
                          handleItemClick(1);
                          setIsActive(!isActive);
                          // handleItemClick(0);
                          if (isHomePage) {
                            scrollToSection("home");
                          } else {
                            navigate("/");
                          }
                        }}
                        className="d-flex flex-row justify-content-center"
                        // href="/"
                      >
                        {activeIndex === 1 && (
                          <img src={loader} id="selector_" alt="selector" />
                        )}
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleItemClick(2);
                          setIsActive(!isActive);
                          scrollToSection("properties");
                        }}
                        className="d-flex flex-row justify-content-center"
                        // href="#properties"
                      >
                        {activeIndex === 2 && (
                          <img src={loader} id="selector_" alt="selector" />
                        )}
                        Properties{" "}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleItemClick(4);
                          setIsActive(!isActive);
                          scrollToSection("testimonails");
                        }}
                        className="d-flex flex-row justify-content-center"
                        // href="#testimonails"
                      >
                        {activeIndex === 4 && (
                          <img src={loader} id="selector_" alt="selector" />
                        )}
                        testimonials
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleItemClick(3);
                          setIsActive(!isActive);
                          scrollToSection("followus");
                        }}
                        className="d-flex flex-row justify-content-center"
                        // href="#followus"
                      >
                        {activeIndex === 3 && (
                          <img src={loader} id="selector_" alt="selector" />
                        )}
                        follow us
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setIsActive(!isActive);
                          scrollToSection("contact_us");
                        }}
                        className="d-flex flex-row justify-content-center"
                        // href="#contactus"
                      >
                        {activeIndex === 5 && (
                          <img src={loader} id="selector_" alt="selector" />
                        )}
                        contact us
                      </a>
                    </li>
                  </ul>
                </nav>
              </header>
              {!user ? (
                <i onClick={toggleLogin}>
                  <svg
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="46"
                      height="46"
                      rx="23"
                      transform="matrix(1 0 0 -1 0 46)"
                      fill="url(#paint0_linear_0_1)"
                    />
                    <path
                      d="M23.0001 21.8251C21.2211 21.8251 19.7789 20.0734 19.7789 17.9125C19.7789 15.7517 20.2524 14 23.0001 14C25.7477 14 26.2213 15.7517 26.2213 17.9125C26.2213 20.0734 24.7791 21.8251 23.0001 21.8251Z"
                      fill="white"
                    />
                    <path
                      d="M29.0842 27.7989C29.0853 27.7618 29.0848 27.6672 29.0842 27.7989V27.7989Z"
                      fill="white"
                    />
                    <path
                      d="M16.9161 27.9019C16.9155 27.6517 16.9144 27.8658 16.9161 27.9019V27.9019Z"
                      fill="white"
                    />
                    <path
                      d="M16.923 27.641C16.9827 23.8768 17.4743 22.8042 21.2362 22.1252C21.2362 22.1252 21.7658 22.8 23.0001 22.8C24.2344 22.8 24.764 22.1252 24.764 22.1252C28.4849 22.7968 29.0064 23.8535 29.075 27.5187C29.0806 27.818 29.0832 27.8337 29.0842 27.799C29.084 27.8641 29.0837 27.9845 29.0837 28.1945C29.0837 28.1945 28.1881 30 23.0001 30C17.8121 30 16.9164 28.1945 16.9164 28.1945C16.9164 28.0596 16.9163 27.9657 16.9162 27.9019C16.9172 27.9234 16.9192 27.8818 16.923 27.641Z"
                      fill="white"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_0_1"
                        x1="37.4677"
                        y1="35.9024"
                        x2="9.41988"
                        y2="8.08077"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#07D25F" />
                        <stop offset="1" stopColor="#028139" />
                      </linearGradient>
                    </defs>
                  </svg>
                </i>
              ) : (
                <>
                  <div className="profile" onClick={toggleDropMenu}>
                    <div className="img-box">
                      <svg
                        width="49"
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
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
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
                  </div>
                  <div className={`menu ${menuActive ? "active" : ""}`}>
                    <ul>
                      {user && user.role === "admin" && (
                        <li>
                          <a href="/dashboard">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-clipboard-data"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
                              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                            </svg>
                            &nbsp;dashboard
                          </a>
                        </li>
                      )}
                      <li>
                        <a href="/profil">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path
                              fillRule="evenodd"
                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                            />
                          </svg>
                          &nbsp;Profile
                        </a>
                      </li>
                      <li onClick={logout}>
                        <a>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-box-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                            />
                            <path
                              fillRule="evenodd"
                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                            />
                          </svg>
                          &nbsp;Sign Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login_signin_modal"
        show={loginModal}
        onHide={onHide}
      >
        <Modal.Body className="d-flex justify-content-center flex-column items-center">
          <LoginRegister setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>
  );
}
