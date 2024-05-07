import React, { useEffect, useState } from "react";
import "./DashCard.css";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../../../components/modals/Modal";
import useAppartementsForm from "../../../../hooks/useApartmentForm";
import { useDispatch } from "react-redux";
import {
  deleteApartmentById,
  getAllApartments,
} from "../../../../redux/apartmentSlice";
import Loader from "../../../../components/Loader/Loader";

function DashCard({ app, card }) {
  const dispatch = useDispatch();
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
    setEditApartment,
    handleSpecialDateInputChange,
    handleCounterChange,
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
    loadingEdit,
    handleEditRemoveImage,
    handleKeyDown,
    handleRemoveExistingRow,
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

    setEditApartment((prevCard) => ({
      ...prevCard,
      images: [...prevCard.images, ...newSelectedImages.map((file) => file)],
    }));
  };

  const RemoveEditImages = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);

    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      images: updatedImages,
    }));
  };
  const convertDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setSelectedImages(card.images)
  }, []);

  return (
    <div className="col-xxl-4 col-lg-6 col-12 px-sm-2 py-5 px-0 ">
      <div className="material-card" href="/some-article">
        {/* <Link to={`/details/${card.id}`} state={{ card }}> */}
        {/* <img className="card-picture" src={card?.images[0]?.image_url} alt="Apartment" /> */}
        {
          <img
            id="dash_card_img"
            className="card-picture"
            src={card?.images[0]?.image_url}
            alt="Apartment"
          />
        }
        {/* </Link> */}
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
            </>
          </div>
          <div className="card-specs py-2">
            <div className="row">
              <div className="col d-flex">
                <div className="col-4 py-2">
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
                </div>
                <div className="col d-flex flex-column ">
                  <span>Bedroom</span>
                  <p>{card?.bedroom} Rooms</p>
                </div>
              </div>
              <div className="col d-flex">
                <div className="col-4 py-2">
                  <svg
                    width="39"
                    height="39"
                    viewBox="0 0 39 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.927734"
                      y="0.899567"
                      width="37.7821"
                      height="37.7821"
                      rx="13.4936"
                      fill="#0DB254"
                      fillOpacity="0.05"
                    />
                    <g clipPath="url(#clip0_0_1)">
                      <path
                        d="M22.4049 14.8603C22.27 14.8603 22.1351 14.8088 22.0322 14.7059L21.7511 14.4248C21.5453 14.2189 21.5453 13.8852 21.7511 13.6793C21.9569 13.4735 22.2907 13.4735 22.4965 13.6793L22.7777 13.9605C23.1107 14.2935 22.8702 14.8603 22.4049 14.8603Z"
                        fill="#0DB254"
                      />
                      <path
                        d="M20.1559 15.1414C20.021 15.1414 19.8861 15.09 19.7832 14.987L19.5021 14.7059C19.2963 14.5 19.2963 14.1663 19.5021 13.9605C19.7079 13.7546 20.0417 13.7546 20.2475 13.9605L20.5286 14.2416C20.8617 14.5746 20.6212 15.1414 20.1559 15.1414Z"
                        fill="#0DB254"
                      />
                      <path
                        d="M22.4049 17.1092C22.27 17.1092 22.1351 17.0578 22.0322 16.9548L21.7511 16.6737C21.5453 16.4679 21.5453 16.1341 21.7511 15.9283C21.9569 15.7224 22.2907 15.7224 22.4965 15.9283L22.7777 16.2094C23.1107 16.5425 22.8702 17.1092 22.4049 17.1092Z"
                        fill="#0DB254"
                      />
                      <path
                        d="M29.1868 19.3581H12.2495C11.9584 19.3581 11.7224 19.1221 11.7224 18.831C11.7224 18.5399 11.9584 18.3039 12.2495 18.3039H12.882V11.7133C12.882 10.3893 13.9532 9.31595 15.279 9.31595C15.8328 9.31595 16.3729 9.50953 16.8 9.85987L17.131 10.1315C17.8718 9.69549 18.843 9.79508 19.4784 10.4304L20.2735 11.2255C20.4793 11.4314 20.4793 11.7651 20.2735 11.971L18.2857 13.9588C18.0799 14.1646 17.7461 14.1647 17.5403 13.9588C16.6962 13.1147 16.7486 13.1637 16.7451 13.1637C16.1325 12.551 16.018 11.626 16.4015 10.8966L16.1313 10.6749C15.8933 10.4797 15.5927 10.3714 15.2849 10.3702C14.5647 10.3637 13.9362 10.9492 13.9362 11.7133V18.3039C14.4762 18.3039 28.6518 18.3039 29.1868 18.3039C29.4779 18.3039 29.7139 18.5399 29.7139 18.831C29.7139 19.1221 29.4779 19.3581 29.1868 19.3581Z"
                        fill="#0DB254"
                      />
                      <path
                        d="M28.2754 20.4123L28.0508 21.6474C27.7166 23.4857 26.3526 24.9133 24.6186 25.3799V26.1401C24.6186 26.4312 24.3826 26.6672 24.0915 26.6672C23.8004 26.6672 23.5644 26.4312 23.5644 26.1401V25.5391C23.3999 25.5453 18.0174 25.5446 17.8718 25.5391V26.1401C17.8718 26.4312 17.6358 26.6672 17.3447 26.6672C17.0536 26.6672 16.8176 26.4312 16.8176 26.1401V25.3799C15.0837 24.9133 13.7196 23.4857 13.3854 21.6475L13.1609 20.4124H28.2754V20.4123Z"
                        fill="#0DB254"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_1">
                        <rect
                          width="17.9915"
                          height="17.9915"
                          fill="white"
                          transform="matrix(-1 0 0 1 29.7139 8.99576)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="col d-flex flex-column ">
                  <span>Bathroom</span>
                  <p>{card?.bathroom} Rooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-price-btn">
          <div className="card-price">
            <p>
              {card?.price} € <span>/ Month</span>
            </p>
          </div>
          <div className="d-flex px-4 gap-2">
            <button className="edit-btn" onClick={() => openEditModal(card)}>
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
              onClick={() => OpenDeleteAppModal(card)}
            ></div>
          </div>
        </div>
      </div>

      <Modal
        title="My Modal"
        show={editModal}
        onHide={closeEditModal}
        size="lg"
        customClass={"add_apart_modal"}
      >
        <div className="add_form">
          {loadingEdit ? (
            <>
              <h1>editing apparatement ...</h1>
              <Loader />
            </>
          ) : (
            <>
              <h1>edit apparatement</h1>
              <form
                action=""
                onSubmit={() => handleEditSubmit(event, editApartment.id)}
                className="form_container"
              >
                <label htmlFor="name">apartment Name :</label>
                <input
                  type="text"
                  id="apartmentName"
                  name="name"
                  value={editApartment?.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter Apartment Name"
                  // required
                />

                <div className="row">
                  <div>
                    <div className="row">
                      <div
                        className="price_row_col"
                        style={{ paddingRight: 0 }}
                      >
                        <label htmlFor="default_special_date.price">
                          price:
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={editApartment?.price}
                          onChange={handleEditInputChange}
                          placeholder="Price"
                          onKeyDown={handleKeyDown}
                          min="0"
                          // required
                        />
                      </div>
                    </div>
                    {editApartment?.prices.map((row, index) => (
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
                            value={row?.price}
                            onChange={(e) =>
                              handleEditSpecialDateInputChange(index, e)
                            }
                            onKeyDown={handleKeyDown}
                            min="0"
                            placeholder="Price"
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
                            value={convertDateString(row?.start_date)}
                            onChange={(e) =>
                              handleEditSpecialDateInputChange(index, e)
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
                            value={convertDateString(row?.end_date)}
                            onChange={(e) =>
                              handleEditSpecialDateInputChange(index, e)
                            }
                            placeholder="End date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div
                          className="rmv_btn"
                          onClick={() => handleRemoveExistingRow(index)}
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
                        onClick={handleEditAddRow}
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
                  value={editApartment?.location}
                  onChange={handleEditInputChange}
                  placeholder="Enter location"
                  // required
                />

                <div className="row">
                  <div className="col-6 col-md-3">
                    <label htmlFor="first">bedroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        onClick={() => handleEditCounterChange("bedroom", -1)}
                        disabled={editApartment?.bedroom === 1}
                        type="button"
                      >
                        -
                      </button>
                      <span>{editApartment?.bedroom}</span>
                      <span
                        className="plus"
                        type="button"
                        onClick={() => handleEditCounterChange("bedroom", 1)}
                      >
                        +
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <label htmlFor="first">bathroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        type="button"
                        onClick={() => handleEditCounterChange("bathroom", -1)}
                        disabled={editApartment?.bathroom === 1}
                      >
                        -
                      </button>
                      <span>{editApartment?.bathroom}</span>
                      <span
                        className="plus"
                        type="button"
                        onClick={() => handleEditCounterChange("bathroom", 1)}
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
                        editApartment?.parking ? "service_selected" : ""
                      }`}
                    >
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        id="myCheckbox"
                        checked={editApartment?.parking}
                        onChange={() =>
                          setEditApartment({
                            ...editApartment,
                            parking: !editApartment?.parking,
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
                        editApartment?.food ? "service_selected" : ""
                      }`}
                    >
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        id="myCheckbox_2"
                        checked={editApartment?.food}
                        onChange={() =>
                          setEditApartment({
                            ...editApartment,
                            food: !editApartment?.food,
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
                        editApartment?.laundry ? "service_selected" : ""
                      }`}
                    >
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        id="myCheckbox_3"
                        checked={editApartment?.laundry}
                        onChange={() =>
                          setEditApartment({
                            ...editApartment,
                            laundry: !editApartment.laundry,
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
                        editApartment?.rent ? "service_selected" : ""
                      }`}
                    >
                      <input
                        className="checkbox__input"
                        type="checkbox"
                        id="myCheckbox_4"
                        checked={editApartment?.rent}
                        onChange={() =>
                          setEditApartment({
                            ...editApartment,
                            rent: !editApartment?.rent,
                          })
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

                {/* <div className="row">
                  <label htmlFor="first">services:</label>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox"
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
                          strokeLinecap="round"
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
                          className="bi bi-p-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                        </svg>
                        <span>parking</span>
                      </span>
                    </label>
                  </div>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_2"
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
                          strokeLinecap="round"
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
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_3"
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
                          strokeLinecap="round"
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
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M18 5.01L18.01 4.99889"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M12 19C15.3137 19 18 16.3137 18 13C18 9.68629 15.3137 7 12 7C8.68629 7 6 9.68629 6 13C6 16.3137 8.68629 19 12 19Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M12 16C10.3431 16 9 14.6569 9 13"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </svg>
                        <span>Laundry</span>
                      </span>
                    </label>
                  </div>
                  <div className="__services col-sm-4 col-6 col-md-3">
                    <label
                      htmlFor="myCheckbox_4"
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
                          strokeLinecap="round"
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
                </div> */}
                {/* <div>
                  <label htmlFor="pictures">Pictures:</label>
                  <div className="row">
                    <div className="col">
                      <div className="upload__box">
                        <div className="upload__btn-box">
                          <label className="upload__btn">
                            <p>Upload images</p>
                            <input
                              type="file"
                              multiple
                              data-max_length="20"
                              className="upload__inputfile"
                              onChange={handleEditImagesChange}
                              required
                            />
                          </label>
                        </div>
                        <div className="upload__img-wrap">
                          {editApartment?.images?.map((image, index) => (
                            <div key={index} className="upload__img-box">
                              <div
                                style={{
                                  backgroundImage: `url(${image.image_url})`,
                                }}
                                className="img-bg"
                              >
                                <div
                                  className="upload__img-close"
                                  onClick={() => handleEditRemoveImage(index)}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
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
                        {selectedImages?.map((item, index) => (
  <div key={index} className="upload__img-box">
    <img
      src={
        typeof item === "string" 
          ? item
          : item.image_url 
          ? item.image_url 
          : item instanceof File 
          ? URL.createObjectURL(item) 
          : null 
      }
      className="img-fluid file_thumbnail"
      alt={item.name || `Image ${index + 1}`} 
    />
    <p>{item.name}</p>
    <div
      className="upload__img_close"
      onClick={() => RemoveEditImages(index)}
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
                  <button
                    type="submit"
                    onClick={(event) =>
                      handleEditSubmit(event, editApartment.id)
                    }
                  >
                    Submit
                  </button>
                </div>
              </form>
            </>
          )}
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
                  closeDeleteAppModal(),
                  dispatch(getAllApartments());
              }}
            >
              yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DashCard;
