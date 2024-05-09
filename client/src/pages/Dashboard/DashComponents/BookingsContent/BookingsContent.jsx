import React, { useEffect, useState } from "react";
import "./BookingContent.css";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAcceptOrder,
  adminRejectOrder,
  getAllBookings,
} from "../../../../redux/BookingSlice";
import ReusableModal from "../../../../components/modals/Modal";

export default function BookingsContent() {
  const dispatch = useDispatch();
  const [bookingModal, setBookingModal] = useState();
  const [clickedBooking, setClickedBooking] = useState();
  const bookings = useSelector((state) => state.bookings.bookings);
  const filteredBooking = bookings?.filter(
    (booking) => booking.status == "Pending"
  );
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const AcceptOrder = async (orderId) => {
    dispatch(adminAcceptOrder(orderId));
  };
  const DeclineOrder = async (orderId) => {
    dispatch(adminRejectOrder(orderId));
  };
  const openBookingModal = (booking) => {
    setBookingModal(true);
    setClickedBooking(booking);
  };

  const onClose = () => {
    setBookingModal(false);
  };

  console.log(bookings)

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}.${month}.${year}`;
  }

  console.log(clickedBooking)

  return (
    <>
      <div className="container-fluid py-4">
        <h1 className="h3 mb-0 text-start">
          Bookings ({filteredBooking?.length || 0}){" "}
        </h1>
      </div>
      <div className="row">
        <div className="col-lg-12 mb-4">
          <div className="row">
            <div className="col-lg-8 col-md-8 mb-2 booking_inputs" id="search">
              <span className="fa-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="#fff"
                  className="bi fa-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </span>
              <input placeholder="Search term" />
            </div>
            {/* <div className="col-lg-4  booking_inputs enchilada">
              <input type="date" className="date enchilada"/>
            </div> */}
            <div className="booking_inputs col-lg-4 col-md-4">
              <input type="date" id="input_date" />
            </div>
          </div>
        </div>
      </div>
      <section className="tables scrollable-container">
        <div className="table__wrapper scrollable-container">
          <table className="booking_table">
            <thead className="table__header">
              <tr>
                <td>apartements</td>
                <td>username</td>
                <td>check in</td>
                <td>check out</td>
                <td>total price</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody className="table__body">
              {filteredBooking?.map((booking, i) => (
                <tr key={i}>
                  <td className="py-1 px-3 d-flex align-items-center gap-2">
                    <div className="icon_box_">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="25"
                        height="20"
                        fill="#0563A6"
                      >
                        <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                      </svg>
                    </div>
                    <span className="icon_box_span">{booking?.name}</span>
                  </td>
                  <td className="py-1 px-3">
                    <span className="icon_box_span">{booking?.username}</span>
                  </td>
                  {/* <td className="row d-flex gap-2">
                    <div className="col-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="15"
                        height="15"
                        fill="#0563A6"
                      >
                        <path d="M48 0C21.5 0 0 21.5 0 48V464c0 26.5 21.5 48 48 48h96V432c0-26.5 21.5-48 48-48s48 21.5 48 48v80h96c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H48zM64 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240zm112-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V240zM80 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V112zM272 96h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16z" />
                      </svg>
                    </div>
                    <div className="col d-flex align-items-center">
                      <span>{booking?.appartment?.apartmentName}</span>
                    </div>
                  </td> */}
                  <td>{formatDate(booking?.startDate)}</td>
                  <td>{formatDate(booking?.endDate)}</td>
                  <td>{booking?.totalPrice} €</td>
                  <td className="d-flex gap-2">
                    <div
                      className="view-btn"
                      onClick={() => openBookingModal(booking)}
                    >
                      {" "}
                      <svg
                        width="31"
                        height="31"
                        viewBox="0 0 31 31"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30.2514 15.1023C30.1841 15.0271 28.5727 13.2404 25.9554 11.4325C21.9711 8.68032 18.172 7.67353 15.2833 7.75312C11.1353 7.81971 7.43424 9.78124 5.04367 11.4325C2.42643 13.2404 0.815028 15.0271 0.747722 15.1023C0.54503 15.3287 0.54503 15.6712 0.747722 15.8977C0.815028 15.9728 2.42643 17.7595 5.04367 19.5674C8.12447 21.6954 11.7857 23.25 15.4996 23.25C19.2138 23.25 22.8752 21.6951 25.9555 19.5674C28.5727 17.7596 30.1841 15.9728 30.2515 15.8977C30.4541 15.6713 30.4541 15.3286 30.2514 15.1023ZM22.0573 15.5C22.0573 19.0541 19.2153 21.9567 15.6845 22.0549C15.4358 22.0587 15.5634 22.0587 15.3151 22.0549C11.7841 21.9568 8.94192 19.0542 8.94192 15.5C8.94192 11.8866 11.8814 8.94227 15.4996 8.94227C19.1125 8.94227 22.0573 11.8812 22.0573 15.5ZM2.01699 15.4997C4.13095 13.3679 6.98349 11.3074 9.93827 10.1083C7.01783 13.1198 7.02182 17.8839 9.93803 20.8913C7.01497 19.705 4.16756 17.6669 2.01699 15.4997ZM21.0611 20.8915C23.9814 17.88 23.9775 13.116 21.0612 10.1086C23.9838 11.2947 26.8312 13.3327 28.9822 15.5002C26.8681 17.6322 24.0158 19.6924 21.0611 20.8915Z"
                          fill="black"
                        />
                        <path
                          d="M12.5186 15.5C12.5186 17.1436 13.8557 18.4808 15.4993 18.4808C17.1429 18.4808 18.4801 17.1436 18.4801 15.5C18.4801 13.8564 17.1429 12.5192 15.4993 12.5192C13.8557 12.5192 12.5186 13.8564 12.5186 15.5ZM17.2878 15.5C17.2878 16.4862 16.4855 17.2885 15.4993 17.2885C14.5132 17.2885 13.7109 16.4862 13.7109 15.5C13.7109 14.5138 14.5132 13.7115 15.4993 13.7115C16.4855 13.7115 17.2878 14.5138 17.2878 15.5Z"
                          fill="black"
                        />
                        <path
                          d="M15.4995 24.4423C15.1703 24.4423 14.9033 24.7092 14.9033 25.0384V26.8269C14.9033 27.1561 15.1702 27.423 15.4995 27.423C15.8287 27.423 16.0956 27.1561 16.0956 26.8269V25.0384C16.0956 24.7092 15.8287 24.4423 15.4995 24.4423Z"
                          fill="black"
                        />
                        <path
                          d="M8.52023 23.4246L7.32792 24.6169C7.09512 24.8497 7.09512 25.2272 7.32792 25.46C7.56078 25.6928 7.9382 25.6928 8.17106 25.46L9.36337 24.2677C9.59617 24.0349 9.59617 23.6575 9.36337 23.4246C9.13057 23.1918 8.75302 23.1918 8.52023 23.4246Z"
                          fill="black"
                        />
                        <path
                          d="M12.1192 24.0905C11.8104 23.9762 11.4675 24.1337 11.3532 24.4425L10.7677 26.0237C10.6534 26.3325 10.811 26.6755 11.1198 26.7898C11.4273 26.9037 11.7711 26.7478 11.8858 26.4378L12.4713 24.8566C12.5857 24.5478 12.428 24.2048 12.1192 24.0905Z"
                          fill="black"
                        />
                        <path
                          d="M21.883 23.4246C21.6501 23.1919 21.2728 23.1919 21.0398 23.4246C20.807 23.6574 20.807 24.0349 21.0398 24.2678L22.2321 25.4601C22.4651 25.6929 22.8424 25.6928 23.0753 25.4601C23.3081 25.2273 23.3081 24.8498 23.0753 24.6169L21.883 23.4246Z"
                          fill="black"
                        />
                        <path
                          d="M18.956 24.2906C18.7578 24.0277 18.384 23.9753 18.1211 24.1735C17.8582 24.3717 17.8058 24.7455 18.004 25.0084L19.1963 26.5896C19.3948 26.853 19.7687 26.9047 20.0312 26.7067C20.2941 26.5085 20.3465 26.1347 20.1483 25.8718L18.956 24.2906Z"
                          fill="black"
                        />
                        <path
                          d="M15.4995 6.55767C15.8287 6.55767 16.0956 6.29078 16.0956 5.96152V4.17306C16.0956 3.8438 15.8287 3.5769 15.4995 3.5769C15.1703 3.5769 14.9033 3.8438 14.9033 4.17306V5.96152C14.9033 6.29078 15.1703 6.55767 15.4995 6.55767Z"
                          fill="black"
                        />
                        <path
                          d="M22.4787 7.57536L23.671 6.38305C23.9038 6.15025 23.9038 5.77277 23.671 5.53991C23.4381 5.30717 23.0608 5.30717 22.8278 5.53991L21.6355 6.73222C21.4027 6.96502 21.4027 7.3425 21.6355 7.57536C21.8685 7.80822 22.2458 7.80816 22.4787 7.57536Z"
                          fill="black"
                        />
                        <path
                          d="M19.0869 6.94679C19.3292 6.94679 19.557 6.79793 19.6461 6.55744L20.2315 4.9762C20.3458 4.66745 20.1882 4.32443 19.8794 4.21015C19.5708 4.09586 19.2277 4.25349 19.1134 4.56223L18.5279 6.14347C18.3827 6.53556 18.6758 6.94679 19.0869 6.94679Z"
                          fill="black"
                        />
                        <path
                          d="M9.11691 7.57536C9.34976 7.80816 9.72719 7.8081 9.96005 7.57536C10.1928 7.34256 10.1928 6.96508 9.96005 6.73222L8.76774 5.53991C8.53494 5.30717 8.15746 5.30717 7.9246 5.53991C7.6918 5.77271 7.6918 6.15019 7.9246 6.38305L9.11691 7.57536Z"
                          fill="black"
                        />
                        <path
                          d="M12.043 6.7094C12.2411 6.97225 12.6149 7.02477 12.8779 6.82649C13.1408 6.62826 13.1932 6.25448 12.995 5.99157L11.8027 4.41033C11.6044 4.14743 11.2306 4.09497 10.9677 4.29325C10.7048 4.49147 10.6524 4.86526 10.8507 5.12816L12.043 6.7094Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                    <div
                      className="close-btn"
                      onClick={() => DeclineOrder(booking.id)}
                    ></div>
                    <div
                      className="checkmark-btn"
                      onClick={() => {
                        AcceptOrder(booking.id);
                        dispatch(getAllBookings());
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReusableModal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={bookingModal}
          onHide={onClose}
        >
          <div className="d-flex flex-column">
            <h6>
              Appartement :{" "}
              <span className="fw-normal">{clickedBooking?.name}</span>
            </h6>
            <h6>
              User Name :{" "}
              <span className="fw-normal">{clickedBooking?.username}</span>
            </h6>
            <h6>
              User Email :{" "}
              <span className="fw-normal">{clickedBooking?.userEmail}</span>
            </h6>
            <h6>
              Check In :{" "}
              <span className="fw-normal">{clickedBooking?.startDate}</span>
            </h6>
            <h6>
              Check Out :{" "}
              <span className="fw-normal">{clickedBooking?.endDate}</span>
            </h6>
            <h6>
              Normal Days :{" "}
              <span className="fw-normal">
                {clickedBooking?.normalNightsCount} *{" "}
                {clickedBooking?.normalNightsPrice}€
              </span>
            </h6>
            <h6>
              Special Days :{" "}
              <span className="fw-normal">
                {clickedBooking?.specialNightsCount} *{" "}
                {clickedBooking?.specialNightsPrice}€
              </span>
            </h6>
            {clickedBooking?.details?.services &&
            clickedBooking.details?.services.some(
              (service) => service.name !== null
            ) ? (
              <div className="d-flex">
                <h6 className="mb-0">Services:</h6>
                {clickedBooking.details?.services.map(
                  (service, i) =>
                    service.name !== null && (
                      <div key={i} className="">
                        <p className="px-2">{service.name}</p>
                        <p className="px-2">{service.price}€</p>
                      </div>
                    )
                )}
              </div>
            ) : null}
            <h6>
              Total Price :{" "}
              <span className="fw-normal">{clickedBooking?.totalPrice}€</span>
            </h6>
          </div>
        </ReusableModal>
      </section>
    </>
  );
}
