import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/homepage_mats/logo_h.png";
import LogoSm from "../../assets/homepage_mats/logo.png";
import loader from "../../assets/homepage_mats/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "../../hooks/useModal";

export default function Navbar({ setShow, show }) {

  const navigate = useNavigate();
  const location = useLocation();

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
    localStorage.removeItem("loginToken")
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

  const [authModalToOpen, setAuthModalToOpen] = useState("");

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
                    Eigenschaften
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
                    Referenzen
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
                    Folgen Sie uns
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
                    Kontaktieren Sie uns
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
              {/* <div>
                {!user ? (
                  <div className="d-flex">
                    <button
                      className="btn login"
                      onClick={() => {
                        openLoginModal();
                        setTimeout(() => {
                          handleSignInClick();
                        }, 100);
                      }}
                    >
                      Anmelden
                    </button>
                    <button
                      className="btn register"
                      onClick={() => {
                        openLoginModal();
                        setTimeout(() => {
                          handleSignUpClick();
                        }, 100);
                      }}
                    >
                      Registrieren
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="profile" onClick={toggleDropMenu}>
                      <div className="img-box">
                        <svg
                          width={49}
                          height={49}
                          viewBox="0 0 49 49"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_i_1090_11)">
                            <rect
                              width={49}
                              height={49}
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
                            d="M23.9792 24.7542C27.1433 24.7542 29.7083 22.1892 29.7083 19.0251C29.7083 15.8609 27.1433 13.2959 23.9792 13.2959C20.815 13.2959 18.25 15.8609 18.25 19.0251C18.25 22.1892 20.815 24.7542 23.9792 24.7542Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.2295 26.5188C28.1815 26.5188 26.519 28.1813 26.519 30.2292C26.519 32.2771 28.1815 33.9407 30.2295 33.9407C32.2774 33.9407 33.9409 32.2771 33.9409 30.2292C33.9409 28.1813 32.2774 26.5188 30.2295 26.5188ZM30.2295 28.0813C31.4149 28.0813 32.3784 29.0438 32.3784 30.2292C32.3784 31.4146 31.4149 32.3782 30.2295 32.3782C29.044 32.3782 28.0805 31.4146 28.0805 30.2292C28.0805 29.0438 29.044 28.0813 30.2295 28.0813Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.0107 27.299V25.5417C31.0107 25.1105 30.6607 24.7605 30.2295 24.7605C29.7982 24.7605 29.4482 25.1105 29.4482 25.5417V27.3001C29.4482 27.7303 29.7982 28.0813 30.2295 28.0813C30.6607 28.0803 31.0107 27.7303 31.0107 27.299Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32.8534 28.7104L34.0961 27.4666C34.4013 27.1625 34.4013 26.6666 34.0961 26.3625C33.7919 26.0572 33.2961 26.0572 32.9919 26.3625L31.7481 27.6052C31.444 27.9104 31.444 28.4052 31.7481 28.7104C32.0534 29.0145 32.5481 29.0145 32.8534 28.7104Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.1586 31.0105H34.917C35.3482 31.0105 35.6982 30.6605 35.6982 30.2292C35.6982 29.798 35.3482 29.448 34.917 29.448H33.1586C32.7284 29.448 32.3784 29.798 32.3784 30.2292C32.3774 30.6605 32.7284 31.0105 33.1586 31.0105Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.7481 32.8531L32.9919 34.0958C33.2961 34.401 33.7919 34.401 34.0961 34.0958C34.4013 33.7917 34.4013 33.2958 34.0961 32.9917L32.8534 31.7479C32.5481 31.4437 32.0534 31.4437 31.7481 31.7479C31.444 32.0531 31.444 32.5479 31.7481 32.8531Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M29.4482 33.1584V34.9168C29.4482 35.348 29.7982 35.698 30.2295 35.698C30.6607 35.698 31.0107 35.348 31.0107 34.9168V33.1584C31.0107 32.7282 30.6607 32.3782 30.2295 32.3772C29.7982 32.3772 29.4482 32.7282 29.4482 33.1584Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.6054 31.7479L26.3627 32.9917C26.0575 33.2958 26.0575 33.7917 26.3627 34.0958C26.6669 34.401 27.1627 34.401 27.4669 34.0958L28.7106 32.8531C29.0148 32.5479 29.0148 32.0531 28.7106 31.7479C28.4054 31.4437 27.9106 31.4437 27.6054 31.7479Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.2993 29.448H25.542C25.1107 29.448 24.7607 29.798 24.7607 30.2292C24.7607 30.6605 25.1107 31.0105 25.542 31.0105H27.2993C27.7305 31.0105 28.0816 30.6605 28.0805 30.2292C28.0805 29.798 27.7305 29.448 27.2993 29.448Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28.7106 27.6052L27.4669 26.3625C27.1627 26.0572 26.6669 26.0572 26.3627 26.3625C26.0575 26.6666 26.0575 27.1625 26.3627 27.4666L27.6054 28.7104C27.9106 29.0145 28.4054 29.0145 28.7106 28.7104C29.0148 28.4052 29.0148 27.9104 28.7106 27.6052Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M25.4752 34.6625C24.9189 33.9479 24.9689 32.9115 25.6262 32.2552L25.8283 32.0521H25.5418C24.5356 32.0521 23.7189 31.2354 23.7189 30.2292C23.7189 29.2229 24.5356 28.4063 25.5418 28.4063H25.8283L25.6262 28.2031C24.9429 27.5209 24.9158 26.4281 25.545 25.7125C25.0345 25.6729 24.5116 25.6521 23.9793 25.6521C20.5189 25.6521 17.4554 26.5177 15.5533 27.8146C14.1022 28.8042 13.3022 30.0615 13.3022 31.3813V32.8917C13.3022 33.3615 13.4887 33.8125 13.821 34.1438C14.1533 34.4761 14.6033 34.6625 15.0731 34.6625H25.4752Z"
                            fill="white"
                          />
                          <defs>
                            <filter
                              id="filter0_i_1090_11"
                              x={-5}
                              y={-3}
                              width={54}
                              height={52}
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity={0}
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
                              <feOffset dx={-5} dy={-3} />
                              <feGaussianBlur stdDeviation="4.7" />
                              <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2={-1}
                                k3={1}
                              />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.14915 0 0 0 0 0.159363 0 0 0 0 0.19 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_1090_11"
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
                            &nbsp;Profil
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
                            &nbsp;Abmelden
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div> */}
            </li>
            <li className="small-screens">
              <div className="small-screens-brand">
                <img
                  src={Logo}
                  alt=""
                  className="img-fluid d-sm-block d-none"
                  onClick={() => {
                    if (isHomePage) {
                      scrollToSection("home");
                    } else {
                      navigate("/");
                    }
                  }}
                />
                <img
                  src={LogoSm}
                  alt=""
                  className=" d-sm-none d-block"
                  onClick={() => {
                    if (isHomePage) {
                      scrollToSection("home");
                    } else {
                      navigate("/");
                    }
                  }}
                />
              </div>
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
                        Referenzen
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
                        Folgen Sie uns
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
                        Kontaktieren Sie uns
                      </a>
                    </li>
                  </ul>
                </nav>
              </header>
              <div className="d-flex">
                <button onClick={toggleMenu} className="me-4">
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
                {/* {!user ? (
                  <i
                    onClick={() => {
                      openLoginModal();
                    }}
                  >
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
                          width={49}
                          height={49}
                          viewBox="0 0 49 49"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g filter="url(#filter0_i_1090_11)">
                            <rect
                              width={49}
                              height={49}
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
                            d="M23.9792 24.7542C27.1433 24.7542 29.7083 22.1892 29.7083 19.0251C29.7083 15.8609 27.1433 13.2959 23.9792 13.2959C20.815 13.2959 18.25 15.8609 18.25 19.0251C18.25 22.1892 20.815 24.7542 23.9792 24.7542Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M30.2295 26.5188C28.1815 26.5188 26.519 28.1813 26.519 30.2292C26.519 32.2771 28.1815 33.9407 30.2295 33.9407C32.2774 33.9407 33.9409 32.2771 33.9409 30.2292C33.9409 28.1813 32.2774 26.5188 30.2295 26.5188ZM30.2295 28.0813C31.4149 28.0813 32.3784 29.0438 32.3784 30.2292C32.3784 31.4146 31.4149 32.3782 30.2295 32.3782C29.044 32.3782 28.0805 31.4146 28.0805 30.2292C28.0805 29.0438 29.044 28.0813 30.2295 28.0813Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.0107 27.299V25.5417C31.0107 25.1105 30.6607 24.7605 30.2295 24.7605C29.7982 24.7605 29.4482 25.1105 29.4482 25.5417V27.3001C29.4482 27.7303 29.7982 28.0813 30.2295 28.0813C30.6607 28.0803 31.0107 27.7303 31.0107 27.299Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32.8534 28.7104L34.0961 27.4666C34.4013 27.1625 34.4013 26.6666 34.0961 26.3625C33.7919 26.0572 33.2961 26.0572 32.9919 26.3625L31.7481 27.6052C31.444 27.9104 31.444 28.4052 31.7481 28.7104C32.0534 29.0145 32.5481 29.0145 32.8534 28.7104Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.1586 31.0105H34.917C35.3482 31.0105 35.6982 30.6605 35.6982 30.2292C35.6982 29.798 35.3482 29.448 34.917 29.448H33.1586C32.7284 29.448 32.3784 29.798 32.3784 30.2292C32.3774 30.6605 32.7284 31.0105 33.1586 31.0105Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M31.7481 32.8531L32.9919 34.0958C33.2961 34.401 33.7919 34.401 34.0961 34.0958C34.4013 33.7917 34.4013 33.2958 34.0961 32.9917L32.8534 31.7479C32.5481 31.4437 32.0534 31.4437 31.7481 31.7479C31.444 32.0531 31.444 32.5479 31.7481 32.8531Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M29.4482 33.1584V34.9168C29.4482 35.348 29.7982 35.698 30.2295 35.698C30.6607 35.698 31.0107 35.348 31.0107 34.9168V33.1584C31.0107 32.7282 30.6607 32.3782 30.2295 32.3772C29.7982 32.3772 29.4482 32.7282 29.4482 33.1584Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.6054 31.7479L26.3627 32.9917C26.0575 33.2958 26.0575 33.7917 26.3627 34.0958C26.6669 34.401 27.1627 34.401 27.4669 34.0958L28.7106 32.8531C29.0148 32.5479 29.0148 32.0531 28.7106 31.7479C28.4054 31.4437 27.9106 31.4437 27.6054 31.7479Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M27.2993 29.448H25.542C25.1107 29.448 24.7607 29.798 24.7607 30.2292C24.7607 30.6605 25.1107 31.0105 25.542 31.0105H27.2993C27.7305 31.0105 28.0816 30.6605 28.0805 30.2292C28.0805 29.798 27.7305 29.448 27.2993 29.448Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M28.7106 27.6052L27.4669 26.3625C27.1627 26.0572 26.6669 26.0572 26.3627 26.3625C26.0575 26.6666 26.0575 27.1625 26.3627 27.4666L27.6054 28.7104C27.9106 29.0145 28.4054 29.0145 28.7106 28.7104C29.0148 28.4052 29.0148 27.9104 28.7106 27.6052Z"
                            fill="white"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M25.4752 34.6625C24.9189 33.9479 24.9689 32.9115 25.6262 32.2552L25.8283 32.0521H25.5418C24.5356 32.0521 23.7189 31.2354 23.7189 30.2292C23.7189 29.2229 24.5356 28.4063 25.5418 28.4063H25.8283L25.6262 28.2031C24.9429 27.5209 24.9158 26.4281 25.545 25.7125C25.0345 25.6729 24.5116 25.6521 23.9793 25.6521C20.5189 25.6521 17.4554 26.5177 15.5533 27.8146C14.1022 28.8042 13.3022 30.0615 13.3022 31.3813V32.8917C13.3022 33.3615 13.4887 33.8125 13.821 34.1438C14.1533 34.4761 14.6033 34.6625 15.0731 34.6625H25.4752Z"
                            fill="white"
                          />
                          <defs>
                            <filter
                              id="filter0_i_1090_11"
                              x={-5}
                              y={-3}
                              width={54}
                              height={52}
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity={0}
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
                              <feOffset dx={-5} dy={-3} />
                              <feGaussianBlur stdDeviation="4.7" />
                              <feComposite
                                in2="hardAlpha"
                                operator="arithmetic"
                                k2={-1}
                                k3={1}
                              />
                              <feColorMatrix
                                type="matrix"
                                values="0 0 0 0 0.14915 0 0 0 0 0.159363 0 0 0 0 0.19 0 0 0 1 0"
                              />
                              <feBlend
                                mode="normal"
                                in2="shape"
                                result="effect1_innerShadow_1090_11"
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
                            &nbsp;Profil
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
                            &nbsp;Abmelden
                          </a>
                        </li>
                      </ul>
                    </div>
                  </>
                )} */}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
