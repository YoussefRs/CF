import React, { useEffect } from "react";
import "./BookingContent.css";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAcceptOrder,
  adminRejectOrder,
  getAllBookings,
} from "../../../../redux/BookingSlice";

export default function BookingsContent() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const filteredBooking = bookings?.filter(
    (booking) => booking.status == "Pending"
  );
  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const AcceptOrder = async (orderId) => {
    console.log(orderId);
    dispatch(adminAcceptOrder(orderId));
  };
  const DeclineOrder = async (orderId) => {
    console.log(orderId);
    dispatch(adminRejectOrder(orderId));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (+1 because months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}.${month}.${year}`;
  }

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
                    <span className="icon_box_span">
                      {booking?.name}
                    </span>
                  </td>
                  <td className="py-1 px-3">
                    <span className="icon_box_span">
                      {booking?.username}
                    </span>
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
                    <div className="close-btn" onClick={() =>DeclineOrder(booking.id)}></div>
                    <div
                      className="checkmark-btn"
                      onClick={() => AcceptOrder(booking.id)}
                    ></div>
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
