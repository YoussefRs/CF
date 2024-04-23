import React, { useEffect, useState } from "react";
import "./AppartementsContent.css";
import Modal from "../../../../components/modals/Modal";
import useAppartementsForm from "../../../../hooks/useApartmentForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteApartmentById } from "../../../../redux/apartmentSlice";

export default function AppartementsContent() {
  const dispatch = useDispatch();
  const apartmentList = useSelector((state) => state.apartments.apartments);
  const {
    oneAppartementData,
    formData,
    showModal,
    editModal,
    closeModal,
    openModal,
    inputRows,
    handleInputChange,
    handleAddRow,
    setFormData,
    handleSpecialDateInputChange,
    handleCounterChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    openEditModal,
    closeEditModal,
    editApartment,
    handleEditInputChange,
    handleEditSpecialDateInputChange,
    deleteAppModal,
    handleEditSubmit,
    handleEditAddRow,
    OpenDeleteAppModal,
    handleEditCounterChange,
    closeDeleteAppModal,
    handleEditServiceChange,
    handleEditImageChange,
    handleEditRemoveImage,
  } = useAppartementsForm();

  console.log(editApartment);

  const convertDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="h3 mb-0 text-start">
          Appartements ({apartmentList?.length})
        </h1>
      </div>
      <ul className="app_cards scrollable-container">
        <li className="app_cards_item">
          <div className="add_app_card">
            <div
              className="add_app_card_content d-flex align-items-center justify-content-center flex-column gap-2"
              onClick={() => {
                openModal();
              }}
            >
              <span>add a new appartement</span>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="70"
                  height="70"
                  rx="20"
                  fill="white"
                  fillOpacity="0.08"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="69"
                  height="69"
                  rx="19.5"
                  stroke="white"
                  strokeOpacity="0.16"
                />
                <path
                  d="M35.0198 36.4046L35.0198 48.7281H32.9802L32.9802 36.4046L20.6567 36.4046L20.6567 34.365L32.9802 34.365L32.9802 22.0414H35.0198L35.0198 34.365L47.3433 34.365L47.3433 36.4046L35.0198 36.4046Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </li>
        {apartmentList.map((app, i) => {
          return (
            <li className="app_cards_item" key={i}>
              <div className="app_card">
                <div className="app_card_image">
                  <img src={app?.pictures[0]} />
                </div>

                <div className="app_card_content">
                  <div className="app_card_heading d-flex justify-content-between">
                    <span className="app_title">{app?.apartmentName}</span>
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
                    {app?.location}
                  </p>
                  <div className="app_card_heading d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-2">
                      <svg
                        width="38"
                        height="39"
                        viewBox="0 0 38 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.899567"
                          width="37.7821"
                          height="37.7821"
                          rx="13.4936"
                          fill="#0DB254"
                          fillOpacity="0.05"
                        />
                        <path
                          d="M30.1049 20.1561C30.2535 19.8913 30.332 19.5907 30.3326 19.2846V18.9534C30.3327 18.7245 30.2893 18.4977 30.2046 18.2862C30.12 18.0746 29.9958 17.8823 29.8392 17.7203L29.0675 16.9273V16.6702H31.2307L30.7036 12.3129H26.5881L26.061 16.6702H28.2242V16.9273L27.4525 17.7203C27.2959 17.8823 27.1718 18.0746 27.0871 18.2862C27.0025 18.4977 26.959 18.7245 26.9592 18.9534V19.2846C26.9597 19.5907 27.0382 19.8913 27.1869 20.1561H25.2725V27.5635H32.0193V20.1561H30.1049ZM29.4892 22.3347H27.8025V21.4633H29.4892V22.3347ZM29.4892 25.3848H27.8025V24.5134H29.4892V25.3848Z"
                          fill="#0DB254"
                        />
                        <path
                          d="M24.0074 20.2912C24.0087 19.9162 23.9345 19.5451 23.7893 19.2015C23.644 18.8579 23.4311 18.5493 23.164 18.2955V11.8772H22.3207V12.7487H9.67039V11.8772H8.82704V18.2955C8.56036 18.5497 8.34769 18.8583 8.20251 19.2018C8.05733 19.5453 7.98282 19.9163 7.98369 20.2912V21.0276H7.56201V27.5635H8.40536V24.5134H23.5857V27.5635H24.429V21.0276H24.0074V20.2912ZM10.5137 17.5417V16.2345C10.5137 15.8878 10.647 15.5553 10.8843 15.3102C11.1215 15.065 11.4433 14.9273 11.7788 14.9273H14.3088C14.6443 14.9273 14.9661 15.065 15.2033 15.3102C15.4406 15.5553 15.5738 15.8878 15.5738 16.2345V17.5417H10.5137ZM16.4172 16.2345C16.4172 15.8878 16.5505 15.5553 16.7877 15.3102C17.025 15.065 17.3467 14.9273 17.6822 14.9273H20.2123C20.5478 14.9273 20.8695 15.065 21.1068 15.3102C21.344 15.5553 21.4773 15.8878 21.4773 16.2345V17.5417H16.4172V16.2345ZM8.82704 20.2912C8.82965 20.0129 8.89278 19.7388 9.01176 19.4892C9.13073 19.2395 9.30251 19.0207 9.51437 18.8489C9.83012 18.5715 10.23 18.4173 10.6445 18.4132H21.3466C21.761 18.4173 22.1609 18.5715 22.4767 18.8489L22.5231 18.8881C22.722 19.06 22.8823 19.2745 22.993 19.5167C23.1036 19.759 23.162 20.0233 23.164 20.2912V21.0276H8.82704V20.2912Z"
                          fill="#0DB254"
                        />
                      </svg>
                      <div className="d-flex flex-column">
                        <span className="_medium_title">bedroom</span>
                        <span className="app_medium_title">
                          {app?.bedroom} rooms
                        </span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          width="24"
                          fill="#0db254"
                        >
                          <path d="M96 77.3c0-7.3 5.9-13.3 13.3-13.3c3.5 0 6.9 1.4 9.4 3.9l14.9 14.9C130 91.8 128 101.7 128 112c0 19.9 7.2 38 19.2 52c-5.3 9.2-4 21.1 3.8 29c9.4 9.4 24.6 9.4 33.9 0L289 89c9.4-9.4 9.4-24.6 0-33.9c-7.9-7.9-19.8-9.1-29-3.8C246 39.2 227.9 32 208 32c-10.3 0-20.2 2-29.2 5.5L163.9 22.6C149.4 8.1 129.7 0 109.3 0C66.6 0 32 34.6 32 77.3V256c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H96V77.3zM32 352v16c0 28.4 12.4 54 32 71.6V480c0 17.7 14.3 32 32 32s32-14.3 32-32V464H384v16c0 17.7 14.3 32 32 32s32-14.3 32-32V439.6c19.6-17.6 32-43.1 32-71.6V352H32z" />
                        </svg>
                        <div className="d-flex flex-column">
                          <span className="_medium_title">bathroom</span>
                          <span className="app_medium_title">
                            {app?.bathroom} rooms
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app_card_heading d-flex justify-content-between">
                    <p className="d-flex align-items-center gap-1">
                      {app?.defaultDateAndPrice?.price} € <span>/ month</span>
                    </p>
                    <div className="d-flex gap-2">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(app)}
                      >
                        <svg
                          width="25"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.9632 1.07832C20.5253 -0.35944 18.1941 -0.35944 16.7562 1.07832L2.15936 15.6739C2.05933 15.7739 1.9871 15.8979 1.94939 16.034L0.0298562 22.9634C-0.0490855 23.2475 0.0311345 23.5517 0.239515 23.7604C0.448215 23.9687 0.752476 24.0489 1.0366 23.9703L7.96653 22.0507C8.10268 22.0129 8.22669 21.9407 8.32672 21.8407L22.9233 7.24481C24.3589 5.80609 24.3589 3.47704 22.9233 2.03832L21.9632 1.07832ZM3.9421 16.2057L15.8885 4.26L19.7413 8.11245L7.79459 20.0581L3.9421 16.2057ZM3.1725 17.7498L6.25059 20.828L1.99285 22.0075L3.1725 17.7498ZM21.7663 6.08796L20.8986 6.9556L17.0455 3.10282L17.9135 2.23518C18.7122 1.43656 20.0072 1.43656 20.8059 2.23518L21.7663 3.19518C22.5637 3.99475 22.5637 5.2887 21.7663 6.08796Z"
                            fill="white"
                          />
                        </svg>
                      </button>
                      <div
                        className="close-btn"
                        onClick={() => OpenDeleteAppModal(app)}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <Modal title="My Modal" show={showModal} onHide={closeModal} size="lg">
        <div className="add_form">
          <h1>add new apparatement</h1>
          <form className="form_container">
            <label for="apartmentName">apartment Name :</label>
            <input
              type="text"
              id="apartmentName"
              name="apartmentName"
              value={formData.apartmentName}
              onChange={handleInputChange}
              placeholder="Enter Apartment Name"
              required
            />

            <div className="row">
              {/* <div className="col-3" style={{ paddingRight: 0 }}>
                <label for="price">price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  // required
                />
              </div>
              <div className="col-4" style={{ paddingRight: 0 }}>
                <label for="startDate">start date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  placeholder="Start date"
                  // required
                />
              </div>
              <div className="col-4" style={{ paddingRight: 0 }}>
                <label for="endDate">end date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  placeholder="End date"
                  // required
                />
              </div> */}
              <div>
                <div className="row">
                  <div className="col-4">
                    <label for="defaultDateAndPrice.price">price:</label>
                    <input
                      type="number"
                      id="price"
                      name="defaultDateAndPrice.price"
                      value={formData.defaultDateAndPrice.price}
                      onChange={handleInputChange}
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="col-4" style={{ paddingRight: 0 }}>
                    <label for="defaultDateAndPrice.startDate">
                      start date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="defaultDateAndPrice.startDate"
                      value={formData.defaultDateAndPrice.startDate}
                      onChange={handleInputChange}
                      placeholder="Start date"
                      required
                    />
                  </div>
                  <div className="col-4" style={{ paddingRight: 0 }}>
                    <label for="defaultDateAndPrice.endDate">end date:</label>
                    <input
                      type="date"
                      id="endDate"
                      name="defaultDateAndPrice.endDate"
                      value={formData.defaultDateAndPrice.endDate}
                      onChange={handleInputChange}
                      placeholder="End date"
                      required
                    />
                  </div>
                </div>
                {inputRows.map((row, index) => (
                  <div className="row" key={index}>
                    <div className="col-3" style={{ paddingRight: 0 }}>
                      <label htmlFor={`price-${index}`}>price:</label>
                      <input
                        type="number"
                        id={`price-${index}`}
                        name="price"
                        value={formData.specialDate.price}
                        onChange={(e) => handleSpecialDateInputChange(index, e)}
                        placeholder="Price"
                      />
                    </div>
                    <div className="col-4" style={{ paddingRight: 0 }}>
                      <label htmlFor={`startDate-${index}`}>start date:</label>
                      <input
                        type="date"
                        id={`startDate-${index}`}
                        name="startDate"
                        value={formData.specialDate.startDate}
                        onChange={(e) => handleSpecialDateInputChange(index, e)}
                        placeholder="Start date"
                      />
                    </div>
                    <div className="col-4" style={{ paddingRight: 0 }}>
                      <label htmlFor={`endDate-${index}`}>end date:</label>
                      <input
                        type="date"
                        id={`endDate-${index}`}
                        name="endDate"
                        value={formData.specialDate.endDate}
                        onChange={(e) => handleSpecialDateInputChange(index, e)}
                        placeholder="End date"
                      />
                    </div>
                  </div>
                ))}
                <div className="add_new_price d-flex align-items-center gap-2">
                  <span>Add new price </span>
                  <button className="btn_add" onClick={handleAddRow}>
                    <span>+</span>
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="row">
              <div className="col-4">
                <label for="first">add new price:</label>
                <input
                  type="number"
                  id="newPrice"
                  name="newPrice"
                  placeholder="Enter new price"
                  value={formData.newPrice}
                  onChange={handleInputChange}
                  // required
                />
              </div>
            </div> */}

            <label for="last">location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Enter location"
              required
            />

            <div className="row">
              <div className="col-6 col-md-3">
                <label for="first">bedroom:</label>
                <div className="_modal_counter border">
                  <button
                    className="minus"
                    onClick={() => handleCounterChange("bedroom", -1)}
                    disabled={formData.bedroom === 0}
                  >
                    -
                  </button>
                  <span>{formData.bedroom}</span>
                  <span
                    className="plus"
                    onClick={() => handleCounterChange("bedroom", 1)}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <label for="first">bathroom:</label>
                <div className="_modal_counter border">
                  <button
                    className="minus"
                    onClick={() => handleCounterChange("bathroom", -1)}
                    disabled={formData.bathroom === 0}
                  >
                    -
                  </button>
                  <span>{formData.bathroom}</span>
                  <span
                    className="plus"
                    onClick={() => handleCounterChange("bathroom", 1)}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <label for="first">services:</label>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox"
                  className={`checkbox ${
                    formData.parking ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox"
                    checked={formData.parking}
                    onChange={() =>
                      setFormData({ ...formData, parking: !formData.parking })
                    }
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    style={{ marginRight: 10 }}
                  >
                    <rect
                      width="22"
                      height="22"
                      x=".5"
                      y=".5"
                      fill="#0DB254"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      fill="currentColor"
                      class="bi bi-p-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                    </svg>
                    <span>parking</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_2"
                  className={`checkbox ${
                    formData.food ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_2"
                    checked={formData.food}
                    onChange={() =>
                      setFormData({ ...formData, food: !formData.food })
                    }
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    style={{ marginRight: 10 }}
                  >
                    <rect
                      width="22"
                      height="22"
                      x=".5"
                      y=".5"
                      fill="#0DB254"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <path
                        d="M36.4,98.1a16.3,16.3,0,0,1-3.2-13.5C40.5,49.5,80.4,24,128,24s87.5,25.5,94.8,60.6A16,16,0,0,1,207.2,104H48.8A16.2,16.2,0,0,1,36.4,98.1ZM225,152.6l-20.1,8h0L188,167.4l-37-14.8a7.8,7.8,0,0,0-6,0l-37,14.8L71,152.6a7.8,7.8,0,0,0-6,0l-20.1,8h0l-19.9,8A8,8,0,0,0,28,184a8,8,0,0,0,3-.6l9-3.6V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V173.4l15-6a8,8,0,0,0-6-14.8Zm7-32.6H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Z"
                        fill="#adadad"
                      ></path>
                    </svg>
                    <span>Food</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_3"
                  className={`checkbox ${
                    formData.laundry ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_3"
                    checked={formData.laundry}
                    onChange={() =>
                      setFormData({ ...formData, laundry: !formData.laundry })
                    }
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    style={{ marginRight: 10 }}
                  >
                    <rect
                      width="22"
                      height="22"
                      x=".5"
                      y=".5"
                      fill="#0DB254"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M20.9999 3.99999L21 20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H18.9999C20.1045 2 20.9999 2.89543 20.9999 3.99999Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M18 5.01L18.01 4.99889"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 19C15.3137 19 18 16.3137 18 13C18 9.68629 15.3137 7 12 7C8.68629 7 6 9.68629 6 13C6 16.3137 8.68629 19 12 19Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 16C10.3431 16 9 14.6569 9 13"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                    <span>Laundry</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_4"
                  className={`checkbox ${
                    formData.rent ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_4"
                    checked={formData.rent}
                    onChange={() =>
                      setFormData({ ...formData, rent: !formData.rent })
                    }
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    style={{ marginRight: 10 }}
                  >
                    <rect
                      width="22"
                      height="22"
                      x=".5"
                      y=".5"
                      fill="#0DB254"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-car-front"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                    </svg>
                    <span>Rent</span>
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="pictures">Pictures:</label>
              <div className="row">
                <div className="col">
                  <div className="form-group ">
                    <label>Choose Images</label>
                    <input
                      type="file"
                      id="pictures"
                      className="form-control"
                      multiple
                      onChange={handleImageChange}
                      // required
                    />
                  </div>
                  <div
                    className={`img-thumbs ${
                      formData.pictures.length > 0 ? "" : "img-thumbs-hidden"
                    }`}
                    id="img-preview"
                  >
                    {formData.pictures.map((image, id) => (
                      <div key={id} className="wrapper-thumb">
                        <img
                          src={image}
                          alt="Preview"
                          className="img-preview-thumb"
                        />
                        <div
                          className="remove-btn"
                          onClick={() => handleRemoveImage(id)}
                        >
                          x
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                // required
              ></textarea>
            </div>

            <div className="wrap d-flex gap-2">
              <button
                type="submit"
                id="add_cancel"
                onclick="solve()"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
              <button type="submit" onclick="solve()" onSubmit={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        title="My Modal"
        show={editModal}
        onHide={closeEditModal}
        size="lg"
      >
        <div className="add_form">
          <h1>edit apparatement</h1>
          <form
            action=""
            onSubmit={() => handleEditSubmit(event, editApartment.id)}
            className="form_container"
          >
            <label for="apartmentName">apartment Name :</label>
            <input
              type="text"
              id="apartmentName"
              name="apartmentName"
              value={editApartment?.apartmentName}
              onChange={handleEditInputChange}
              placeholder="Enter Apartment Name"
              required
            />

            <div className="row">
              <div>
                <div className="row">
                  <div className="col-3" style={{ paddingRight: 0 }}>
                    <label for="defaultDateAndPrice.price">price:</label>
                    <input
                      type="number"
                      id="price"
                      name="defaultDateAndPrice.price"
                      value={editApartment?.defaultDateAndPrice.price}
                      onChange={handleEditInputChange}
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="col-4" style={{ paddingRight: 0 }}>
                    <label for="defaultDateAndPrice.startDate">
                      start date:
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="defaultDateAndPrice.startDate"
                      value={convertDateString(
                        editApartment?.defaultDateAndPrice.startDate
                      )}
                      onChange={handleEditInputChange}
                      placeholder="Start date"
                      required
                    />
                  </div>
                  <div className="col-4" style={{ paddingRight: 0 }}>
                    <label for="defaultDateAndPrice.endDate">end date:</label>
                    <input
                      type="date"
                      id="endDate"
                      name="defaultDateAndPrice.endDate"
                      value={convertDateString(
                        editApartment?.defaultDateAndPrice.endDate
                      )}
                      onChange={handleEditInputChange}
                      placeholder="End date"
                      required
                    />
                  </div>
                </div>
                {editApartment?.specialDate.map((row, index) => (
                  <div className="row" key={index}>
                    <div className="col-3" style={{ paddingRight: 0 }}>
                      <label htmlFor={`price-${index}`}>price:</label>
                      <input
                        type="number"
                        id={`price-${index}`}
                        name="price"
                        value={row?.price}
                        onChange={(e) =>
                          handleEditSpecialDateInputChange(index, e)
                        }
                        placeholder="Price"
                      />
                    </div>
                    <div className="col-4" style={{ paddingRight: 0 }}>
                      <label htmlFor={`startDate-${index}`}>start date:</label>
                      <input
                        type="date"
                        id={`startDate-${index}`}
                        name="startDate"
                        value={convertDateString(row?.startDate)}
                        onChange={(e) =>
                          handleEditSpecialDateInputChange(index, e)
                        }
                        placeholder="Start date"
                      />
                    </div>
                    <div className="col-4" style={{ paddingRight: 0 }}>
                      <label htmlFor={`endDate-${index}`}>end date:</label>
                      <input
                        type="date"
                        id={`endDate-${index}`}
                        name="endDate"
                        value={convertDateString(row?.endDate)}
                        onChange={(e) =>
                          handleEditSpecialDateInputChange(index, e)
                        }
                        placeholder="End date"
                      />
                    </div>
                  </div>
                ))}

                <button type="button" onClick={handleEditAddRow}>
                  Add Row
                </button>
              </div>
            </div>

            <label for="last">location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={editApartment?.location}
              onChange={handleEditInputChange}
              placeholder="Enter location"
              required
            />

            <div className="row">
              <div className="col-6 col-md-3">
                <label for="first">bedroom:</label>
                <div className="_modal_counter border">
                  <button
                    className="minus"
                    onClick={() => handleEditCounterChange("bedroom", -1)}
                    disabled={editApartment?.bedroom === 0}
                  >
                    -
                  </button>
                  <span>{editApartment?.bedroom}</span>
                  <span
                    className="plus"
                    onClick={() => handleEditCounterChange("bedroom", 1)}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <label for="first">bathroom:</label>
                <div className="_modal_counter border">
                  <button
                    className="minus"
                    onClick={() => handleEditCounterChange("bathroom", -1)}
                    disabled={editApartment?.bathroom === 0}
                  >
                    -
                  </button>
                  <span>{editApartment?.bathroom}</span>
                  <span
                    className="plus"
                    onClick={() => handleEditCounterChange("bathroom", 1)}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <label for="first">services:</label>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox"
                  className={`checkbox ${
                    editApartment?.parking ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox"
                    checked={editApartment?.parking}
                    onChange={() => handleEditServiceChange("parking")}
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                  >
                    <rect
                      width="21"
                      height="21"
                      x=".5"
                      y=".5"
                      fill="#FFF"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#0DB254"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="21"
                      fill="currentColor"
                      class="bi bi-p-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                    </svg>
                    <span>parking</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_2"
                  className={`checkbox ${
                    editApartment?.food ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_2"
                    checked={editApartment?.food}
                    onChange={() => handleEditServiceChange("food")}
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                  >
                    <rect
                      width="21"
                      height="21"
                      x=".5"
                      y=".5"
                      fill="#FFF"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#0DB254"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 256"
                    >
                      <rect width="256" height="256" fill="none"></rect>
                      <path
                        d="M36.4,98.1a16.3,16.3,0,0,1-3.2-13.5C40.5,49.5,80.4,24,128,24s87.5,25.5,94.8,60.6A16,16,0,0,1,207.2,104H48.8A16.2,16.2,0,0,1,36.4,98.1ZM225,152.6l-20.1,8h0L188,167.4l-37-14.8a7.8,7.8,0,0,0-6,0l-37,14.8L71,152.6a7.8,7.8,0,0,0-6,0l-20.1,8h0l-19.9,8A8,8,0,0,0,28,184a8,8,0,0,0,3-.6l9-3.6V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V173.4l15-6a8,8,0,0,0-6-14.8Zm7-32.6H24a8,8,0,0,0,0,16H232a8,8,0,0,0,0-16Z"
                        fill="#adadad"
                      ></path>
                    </svg>
                    <span>Food</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_3"
                  className={`checkbox ${
                    editApartment?.laundry ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_3"
                    checked={editApartment?.laundry}
                    onChange={() => handleEditServiceChange("laundry")}
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                  >
                    <rect
                      width="21"
                      height="21"
                      x=".5"
                      y=".5"
                      fill="#FFF"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#0DB254"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      width="24"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {" "}
                      <path
                        d="M20.9999 3.99999L21 20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H18.9999C20.1045 2 20.9999 2.89543 20.9999 3.99999Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M18 5.01L18.01 4.99889"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 19C15.3137 19 18 16.3137 18 13C18 9.68629 15.3137 7 12 7C8.68629 7 6 9.68629 6 13C6 16.3137 8.68629 19 12 19Z"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                      <path
                        d="M12 16C10.3431 16 9 14.6569 9 13"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />{" "}
                    </svg>
                    <span>Laundry</span>
                  </span>
                </label>
              </div>
              <div className="__services col-4 col-md-3">
                <label
                  for="myCheckbox_4"
                  className={`checkbox ${
                    editApartment?.rent ? "service_selected" : ""
                  }`}
                >
                  <input
                    className="checkbox__input"
                    type="checkbox"
                    id="myCheckbox_4"
                    checked={editApartment?.rent}
                    onChange={() => handleEditServiceChange("rent")}
                  />
                  <svg
                    className="checkbox__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                  >
                    <rect
                      width="21"
                      height="21"
                      x=".5"
                      y=".5"
                      fill="#FFF"
                      stroke="#0DB254"
                      rx="3"
                    />
                    <path
                      className="tick"
                      stroke="#0DB254"
                      fill="none"
                      stroke-linecap="round"
                      strokeWidth="4"
                      d="M4 10l5 5 9-9"
                    />
                  </svg>
                  <span className="checkbox__label">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-car-front"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                      <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                    </svg>
                    <span>Rent</span>
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="pictures">Pictures:</label>
              <div className="row">
                <div className="col">
                  <div className="form-group ">
                    <label>Choose Images</label>
                    <input
                      type="file"
                      id="pictures"
                      className="form-control"
                      multiple
                      onChange={handleEditImageChange}
                      // required
                    />
                  </div>
                  <div
                    className={`img-thumbs ${
                      editApartment?.pictures.length > 0
                        ? ""
                        : "img-thumbs-hidden"
                    }`}
                    id="img-preview"
                  >
                    {editApartment?.pictures.map((image, id) => (
                      <div key={id} className="wrapper-thumb">
                        <img
                          src={image}
                          alt="Preview"
                          className="img-preview-thumb"
                        />
                        <div
                          className="remove-btn"
                          onClick={() => handleEditRemoveImage(id)}
                        >
                          x
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                name="description"
                value={editApartment?.description}
                onChange={handleEditInputChange}
                placeholder="Enter description"
                // required
              ></textarea>
            </div>

            <div className="wrap">
              <button type="submit" onclick="solve()">
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        title="My Modal"
        show={deleteAppModal}
        onHide={closeDeleteAppModal}
        size="md"
      >
        {" "}
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
            <button className="col" onClick={() => closeModal()}>
              No
            </button>
            <button
              className="col"
              id="special-btn"
              onClick={() => {
                dispatch(deleteApartmentById(oneAppartementData.id)),
                  closeDeleteAppModal();
              }}
            >
              yes
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
