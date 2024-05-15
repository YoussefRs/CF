import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneBooking } from "../../redux/BookingSlice";
import axios from "axios";

import Form from "react-bootstrap/Form";
import { verifyTokenExpiration } from "../../utils/dateFormatters";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";

export default function Checkout() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("loginToken");
  const { id, userId } = useParams();
  // console.log(id)
  const dispatch = useDispatch();
  const location = useLocation();
  const bookingData = useSelector((state) => state.bookings.bookings);

  const stripe = useStripe();
  const elements = useElements();

  const cardStyle = {
    base: {
      color: "#000",
      fontFamily: '"TT Commons", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#bdcaf7",
      },
    },
    invalid: {
      color: "#000",
      iconColor: "#bdcaf7",
    },
  };

  const [btnDisabled, setBtnDisabled] = useState(false);

  const [selectedType, setSelectedType] = useState("");

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };
  const tokenValid = verifyTokenExpiration();
  useEffect(() => {
    if (tokenValid) {
      const fetchData = async () => {
        await dispatch(getOneBooking(id, userId));
      };
      fetchData();
    }
  }, [dispatch, id, userId]);

  const createPaymentIntent = async (reservationId) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/reservations/payment-intent/${reservationId}`,
        {
          paymentMethod: "card", // You can pass payment method if needed
        }
      );
      return response.data.clientSecret;
    } catch (error) {
      console.error("Error creating payment intent:", error);
      throw new Error("Error creating payment intent");
    }
  };

  const handlePayment = async () => {
    try {
      setBtnDisabled(true);
      const clientSecret = await createPaymentIntent(id);

      if (!stripe || !elements) {
        throw new Error("Stripe.js has not loaded yet.");
      }

      const cardElement = elements.getElement(CardNumberElement);

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      const { id: paymentIntentId, status } = paymentIntent;

      console.log("Payment Intent ID:", paymentIntentId);
      console.log("Payment Status:", status);

      // Check if PaymentIntent has already succeeded
      if (status === "succeeded") {
        console.log("Payment already succeeded. No further action needed.");
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/reservations/confirm-payment/${id}`,
        {
          paymentIntentId,
        }
      );

      console.log(response.data.message);
      // Redirect or show success message as needed
      toast.success("payment successful");
      
    } catch (error) {
      // Handle error if needed
      setBtnDisabled(false);
      console.error("Error processing Stripe payment:", error);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (selectedType === "PayPal") {
      axios
        .post(`${BASE_URL}/reservations/generate-paypal-checkout/${id}`, {
          // Add your data to be sent in the request body
        })
        .then((response) => {
          console.log("PayPal API response:", response.data);
          window.open(response.data.approval_url, "_blank");
        })
        .catch((error) => {
          // Handle error if needed
          console.error("Error calling PayPal API:", error);
        });
    } else {
      handlePayment();
    }
  };
  return (
    <>
      {!tokenValid ? (
        <h1
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          Link Expired, 24 hours have passed, and you haven't completed the
          payment.
        </h1>
      ) : (
        <div className="checkout_container">
          <header>
            <h3>Zur Kasse</h3>
          </header>

          <main>
            <section className="checkout-form">
              <form onSubmit={(e) => handleContinue(e)}>
                <h6>Kontaktdaten</h6>
                <div className="form-control">
                  <label htmlFor="checkout-email">E-mail</label>
                  <div>
                    <span className="fa fa-envelope">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_631_469)">
                          <path
                            d="M8.00042 7.82505C6.2215 7.82505 4.77926 6.07337 4.77926 3.91255C4.77926 1.75168 5.25277 0 8.00042 0C10.7481 0 11.2217 1.75168 11.2217 3.91255C11.2217 6.07337 9.77944 7.82505 8.00042 7.82505Z"
                            fill="#BCBCBC"
                          />
                          <path
                            d="M14.0843 13.7989C14.0854 13.7618 14.0849 13.6672 14.0843 13.7989V13.7989Z"
                            fill="#BCBCBC"
                          />
                          <path
                            d="M1.91602 13.9019C1.91542 13.6517 1.91428 13.8658 1.91602 13.9019V13.9019Z"
                            fill="#BCBCBC"
                          />
                          <path
                            d="M1.92275 13.6412C1.98241 9.87703 2.47402 8.80444 6.23599 8.12549C6.23599 8.12549 6.76554 8.80028 7.99983 8.80028C9.23411 8.80028 9.76376 8.12549 9.76376 8.12549C13.4847 8.79703 14.0062 9.85372 14.0748 13.5189C14.0804 13.8182 14.083 13.834 14.084 13.7992C14.0838 13.8643 14.0835 13.9847 14.0835 14.1947C14.0835 14.1947 13.1878 16.0002 7.99983 16.0002C2.81189 16.0002 1.91617 14.1947 1.91617 14.1947C1.91617 14.0598 1.91608 13.966 1.91594 13.9022C1.91694 13.9237 1.91896 13.882 1.92275 13.6412Z"
                            fill="#BCBCBC"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_631_469">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="matrix(-1 0 0 1 16 0)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <input
                      type="email"
                      id="checkout-email"
                      name="checkout-email"
                      value={bookingData?.reservation?.[0]?.userEmail}
                      placeholder="Enter your email..."
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label htmlFor="checkout-phone">Telefonnummer</label>
                  <div>
                    <span className="fa fa-envelope">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 9 13"
                        fill="none"
                      >
                        <path
                          d="M6.73253 0H2.26724C1.22143 0 0.370605 0.850829 0.370605 1.89663V11.1034C0.370605 12.1492 1.22143 13 2.26724 13H6.73253C7.77833 13 8.62916 12.1492 8.62916 11.1034V1.89663C8.62916 0.850829 7.77833 0 6.73253 0ZM3.94238 0.630406H5.05739C5.15264 0.630406 5.22981 0.707582 5.22981 0.802827C5.22981 0.898073 5.15264 0.975248 5.05739 0.975248H3.94238C3.84713 0.975248 3.76996 0.898073 3.76996 0.802827C3.76996 0.707582 3.84713 0.630406 3.94238 0.630406ZM4.49988 12.2286C4.19515 12.2286 3.94814 11.9816 3.94814 11.6769C3.94814 11.3722 4.19515 11.1251 4.49988 11.1251C4.80459 11.1251 5.05163 11.3722 5.05163 11.6769C5.05163 11.9816 4.80462 12.2286 4.49988 12.2286ZM7.76709 10.0101C7.76709 10.1998 7.61191 10.355 7.42225 10.355H1.57755C1.38789 10.355 1.23271 10.1998 1.23271 10.0101V1.94081C1.23271 1.75114 1.38789 1.59596 1.57755 1.59596H7.42225C7.61191 1.59596 7.76709 1.75114 7.76709 1.94081V10.0101Z"
                          fill="#BCBCBC"
                        />
                      </svg>
                    </span>
                    <input
                      type="tel"
                      name="checkout-phone"
                      id="checkout-phone"
                      placeholder="Enter you phone..."
                      value={bookingData?.reservation?.[0]?.phone}
                    />
                  </div>
                </div>
                <br />
                <div className="payment_types border">
                  <h6>Payment Method</h6>
                  {/* <div className="types d-flex align-items-center justify-content-center gap-5">
                <div
                  className={`type ${
                    selectedType === "Credit Card" ? "selected" : ""
                  }`}
                  onClick={() => handleTypeClick("Credit Card")}
                >
                  <div className="logo">
                    <i className="far fa-credit-card">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 780 500"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M465.738 113.525H313.812V386.475H465.738V113.525Z"
                          fill="#FF5A00"
                        />
                        <path
                          d="M323.926 250C323.926 194.545 349.996 145.326 390 113.525C360.559 90.3769 323.42 76.3867 282.91 76.3867C186.945 76.3867 109.297 154.035 109.297 250C109.297 345.965 186.945 423.614 282.91 423.614C323.42 423.614 360.559 409.623 390 386.475C349.94 355.123 323.926 305.455 323.926 250Z"
                          fill="#EB001B"
                        />
                        <path
                          d="M670.711 250C670.711 345.965 593.062 423.614 497.098 423.614C456.588 423.614 419.449 409.623 390.008 386.475C430.518 354.618 456.082 305.455 456.082 250C456.082 194.545 430.012 145.326 390.008 113.525C419.393 90.3769 456.532 76.3867 497.041 76.3867C593.062 76.3867 670.711 154.541 670.711 250Z"
                          fill="#F79E1B"
                        />
                      </svg>
                    </i>
                  </div>
                  <div className="text">
                    <p>Pay with Credit Card</p>
                  </div>
                </div>
                <div
                  className={`type ${
                    selectedType === "PayPal" ? "selected" : ""
                  }`}
                  onClick={() => handleTypeClick("PayPal")}
                >
                  <div className="logo">
                    <i className="fab fa-paypal">
                      <svg
                        width="64"
                        height="64"
                        enable-background="new 0 0 780 500"
                        version="1.1"
                        viewBox="0 0 780 500"
                        xml:space="preserve"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m168.38 169.35c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.215l-21.264 133.48c-0.221 1.311 0.107 2.51 0.981 3.6 0.869 1.092 1.962 1.635 3.271 1.635h24.864c4.361 0 6.758-2.068 7.198-6.215l5.888-35.986c0.215-1.744 0.982-3.162 2.291-4.254 1.308-1.09 2.944-1.803 4.907-2.129 1.963-0.324 3.814-0.488 5.562-0.488 1.743 0 3.814 0.111 6.217 0.328 2.397 0.217 3.925 0.324 4.58 0.324 18.756 0 33.478-5.285 44.167-15.867 10.684-10.576 16.032-25.242 16.032-44.004 0-12.868-4.203-22.191-12.598-27.974zm-26.989 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.599-19.629 3.599l-10.797 0.326 5.563-35.007c0.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.801 3.924 15.869z"
                          fill="#003087"
                        />
                        <path
                          d="m720.79 160.68h-24.207c-2.406 0-3.822 1.2-4.254 3.601l-21.266 136.1-0.328 0.654c0 1.096 0.436 2.127 1.311 3.109 0.867 0.98 1.963 1.471 3.27 1.471h21.596c4.137 0 6.428-2.068 6.871-6.215l21.264-133.81v-0.325c-1e-3 -3.055-1.423-4.581-4.257-4.581z"
                          fill="#009CDE"
                        />
                        <path
                          d="m428.31 213.36c0-1.088-0.438-2.126-1.305-3.105-0.875-0.981-1.857-1.475-2.945-1.475h-25.191c-2.404 0-4.367 1.096-5.891 3.271l-34.678 51.039-14.395-49.074c-1.096-3.487-3.492-5.236-7.197-5.236h-24.541c-1.093 0-2.074 0.492-2.941 1.475-0.875 0.979-1.309 2.019-1.309 3.105 0 0.439 2.127 6.871 6.379 19.303 4.252 12.436 8.832 25.85 13.74 40.246 4.908 14.393 7.469 22.031 7.688 22.896-17.886 24.432-26.825 37.518-26.825 39.26 0 2.838 1.415 4.254 4.253 4.254h25.191c2.398 0 4.36-1.088 5.89-3.27l83.427-120.4c0.433-0.432 0.65-1.192 0.65-2.29z"
                          fill="#003087"
                        />
                        <path
                          d="m662.89 208.78h-24.865c-3.057 0-4.904 3.6-5.559 10.799-5.678-8.722-16.031-13.089-31.084-13.089-15.703 0-29.064 5.89-40.076 17.668-11.016 11.778-16.521 25.632-16.521 41.552 0 12.871 3.762 23.121 11.285 30.752 7.525 7.639 17.611 11.451 30.266 11.451 6.324 0 12.758-1.311 19.301-3.926 6.543-2.617 11.664-6.105 15.379-10.469 0 0.219-0.223 1.197-0.654 2.941-0.441 1.748-0.656 3.061-0.656 3.926 0 3.494 1.414 5.234 4.254 5.234h22.576c4.139 0 6.541-2.068 7.193-6.215l13.416-85.39c0.215-1.31-0.111-2.507-0.982-3.599-0.877-1.088-1.965-1.635-3.273-1.635zm-42.694 64.454c-5.562 5.453-12.27 8.178-20.121 8.178-6.328 0-11.449-1.742-15.377-5.234-3.928-3.482-5.891-8.281-5.891-14.395 0-8.064 2.727-14.886 8.182-20.447 5.445-5.562 12.213-8.342 20.283-8.342 6.102 0 11.174 1.799 15.213 5.396 4.031 3.6 6.055 8.562 6.055 14.889-2e-3 7.851-2.783 14.505-8.344 19.955z"
                          fill="#009CDE"
                        />
                        <path
                          d="m291.23 208.78h-24.865c-3.058 0-4.908 3.6-5.563 10.799-5.889-8.722-16.25-13.089-31.081-13.089-15.704 0-29.065 5.89-40.078 17.668-11.016 11.778-16.521 25.632-16.521 41.552 0 12.871 3.763 23.121 11.288 30.752 7.525 7.639 17.61 11.451 30.262 11.451 6.104 0 12.433-1.311 18.975-3.926 6.543-2.617 11.778-6.105 15.704-10.469-0.875 2.615-1.309 4.906-1.309 6.867 0 3.494 1.417 5.234 4.253 5.234h22.574c4.141 0 6.543-2.068 7.198-6.215l13.413-85.39c0.215-1.31-0.111-2.507-0.981-3.599-0.873-1.088-1.962-1.635-3.269-1.635zm-42.695 64.616c-5.563 5.35-12.382 8.016-20.447 8.016-6.329 0-11.4-1.742-15.214-5.234-3.819-3.482-5.726-8.281-5.726-14.395 0-8.064 2.725-14.886 8.18-20.447 5.449-5.562 12.211-8.343 20.284-8.343 6.104 0 11.175 1.8 15.214 5.397 4.032 3.6 6.052 8.562 6.052 14.889-1e-3 8.07-2.781 14.779-8.343 20.117z"
                          fill="#003087"
                        />
                        <path
                          d="m540.04 169.35c-8.398-5.774-19.355-8.668-32.879-8.668h-52.02c-4.363 0-6.764 2.073-7.197 6.215l-21.266 133.48c-0.221 1.311 0.107 2.51 0.982 3.6 0.865 1.092 1.961 1.635 3.27 1.635h26.826c2.617 0 4.361-1.416 5.236-4.252l5.889-37.949c0.217-1.744 0.98-3.162 2.291-4.254 1.309-1.09 2.943-1.803 4.908-2.129 1.961-0.324 3.812-0.488 5.561-0.488 1.744 0 3.814 0.111 6.215 0.328 2.398 0.217 3.93 0.324 4.58 0.324 18.76 0 33.479-5.285 44.168-15.867 10.688-10.576 16.031-25.242 16.031-44.004 1e-3 -12.868-4.2-22.192-12.595-27.974zm-33.533 53.819c-4.799 3.271-11.998 4.906-21.592 4.906l-10.471 0.328 5.562-35.008c0.432-2.396 1.85-3.598 4.252-3.598h5.887c4.799 0 8.615 0.219 11.455 0.654 2.83 0.438 5.561 1.799 8.178 4.088 2.619 2.291 3.926 5.619 3.926 9.979 0 9.164-2.402 15.377-7.197 18.651z"
                          fill="#009CDE"
                        />
                      </svg>
                    </i>
                  </div>
                  <div className="text">
                    <p>Pay with PayPal</p>
                  </div>
                </div>
              </div> */}
                  <div
                    className={`type ${
                      selectedType === "Credit Card" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleTypeClick("Credit Card");
                    }}
                  >
                    <Form.Check
                      type="radio"
                      name="payment-type"
                      checked={selectedType === "Credit Card"}
                    />
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 27 20"
                      >
                        <path d="M24.4805 0.954102H1.88312C0.844578 0.954102 0 1.82535 0 2.89669V8.72444V17.4661C0 18.5374 0.844578 19.4086 1.88312 19.4086H24.4805C25.5191 19.4086 26.3636 18.5374 26.3636 17.4661C26.3636 13.7208 26.3636 6.56088 26.3636 2.89669C26.3636 1.82535 25.5191 0.954102 24.4805 0.954102ZM1.88312 1.92539H24.4805C24.9998 1.92539 25.4221 2.36102 25.4221 2.89669V4.83927H0.941558V2.89669C0.941558 2.36102 1.36385 1.92539 1.88312 1.92539ZM24.4805 18.4374H1.88312C1.36385 18.4374 0.941558 18.0017 0.941558 17.4661V9.21008H25.4221V17.4661C25.4221 18.0017 24.9998 18.4374 24.4805 18.4374ZM11.7695 16.4948H3.29545C3.03558 16.4948 2.82468 16.2777 2.82468 16.0091C2.82468 15.7406 3.03558 15.5235 3.29545 15.5235H11.7695C12.3904 15.5342 12.3857 16.4851 11.7695 16.4948ZM3.29545 13.5809H8.94481C9.56482 13.5916 9.562 14.542 8.94481 14.5522H3.29545C2.67544 14.5415 2.67826 13.5911 3.29545 13.5809ZM22.5974 14.5522V16.0091C22.5974 16.5448 22.1751 16.9804 21.6558 16.9804H18.3604C17.8411 16.9804 17.4188 16.5448 17.4188 16.0091V14.5522C17.4188 14.0165 17.8411 13.5809 18.3604 13.5809H21.6558C22.1751 13.5809 22.5974 14.0165 22.5974 14.5522Z" />
                      </svg>
                    </span>
                    <span className="label">Credit</span>
                  </div>
                  <div
                    className={`type ${
                      selectedType === "PayPal" ? "selected" : ""
                    }`}
                    onClick={() => {
                      handleTypeClick("PayPal");
                    }}
                  >
                    <Form.Check
                      type="radio"
                      name="payment-type"
                      checked={selectedType === "PayPal"}
                    />
                    <span className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 21"
                      >
                        <g clipPath="url(#clip0_631_461)">
                          <path d="M6.72821 12.3612C6.79618 11.9349 7.16569 11.6197 7.60192 11.6197H9.41854C12.9888 11.6197 15.7829 10.1813 16.5997 6.02035C16.6245 5.89677 16.6628 5.65949 16.6628 5.65949C16.8951 4.11969 16.6615 3.07545 15.8224 2.12759C14.9006 1.08334 13.2322 0.635986 11.098 0.635986H4.90418C4.46794 0.635986 4.09721 0.951114 4.028 1.37746L1.44894 17.6047C1.39827 17.9248 1.6479 18.2139 1.97415 18.2139H5.7977L6.75791 12.1709L6.72821 12.3612Z" />
                          <path d="M9.41804 12.7122H7.78926L6.57324 20.4088H9.21537C9.59723 20.4088 9.92225 20.1332 9.98157 19.7588L10.0125 19.5956L10.6205 15.7758L10.66 15.5657C10.7193 15.1913 11.0444 14.9157 11.425 14.9157H11.9082C15.031 14.9157 17.4754 13.6576 18.1897 10.0182C18.4764 8.5575 18.338 7.33283 17.6299 6.448C16.7426 10.5447 13.9114 12.7122 9.41804 12.7122Z" />
                        </g>
                        <defs>
                          <clipPath id="clip0_631_461">
                            <rect
                              width="19.7727"
                              height="19.7727"
                              fill="white"
                              transform="translate(0 0.63623)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="label">PayPal</span>
                  </div>
                </div>
                <div
                  className={`${
                    selectedType === "Credit Card" ? "show" : "hide"
                  }`}
                  style={{
                    transition: "height 0.5s ease",
                    height: selectedType === "Credit Card" ? "200px" : "0",
                    overflow: "hidden",
                  }}
                >
                  {/* <div className="form-control">
                    <label htmlFor="checkout-address">Kartennummer</label>
                    <div>
                      <span className="fa fa-home"></span>
                      <input
                        id="ccn"
                        type="tel"
                        inputmode="numeric"
                        pattern="[0-9\s]{13,19}"
                        autocomplete="cc-number"
                        maxlength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-control">
                      <label htmlFor="checkout-country">Ablaufdatum</label>
                      <div>
                        <span className="fa fa-globe"></span>
                        <input
                          type="date"
                          name="expiryDate"
                          id="expiryDate"
                          placeholder="Ablaufdatum"
                        />
                      </div>
                    </div>
                    <div className="form-control">
                      <label htmlFor="checkout-postal">CVV</label>
                      <div>
                        <span className="fa fa-archive"></span>
                        <input
                          type="numeric"
                          name="checkout-postal"
                          id="checkout-postal"
                          placeholder="Ihr CVV"
                        />
                      </div>
                    </div>
                  </div> */}
                  <div className="card-detail-input ">
                    <CardNumberElement
                      className="mb-4 card_input"
                      options={{ style: cardStyle }}
                    />
                  </div>
                  <div className="card-detail-input">
                    <CardExpiryElement
                      className="mb-4 card_input"
                      options={{ style: cardStyle }}
                    />
                  </div>
                  <div className="card-detail-input">
                    <CardCvcElement
                      className="mb-4 card_input"
                      options={{ style: cardStyle }}
                    />
                  </div>
                </div>
                <div className="form-control-btn">
                  <button type="submit" disabled={btnDisabled}>
                    Weiter
                  </button>
                </div>
              </form>
            </section>

            <section className="checkout-details">
              <div className="checkout-details-inner">
                <div className="checkout-lists">
                  <div className="_card">
                    <div className="card-image">
                      <img
                        src={
                          bookingData?.reservation?.[0].apartment_images?.[0]
                            ?.image_url
                        }
                        alt="apartment picture"
                      />
                    </div>
                    <div className="card-details">
                      <div className="card-name">
                        {bookingData?.reservation?.[0].name}{" "}
                      </div>
                      <div className="_card-price row">
                        <span className="col-1">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_633_511)">
                              <path
                                d="M5.04153 8.55368C5.04153 8.77802 4.85798 8.96153 4.63368 8.96153H2.59438C2.37008 8.96153 2.18652 8.77798 2.18652 8.55368V7.19057C2.18652 6.96623 2.37008 6.78271 2.59438 6.78271H4.63368C4.85802 6.78271 5.04153 6.96627 5.04153 7.19057V8.55368Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M5.04153 12.1357C5.04153 12.3601 4.85798 12.5436 4.63368 12.5436H2.59438C2.37008 12.5436 2.18652 12.36 2.18652 12.1357V10.7726C2.18652 10.5483 2.37008 10.3647 2.59438 10.3647H4.63368C4.85802 10.3647 5.04153 10.5483 5.04153 10.7726V12.1357Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M8.92732 8.55368C8.92732 8.77802 8.74377 8.96153 8.51947 8.96153H6.48012C6.25578 8.96153 6.07227 8.77798 6.07227 8.55368V7.19057C6.07227 6.96623 6.25582 6.78271 6.48012 6.78271H8.51947C8.74381 6.78271 8.92732 6.96627 8.92732 7.19057V8.55368Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M8.92732 12.1357C8.92732 12.3601 8.74377 12.5436 8.51947 12.5436H6.48012C6.25578 12.5436 6.07227 12.36 6.07227 12.1357V10.7726C6.07227 10.5483 6.25582 10.3647 6.48012 10.3647H8.51947C8.74381 10.3647 8.92732 10.5483 8.92732 10.7726V12.1357Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M12.7662 8.55368C12.7662 8.77802 12.5826 8.96153 12.3583 8.96153H10.319C10.0946 8.96153 9.91113 8.77798 9.91113 8.55368V7.19057C9.91113 6.96623 10.0947 6.78271 10.319 6.78271H12.3583C12.5827 6.78271 12.7662 6.96627 12.7662 7.19057V8.55368Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M12.7662 12.1357C12.7662 12.3601 12.5826 12.5436 12.3583 12.5436H10.319C10.0946 12.5436 9.91113 12.36 9.91113 12.1357V10.7726C9.91113 10.5483 10.0947 10.3647 10.319 10.3647H12.3583C12.5827 10.3647 12.7662 10.5483 12.7662 10.7726V12.1357Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M3.20377 3.73231C2.9601 3.73231 2.76074 3.53295 2.76074 3.28924V0.891556C2.76074 0.647841 2.9601 0.448486 3.20377 0.448486H4.12544C4.36911 0.448486 4.56851 0.647841 4.56851 0.891556V3.28924C4.56851 3.53291 4.36916 3.73231 4.12544 3.73231H3.20377Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M10.8776 3.73231C10.6339 3.73231 10.4346 3.53295 10.4346 3.28924V0.891556C10.4346 0.647841 10.6339 0.448486 10.8776 0.448486H11.7993C12.0429 0.448486 12.2423 0.647841 12.2423 0.891556V3.28924C12.2423 3.53291 12.043 3.73231 11.7993 3.73231H10.8776Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M14.5721 2.26025C14.5721 2.26025 13.8406 2.26025 13.2824 2.26025C13.2087 2.26025 13.0724 2.26025 13.0724 2.43014V3.18854C13.0724 3.91262 12.6713 4.50172 11.7592 4.50172H10.9107C10.0458 4.50172 9.59747 3.91262 9.59747 3.18854L9.59752 2.46975C9.59752 2.33395 9.50264 2.26025 9.38947 2.26025C8.309 2.26025 6.76243 2.26025 5.64362 2.26025C5.56051 2.26025 5.40253 2.26025 5.40253 2.47541V3.18854C5.40253 3.91262 5.04148 4.50172 4.08934 4.50172H3.24082C2.18647 4.50172 1.92763 3.91262 1.92763 3.18854V2.5037C1.92763 2.31131 1.75444 2.26025 1.66015 2.26025C1.10849 2.26025 0.427951 2.26025 0.427951 2.26025C0.192564 2.26025 0 2.45282 0 3.00525V14.4404C0 14.3588 0.192564 14.5513 0.427951 14.5513H14.572C14.8074 14.5513 15 14.3588 15 14.4404V3.00525C15 2.45282 14.8074 2.26025 14.5721 2.26025ZM14.049 13.1724C14.049 13.4077 13.8565 13.6003 13.6211 13.6003H1.37896C1.14357 13.6003 0.951006 13.4077 0.951006 13.1724V6.0866C0.951006 5.85121 1.14357 5.65865 1.37896 5.65865H13.6211C13.8565 5.65865 14.049 5.85121 14.049 6.0866V13.1724Z"
                                fill="#BCBCBC"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_633_511">
                                <rect width="15" height="15" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                        <span className="col">
                          {new Date(
                            bookingData?.reservation?.[0]?.startDate
                          ).toLocaleDateString("en-GB")}{" "}
                          Bis{" "}
                          {new Date(
                            bookingData?.reservation?.[0]?.endDate
                          ).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <div className="_card-price row">
                        <span className="col-1"></span>
                        <span className="col">
                          Nächte: {bookingData?.reservation?.[0]?.nightsCount}{" "}
                        </span>
                      </div>
                      <div className="_card-price row">
                        <span className="col-1"></span>
                        <span className="col">
                          {bookingData?.services?.includes("Food") && (
                            <span className="_small_title">
                              <svg
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clipPath="url(#clip0_44_962)">
                                  <path
                                    d="M6.68384 12.6431L7.70703 13.6663L8.7302 12.6431H6.68384Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M6.58174 5.73816H4.66405C2.57574 5.73816 0.864863 7.38523 0.762207 9.44849H10.4836C10.3809 7.38526 8.67008 5.73816 6.58174 5.73816ZM4.06423 8.30193H3.07593V7.42302H4.06423V8.30193ZM6.11706 7.76785H5.12876V6.88894H6.11706V7.76785ZM8.16989 8.30193H7.18159V7.42302H8.16989V8.30193Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M8.03101 14.5851H9.41476C10.0067 14.5851 10.4883 14.1035 10.4883 13.5115V12.6431H9.97301L8.03101 14.5851Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M0.757324 12.6431V13.5115C0.757324 14.1035 1.23891 14.5851 1.83088 14.5851H7.38287L5.44087 12.6431H0.757324Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M11.6408 3.75482V1.29395H13.7287V0.415039H10.7619V3.75482H7.40283V4.8592H14.9999V3.75482H11.6408Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M11.3674 9.64487V9.68805C11.8215 9.97003 12.1246 10.4731 12.1246 11.0458C12.1246 11.6185 11.8215 12.1215 11.3674 12.4035V13.5116C11.3674 13.9079 11.2484 14.2768 11.0446 14.5851H13.3492L14.1918 5.73816H9.34277C10.5669 6.60582 11.3674 8.03357 11.3674 9.64487Z"
                                    fill="#BCBCBC"
                                  />
                                  <path
                                    d="M10.5272 10.3274H0.718389C0.322266 10.3274 0 10.6497 0 11.0458C0 11.4419 0.322266 11.7642 0.718389 11.7642H10.5272C10.9233 11.7642 11.2455 11.4419 11.2455 11.0458C11.2455 10.6497 10.9233 10.3274 10.5272 10.3274Z"
                                    fill="#BCBCBC"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_44_962">
                                    <rect width="15" height="15" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                              25€
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="_card-price row">
                        <span className="col-1"></span>
                        <span className="col">
                          {bookingData?.services?.includes("Parking") && (
                            <span className="_small_title">
                              <svg
                                width="16"
                                height="10"
                                viewBox="0 0 16 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.9738 6.77168L14.8238 3.90169C14.7418 3.74753 14.5824 3.6509 14.4079 3.6509H11.9592L9.27104 1.10476C9.18361 1.02235 9.06843 0.97583 8.94715 0.97583H3.41558C3.21119 0.97583 3.02867 1.10916 2.96724 1.30478L2.22372 3.6509H0.469548C0.209525 3.6509 0 3.86151 0 4.1213V5.33363V6.90745C0 7.10952 0.162621 7.27287 0.364844 7.27287L1.49886 7.27241C1.5013 8.23894 2.28786 9.02422 3.25601 9.02422C4.22227 9.02422 5.01056 8.2389 5.01315 7.27241H10.7547C10.7581 8.23894 11.5451 9.02422 12.5116 9.02422C13.4794 9.02422 14.2661 8.2389 14.269 7.27241L15.6343 7.27287C15.7564 7.27287 15.8693 7.21229 15.937 7.11195C16.0052 7.01192 16.0189 6.884 15.9738 6.77168ZM3.25605 8.02056C2.84082 8.02056 2.50225 7.68277 2.50225 7.267C2.50225 6.85181 2.84082 6.51417 3.25605 6.51417C3.67108 6.51417 4.00872 6.85185 4.00872 7.267C4.00876 7.68273 3.67112 8.02056 3.25605 8.02056ZM6.14976 3.72068H3.77385L4.29633 1.86215H6.14976V3.72068ZM6.90352 3.72068V1.86215H8.20444L10.0329 3.72068H6.90352ZM12.5116 8.02056C12.0964 8.02056 11.7594 7.68277 11.7594 7.267C11.7594 6.85181 12.0964 6.51417 12.5116 6.51417C12.9278 6.51417 13.2649 6.85185 13.2649 7.267C13.2649 7.68273 12.9279 8.02056 12.5116 8.02056Z"
                                  fill="#BCBCBC"
                                />
                              </svg>
                              20€
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="checkout-shipping">
                  <h6>Datum</h6>
                  <div className="d-flex flex-column">
                    <p>
                      {bookingData?.reservation?.[0]?.normalNightsCount *
                        bookingData?.reservation?.[0]?.normalNightsPrice}
                      €{" "}
                    </p>
                    <p>
                      {bookingData?.reservation?.[0]?.normalNightsCount} *{" "}
                      {bookingData?.reservation?.[0]?.normalNightsPrice}€
                    </p>
                  </div>
                </div>
                <div className="checkout-shipping">
                  <h6>Besondere Datum</h6>
                  <div className="d-flex flex-column">
                    <p>
                      {bookingData?.reservation?.[0]?.specialNightsCount *
                        (bookingData?.reservation?.[0]?.specialNightsPrice /
                          bookingData?.reservation?.[0]
                            ?.specialNightsCount)}{" "}
                      €{" "}
                    </p>
                    <p>
                      {bookingData?.reservation?.[0]?.specialNightsCount} *{" "}
                      {bookingData?.reservation?.[0]?.specialNightsPrice /
                        bookingData?.reservation?.[0]?.specialNightsCount}
                      €
                    </p>
                  </div>
                </div>
                <div className="checkout-shipping">
                  <h6>Servicegebühren</h6>
                  <div className="d-flex flex-column">
                    <p>{bookingData?.reservation?.[0]?.servicesFee}€</p>
                    <p>
                      {bookingData?.services?.includes("Food") && (
                        <span className="_small_title">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_44_962)">
                              <path
                                d="M6.68384 12.6431L7.70703 13.6663L8.7302 12.6431H6.68384Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M6.58174 5.73816H4.66405C2.57574 5.73816 0.864863 7.38523 0.762207 9.44849H10.4836C10.3809 7.38526 8.67008 5.73816 6.58174 5.73816ZM4.06423 8.30193H3.07593V7.42302H4.06423V8.30193ZM6.11706 7.76785H5.12876V6.88894H6.11706V7.76785ZM8.16989 8.30193H7.18159V7.42302H8.16989V8.30193Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M8.03101 14.5851H9.41476C10.0067 14.5851 10.4883 14.1035 10.4883 13.5115V12.6431H9.97301L8.03101 14.5851Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M0.757324 12.6431V13.5115C0.757324 14.1035 1.23891 14.5851 1.83088 14.5851H7.38287L5.44087 12.6431H0.757324Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M11.6408 3.75482V1.29395H13.7287V0.415039H10.7619V3.75482H7.40283V4.8592H14.9999V3.75482H11.6408Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M11.3674 9.64487V9.68805C11.8215 9.97003 12.1246 10.4731 12.1246 11.0458C12.1246 11.6185 11.8215 12.1215 11.3674 12.4035V13.5116C11.3674 13.9079 11.2484 14.2768 11.0446 14.5851H13.3492L14.1918 5.73816H9.34277C10.5669 6.60582 11.3674 8.03357 11.3674 9.64487Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M10.5272 10.3274H0.718389C0.322266 10.3274 0 10.6497 0 11.0458C0 11.4419 0.322266 11.7642 0.718389 11.7642H10.5272C10.9233 11.7642 11.2455 11.4419 11.2455 11.0458C11.2455 10.6497 10.9233 10.3274 10.5272 10.3274Z"
                                fill="#BCBCBC"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_44_962">
                                <rect width="15" height="15" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          25€
                        </span>
                      )}
                    </p>
                    <p>
                      {" "}
                      {bookingData?.services?.includes("Parking") && (
                        <span className="_small_title">
                          <svg
                            width="16"
                            height="10"
                            viewBox="0 0 16 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.9738 6.77168L14.8238 3.90169C14.7418 3.74753 14.5824 3.6509 14.4079 3.6509H11.9592L9.27104 1.10476C9.18361 1.02235 9.06843 0.97583 8.94715 0.97583H3.41558C3.21119 0.97583 3.02867 1.10916 2.96724 1.30478L2.22372 3.6509H0.469548C0.209525 3.6509 0 3.86151 0 4.1213V5.33363V6.90745C0 7.10952 0.162621 7.27287 0.364844 7.27287L1.49886 7.27241C1.5013 8.23894 2.28786 9.02422 3.25601 9.02422C4.22227 9.02422 5.01056 8.2389 5.01315 7.27241H10.7547C10.7581 8.23894 11.5451 9.02422 12.5116 9.02422C13.4794 9.02422 14.2661 8.2389 14.269 7.27241L15.6343 7.27287C15.7564 7.27287 15.8693 7.21229 15.937 7.11195C16.0052 7.01192 16.0189 6.884 15.9738 6.77168ZM3.25605 8.02056C2.84082 8.02056 2.50225 7.68277 2.50225 7.267C2.50225 6.85181 2.84082 6.51417 3.25605 6.51417C3.67108 6.51417 4.00872 6.85185 4.00872 7.267C4.00876 7.68273 3.67112 8.02056 3.25605 8.02056ZM6.14976 3.72068H3.77385L4.29633 1.86215H6.14976V3.72068ZM6.90352 3.72068V1.86215H8.20444L10.0329 3.72068H6.90352ZM12.5116 8.02056C12.0964 8.02056 11.7594 7.68277 11.7594 7.267C11.7594 6.85181 12.0964 6.51417 12.5116 6.51417C12.9278 6.51417 13.2649 6.85185 13.2649 7.267C13.2649 7.68273 12.9279 8.02056 12.5116 8.02056Z"
                              fill="#BCBCBC"
                            />
                          </svg>
                          20€
                        </span>
                      )}
                    </p>
                    <p>
                      {" "}
                      {bookingData?.services?.includes("Laundry") && (
                        <span className="_small_title">
                          <svg
                            width="16"
                            height="10"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <mask
                              id="mask0_189_3738"
                              maskUnits="userSpaceOnUse"
                              x="0"
                              y="0"
                              width="30"
                              height="30"
                            >
                              <path
                                d="M0 3.8147e-06H30V30H0V3.8147e-06Z"
                                fill="white"
                              />
                            </mask>
                            <g mask="url(#mask0_189_3738)">
                              <path
                                d="M20.2234 20.9895C20.5194 20.3019 20.6836 19.5448 20.6836 18.75C20.6836 17.9552 20.5194 17.1981 20.2234 16.5105C19.3195 16.8609 18.6914 17.7395 18.6914 18.75C18.6914 19.7604 19.3195 20.6391 20.2234 20.9895Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M15 24.4336C16.7023 24.4336 18.2319 23.6812 19.2744 22.4917C17.8785 21.8126 16.9336 20.3802 16.9336 18.75C16.9336 17.1198 17.8785 15.6875 19.2744 15.0083C18.2319 13.8188 16.7023 13.0664 15 13.0664C11.8661 13.0664 9.31641 15.6161 9.31641 18.75C9.31641 21.8839 11.8661 24.4336 15 24.4336Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M15 11.3086C17.7339 11.3086 20.1278 12.7908 21.4214 14.9937C21.4485 15.0329 21.4723 15.0746 21.4929 15.1184C22.0965 16.1933 22.4414 17.432 22.4414 18.75C22.4414 20.0694 22.0958 21.3094 21.491 22.3851C21.4712 22.4266 21.4487 22.4663 21.4229 22.5037C20.1297 24.708 17.735 26.1914 15 26.1914C10.8968 26.1914 7.55859 22.8532 7.55859 18.75C7.55859 14.6468 10.8968 11.3086 15 11.3086ZM3.33984 29.1211C3.33984 29.6065 3.73336 30 4.21875 30H25.7812C26.2666 30 26.6602 29.6065 26.6602 29.1211V9.31641H3.33984V29.1211Z"
                                fill="#BCBCBC"
                              />
                              <path
                                d="M21.5625 5.56641H18.2812C17.7959 5.56641 17.4023 5.17289 17.4023 4.6875C17.4023 4.20211 17.7959 3.80859 18.2812 3.80859H21.5625C22.0479 3.80859 22.4414 4.20211 22.4414 4.6875C22.4414 5.17289 22.0479 5.56641 21.5625 5.56641ZM11.7187 5.56395C11.2347 5.56395 10.8424 5.17154 10.8424 4.6875C10.8424 4.20346 11.2347 3.81105 11.7187 3.81105C12.2028 3.81105 12.5951 4.20346 12.5951 4.6875C12.5951 5.17154 12.2028 5.56395 11.7187 5.56395ZM7.96875 5.53898C7.49853 5.53898 7.11732 5.15777 7.11732 4.6875C7.11732 4.21723 7.49853 3.83602 7.96875 3.83602C8.43896 3.83602 8.82018 4.21723 8.82018 4.6875C8.82018 5.15777 8.43896 5.53898 7.96875 5.53898ZM24.9023 0H5.09766C4.1284 0 3.33984 0.788555 3.33984 1.75781V7.55859H26.6602V1.75781C26.6602 0.788555 25.8716 0 24.9023 0Z"
                                fill="#BCBCBC"
                              />
                            </g>
                          </svg>
                          20€
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="checkout-total">
                  <h6>Gesamt</h6>
                  <p>{bookingData?.reservation?.[0]?.totalPrice} € </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
}
