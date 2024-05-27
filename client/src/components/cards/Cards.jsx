import React, { useState } from "react";
import "./Cards.css";
import { Link } from "react-router-dom";

export default function Cards({ card, type, customClass }) {
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
        </Link>
        <div className="card-info">
          <div className="cart-title-rating row">
            <h2 className="card-title col">
              {type === "normal" ? card?.name : card.apartmentName}{" "}
            </h2>
            {/* <span className="card-rating col-3 ps-0 ">
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
            </span> */}
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
                    fill="#cccccc"
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
          <div className="card-rooms">
            <div className="_room">
              <div className="icon">
                <svg
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="0.186035"
                    width="49.814"
                    height="49.814"
                    rx="17.7907"
                    fill="#e4e4e4"
                    fillOpacity="0.3"
                  />
                  <path
                    d="M39.6917 25.5749C39.8877 25.2257 39.9913 24.8295 39.9919 24.4259V23.9893C39.9922 23.6874 39.9348 23.3884 39.8232 23.1095C39.7116 22.8305 39.5479 22.577 39.3415 22.3634L38.3241 21.3179V20.9789H41.1761L40.4812 15.234H35.055L34.3601 20.9789H37.2121V21.3179L36.1947 22.3634C35.9883 22.577 35.8246 22.8305 35.713 23.1095C35.6014 23.3884 35.544 23.6874 35.5443 23.9893V24.4259C35.545 24.8295 35.6485 25.2257 35.8445 25.5749H33.3204V35.3412H42.2158V25.5749H39.6917ZM38.88 28.4473H36.6562V27.2983H38.88V28.4473ZM38.88 32.4687H36.6562V31.3198H38.88V32.4687Z"
                    fill="#000"
                  />
                  <path
                    d="M31.6526 25.753C31.6545 25.2586 31.5565 24.7693 31.3651 24.3163C31.1736 23.8632 30.8929 23.4564 30.5407 23.1218V14.6595H29.4288V15.8085H12.75V14.6595H11.6381V23.1218C11.2865 23.4569 11.0061 23.8638 10.8147 24.3167C10.6233 24.7696 10.525 25.2587 10.5262 25.753V26.7239H9.97021V35.3412H11.0821V31.3198H31.0967V35.3412H32.2086V26.7239H31.6526V25.753ZM13.8619 22.1279V20.4045C13.8619 19.9474 14.0377 19.509 14.3504 19.1858C14.6632 18.8626 15.0875 18.681 15.5298 18.681H18.8656C19.3079 18.681 19.7321 18.8626 20.0449 19.1858C20.3577 19.509 20.5334 19.9474 20.5334 20.4045V22.1279H13.8619ZM21.6454 20.4045C21.6454 19.9474 21.8211 19.509 22.1339 19.1858C22.4467 18.8626 22.8709 18.681 23.3132 18.681H26.649C27.0913 18.681 27.5156 18.8626 27.8284 19.1858C28.1411 19.509 28.3169 19.9474 28.3169 20.4045V22.1279H21.6454V20.4045ZM11.6381 25.753C11.6415 25.3861 11.7248 25.0247 11.8816 24.6956C12.0385 24.3664 12.265 24.0779 12.5443 23.8514C12.9606 23.4857 13.4879 23.2824 14.0343 23.2769H28.1445C28.6909 23.2824 29.2182 23.4857 29.6345 23.8514L29.6957 23.9031C29.9579 24.1297 30.1693 24.4125 30.3152 24.7319C30.4611 25.0514 30.5381 25.3998 30.5407 25.753V26.7239H11.6381V25.753Z"
                    fill="#000"
                  />
                </svg>
              </div>
              <p className="label">4 Bedroom</p>
            </div>
            <div className="_room">
              <div className="icon">
                <svg
                  viewBox="0 0 51 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.62793"
                    y="0.186035"
                    width="49.814"
                    height="49.814"
                    rx="17.7907"
                    fill="#e4e4e4"
                    fillOpacity="0.3"
                  />
                  <g clipPath="url(#clip0_0_1)">
                    <path
                      d="M28.9446 18.5925C28.7668 18.5925 28.5889 18.5246 28.4533 18.3889L28.0826 18.0183C27.8112 17.7469 27.8112 17.3069 28.0826 17.0355C28.354 16.7641 28.794 16.7641 29.0654 17.0355L29.4361 17.4061C29.8751 17.8452 29.5582 18.5925 28.9446 18.5925Z"
                      fill="#000"
                    />
                    <path
                      d="M25.9796 18.9632C25.8017 18.9632 25.6238 18.8954 25.4882 18.7596L25.1175 18.389C24.8461 18.1176 24.8461 17.6776 25.1175 17.4062C25.3889 17.1348 25.8289 17.1348 26.1003 17.4062L26.471 17.7768C26.9101 18.2159 26.5931 18.9632 25.9796 18.9632Z"
                      fill="#000"
                    />
                    <path
                      d="M28.9446 21.5577C28.7668 21.5577 28.5889 21.4899 28.4533 21.3541L28.0826 20.9835C27.8112 20.7121 27.8112 20.2721 28.0826 20.0007C28.354 19.7293 28.794 19.7293 29.0654 20.0007L29.4361 20.3713C29.8751 20.8104 29.5582 21.5577 28.9446 21.5577Z"
                      fill="#000"
                    />
                    <path
                      d="M37.8863 24.5227H15.5553C15.1715 24.5227 14.8604 24.2115 14.8604 23.8277C14.8604 23.4439 15.1715 23.1328 15.5553 23.1328H16.3893V14.4434C16.3893 12.6977 17.8016 11.2826 19.5497 11.2826C20.2797 11.2826 20.9919 11.5378 21.555 11.9997L21.9914 12.3578C22.9681 11.783 24.2486 11.9143 25.0863 12.752L26.1346 13.8003C26.406 14.0717 26.406 14.5117 26.1346 14.7831L23.5138 17.4039C23.2424 17.6753 22.8024 17.6754 22.531 17.4039C21.4181 16.2911 21.4873 16.3556 21.4826 16.3556C20.6749 15.5479 20.5239 14.3283 21.0296 13.3666L20.6733 13.0743C20.3596 12.8169 19.9632 12.6742 19.5574 12.6725C18.6079 12.664 17.7792 13.436 17.7792 14.4434V23.1328C18.4912 23.1328 37.1811 23.1328 37.8863 23.1328C38.2701 23.1328 38.5813 23.444 38.5813 23.8278C38.5813 24.2116 38.2701 24.5227 37.8863 24.5227Z"
                      fill="#000"
                    />
                    <path
                      d="M36.6848 25.9126L36.3887 27.541C35.9481 29.9647 34.1497 31.8469 31.8635 32.4621V33.4644C31.8635 33.8482 31.5524 34.1594 31.1686 34.1594C30.7848 34.1594 30.4736 33.8482 30.4736 33.4644V32.672C30.2567 32.6802 23.1601 32.6792 22.9682 32.672V33.4644C22.9682 33.8482 22.657 34.1594 22.2732 34.1594C21.8894 34.1594 21.5783 33.8482 21.5783 33.4644V32.4621C19.2921 31.8469 17.4937 29.9647 17.0531 27.5411L16.757 25.9126H36.6848V25.9126Z"
                      fill="#000"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_0_1">
                      <rect
                        width="23.7209"
                        height="23.7209"
                        fill="white"
                        transform="matrix(-1 0 0 1 38.5813 10.8605)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <p className="label">2 Bathroom</p>
            </div>
          </div>
          <div className="card-description">
            Apartment B061 is an apartment that is located in bloc B first floor
            , it has 3 rooms a big living room for gathering.
          </div>
        </div>
        <div className="card-price-btn">
          <div className="card-btn">
            <Link to={`/details/${card.id}`} state={{ card }}>
              <button>MEHR +</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
