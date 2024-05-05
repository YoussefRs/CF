import React, { useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

export default function Cards({ card, type, customClass }) {
  // const [liked, setLiked] = useState(false);

  // const handleClick = () => {
  //   const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  //   const isFavorite = favorites.some((favorite) => favorite.id === card.id);

  //   if (isFavorite) {
  //     const updatedFavorites = favorites.filter(
  //       (favorite) => favorite.id !== card.id
  //     );
  //     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  //     setLiked(false);
  //   } else {
  //     const updatedFavorites = [...favorites, card];
  //     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  //     setLiked(true);
  //   }
  // };

  return (
    <div className={`card_box ${customClass ? customClass : ""}`}>
      <div className="material-card" href="/some-article">
        <Link to={`/details/${card.id}`} state={{ card }}>
          {
            <img
              className="card-picture"
              src={
                type === "normal"
                  ? card?.images[0]?.image_url
                  : card?.pictures[0]
              }
              alt="Apartment"
            />
          }
          {/* {<img className="card-picture" src={card?.pictures[0]} alt="Apartment" />} */}
        </Link>
        <div className="card-info">
          <div className="cart-title-rating row">
            <h2 className="card-title col-8">{card?.name} </h2>
            <span className="card-rating col-3">
              <svg
                width="21"
                height="19"
                viewBox="0 0 21 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 0L12.9787 7.25735H21L14.5106 11.7426L16.9894 19L10.5 14.5147L4.01064 19L6.48936 11.7426L0 7.25735H8.02129L10.5 0Z"
                  fill="#F1AF07"
                />
              </svg>
              4.5
            </span>
          </div>
          <div className="card-location">
            <span className="card-span">
              {" "}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_43)">
                  <path
                    d="M5.84864 0.00250112C8.28559 -0.0796255 10.2869 1.87139 10.2869 4.28979C10.2869 7.03441 7.65297 9.02627 6.17668 11.8908C6.10172 12.0363 5.89235 12.0365 5.81714 11.891C4.48162 9.31351 2.19904 7.58514 1.77602 5.10199C1.33803 2.53242 3.24353 0.0903287 5.84864 0.00250112ZM5.99712 6.53679C7.23809 6.53679 8.24412 5.53073 8.24412 4.28979C8.24412 3.04885 7.23806 2.04279 5.99712 2.04279C4.75616 2.04279 3.7501 3.04885 3.7501 4.28979C3.7501 5.53073 4.75616 6.53679 5.99712 6.53679Z"
                    fill="#DEC25F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_43">
                    <rect
                      width="12"
                      height="12"
                      fill="white"
                      transform="matrix(-1 0 0 1 12 0)"
                    />
                  </clipPath>
                </defs>
              </svg>
              {card?.location}
            </span>
            <>
              <input
                type="checkbox"
                className="checkbox"
                id={`checkbox-${card.id}`}
              />
              {/* <label htmlFor={`checkbox-${card.id}`} onClick={handleClick}>
                <svg
                  id="heart-svg"
                  viewBox="467 392 58 57"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Group"
                    fill="none"
                    fillRule="evenodd"
                    transform="translate(467 392)"
                  >
                    <path
                      id="heart"
                      d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                      fill="#AAB8C2"
                    />
                    <circle
                      id="main-circ"
                      fill="#E2264D"
                      opacity="0"
                      cx="29.5"
                      cy="29.5"
                      r="1.5"
                    />
  
                    <g id="grp7" opacity="0" transform="translate(7 6)">
                      <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                      <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                    </g>
  
                    <g id="grp6" opacity="0" transform="translate(0 28)">
                      <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                      <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                    </g>
  
                    <g id="grp3" opacity="0" transform="translate(52 28)">
                      <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                      <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                    </g>
  
                    <g id="grp2" opacity="0" transform="translate(44 6)">
                      <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                      <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                    </g>
  
                    <g id="grp5" opacity="0" transform="translate(14 50)">
                      <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                      <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                    </g>
  
                    <g id="grp4" opacity="0" transform="translate(35 50)">
                      <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                      <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                    </g>
  
                    <g id="grp1" opacity="0" transform="translate(24)">
                      <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                      <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                    </g>
                  </g>
                </svg>
              </label> */}
            </>
          </div>
        </div>
        <div className="card-price-btn">
          <div className="card-price">
            <p>
              {card?.default_special_date?.price} € <span>/ Month</span>
            </p>
          </div>
          <div className="card-btn">
            <Link to={`/details/${card.id}`} state={{ card }}>
              <button>More +</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
