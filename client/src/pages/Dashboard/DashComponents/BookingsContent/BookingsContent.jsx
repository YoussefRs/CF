import React, { useEffect } from "react";
import "./BookingContent.css";
import { useDispatch, useSelector } from "react-redux";
import {
  adminAcceptOrder,
  getAllBookings,
} from "../../../../redux/BookingSlice";

export default function BookingsContent() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const filteredBooking = bookings?.filter(
    (booking) => booking.state == "PENDING"
  );
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  const AcceptOrder = async (orderId) => {
    console.log(orderId);
    dispatch(adminAcceptOrder(orderId));
  };

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
                  class="bi fa-search"
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
            <div class="booking_inputs col-lg-4 col-md-4">
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
                <td>check in</td>
                <td>check out</td>
                <td>total price</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody className="table__body">
              {/* <tr>
                <td>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ paddingRight: 10 }}
                  >
                    <rect
                      width="40"
                      height="40"
                      rx="12.1951"
                      fill="white"
                      fillOpacity="0.08"
                    />
                    <g clipPath="url(#clip0_0_1)">
                      <path
                        d="M10.6665 10.6667V12.5334H11.5998V29.3334H18.1331V25.6H21.8665V29.3334H28.3998V12.5334H29.3331V10.6667H10.6665ZM16.2665 23.7334H14.3998V21.8667H16.2665V23.7334ZM16.2665 20H14.3998V18.1333H16.2665V20ZM16.2665 16.2667H14.3998V14.4H16.2665V16.2667ZM20.9332 23.7334H19.0665V21.8667H20.9332V23.7334ZM20.9332 20H19.0665V18.1333H20.9332V20ZM20.9332 16.2667H19.0665V14.4H20.9332V16.2667ZM25.5998 23.7334H23.7331V21.8667H25.5998V23.7334ZM25.5998 20H23.7331V18.1333H25.5998V20ZM25.5998 16.2667H23.7331V14.4H25.5998V16.2667Z"
                        fill="url(#paint0_linear_0_1)"
                      />
                    </g>
                    <defs>
                      <linearGradient
                        id="paint0_linear_0_1"
                        x1="13.3332"
                        y1="9.7778"
                        x2="31.9998"
                        y2="30.2222"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#0563A6" />
                        <stop offset="1" stopColor="#6ABCF7" />
                      </linearGradient>
                      <clipPath id="clip0_0_1">
                        <rect
                          width="18.6667"
                          height="18.6667"
                          fill="white"
                          transform="translate(10.6665 10.6667)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  0045
                </td>
                <td>Doggo Dogg</td>
                <td>Shiba Inu</td>
                <td>20 June 2019</td>
                <td className="d-flex gap-2">
                  <div className="close-btn"></div>
                  <div className="checkmark-btn"></div>
                </td>
              </tr> */}
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
                      {booking?.appartment?.apartmentName}
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
                  <td>{booking?.startDate}</td>
                  <td>{booking?.endDate}</td>
                  <td>{booking?.totalPrice} €</td>
                  <td className="d-flex gap-2">
                    <div className="close-btn"></div>
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
