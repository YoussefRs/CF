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

  console.table(filteredBooking);
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

  console.log(bookings);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (+1 because months are zero-based) and pad with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}.${month}.${year}`;
  }

  console.log(clickedBooking);

  function formatPrice(priceString) {
    const price = parseFloat(priceString);
    const formattedPrice =
      price % 1 === 0 ? price.toFixed(0) : price.toFixed(2);
    return formattedPrice;
  }

  const totalServicePrice = clickedBooking?.details?.services?.reduce(
    (total, service) => {
      // Parse the price string to a floating-point number
      const price = parseFloat(service.price);

      // Add the price of the current service to the total
      return total + price;
    },
    0
  );

  const serviceIcons = [
    {
      name: "parking",
      icon: (
        <svg viewBox="0 0 34 35" xmlns="http://www.w3.org/2000/svg">
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
      ),
    },
    {
      name: "food",
      icon: (
        <svg viewBox="0 0 33 34" xmlns="http://www.w3.org/2000/svg">
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
      ),
    },
    {
      name: "laundry",
      icon: (
        <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_189_3738" maskUnits="userSpaceOnUse" x="0" y="0">
            <path d="M0 3.8147e-06H30V30H0V3.8147e-06Z" fill="white" />
          </mask>
          <g mask="url(#mask0_189_3738)">
            <path d="M20.2234 20.9895C20.5194 20.3019 20.6836 19.5448 20.6836 18.75C20.6836 17.9552 20.5194 17.1981 20.2234 16.5105C19.3195 16.8609 18.6914 17.7395 18.6914 18.75C18.6914 19.7604 19.3195 20.6391 20.2234 20.9895Z" />
            <path d="M15 24.4336C16.7023 24.4336 18.2319 23.6812 19.2744 22.4917C17.8785 21.8126 16.9336 20.3802 16.9336 18.75C16.9336 17.1198 17.8785 15.6875 19.2744 15.0083C18.2319 13.8188 16.7023 13.0664 15 13.0664C11.8661 13.0664 9.31641 15.6161 9.31641 18.75C9.31641 21.8839 11.8661 24.4336 15 24.4336Z" />
            <path d="M15 11.3086C17.7339 11.3086 20.1278 12.7908 21.4214 14.9937C21.4485 15.0329 21.4723 15.0746 21.4929 15.1184C22.0965 16.1933 22.4414 17.432 22.4414 18.75C22.4414 20.0694 22.0958 21.3094 21.491 22.3851C21.4712 22.4266 21.4487 22.4663 21.4229 22.5037C20.1297 24.708 17.735 26.1914 15 26.1914C10.8968 26.1914 7.55859 22.8532 7.55859 18.75C7.55859 14.6468 10.8968 11.3086 15 11.3086ZM3.33984 29.1211C3.33984 29.6065 3.73336 30 4.21875 30H25.7812C26.2666 30 26.6602 29.6065 26.6602 29.1211V9.31641H3.33984V29.1211Z" />
            <path d="M21.5625 5.56641H18.2812C17.7959 5.56641 17.4023 5.17289 17.4023 4.6875C17.4023 4.20211 17.7959 3.80859 18.2812 3.80859H21.5625C22.0479 3.80859 22.4414 4.20211 22.4414 4.6875C22.4414 5.17289 22.0479 5.56641 21.5625 5.56641ZM11.7187 5.56395C11.2347 5.56395 10.8424 5.17154 10.8424 4.6875C10.8424 4.20346 11.2347 3.81105 11.7187 3.81105C12.2028 3.81105 12.5951 4.20346 12.5951 4.6875C12.5951 5.17154 12.2028 5.56395 11.7187 5.56395ZM7.96875 5.53898C7.49853 5.53898 7.11732 5.15777 7.11732 4.6875C7.11732 4.21723 7.49853 3.83602 7.96875 3.83602C8.43896 3.83602 8.82018 4.21723 8.82018 4.6875C8.82018 5.15777 8.43896 5.53898 7.96875 5.53898ZM24.9023 0H5.09766C4.1284 0 3.33984 0.788555 3.33984 1.75781V7.55859H26.6602V1.75781C26.6602 0.788555 25.8716 0 24.9023 0Z" />
          </g>
        </svg>
      ),
    },
    {
      name: "rent",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-car-front"
          viewBox="0 0 16 16"
        >
          <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
          <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
        </svg>
      ),
    },
  ];

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
                        // console.log(booking.id)
                      }}
                    ></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReusableModal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={bookingModal}
          onHide={onClose}
          customClass={"booking_details_modal"}
        >
          <div className="booking_details_box">
            <p className="apart_name">{clickedBooking?.name}</p>
            <div className="apart_img">
              <img src={clickedBooking?.details?.images[0]?.image_url} alt="" />
            </div>

            <div className="details_content">
              <div className="customer_details">
                <div className="pp">
                  {clickedBooking?.image && clickedBooking?.image !== "" ? (
                    <img src={clickedBooking?.image} alt="" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                      <path d="M8.00006 7.82505C6.22113 7.82505 4.77889 6.07337 4.77889 3.91255C4.77889 1.75168 5.2524 0 8.00006 0C10.7477 0 11.2213 1.75168 11.2213 3.91255C11.2213 6.07337 9.77907 7.82505 8.00006 7.82505Z" />
                      <path d="M14.0842 13.7989C14.0853 13.7618 14.0848 13.6672 14.0842 13.7989V13.7989Z" />
                      <path d="M1.91614 13.9019C1.91554 13.6517 1.9144 13.8658 1.91614 13.9019V13.9019Z" />
                      <path d="M1.92299 13.641C1.98265 9.87679 2.47426 8.80419 6.23623 8.12524C6.23623 8.12524 6.76578 8.80003 8.00007 8.80003C9.23436 8.80003 9.764 8.12524 9.764 8.12524C13.4849 8.79679 14.0064 9.85347 14.075 13.5187C14.0806 13.818 14.0832 13.8337 14.0842 13.799C14.084 13.8641 14.0837 13.9845 14.0837 14.1945C14.0837 14.1945 13.1881 16 8.00007 16C2.81214 16 1.91641 14.1945 1.91641 14.1945C1.91641 14.0596 1.91632 13.9657 1.91618 13.9019C1.91719 13.9234 1.9192 13.8818 1.92299 13.641Z" />
                    </svg>
                  )}
                </div>
                <div className="content">
                  <div className="">
                    <p className="label">Customer : </p>
                    <p className="value">{clickedBooking?.username}</p>
                  </div>
                  <div className="">
                    <p className="label">Email : </p>
                    <p className="value">{clickedBooking?.userEmail}</p>
                  </div>
                </div>
              </div>
              <div className="divider"></div>
              <div className="reservation_details">
                <p className="title">Reservation datails:</p>
                <div className="content">
                  <div className="item">
                    <p className="label">Dates: </p>
                    <div className="value">
                      <p className="duration">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_1234_953)">
                            <path
                              d="M5.04153 8.55362C5.04153 8.77796 4.85798 8.96147 4.63368 8.96147H2.59438C2.37008 8.96147 2.18652 8.77792 2.18652 8.55362V7.19051C2.18652 6.96617 2.37008 6.78265 2.59438 6.78265H4.63368C4.85802 6.78265 5.04153 6.96621 5.04153 7.19051V8.55362Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M5.04153 12.1356C5.04153 12.3599 4.85798 12.5434 4.63368 12.5434H2.59438C2.37008 12.5434 2.18652 12.3599 2.18652 12.1356V10.7725C2.18652 10.5481 2.37008 10.3646 2.59438 10.3646H4.63368C4.85802 10.3646 5.04153 10.5482 5.04153 10.7725V12.1356Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M8.92732 8.55362C8.92732 8.77796 8.74377 8.96147 8.51947 8.96147H6.48012C6.25578 8.96147 6.07227 8.77792 6.07227 8.55362V7.19051C6.07227 6.96617 6.25582 6.78265 6.48012 6.78265H8.51947C8.74381 6.78265 8.92732 6.96621 8.92732 7.19051V8.55362Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M8.92732 12.1356C8.92732 12.3599 8.74377 12.5434 8.51947 12.5434H6.48012C6.25578 12.5434 6.07227 12.3599 6.07227 12.1356V10.7725C6.07227 10.5481 6.25582 10.3646 6.48012 10.3646H8.51947C8.74381 10.3646 8.92732 10.5482 8.92732 10.7725V12.1356Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M12.7662 8.55362C12.7662 8.77796 12.5826 8.96147 12.3583 8.96147H10.319C10.0946 8.96147 9.91113 8.77792 9.91113 8.55362V7.19051C9.91113 6.96617 10.0947 6.78265 10.319 6.78265H12.3583C12.5827 6.78265 12.7662 6.96621 12.7662 7.19051V8.55362Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M12.7662 12.1356C12.7662 12.3599 12.5826 12.5434 12.3583 12.5434H10.319C10.0946 12.5434 9.91113 12.3599 9.91113 12.1356V10.7725C9.91113 10.5481 10.0947 10.3646 10.319 10.3646H12.3583C12.5827 10.3646 12.7662 10.5482 12.7662 10.7725V12.1356Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M3.20377 3.73237C2.9601 3.73237 2.76074 3.53302 2.76074 3.2893V0.891617C2.76074 0.647902 2.9601 0.448547 3.20377 0.448547H4.12544C4.36911 0.448547 4.56851 0.647902 4.56851 0.891617V3.2893C4.56851 3.53297 4.36916 3.73237 4.12544 3.73237H3.20377Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M10.8776 3.73237C10.6339 3.73237 10.4346 3.53302 10.4346 3.2893V0.891617C10.4346 0.647902 10.6339 0.448547 10.8776 0.448547H11.7993C12.0429 0.448547 12.2423 0.647902 12.2423 0.891617V3.2893C12.2423 3.53297 12.043 3.73237 11.7993 3.73237H10.8776Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M14.5721 2.26038C14.5721 2.26038 13.8406 2.26038 13.2824 2.26038C13.2087 2.26038 13.0724 2.26038 13.0724 2.43026V3.18866C13.0724 3.91274 12.6713 4.50184 11.7592 4.50184H10.9107C10.0458 4.50184 9.59747 3.91274 9.59747 3.18866L9.59752 2.46987C9.59752 2.33407 9.50264 2.26038 9.38947 2.26038C8.309 2.26038 6.76243 2.26038 5.64362 2.26038C5.56051 2.26038 5.40253 2.26038 5.40253 2.47553V3.18866C5.40253 3.91274 5.04148 4.50184 4.08934 4.50184H3.24082C2.18647 4.50184 1.92763 3.91274 1.92763 3.18866V2.50382C1.92763 2.31144 1.75444 2.26038 1.66015 2.26038C1.10849 2.26038 0.427951 2.26038 0.427951 2.26038C0.192564 2.26038 0 2.45294 0 3.00537V14.4405C0 14.3589 0.192564 14.5514 0.427951 14.5514H14.572C14.8074 14.5514 15 14.3589 15 14.4405V3.00537C15 2.45294 14.8074 2.26038 14.5721 2.26038ZM14.049 13.1725C14.049 13.4079 13.8565 13.6004 13.6211 13.6004H1.37896C1.14357 13.6004 0.951006 13.4079 0.951006 13.1725V6.08672C0.951006 5.85133 1.14357 5.65877 1.37896 5.65877H13.6211C13.8565 5.65877 14.049 5.85133 14.049 6.08672V13.1725Z"
                              fill="#BCBCBC"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1234_953">
                              <rect width="15" height="15" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        {`${formatDate(
                          clickedBooking?.startDate
                        )} To ${formatDate(clickedBooking?.endDate)}`}
                      </p>
                      <div className="nights">
                        <p>
                          Nights :
                          <span> {clickedBooking?.normalNightsCount}</span>
                        </p>
                        {clickedBooking?.specialNightsCount &&
                        clickedBooking?.specialNightsCount > 0 ? (
                          <p>
                            Special nights :
                            <span> {clickedBooking?.normalNightsCount}</span>
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  {clickedBooking?.details?.services &&
                  clickedBooking.details?.services.some(
                    (service) => service.name !== null
                  ) ? (
                    <div className="item">
                      <p className="label">Services: </p>
                      <p className="value">
                        <div className="services">
                          {clickedBooking.details?.services.map(
                            (service, i) =>
                              service.name !== null && (
                                <div key={i} className="service">
                                  <p className="_icon">
                                    {serviceIcons.map((icn) => {
                                      if (
                                        icn.name.toLowerCase() ===
                                        service.name.toLowerCase()
                                      ) {
                                        return icn.icon;
                                      }
                                    })}
                                  </p>
                                  <p className="_name">{service.name}</p>
                                </div>
                              )
                          )}
                        </div>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="payment_details">
                <p className="title">Payment datails:</p>
                <div className="content">
                  <div className="item">
                    <p className="label">Nights fees: </p>
                    <div className="value">
                      <p>
                        {clickedBooking?.normalNightsCount *
                          formatPrice(clickedBooking?.normalNightsPrice) +
                          clickedBooking?.normalNightsCount *
                            formatPrice(clickedBooking?.specialNightsPrice)}
                        €
                      </p>
                      <p>
                        {clickedBooking?.normalNightsCount} *{" "}
                        {formatPrice(clickedBooking?.normalNightsPrice)}€
                      </p>
                      {clickedBooking?.specialNightsCount > 0 ? (
                        <p>
                          {clickedBooking?.specialNightsCount} *{" "}
                          {formatPrice(clickedBooking?.specialNightsPrice)}€
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {clickedBooking?.details?.services &&
                  clickedBooking.details?.services.some(
                    (service) => service.name !== null
                  ) ? (
                    <div className="item">
                      <p className="label">Services fees: </p>
                      <p className="value">
                        <div className="services">
                          <p>{totalServicePrice}€</p>
                          {clickedBooking.details?.services.map(
                            (service, i) =>
                              service.name !== null && (
                                <div key={i} className="service">
                                  <p className="_icon">
                                    {serviceIcons.map((icn) => {
                                      if (
                                        icn.name.toLowerCase() ===
                                        service.name.toLowerCase()
                                      ) {
                                        return icn.icon;
                                      }
                                    })}
                                  </p>
                                  <p className="_name">{service.price}€</p>
                                </div>
                              )
                          )}
                        </div>
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="total_details">
                <div className="item">
                  <p className="label">Total price: </p>
                  <div className="value">0</div>
                </div>
              </div>
            </div>
            <div className="cancel_btn">
              <button className="btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </ReusableModal>
      </section>
    </>
  );
}
