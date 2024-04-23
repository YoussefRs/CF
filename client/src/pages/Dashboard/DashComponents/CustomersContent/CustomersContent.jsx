import React, { useEffect, useState } from "react";
import "./CustomersContent.css";
import Modal from "../../../../components/modals/Modal";
import { useModal } from "../../../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/usersSlice";

export default function CustomersContent() {
  const { showModal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="h3 mb-0 text-start">Customers</h1>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="row">
            <div className="col-lg-8 booking_inputs" id="search">
              <span className="fa-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  class="bi fa-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input placeholder="Search term" />
            </div>
            <div className="col-lg-4  booking_inputs">
              <input type="date" />
            </div>
          </div>
        </div>
      </div>
      <section className="tables scrollable-container">
        <div className="table__wrapper scrollable-container">
          <table className="customers_table">
            <thead className="table__header">
              <tr>
                <td>name</td>
                <td>email</td>
                <td>Phone Num.</td>
                <td>Account</td>
              </tr>
            </thead>
            <tbody className="table__body">
              {allUsers &&
                allUsers.map((user, i) => (
                  <tr key={i}>
                    <td>
                      <svg
                        width="40"
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
                          fill="white"
                          fillOpacity="0.08"
                        />
                        <path
                          d="M24 9C20.93 9 18.4184 11.5379 18.4184 14.6375C18.4184 17.7371 20.9311 20.275 24 20.275C27.0689 20.275 29.5816 17.7359 29.5816 14.6375C29.5827 11.5379 27.0689 9 24 9ZM11 33.8538C10.9977 34.4885 11.5064 35.0023 12.1349 35H35.8651C36.4936 35.0023 37.0023 34.4874 37 33.8538C37 27.6032 32.664 22.3573 26.853 21.0433C26.4268 20.9428 25.9815 21.1004 25.7091 21.4474L24.1153 23.5036L22.5306 21.4132C22.3237 21.1346 22.0004 20.9679 21.5347 20.9714C15.4727 22.1986 11 27.5096 11 33.8538Z"
                          fill="#0DB254"
                        />
                      </svg>
                      {user?.name}
                    </td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td className="d-flex align-items-center gap-2">
                      <div className="customer_slider">
                        <input
                          type="checkbox"
                          name="slider"
                          className="slider-checkbox"
                          id="sliderSwitch"
                        />
                        <label className="slider-label" for="sliderSwitch">
                          <span className="slider-inner"></span>
                          <span className="slider-circle"></span>
                        </label>
                      </div>
                      <div
                        className="close-btn"
                        onClick={() => {
                          openModal();
                        }}
                      ></div>

                      <Modal
                        title="My Modal"
                        show={showModal}
                        onHide={closeModal}
                        size="md"
                      >
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
                            <button
                              className="col"
                              onClick={() => closeModal()}
                            >
                              No
                            </button>
                            <button className="col" id="special-btn">
                              yes
                            </button>
                          </div>
                        </div>
                      </Modal>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
