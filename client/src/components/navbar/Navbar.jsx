import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Logo from "../../assets/homepage_mats/logo2.png";
import loader from "../../assets/homepage_mats/logo.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Navbar({ scrolled }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setIsActive(!isActive);
    closeLoginModal();
    setActiveIndex(0);
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
      <nav
        className={`_nav ${scrolled ? "navbar_scrolled" : ""} ${
          isHomePage ? "_nav_home" : ""
        }`}
      >
        <div className="_nav_ctr">
          <ul>
            <li className="big-screens">
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
                      fill="#24BD66"
                    />
                  </svg>
                  <span>Home</span>
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
                      fill="#24BD66"
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
                      fill="#24BD66"
                    />
                  </svg>
                  <span>Eigenschaften</span>
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
                      fill="#24BD66"
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
                      fill="#24BD66"
                    />
                  </svg>
                  <span>Referenzen</span>
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
                      fill="#24BD66"
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
                      fill="#24BD66"
                    />
                  </svg>
                  <span>Folgen Sie uns</span>
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
                      fill="#24BD66"
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
                      fill="#24BD66"
                    />
                  </svg>
                  <span>Kontaktieren Sie uns</span>
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
                      fill="#24BD66"
                    />
                  </svg>
                </a>
              </div>
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
                  src={Logo}
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
                          if (isHomePage) {
                            scrollToSection("home");
                          } else {
                            navigate("/");
                          }
                        }}
                        className="d-flex flex-row justify-content-center"
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
                    {isActive ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={42}
                        height={42}
                        fill="currentColor"
                        className="bi bi-x side_toggler"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                      </svg>
                    ) : (
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="side_toggler"
                      >
                        <rect width="42" height="42" fill="none" />
                        <path d="M35.9375 11.2188C35.9375 11.4923 35.8289 11.7546 35.6355 11.948C35.4421 12.1414 35.1798 12.25 34.9062 12.25H8.09375C7.82025 12.25 7.55794 12.1414 7.36455 11.948C7.17115 11.7546 7.0625 11.4923 7.0625 11.2188C7.0625 10.9452 7.17115 10.6829 7.36455 10.4895C7.55794 10.2961 7.82025 10.1875 8.09375 10.1875H34.9062C35.1798 10.1875 35.4421 10.2961 35.6355 10.4895C35.8289 10.6829 35.9375 10.9452 35.9375 11.2188ZM30.7812 19.4688H8.09375C7.82025 19.4688 7.55794 19.5774 7.36455 19.7708C7.17115 19.9642 7.0625 20.2265 7.0625 20.5C7.0625 20.7735 7.17115 21.0358 7.36455 21.2292C7.55794 21.4226 7.82025 21.5312 8.09375 21.5312H30.7812C31.0548 21.5312 31.3171 21.4226 31.5105 21.2292C31.7039 21.0358 31.8125 20.7735 31.8125 20.5C31.8125 20.2265 31.7039 19.9642 31.5105 19.7708C31.3171 19.5774 31.0548 19.4688 30.7812 19.4688ZM21.5 28.75H8.09375C7.82025 28.75 7.55794 28.8586 7.36455 29.052C7.17115 29.2454 7.0625 29.5077 7.0625 29.7812C7.0625 30.0548 7.17115 30.3171 7.36455 30.5105C7.55794 30.7039 7.82025 30.8125 8.09375 30.8125H21.5C21.7735 30.8125 22.0358 30.7039 22.2292 30.5105C22.4226 30.3171 22.5312 30.0548 22.5312 29.7812C22.5312 29.5077 22.4226 29.2454 22.2292 29.052C22.0358 28.8586 21.7735 28.75 21.5 28.75Z" />
                      </svg>
                    )}
                  </i>
                </button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
