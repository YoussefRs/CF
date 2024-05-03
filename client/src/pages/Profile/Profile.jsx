import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import apartement from "../../assets/homepage_mats/vue-du-modele-maison-3d.png";
import profilePic from "../../assets/homepage_mats/city-flat.png";
import Modal from "../../components/modals/Modal";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookings } from "../../redux/BookingSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("profile");
  const { showModal, openModal, closeModal } = useModal();
  const user = useSelector((state) => state.auth.user);
  const Rentals = useSelector((state) => state.bookings?.bookings);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const removeFav = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    dispatch(getUserBookings());
  }, []);

  const handleTabClick = (tab, event) => {
    event.preventDefault();
    setActiveTab(tab);
  };
  return (
    <>
      <div className="profile-ctr mb-5">
        <div className="profile-container d-flex align-items-center justify-content-center">
          <div className="container-fluid" style={{ width: 1340 }}>
            <div className="row">
              <div className="col col-xl-4 col-lg-12 profile_ctr mb-4">
                <div className="panel panel-default px-4">
                  <div className="panel-body py-5 text-center d-flex justify-content-center align-items-center flex-column">
                    <div className="profile-pic">
                      <img
                        src={user?.user.image || profilePic}
                        alt="Profile Picture"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = profilePic;
                        }}
                      />
                    </div>
                    <br />
                    <button className="profile-btn d-flex align-items-center justify-content-center gap-1">
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.25 5.99254L17.5725 5.99254C17.4254 5.99206 17.2816 5.94847 17.159 5.86716C17.0363 5.78585 16.9402 5.67039 16.8825 5.53504L16.3275 4.22254C16.1297 3.8354 15.824 3.51389 15.4473 3.29692C15.0706 3.07995 14.6391 2.97683 14.205 3.00004L9.75 3.00004C9.31116 2.97675 8.87508 3.08217 8.49534 3.30335C8.1156 3.52453 7.80875 3.85183 7.6125 4.24503L7.095 5.52753C7.03903 5.66623 6.94252 5.78481 6.81808 5.86777C6.69363 5.95074 6.54705 5.99422 6.3975 5.99253L3.75 5.99253C3.1538 5.99427 2.58251 6.23188 2.16093 6.65347C1.73935 7.07505 1.50174 7.64633 1.5 8.24253L1.5 18.75C1.50174 19.3462 1.73936 19.9175 2.16094 20.3391C2.58252 20.7607 3.1538 20.9983 3.75 21L20.25 21C20.8462 20.9983 21.4175 20.7607 21.8391 20.3391C22.2606 19.9175 22.4983 19.3462 22.5 18.75L22.5 8.24254C22.4983 7.64634 22.2606 7.07505 21.8391 6.65347C21.4175 6.23189 20.8462 5.99428 20.25 5.99254ZM6.645 12.75C6.64584 11.3301 7.2103 9.96849 8.21438 8.96441C9.21845 7.96034 10.58 7.39588 12 7.39504C19.088 7.64338 19.0862 17.8578 11.9999 18.105C10.5799 18.1042 9.2184 17.5397 8.21434 16.5356C7.21029 15.5316 6.64584 14.17 6.645 12.75ZM18.99 9.75004C18.815 9.75003 18.6471 9.68049 18.5233 9.55671C18.3995 9.43294 18.33 9.26506 18.33 9.09002C18.33 8.91498 18.3996 8.7471 18.5233 8.62333C18.6471 8.49956 18.815 8.43003 18.99 8.43004C19.1651 8.43004 19.333 8.49958 19.4567 8.62336C19.5805 8.74714 19.65 8.91501 19.65 9.09006C19.65 9.2651 19.5805 9.43297 19.4567 9.55674C19.3329 9.68051 19.165 9.75004 18.99 9.75004Z"
                          fill="white"
                        />
                        <path
                          d="M15.8545 12.75C15.6883 7.65629 8.30999 7.65749 8.14453 12.7501C8.31079 17.8437 15.689 17.8425 15.8545 12.75Z"
                          fill="white"
                        />
                      </svg>
                      change
                    </button>
                    <br />
                    <h3>Hello, {user?.user?.username} </h3>
                  </div>
                </div>
              </div>
              <div className="col col-xl-8 col-lg-12">
                <div className="_container ">
                  <div className="container-fluid d-flex align-items-center justify-content-center p-0">
                    <ul className="nav nav-pills nav-justified">
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "profile" && "active"
                          }`}
                          href="#profile"
                          onClick={(e) => handleTabClick("profile", e)}
                        >
                          <svg
                            width="14"
                            height="18"
                            viewBox="0 0 14 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6.99956 8.2C5.01145 8.2 3.39961 6.58824 3.39961 4.60002C3.39961 2.61176 3.9288 1 6.99956 1C10.0703 1 10.5996 2.61176 10.5996 4.60002C10.5996 6.58824 8.98777 8.2 6.99956 8.2Z"
                              stroke="#848998"
                            />
                            <path
                              d="M1.00672 14.3638C1.06555 10.1573 1.55037 8.95867 5.26039 8.19995C5.26039 8.19995 5.78263 8.95403 6.99987 8.95403C8.21711 8.95403 8.73944 8.19995 8.73944 8.19995C12.409 8.9504 12.9233 10.1312 12.9909 14.2271C12.9964 14.5616 12.999 14.5792 13 14.5403C12.9998 14.6131 12.9995 14.7476 12.9995 14.9823C12.9995 14.9823 12.1162 17 6.99987 17C1.88358 17 1.00023 14.9823 1.00023 14.9823C1.00023 14.8315 1.00014 14.7267 1 14.6554C1.00099 14.6794 1.00298 14.6329 1.00672 14.3638Z"
                              stroke="#848998"
                            />
                          </svg>
                          <span>My Profile</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "favorite" && "active"
                          }`}
                          href="#favorite"
                          onClick={(e) => handleTabClick("favorite", e)}
                        >
                          <svg
                            width="14"
                            height="18"
                            viewBox="0 0 15 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.6817 0.53338C11.0364 -0.373968 8.8662 -0.0984029 7.50245 1.16765C6.1321 -0.0973901 3.95847 -0.370009 2.31863 0.53338C0.889476 1.31524 0 2.81257 0 4.43834C0 4.90384 0.0749558 5.3664 0.207556 5.76488C0.907055 8.8889 5.39762 13 7.50245 13C9.60273 13 14.0899 8.88853 14.7774 5.81782C14.9248 5.36594 15 4.90449 15 4.43788C15.0001 2.81257 14.1114 1.31468 12.6817 0.53338ZM13.7559 5.51905C13.105 8.42643 8.86451 11.9038 7.50245 11.9038C5.98665 11.9038 1.85658 8.26089 1.2291 5.4662C1.11702 5.12914 1.06312 4.78406 1.06312 4.43898C1.06312 3.21988 1.73469 2.09323 2.81548 1.50177C3.31876 1.22363 3.89128 1.08009 4.47004 1.08009C5.48873 1.08009 6.44763 1.52598 7.10171 2.30536L7.50709 2.78403L7.90641 2.30536C8.92501 1.08571 10.7961 0.735013 12.1869 1.50177C13.2677 2.09323 13.9394 3.21988 13.9394 4.43898C13.9371 4.78341 13.8829 5.12858 13.7559 5.51905Z"
                              fill="#848998"
                            />
                          </svg>
                          <span>My Favorite</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "rentals" && "active"
                          }`}
                          href="#rentals"
                          onClick={(e) => handleTabClick("rentals", e)}
                        >
                          <svg
                            width="14"
                            height="18"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 0.5H0.5V1V2.30001V2.80001H1H1.14999V14V14.5H1.64999H6.19999H6.69999V14V11.9H8.30001V14V14.5H8.80001H13.35H13.85V14V2.80001H14H14.5V2.30001V1V0.5H14H1ZM4.40001 9.6H4.09999V9.29999H4.40001V9.6ZM4.40001 6.99998H4.09999V6.69998H4.40001V6.99998ZM4.40001 4.4H4.09999V4.09999H4.40001V4.4ZM7.65002 9.6H7.35001V9.29999H7.65002V9.6ZM7.65002 6.99998H7.35001V6.69998H7.65002V6.99998ZM7.65002 4.4H7.35001V4.09999H7.65002V4.4ZM10.9 9.6H10.6V9.29999H10.9V9.6ZM10.9 6.99998H10.6V6.69998H10.9V6.99998ZM10.9 4.4H10.6V4.09999H10.9V4.4Z"
                              fill="white"
                              stroke="#848998"
                            />
                          </svg>
                          <span>My Rentals</span>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${
                            activeTab === "orders" && "active"
                          }`}
                          href="#orders"
                          onClick={(e) => handleTabClick("orders", e)}
                        >
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.2176 12.3197C13.5429 12.218 13.8447 12.0673 14.0751 11.8632C14.3065 11.6583 14.5 11.3655 14.5 11.0003C14.5 10.4328 14.053 10.0535 13.6378 9.84591C13.1927 9.62331 12.6127 9.5 11.9991 9.5C11.3862 9.5 10.8066 9.62351 10.3618 9.84619C9.94706 10.0538 9.5 10.4331 9.5 11.0003C9.5 11.3665 9.69297 11.6595 9.92543 11.8647C10.1562 12.0684 10.458 12.218 10.7821 12.3196C11.1447 12.4377 11.5637 12.5 11.9987 12.5C12.4357 12.5 12.8546 12.4378 13.2176 12.3197Z"
                              stroke="#848998"
                            />
                            <path
                              d="M10.2264 13.5542L9.5 13.1853V14V14.3218C9.5 14.6306 9.68542 14.8482 9.84431 14.9756C10.008 15.1069 10.2142 15.2031 10.4248 15.2746C10.8508 15.4192 11.4072 15.5 11.9987 15.5C12.5911 15.5 13.1482 15.4194 13.5746 15.2748C13.7852 15.2034 13.9917 15.1071 14.1555 14.9758C14.3146 14.8483 14.5 14.6306 14.5 14.3218V14V13.1861L13.774 13.554C13.6248 13.6296 13.4162 13.7067 13.1241 13.7695C12.7925 13.8407 12.403 13.88 11.9983 13.88C11.5954 13.88 11.2066 13.8407 10.8756 13.7698C10.5839 13.707 10.3751 13.6297 10.2264 13.5542Z"
                              stroke="#848998"
                            />
                            <path
                              d="M8.24369 1.57174L7.00658 2.3172L5.76504 1.57139L5.50757 1.41672L5.2501 1.57139L4.00735 2.31791L2.75572 1.57069L2.49862 1.4172L2.24195 1.57139L0.742529 2.4721L0.5 2.61779V2.90071V13.7743C0.5 14.7297 1.27473 15.5 2.22934 15.5H8.9227H10.247L9.25315 14.6248C9.05537 14.4506 8.98033 14.2746 8.98033 14.1016V12.5839V12.4218V11.0356L8.98725 10.9856C9.01633 10.7755 9.17861 10.5288 9.59206 10.3186C10.0026 10.1098 10.6038 9.97221 11.3474 9.97221C11.9362 9.97221 12.4392 10.0583 12.8294 10.1999L13.5 10.4433V9.72989V2.90071V2.61824L13.2581 2.47246L11.7633 1.57174L11.5056 1.41648L11.2478 1.57139L10.0054 2.31768L8.75863 1.57104L8.50095 1.41672L8.24369 1.57174ZM6.65076 11.5513C6.6506 11.5513 6.65045 11.5513 6.65029 11.5513H6.65076Z"
                              stroke="#848998"
                            />
                            <path
                              d="M13.0331 12.053L13.033 12.053L13.0259 12.0561C12.7332 12.1853 12.3758 12.2597 11.9991 12.2597C11.6246 12.2597 11.268 12.1857 10.9686 12.0534L10.9687 12.0533L10.9612 12.0502C10.6975 11.9387 10.5026 11.798 10.3549 11.6492L9.5 10.7879V12.0014V12.6433C9.5 13.4093 10.0798 13.9682 10.7366 14.2509L10.7371 14.2511C11.1106 14.4114 11.5451 14.5 11.9987 14.5C12.455 14.5 12.8896 14.4115 13.2631 14.251L13.2638 14.2507C13.921 13.967 14.5 13.4045 14.5 12.6433V12V10.7822L13.6443 11.6487C13.4968 11.7979 13.3002 11.94 13.0331 12.053Z"
                              stroke="#848998"
                            />
                          </svg>

                          <span>My Orders</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="tab-content" id="ex2-content">
                    <div
                      className={`tab-pane fade show ${
                        activeTab === "profile" && "active"
                      }`}
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="ex3-tab-1"
                    >
                      <div className="profile_container">
                        <div className="col px-5 edit_information">
                          <form action="" method="POST">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                  <label className="profile_details_text">
                                    Full Name:
                                  </label>
                                  <input
                                    type="text"
                                    name="text"
                                    className="form-control profile_input"
                                    value={user?.user?.username}
                                    required
                                    style={{ pointerEvents: "none" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="Mobile">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                  <label className="profile_details_text">
                                    Mobile Number:
                                  </label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    className="form-control profile_input"
                                    value={user?.user?.phone}
                                    required
                                    style={{ pointerEvents: "none" }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="form-group">
                                  <label className="profile_details_text">
                                    Email:
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    className="form-control profile_input"
                                    value={user?.user?.email}
                                    style={{ pointerEvents: "none" }}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row mt-5">
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit d-flex justify-content-sm-center justify-content-between  gap-2">
                                <div className="customer-form-btn d-flex form-group col-5 col-md-2">
                                  <button className="col">cancel</button>
                                </div>
                                <div className="customer-form-btn d-flex form-group col-5 col-md-2">
                                  <button className="col" id="special-btn">
                                    change
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`tab-pane fade show  ${
                        activeTab === "favorite" && "active"
                      }`}
                      id="favorite"
                      role="tabpanel"
                      aria-labelledby="ex3-tab-2"
                    >
                      <ul className="profile_cards scrollable-container mt-4">
                        {favorites?.map((fav, i) => (
                          <li className="profile_cards_item" key={i}>
                            <div className="profile_card">
                              <div className="app_card_image">
                                <img src={fav?.pictures[0]} alt="app" />
                              </div>

                              <div className="app_card_content">
                                <div className="app_card_heading d-flex justify-content-between">
                                  <span className="app_title">
                                    {fav.apartmentName}
                                  </span>
                                  <span className="app_title">
                                    <svg
                                      width="16"
                                      height="15"
                                      viewBox="0 0 16 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <path
                                        d="M7.66418 0.360352L9.46181 5.62357H15.279L10.5728 8.87641L12.3704 14.1396L7.66418 10.8868L2.95794 14.1396L4.75556 8.87641L0.0493164 5.62357H5.86656L7.66418 0.360352Z"
                                        fill="#F1AF07"
                                      />
                                    </svg>
                                    4.7
                                  </span>
                                  <button
                                    className="remove_fav"
                                    onClick={() => removeFav(fav.id)}
                                  ></button>
                                </div>
                                <p className="card-span">
                                  <svg
                                    width="9"
                                    height="9"
                                    viewBox="0 0 9 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_161_2953)">
                                      <path
                                        d="M4.50296 0.195417C6.27031 0.135857 7.72168 1.55078 7.72168 3.30467C7.72168 5.29514 5.81151 6.73968 4.74087 8.81713C4.68651 8.92261 4.53467 8.92274 4.48012 8.81728C3.51157 6.948 1.85618 5.69454 1.5494 3.8937C1.23176 2.03018 2.61367 0.259112 4.50296 0.195417ZM4.61065 4.93425C5.51063 4.93425 6.24023 4.20463 6.24023 3.30467C6.24023 2.40471 5.51061 1.67509 4.61065 1.67509C3.71067 1.67509 2.98105 2.40471 2.98105 3.30467C2.98105 4.20463 3.71067 4.93425 4.61065 4.93425Z"
                                        fill="#DEC25F"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_161_2953">
                                        <rect
                                          width="8.7027"
                                          height="8.7027"
                                          fill="white"
                                          transform="matrix(-1 0 0 1 8.96387 0.193665)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  {fav.description}
                                </p>
                                <div className="app_card_heading d-flex justify-content-between">
                                  <p className="d-flex align-items-center gap-1">
                                    3000 € <span>/ month</span>
                                  </p>
                                  <div className="d-flex gap-2">
                                    <button className="profile-btn">
                                      More
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`tab-pane fade show  ${
                        activeTab === "test3" && "active"
                      }`}
                      id="test3"
                      role="tabpanel"
                      aria-labelledby="ex3-tab-2"
                    ></div>
                    <div
                      className={`tab-pane fade show  ${
                        activeTab === "rentals" && "active"
                      }`}
                      id="rentals"
                      role="tabpanel"
                      aria-labelledby="ex3-tab-2"
                    >
                      <ul className="profile_cards scrollable-container mt-4">
                        {Rentals?.map((rental, i) => (
                          <li className="profile_cards_item" key={i}>
                            <div className="profile_card p-0">
                              <div className="profile_card_image p-2">
                                <img
                                  src={rental?.appartment?.pictures[0]}
                                  alt="app"
                                />
                              </div>

                              <div className="app_card_content p-0 gap-1">
                                <div className="app_card_heading d-flex justify-content-between px-3">
                                  <span className="app_title">
                                    {rental?.appartment?.apartmentName}
                                  </span>
                                  <span className="app_title">
                                    <svg
                                      width="16"
                                      height="15"
                                      viewBox="0 0 16 15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <path
                                        d="M7.66418 0.360352L9.46181 5.62357H15.279L10.5728 8.87641L12.3704 14.1396L7.66418 10.8868L2.95794 14.1396L4.75556 8.87641L0.0493164 5.62357H5.86656L7.66418 0.360352Z"
                                        fill="#F1AF07"
                                      />
                                    </svg>
                                    4.7
                                  </span>
                                </div>
                                <p className="card-span px-3">
                                  <svg
                                    width="9"
                                    height="9"
                                    viewBox="0 0 9 9"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <g clipPath="url(#clip0_161_2953)">
                                      <path
                                        d="M4.50296 0.195417C6.27031 0.135857 7.72168 1.55078 7.72168 3.30467C7.72168 5.29514 5.81151 6.73968 4.74087 8.81713C4.68651 8.92261 4.53467 8.92274 4.48012 8.81728C3.51157 6.948 1.85618 5.69454 1.5494 3.8937C1.23176 2.03018 2.61367 0.259112 4.50296 0.195417ZM4.61065 4.93425C5.51063 4.93425 6.24023 4.20463 6.24023 3.30467C6.24023 2.40471 5.51061 1.67509 4.61065 1.67509C3.71067 1.67509 2.98105 2.40471 2.98105 3.30467C2.98105 4.20463 3.71067 4.93425 4.61065 4.93425Z"
                                        fill="#DEC25F"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_161_2953">
                                        <rect
                                          width="8.7027"
                                          height="8.7027"
                                          fill="white"
                                          transform="matrix(-1 0 0 1 8.96387 0.193665)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                  {rental?.appartment?.location}
                                </p>
                                {/* <div className="app_card_heading d-flex justify-content-between">
                                  <p className="d-flex align-items-center gap-1">
                                    {
                                      rental?.appartment?.defaultSpecialDate
                                        ?.price
                                    }{" "}
                                    € <span>/ month</span>
                                  </p>
                                  <div className="d-flex gap-2">
                                    <button className="profile-btn">
                                      More
                                    </button>
                                  </div>
                                </div> */}
                                <div className="card-price-btn mt-3">
                                  <div className="card-price">
                                    <p>
                                      {rental?.appartment?.defaultSpecialDate
                                        ?.price} €{" "}
                                      <span>/ Month</span>
                                    </p>
                                  </div>
                                  <div className="profile_card-btn">
                                      <button>More +</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={`tab-pane fade show  ${
                        activeTab === "orders" && "active"
                      }`}
                      id="orders"
                      role="tabpanel"
                      aria-labelledby="ex3-tab-2"
                    >
                      <div className="container-fluid py-4">
                        <h3
                          className="mb-0 text-start"
                          style={{ color: "#000", paddingLeft: 10 }}
                        >
                          Invoices (1)
                        </h3>
                      </div>
                      <div className="_profile-table scrollable-container">
                        <section className="tables">
                          <div className="table__wrapper scrollable-container">
                            <table className="invoice_table">
                              <tbody
                                id="profile_orders_table"
                              >
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                                <tr
                                  onClick={() => {
                                    openModal();
                                  }}
                                >
                                  <td>
                                    <svg
                                      width="35"
                                      height="48"
                                      viewBox="0 0 48 48"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      style={{ paddingRight: 5 }}
                                    >
                                      <rect
                                        width="48"
                                        height="48"
                                        rx="12.1951"
                                        fill="#0DB254"
                                        fillOpacity="0.07"
                                      />
                                      <path
                                        d="M30.6427 26.4367C30.6427 26.8006 30.1821 27.123 29.4861 27.3031C29.1057 27.4062 28.6515 27.4641 28.1654 27.4641C27.682 27.4641 27.2278 27.4062 26.8479 27.3031C26.152 27.1225 25.6914 26.8038 25.6914 26.4367C25.6914 25.8698 26.7996 25.4087 28.166 25.4087C29.5345 25.4087 30.6427 25.8693 30.6427 26.4367Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6896 29.8134C29.2306 29.934 28.7041 29.9978 28.1654 29.9978C27.6289 29.9978 27.1035 29.934 26.6455 29.8139C26.2423 29.7077 25.9315 29.5712 25.6914 29.4219V29.9096C25.6914 30.4764 26.7996 30.9375 28.166 30.9375C29.535 30.9375 30.6437 30.4769 30.6437 29.9096V29.4219C30.4031 29.5712 30.0928 29.7072 29.6896 29.8134Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M24.8944 29.9095V28.1729V27.9875V26.2572L24.9076 26.2657C25.0431 25.2839 26.3436 24.6124 28.1653 24.6124C28.8894 24.6124 29.5311 24.7182 30.0507 24.9073V17.0931L28.3454 16.0625L26.6347 17.0931L24.9188 16.0625L23.2135 17.0931L21.5029 16.0625L19.7922 17.0931L18.071 16.0625L16.3604 17.0931V29.535C16.3604 30.3106 16.9872 30.9375 17.7629 30.9375H25.399C25.076 30.6522 24.8944 30.3032 24.8944 29.9095ZM25.6333 24.4934H19.2105C18.9465 24.4934 18.7324 24.2793 18.7324 24.0153C18.7324 23.7513 18.9465 23.5372 19.2105 23.5372H25.6333C25.8974 23.5372 26.1114 23.7513 26.1114 24.0153C26.1114 24.2793 25.8974 24.4934 25.6333 24.4934ZM19.21 20.6562H27.201C27.4651 20.6562 27.6792 20.8703 27.6792 21.1343C27.6792 21.3984 27.4651 21.6125 27.201 21.6125H19.21C18.9459 21.6125 18.7319 21.3984 18.7319 21.1343C18.7319 20.8703 18.9459 20.6562 19.21 20.6562ZM22.8065 27.3755H19.21C18.9459 27.3755 18.7319 27.1614 18.7319 26.8973C18.7319 26.6333 18.9459 26.4192 19.21 26.4192H22.8071C23.0711 26.4192 23.2852 26.6333 23.2852 26.8973C23.2852 27.1614 23.0706 27.3755 22.8065 27.3755Z"
                                        fill="#0DB254"
                                      />
                                      <path
                                        d="M29.6869 28.0744C29.2386 28.1955 28.71 28.2609 28.166 28.2609C27.6236 28.2609 27.096 28.1955 26.6402 28.0723C26.2397 27.9687 25.931 27.8343 25.6914 27.6866V28.1727C25.6914 28.5398 26.152 28.8591 26.8479 29.0424C27.2283 29.1422 27.6825 29.2001 28.1654 29.2001C28.6521 29.2001 29.1063 29.1422 29.4861 29.0424C30.1821 28.8585 30.6427 28.5366 30.6427 28.1727V27.6855C30.4025 27.8343 30.0912 27.9698 29.6869 28.0744Z"
                                        fill="#0DB254"
                                      />
                                    </svg>
                                    Invoice_n04
                                  </td>
                                  <td>Sidi Youssef</td>
                                  <td>800 €</td>
                                  <td>20 June 2019</td>
                                  <td>18 June 2018</td>
                                  <td className="d-flex gap-2">
                                    <div className="close-btn"></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Modal show={showModal} onHide={closeModal} size={"md"}>
        <div className="delete-form d-flex justify-content-center align-items-center flex-column">
          <svg
            width="50"
            height="74"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="37" cy="37" r="37" fill="#940000" />
            <path
              d="M38.6633 37.5L51.7344 50.5711L49.5711 52.7344L36.5 39.6633L23.4289 52.7344L21.2656 50.5711L34.3367 37.5L21.2656 24.4289L23.4289 22.2656L36.5 35.3367L49.5711 22.2656L51.7344 24.4289L38.6633 37.5Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_0_1"
                x1="28.6939"
                y1="9.06122"
                x2="54.3673"
                y2="74"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#940000" />
                <stop offset="1" stopColor="#FF0101" />
              </linearGradient>
            </defs>
          </svg>
          <br />
          <h3>Are you sure</h3>
          <br />
          <div className="customer-form-btn row d-flex justify-content-center gap-2">
            <button className="col">No</button>
            <button className="col" id="special-btn">
              yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
