import React, { useEffect, useState } from "react";
import "./AppartementsContent.css";
import Modal from "../../../../components/modals/Modal";
import useAppartementsForm from "../../../../hooks/useApartmentForm";
import { useSelector, useDispatch } from "react-redux";
import { deleteApartmentById } from "../../../../redux/apartmentSlice";
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
    handleSpecialDateInputChange,
    handleCounterChange,
    handleSubmit,
    loadingAdd,
  } = useAppartementsForm();

  const [submitEnabled, setSubmitEnabled] = useState(false);
  // console.log(formData)
  const [imgArray, setImgArray] = useState([]);

  const handleImagesChange = (event) => {
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
        selectedImages.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          const html = `<div class='upload__img-box'><div style='background-image: url(${e.target.result})' data-file='${file.name}' class='img-bg'><div class='upload__img-close'></div></div></div>`;
          document
            .querySelector(".upload__img-wrap")
            .insertAdjacentHTML("beforeend", html);
        };
        reader.readAsDataURL(file);
      }
    });

    // Update formData state with selected images
    setFormData((prevFormData) => ({
      ...prevFormData,
      pictures: [...prevFormData.pictures, ...selectedImages],
    }));
  };

  useEffect(() => {
    const handleImageRemove = (event) => {
      if (event.target.classList.contains("upload__img-close")) {
        const file = event.target.parentNode.getAttribute("data-file");
        const updatedImgArray = imgArray.filter((img) => img.name !== file);
        setImgArray(updatedImgArray);
        event.target.parentNode.parentNode.remove();
      }
    };

    document.body.addEventListener("click", handleImageRemove);

    return () => {
      document.body.removeEventListener("click", handleImageRemove);
    };
  }, [imgArray]);

  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="h3 mb-0 text-start">
          Appartements ({apartmentList?.length})
        </h1>
      </div>
      <ul className="app_cards scrollable-container">
        <div className="row w-100 mx-auto">
          <li className="app_cards_item col py-5 px-2">
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
      <Modal title="My Modal" show={showModal} onHide={closeModal} size="lg">
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
                    <div className="row">
                      <div className="col-4">
                        <label htmlFor="defaultSpecialDate.price">price:</label>
                        <input
                          type="number"
                          id="price"
                          name="defaultSpecialDate.price"
                          value={formData.defaultSpecialDate.price}
                          onChange={handleInputChange}
                          placeholder="Price"
                          required
                        />
                      </div>
                      <div className="col-4" style={{ paddingRight: 0 }}>
                        <label htmlFor="defaultSpecialDate.startDate">
                          start date:
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="defaultSpecialDate.startDate"
                          value={formData.defaultSpecialDate.startDate}
                          onChange={handleInputChange}
                          placeholder="Start date"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                      <div className="col-4" style={{ paddingRight: 0 }}>
                        <label htmlFor="defaultSpecialDate.endDate">
                          end date:
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="defaultSpecialDate.endDate"
                          value={formData.defaultSpecialDate.endDate}
                          onChange={handleInputChange}
                          placeholder="End date"
                          min={new Date().toISOString().split("T")[0]}
                          required
                        />
                      </div>
                    </div>
                    {inputRows.map((row, index) => (
                      <div className="row" key={index}>
                        <div className="col-4" style={{ paddingRight: 0 }}>
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
                          />
                        </div>
                        <div className="col-4" style={{ paddingRight: 0 }}>
                          <label htmlFor={`startDate-${index}`}>
                            start date:
                          </label>
                          <input
                            type="date"
                            id={`startDate-${index}`}
                            name="startDate"
                            value={formData.specialDates.startDate}
                            onChange={(e) =>
                              handleSpecialDateInputChange(index, e)
                            }
                            placeholder="Start date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>
                        <div className="col-4" style={{ paddingRight: 0 }}>
                          <label htmlFor={`endDate-${index}`}>end date:</label>
                          <input
                            type="date"
                            id={`endDate-${index}`}
                            name="endDate"
                            value={formData.specialDates.endDate}
                            onChange={(e) =>
                              handleSpecialDateInputChange(index, e)
                            }
                            placeholder="End date"
                            min={new Date().toISOString().split("T")[0]}
                          />
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
                  <div className="col-6 col-md-3">
                    <label htmlFor="first">bedroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        type="button"
                        onClick={() => handleCounterChange("bedroom", -1)}
                        disabled={formData.bedroom === 0}
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
                  <div className="col-6 col-md-3">
                    <label htmlFor="first">bathroom:</label>
                    <div className="_modal_counter border">
                      <button
                        className="minus"
                        type="button"
                        onClick={() => handleCounterChange("bathroom", -1)}
                        disabled={formData.bathroom === 0}
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
                  <div className="__services col-4 col-md-3">
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
                          fill="#0DB254"
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
                          fill="#0DB254"
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
                              onChange={handleImagesChange}
                              required
                            />
                          </label>
                        </div>
                        <div className="upload__img-wrap"></div>
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
