import React from "react";
import "./DashCard.css";
import { useModal } from "../../../../hooks/useModal";
import Modal from "../../../../components/modals/Modal";
import useAppartementsForm from "../../../../hooks/useApartmentForm";
import { useDispatch } from "react-redux";
import { deleteApartmentById } from "../../../../redux/apartmentSlice";
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
    handleRemoveImage,
    handleEditRemoveImage
  } = useAppartementsForm();

  const convertDateString = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
  const handleEditImagesChange = (event) => {
    const files = event.target.files;
    const filesArr = Array.from(files);
    const maxLength = parseInt(
      event.target.getAttribute("data-max_length"),
      10
    );

    const selectedImages = [];

    filesArr.forEach((file) => {
      if (!file.type.match("image.*")) {
        return;
      }

      if (selectedImages.length >= maxLength) {
        return false;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const html = `<div class='upload__img-box'><div style='background-image: url(${e.target.result})' data-file='${file.name}' class='img-bg'><div class='upload__img-close'></div></div></div>`;
          document
            .querySelector(".upload__img-wrap")
            .insertAdjacentHTML("beforeend", html);
        };
        reader.readAsDataURL(file);

        selectedImages.push({
          id: null,
          apartment_id: editApartment.id,
          file: file,
        });
      }
    });

    // Filter out existing images from the newly selected images
    const newImages = selectedImages.filter((newImage) => !newImage.id);
    // Update editApartment state with only the newly selected images
    setEditApartment((prevEditApartment) => ({
      ...prevEditApartment,
      images: [...prevEditApartment.images, ...newImages],
    }));
  };

  // const handleDeleteImage = (index) => {
  //   // Remove the image at the specified index from the editApartment state
  //   setEditApartment((prevEditApartment) => {
  //     const updatedImages = [...prevEditApartment.images];
  //     updatedImages.splice(index, 1); // Remove the image at the specified index
  //     return {
  //       ...prevEditApartment,
  //       images: updatedImages,
  //     };
  //   });
  // };

  console.log(editApartment)

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
                      <div className="col-4" style={{ paddingRight: 0 }}>
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
                          // required
                        />
                      </div>
                      <div className="col-4" style={{ paddingRight: 0 }}>
                        <label htmlFor="startDate">
                          start date:
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={convertDateString(editApartment?.startDate)}
                          onChange={handleEditInputChange}
                          placeholder="Start date"
                          min={new Date().toISOString().split("T")[0]}
                          // required
                        />
                      </div>
                      <div className="col-4" style={{ paddingRight: 0 }}>
                        <label htmlFor="endDate">
                          end date:
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={convertDateString(editApartment?.endDate)}
                          onChange={handleEditInputChange}
                          placeholder="End date"
                          min={new Date().toISOString().split("T")[0]}
                          // required
                        />
                      </div>
                    </div>
                    {editApartment?.prices.map((row, index) => (
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
                        <div className="col-4" style={{ paddingRight: 0 }}>
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
                        <div className="col-1 d-flex align-items-center">
                          <button
                            type="button"
                            className="btn_add"
                            style={{ marginTop: 25 }}
                            // onClick={() => handleRemoveRow(index)}
                          >
                            x
                          </button>
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
                        disabled={editApartment?.bedroom === 0}
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
                        disabled={editApartment?.bathroom === 0}
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
                  <div className="__services col-4 col-md-3">
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
                  <div className="__services col-4 col-md-3">
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
                  <div className="__services col-4 col-md-3">
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
                  <div className="__services col-4 col-md-3">
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
                </div>
                <div>
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
                  closeDeleteAppModal();
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
