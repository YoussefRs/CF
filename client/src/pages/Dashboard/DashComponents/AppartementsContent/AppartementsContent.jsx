import React, { useEffect, useState } from "react";
import "./AppartementsContent.css";
import Modal from "../../../../components/modals/Modal";
import useAppartementsForm from "../../../../hooks/useApartmentForm";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteApartmentById,
  getAllApartments,
} from "../../../../redux/apartmentSlice";
import Cards from "../../../../components/cards/Cards";
import DashCard from "./DashCard";
import Loader from "../../../../components/Loader/Loader";
// import { apartmentList } from "../../../../Dummy/AppData";

export default function AppartementsContent() {
  const dispatch = useDispatch();
  const apartmentList = useSelector(
    (state) => state.apartments.apartments.apartments
  );
  const {
    oneAppartementData,
    formData,
    showModal,
    closeModal,
    openModal,
    inputRows,
    handleInputChange,
    handleAddRow,
    setFormData,
    handleCounterChange,
    handleSubmit,
    loadingAdd,
    handleKeyDown,
    handleRemoveRow,
  } = useAppartementsForm();

  const [selectedImages, setSelectedImages] = useState([]);

  const handleImagesChange = (event) => {
    const files = event.target.files;
    const filesArr = Array.from(files);
    const maxLength = parseInt(
      event.target.getAttribute("data-max_length"),
      10
    );

    const newSelectedImages = filesArr
      .filter((file) => file.type.match("image.*"))
      .slice(0, maxLength);

    setSelectedImages((prevSelectedImages) => [
      ...prevSelectedImages,
      ...newSelectedImages,
    ]);

    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: [...prevFormData.pictures, ...newSelectedImages],
    }));
  };

  const handleImageRemove = (fileName) => {
    setSelectedImages((prevSelectedImages) =>
      prevSelectedImages.filter((file) => file.name !== fileName)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: prevFormData.pictures.filter((file) => file.name !== fileName),
    }));
  };

  useEffect(() => {
    dispatch(getAllApartments());
  }, [dispatch]);

 const handleSpecialDateInputChange = (index, event) => {
   const { name, value } = event.target;
   const newSpecialDate = [...formData.specialDates];
   newSpecialDate[index] = { ...newSpecialDate[index], [name]: value };
   setFormData((prevFormData) => ({
     ...prevFormData,
     specialDates: newSpecialDate,
   }));
  };
  
  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="h3 mb-0 text-start">
          Appartements ({apartmentList?.length})
        </h1>
      </div>
      <ul className="app_cards scrollable-container">
        <div className="row w-100 mx-auto">
          <li className="app_cards_item app_cards_item_add col-xxl-4 col-lg-6 col-12 py-5 px-2">
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
          {apartmentList &&
            apartmentList?.map((app, i) => {
              return <DashCard card={app} key={i} />;
            })}
        </div>
      </ul>
      <Modal
        title="My Modal"
        show={showModal}
        onHide={closeModal}
        customClass={"add_apart_modal"}
      >
        <div className="add_form">
          {loadingAdd ? (
            <>
              <h1>adding new apparatement</h1>
              <Loader />
            </>
          ) : (
            <>
              <h1>add new apparatement</h1>
              <form className="form_container" onSubmit={handleSubmit}>
                <label htmlFor="apartmentName">apartment Name :</label>
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
                  <div>
                    <div className="price_row">
                      <div className="price_row_col">
                        <label htmlFor="price">price:</label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          placeholder="Price"
                          onKeyDown={handleKeyDown}
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    {inputRows.map((row, index) => (
                      <div className="added_price_row" key={index}>
                        <div
                          className="added_price_row_col"
                          style={{ paddingRight: 0 }}
                        >
                          <label htmlFor={`price-${index}`}>price:</label>
                          <input
                            type="number"
                            id={`price-${index}`}
                            name="price"
                            value={formData.specialDates.price}
                            onChange={(e) =>
                              handleSpecialDateInputChange(index, e)
                            }
                            placeholder="Price"
                            onKeyDown={handleKeyDown}
                            min="0"
                          />
                        </div>
                        <div
                          className="added_price_row_col"
                          style={{ paddingRight: 0 }}
                        >
                          <label htmlFor={`start_date-${index}`}>
                            start date:
                          </label>
                          <input
                            type="date"
                            id={`start_date-${index}`}
                            name="start_date"
                            value={formData.specialDates.start_date}
                            onChange={(e) =>
                              handleSpecialDateInputChange(index, e)
                            }
                            placeholder="Start date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div
                          className="added_price_row_col"
                          style={{ paddingRight: 0 }}
                        >
                          <label htmlFor={`end_date-${index}`}>end date:</label>
                          <input
                            type="date"
                            id={`end_date-${index}`}
                            name="end_date"
                            value={formData.specialDates.end_date}
                            onChange={(e) =>
                              handleSpecialDateInputChange(index, e)
                            }
                            placeholder="End date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div
                          className="rmv_btn"
                          onClick={() => handleRemoveRow(index)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M6 6.66562L1.97812 10.6875L1.3125 10.0219L5.33438 6L1.3125 1.97812L1.97812 1.3125L6 5.33438L10.0219 1.3125L10.6875 1.97813L6.66562 6L10.6875 10.0219L10.0219 10.6875L6 6.66562Z"
                              fill="#0DB254"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                    <div className="add_new_price d-flex align-items-center gap-2">
                      <span>Add new price </span>
                      <button
                        className="btn_add"
                        type="button"
                        onClick={handleAddRow}
                      >
                        <span>+</span>
                      </button>
                    </div>
                  </div>
                </div>

                <label htmlFor="last">location:</label>
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
                  <div className="col-6 col-md-4">
                    <label htmlFor="first">bedroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        type="button"
                        onClick={() => handleCounterChange("bedroom", -1)}
                        disabled={formData.bedroom === 1}
                      >
                        -
                      </button>
                      <span>{formData.bedroom}</span>
                      <span
                        className="plus"
                        type="button"
                        onClick={() => handleCounterChange("bedroom", 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-md-4">
                    <label htmlFor="first">bathroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        type="button"
                        onClick={() => handleCounterChange("bathroom", -1)}
                        disabled={formData.bathroom === 1}
                      >
                        -
                      </button>
                      <span>{formData.bathroom}</span>
                      <span
                        className="plus"
                        type="button"
                        onClick={() => handleCounterChange("bathroom", 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <label htmlFor="first">services:</label>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox"
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
                          setFormData({
                            ...formData,
                            parking: !formData.parking,
                          })
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
                          stroke="#0DB254"
                          rx="3"
                        />
                        <path
                          className="tick"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeWidth="4"
                          d="M4 10l5 5 9-9"
                        />
                      </svg>
                      <span className="checkbox__label">
                        <svg
                          viewBox="0 0 34 35"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_189_3766)">
                            <path d="M7.76363 7.11829H6.66895V9.30758H7.76363C8.36722 9.30758 8.8583 8.8165 8.8583 8.2129C8.8583 7.60931 8.36722 7.11829 7.76363 7.11829Z" />
                            <path d="M31.4808 29.5394C32.7522 29.0861 33.6701 27.8824 33.6701 26.4571V24.2679C33.6701 22.7449 32.6231 21.4726 31.2146 21.1028L29.734 16.6615C29.2865 15.3185 28.035 14.4159 26.619 14.4159H18.0983C16.6823 14.4159 15.4308 15.3184 14.9832 16.6612L13.5025 21.1027C12.0941 21.4725 11.0472 22.7448 11.0472 24.2678V26.4571C11.0472 27.8823 11.9651 29.086 13.2365 29.5393V30.8357C13.2365 31.2213 13.3156 31.5863 13.4382 31.9303H8.85783V17.9774C12.5652 17.4433 15.4258 14.2548 15.4258 10.4022V8.21292C15.4258 3.98782 11.9886 0.550293 7.76321 0.550293C3.53785 0.550293 0.100586 3.98782 0.100586 8.21292V10.4022C0.100586 14.2548 2.9612 17.4433 6.66853 17.9774V31.9305H1.19527C0.590949 31.9305 0.100586 32.4204 0.100586 33.0251C0.100586 33.6298 0.590949 34.1198 1.19527 34.1198H32.5755C33.1798 34.1198 33.6701 33.6298 33.6701 33.0251C33.6701 32.4204 33.1798 31.9304 32.5755 31.9304H31.2791C31.4017 31.5863 31.4808 31.2215 31.4808 30.8357V29.5394ZM6.66853 11.4969V12.5916C6.66853 13.1963 6.17817 13.6863 5.57385 13.6863C4.96954 13.6863 4.47917 13.1963 4.47917 12.5916V10.4023V6.02356C4.47917 5.41885 4.96954 4.92888 5.57385 4.92888H7.76315C9.574 4.92888 11.0471 6.402 11.0471 8.21285C11.0471 10.0237 9.574 11.4968 7.76315 11.4968H6.66853V11.4969ZM17.06 17.3536C17.2097 16.906 17.6266 16.6053 18.0984 16.6053H26.6191C27.0909 16.6053 27.5078 16.906 27.6575 17.354L28.8674 20.9839C24.8817 20.9839 19.9467 20.9839 15.8498 20.9839L17.06 17.3536ZM14.3311 27.5518C13.7275 27.5518 13.2364 27.0607 13.2364 26.4571V24.2679C13.2364 23.6643 13.7275 23.1732 14.3311 23.1732H15.7317L17.1913 27.5518H14.3311ZM19.6027 31.9305C19.7253 31.5864 19.8044 31.2215 19.8044 30.8358V29.7411H24.9128V30.8358C24.9128 31.2215 24.9919 31.5864 25.1144 31.9305H19.6027ZM30.3861 27.5518H27.526L28.9855 23.1732H30.3862C30.9898 23.1732 31.4808 23.6643 31.4808 24.2679V26.4571C31.4808 27.0607 30.9897 27.5518 30.3861 27.5518Z" />
                          </g>
                          <defs>
                            <clipPath id="clip0_189_3766">
                              <rect
                                width="33.5695"
                                height="33.5695"
                                fill="white"
                                transform="translate(0.100586 0.550293)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>parking</span>
                      </span>
                    </label>
                  </div>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_2"
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
                          stroke="#0DB254"
                          rx="3"
                        />
                        <path
                          className="tick"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeWidth="4"
                          d="M4 10l5 5 9-9"
                        />
                      </svg>
                      <span className="checkbox__label">
                        <svg
                          viewBox="0 0 33 34"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_43_907)">
                            <path d="M14.6259 27.9957L16.8503 30.2202L19.0747 27.9957H14.6259Z" />
                            <path d="M14.4039 12.9843H10.2348C5.69474 12.9843 1.97525 16.5651 1.75208 21.0507H22.8866C22.6634 16.5651 18.944 12.9843 14.4039 12.9843ZM8.93075 18.558H6.78216V16.6472H8.93075V18.558ZM13.3937 17.3969H11.2451V15.4861H13.3937V17.3969ZM17.8566 18.558H15.708V16.6472H17.8566V18.558Z" />
                            <path d="M17.5549 32.2177H20.5632C21.8502 32.2177 22.8972 31.1708 22.8972 29.8838V27.9957H21.7769L17.5549 32.2177Z" />
                            <path d="M1.74146 27.9957V29.8838C1.74146 31.1708 2.78843 32.2177 4.07539 32.2177H16.1455L11.9236 27.9957H1.74146Z" />
                            <path d="M25.4028 8.67251V3.32251H29.942V1.41174H23.4921V8.67251H16.1893V11.0735H32.7056V8.67251H25.4028Z" />
                            <path d="M24.8079 21.4776V21.5715C25.7951 22.1845 26.4541 23.2782 26.4541 24.5232C26.4541 25.7683 25.7951 26.8619 24.8079 27.475V29.8839C24.8079 30.7456 24.5492 31.5476 24.1062 32.2178H29.1165L30.9483 12.9843H20.4064C23.0676 14.8706 24.8079 17.9746 24.8079 21.4776Z" />
                            <path d="M22.9815 22.9615H1.65701C0.795828 22.9615 0.0952148 23.6621 0.0952148 24.5233C0.0952148 25.3845 0.795828 26.0851 1.65701 26.0851H22.9815C23.8427 26.0851 24.5433 25.3845 24.5433 24.5233C24.5433 23.6621 23.8427 22.9615 22.9815 22.9615Z" />
                          </g>
                          <defs>
                            <clipPath id="clip0_43_907">
                              <rect
                                width="32.6104"
                                height="32.6104"
                                fill="white"
                                transform="translate(0.0952148 0.509521)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <span>Food</span>
                      </span>
                    </label>
                  </div>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_3"
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
                          setFormData({
                            ...formData,
                            laundry: !formData.laundry,
                          })
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
                          stroke="#0DB254"
                          rx="3"
                        />
                        <path
                          className="tick"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeWidth="4"
                          d="M4 10l5 5 9-9"
                        />
                      </svg>
                      <span className="checkbox__label">
                        <svg
                          viewBox="0 0 30 30"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_189_3738"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                          >
                            <path
                              d="M0 3.8147e-06H30V30H0V3.8147e-06Z"
                              fill="white"
                            />
                          </mask>
                          <g mask="url(#mask0_189_3738)">
                            <path d="M20.2234 20.9895C20.5194 20.3019 20.6836 19.5448 20.6836 18.75C20.6836 17.9552 20.5194 17.1981 20.2234 16.5105C19.3195 16.8609 18.6914 17.7395 18.6914 18.75C18.6914 19.7604 19.3195 20.6391 20.2234 20.9895Z" />
                            <path d="M15 24.4336C16.7023 24.4336 18.2319 23.6812 19.2744 22.4917C17.8785 21.8126 16.9336 20.3802 16.9336 18.75C16.9336 17.1198 17.8785 15.6875 19.2744 15.0083C18.2319 13.8188 16.7023 13.0664 15 13.0664C11.8661 13.0664 9.31641 15.6161 9.31641 18.75C9.31641 21.8839 11.8661 24.4336 15 24.4336Z" />
                            <path d="M15 11.3086C17.7339 11.3086 20.1278 12.7908 21.4214 14.9937C21.4485 15.0329 21.4723 15.0746 21.4929 15.1184C22.0965 16.1933 22.4414 17.432 22.4414 18.75C22.4414 20.0694 22.0958 21.3094 21.491 22.3851C21.4712 22.4266 21.4487 22.4663 21.4229 22.5037C20.1297 24.708 17.735 26.1914 15 26.1914C10.8968 26.1914 7.55859 22.8532 7.55859 18.75C7.55859 14.6468 10.8968 11.3086 15 11.3086ZM3.33984 29.1211C3.33984 29.6065 3.73336 30 4.21875 30H25.7812C26.2666 30 26.6602 29.6065 26.6602 29.1211V9.31641H3.33984V29.1211Z" />
                            <path d="M21.5625 5.56641H18.2812C17.7959 5.56641 17.4023 5.17289 17.4023 4.6875C17.4023 4.20211 17.7959 3.80859 18.2812 3.80859H21.5625C22.0479 3.80859 22.4414 4.20211 22.4414 4.6875C22.4414 5.17289 22.0479 5.56641 21.5625 5.56641ZM11.7187 5.56395C11.2347 5.56395 10.8424 5.17154 10.8424 4.6875C10.8424 4.20346 11.2347 3.81105 11.7187 3.81105C12.2028 3.81105 12.5951 4.20346 12.5951 4.6875C12.5951 5.17154 12.2028 5.56395 11.7187 5.56395ZM7.96875 5.53898C7.49853 5.53898 7.11732 5.15777 7.11732 4.6875C7.11732 4.21723 7.49853 3.83602 7.96875 3.83602C8.43896 3.83602 8.82018 4.21723 8.82018 4.6875C8.82018 5.15777 8.43896 5.53898 7.96875 5.53898ZM24.9023 0H5.09766C4.1284 0 3.33984 0.788555 3.33984 1.75781V7.55859H26.6602V1.75781C26.6602 0.788555 25.8716 0 24.9023 0Z" />
                          </g>
                        </svg>
                        <span>Laundry</span>
                      </span>
                    </label>
                  </div>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_4"
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
                        <rect width="22" height="22" x=".5" y=".5" rx="3" />
                        <path
                          className="tick"
                          stroke="#fff"
                          fill="none"
                          strokeLinecap="round"
                          strokeWidth="4"
                          d="M4 10l5 5 9-9"
                        />
                      </svg>
                      <span className="checkbox__label">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
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

                <div className="mt-3">
                  <label htmlFor="pictures" className="mb-3">
                    Pictures:
                  </label>
                  <div className="row">
                    <div className="col">
                      <div className="upload__box">
                        <div className="upload__btn_box">
                          <div className="upload__icon">
                            <svg
                              viewBox="0 0 74 75"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect
                                width={74}
                                height="74.812"
                                rx="23.9782"
                                fill="#0DB254"
                                fillOpacity="0.15"
                              />
                              <path
                                d="M57.5938 52.25H53.1875V47.8438C53.1875 47.4542 53.0328 47.0806 52.7573 46.8052C52.4819 46.5297 52.1083 46.375 51.7188 46.375C51.3292 46.375 50.9556 46.5297 50.6802 46.8052C50.4047 47.0806 50.25 47.4542 50.25 47.8438V52.25H45.8438C45.4542 52.25 45.0806 52.4047 44.8052 52.6802C44.5297 52.9556 44.375 53.3292 44.375 53.7188C44.375 54.1083 44.5297 54.4819 44.8052 54.7573C45.0806 55.0328 45.4542 55.1875 45.8438 55.1875H50.25V59.5938C50.25 59.9833 50.4047 60.3569 50.6802 60.6323C50.9556 60.9078 51.3292 61.0625 51.7188 61.0625C52.1083 61.0625 52.4819 60.9078 52.7573 60.6323C53.0328 60.3569 53.1875 59.9833 53.1875 59.5938V55.1875H57.5938C57.9833 55.1875 58.3569 55.0328 58.6323 54.7573C58.9078 54.4819 59.0625 54.1083 59.0625 53.7188C59.0625 53.3292 58.9078 52.9556 58.6323 52.6802C58.3569 52.4047 57.9833 52.25 57.5938 52.25Z"
                                fill="#0DB254"
                              />
                              <path
                                d="M39.9688 52.25H22.3438C21.9542 52.25 21.5806 52.0953 21.3052 51.8198C21.0297 51.5444 20.875 51.1708 20.875 50.7812V24.3438C20.875 23.9542 21.0297 23.5806 21.3052 23.3052C21.5806 23.0297 21.9542 22.875 22.3438 22.875H48.7812C49.1708 22.875 49.5444 23.0297 49.8198 23.3052C50.0953 23.5806 50.25 23.9542 50.25 24.3438V41.9688C50.25 42.3583 50.4047 42.7319 50.6802 43.0073C50.9556 43.2828 51.3292 43.4375 51.7188 43.4375C52.1083 43.4375 52.4819 43.2828 52.7573 43.0073C53.0328 42.7319 53.1875 42.3583 53.1875 41.9688V24.3438C53.1875 23.1751 52.7233 22.0544 51.8969 21.2281C51.0706 20.4017 49.9499 19.9375 48.7812 19.9375H22.3438C21.1751 19.9375 20.0544 20.4017 19.2281 21.2281C18.4017 22.0544 17.9375 23.1751 17.9375 24.3438V50.7812C17.9375 51.9499 18.4017 53.0706 19.2281 53.8969C20.0544 54.7233 21.1751 55.1875 22.3438 55.1875H39.9688C40.3583 55.1875 40.7319 55.0328 41.0073 54.7573C41.2828 54.4819 41.4375 54.1083 41.4375 53.7188C41.4375 53.3292 41.2828 52.9556 41.0073 52.6802C40.7319 52.4047 40.3583 52.25 39.9688 52.25Z"
                                fill="#0DB254"
                              />
                              <path
                                d="M31.1562 33.1562C33.1842 33.1562 34.8281 31.5123 34.8281 29.4844C34.8281 27.4565 33.1842 25.8125 31.1562 25.8125C29.1283 25.8125 27.4844 27.4565 27.4844 29.4844C27.4844 31.5123 29.1283 33.1562 31.1562 33.1562Z"
                                fill="#0DB254"
                              />
                              <path
                                d="M25.7072 37.9884L23.8125 39.8978V49.3125H47.3125V39.8978L41.0116 33.5822C40.875 33.4445 40.7126 33.3352 40.5336 33.2607C40.3546 33.1861 40.1626 33.1477 39.9688 33.1477C39.7749 33.1477 39.5829 33.1861 39.4039 33.2607C39.2249 33.3352 39.0625 33.4445 38.9259 33.5822L31.1562 41.3665L27.7928 37.9884C27.6563 37.8507 27.4938 37.7415 27.3148 37.6669C27.1359 37.5923 26.9439 37.554 26.75 37.554C26.5561 37.554 26.3641 37.5923 26.1852 37.6669C26.0062 37.7415 25.8437 37.8507 25.7072 37.9884Z"
                                fill="#0DB254"
                              />
                            </svg>
                          </div>
                          <label className="upload__btn">
                            <p>Browse files</p>
                            <input
                              type="file"
                              multiple
                              data-max_length="20"
                              className="upload__inputfile"
                              onChange={handleImagesChange}
                              required
                            />
                          </label>
                        </div>
                        <div className="upload__img-wrap mt-4">
                          {selectedImages.map((image, index) => (
                            <div key={index} className="upload__img-box">
                              <img
                                src={URL.createObjectURL(image)}
                                className="img-fluid file_thumbnail"
                                alt={image.name}
                              />
                              <p>{image.name}</p>
                              <div
                                className="upload__img_close"
                                onClick={() => handleImageRemove(image.name)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M6 6.66562L1.97812 10.6875L1.3125 10.0219L5.33438 6L1.3125 1.97812L1.97812 1.3125L6 5.33438L10.0219 1.3125L10.6875 1.97813L6.66562 6L10.6875 10.0219L10.0219 10.6875L6 6.66562Z"
                                    fill="#0DB254"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <label className="mb-3">Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter description"
                    required
                  ></textarea>
                </div>

                <div className="wrap d-flex gap-2">
                  <button
                    type="submit"
                    id="add_cancel"
                    onClick={() => closeModal()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    // disabled={!submitEnabled}
                    // className={submitEnabled ? "enabled" : "disabled"}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
