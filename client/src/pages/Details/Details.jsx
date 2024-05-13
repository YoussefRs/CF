import React, { useEffect, useState, useRef, Fragment } from "react";
import "./Details.css";
import Navbar from "../../components/navbar/Navbar";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import Footer from "../../components/footer/Footer";
import CalendarComp from "../../components/calendar/CalendarComp";
import logo from "../../assets/homepage_mats/city-flat.png";
import { useParams, useLocation, Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Modals from "../../components/modals/Modal";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import LoginRegister from "../../components/modals/LoginRegister";
import { createNewBooking } from "../../redux/BookingSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Details() {
  const { loginModal, openLoginModal, closeLoginModal } = useModal();
  const user = useSelector((state) => state?.auth?.user?.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    showModal,
    openModal,
    closeModal,
    showModal2,
    openModal2,
    closeModal2,
  } = useModal();

  const [showLoginReview, setShowLoginReview] = useState(false);
 
  const { id } = useParams();
  const { card } = location.state || {};
  const admin = JSON.parse(localStorage.getItem("user"));
  const reviews = JSON.parse(localStorage.getItem("reviews"));
  const [showCalendar, setShowCalendar] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [approvedBookings, setApprovedBookings] = useState([])
  const onHide = () => {
    setShowLoginReview(false);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRatingChange = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const formatDateString = (date) => {
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;
  };
  const formattedDates = card?.prices?.map((dateObj) => {
    const startDate = new Date(dateObj.start_date);
    const endDate = new Date(dateObj.end_date);

    const datesArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      datesArray.push({
        date: formatDateString(new Date(currentDate)),
        price: dateObj.price,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      text: reviewText,
      rating: rating,
      user: admin?.username,
    };
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const updatedReviews = [...storedReviews, newReview];
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setReviewText("");
    setRating(0);
  };

  const [bookingData, setBookingData] = useState({
    startDate: null,
    endDate: null,
    nightsCount: 0,
    services: [],
  });

  const servicePrices = {
    Parking: 20,
    Food: 20,
    Laundry: 50,
    Rent: 30,
  };
  const ServicesFees = bookingData.services.reduce((total, service) => {
    return total + servicePrices[service.name];
  }, 0);

  const handleServiceSelection = (serviceName) => {
    const price = servicePrices[serviceName];
    const selectedService = {
      name: serviceName,
      price: price,
    };

    if (bookingData.services.some((s) => s.name === serviceName)) {
      setBookingData({
        ...bookingData,
        services: bookingData.services.filter((s) => s.name !== serviceName),
      });
    } else {
      setBookingData({
        ...bookingData,
        services: [...bookingData.services, selectedService],
      });
    }
  };

  const toggleCalendar = () => {
    setShowCalendar((prevShowCalendar) => !prevShowCalendar);
  };

  useEffect(() => {
    const lightbox = GLightbox({
      touchNavigation: true,
      loop: true,
      width: "90vw",
      height: "90vh",
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  // const calculateTotalPrice = () => {
  //   let normalNightsPrice = 0;
  //   let specialNightsPrice = 0;
  //   let normalNightsCount = 0;
  //   let specialNightsCount = 0;

  //   if (bookingData && card && bookingData.startDate && bookingData.endDate) {
  //     const startDate = new Date(bookingData.startDate);
  //     const endDate = new Date(bookingData.endDate);

  //     // Calculate the number of nights between the start and end dates
  //     let totalNightsCount = Math.floor(
  //       (endDate - startDate) / (1000 * 60 * 60 * 24)
  //     );

  //     for (let i = 0; i <= totalNightsCount; i++) {
  //       const currentDate = new Date(startDate);
  //       currentDate.setDate(currentDate.getDate() + i);
  //       let isSpecialDate = false;

  //       // Check if the current date is within any special date range
  //       for (const price of card.prices) {
  //         const priceStartDate = new Date(price.start_date);
  //         const priceEndDate = new Date(price.end_date);
  //         if (currentDate >= priceStartDate && currentDate <= priceEndDate) {
  //           isSpecialDate = true;
  //           specialNightsPrice += parseFloat(price.price);
  //           specialNightsCount++; // Increment special nights count
  //           break;
  //         }
  //       }

  //       // If the current date is not a special date, it's a normal night
  //       if (!isSpecialDate) {
  //         normalNightsPrice += parseFloat(card.price);
  //         normalNightsCount++; // Increment normal nights count
  //       }
  //     }
  //   }

  //   const totalPrice = normalNightsPrice + specialNightsPrice + ServicesFees;

  //   // Return total price along with counts of special and normal nights
  //   return {
  //     totalPrice,
  //     specialNightsPrice,
  //     normalNightsPrice,
  //     specialNightsCount,
  //     normalNightsCount,
  //   };
  // };


  // Usage example:
  
  const calculateTotalPrice = () => {
    let normalNightsPrice = 0;
    let specialNightsPrice = 0;
    let normalNightsCount = 0;
    let specialNightsCount = 0;
    let specialStartDates = [];
    let specialEndDates = [];
  
    if (bookingData && card && bookingData.startDate && bookingData.endDate) {
      const startDate = new Date(bookingData.startDate);
      const endDate = new Date(bookingData.endDate);
  
      // Iterate over each special date range
      for (const price of card.prices) {
        const priceStartDate = new Date(price.start_date);
        const priceEndDate = new Date(price.end_date);
  
        // Check if the special date range overlaps with the selected date range
        if (
          (startDate <= priceStartDate && endDate >= priceStartDate) ||
          (startDate <= priceEndDate && endDate >= priceEndDate) ||
          (startDate >= priceStartDate && endDate <= priceEndDate)
        ) {
          // Calculate the number of nights within the special date range
          const nightsInSpecialRange = Math.ceil(
            (Math.min(endDate, priceEndDate) - Math.max(startDate, priceStartDate)) /
              (1000 * 60 * 60 * 24)
          );
  
          // Increment special nights count and price
          specialNightsCount += nightsInSpecialRange;
          specialNightsPrice += parseFloat(price.price) * nightsInSpecialRange;
  
          // Add the special date range to the lists if not already present
          if (!specialStartDates.includes(price.start_date)) {
            specialStartDates.push(price.start_date);
          }
          if (!specialEndDates.includes(price.end_date)) {
            specialEndDates.push(price.end_date);
          }
        }
      }
  
      // Calculate the number of normal nights
      normalNightsCount = Math.ceil(
        (endDate - startDate - specialNightsCount * (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60 * 24)
      );
  
      // Calculate the normal nights price
      normalNightsPrice = normalNightsCount * parseFloat(card.price);
    }
  
    // Calculate the total price by adding special, normal, and service fees
    const totalPrice = normalNightsPrice + specialNightsPrice + ServicesFees;
  
    // Return the calculated values
    return {
      totalPrice,
      specialNightsPrice,
      normalNightsPrice,
      specialNightsCount,
      normalNightsCount,
    };
  };

 
  const {
    totalPrice,
    specialNightsPrice,
    normalNightsPrice,
    specialNightsCount,
    normalNightsCount,
  } = calculateTotalPrice();

  const submitBookingData = () => {
    if (!bookingData.startDate || !bookingData.endDate) {
      toast.error("Bitte wählen Sie Start- und Enddaten aus.");
      return; // Prevent further execution
    }
  
    if (user) {
      let bookingDataList = {
        ...bookingData,
        userId: user?.id,
        apartmentId: card?.id,
        userEmail: user?.email,
        servicesFee: ServicesFees,
        normalNightsCount: normalNightsCount,
        normalNightsPrice: normalNightsPrice,
        specialNightsCount: specialNightsCount,
        specialNightsPrice: specialNightsPrice,
        totalPrice: totalPrice,
      };
      console.log(bookingDataList);
      dispatch(createNewBooking(bookingDataList));
      setBookingData({
        startDate: null,
        endDate: null,
        nightsCount: 0,
        services: [],
      });
      toast.success("Buchung abgeschlossen. Sie werden per E-Mail benachrichtigt, sobald der Eigentümer sie akzeptiert.");
      setShowCalendar(false);
      closeModal();
    } else {
      openLoginModal();
    }
  };
  

  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="_details">
        <div className="_details_big_container">
          <div className="_container">
            <div className="photos-grid-title-container">
              <span>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_43_680)">
                    <path
                      d="M3.67396 24.8759C3.67396 24.8759 3.64996 25.4799 4.23996 25.4799C4.97396 25.4799 11.051 25.4719 11.051 25.4719L11.061 19.8909C11.061 19.8909 10.965 18.9709 11.858 18.9709H14.684C15.74 18.9709 15.675 19.8909 15.675 19.8909L15.663 25.4539C15.663 25.4539 21.425 25.4539 22.33 25.4539C23.079 25.4539 23.045 24.7019 23.045 24.7019V14.4129L13.649 6.05493L3.67396 14.4129V24.8759Z"
                      fill="#030104"
                    />
                    <path
                      d="M0 13.635C0 13.635 0.847 15.196 2.694 13.635L13.732 4.29704L24.081 13.577C26.219 15.119 27.02 13.577 27.02 13.577L13.732 1.54004L0 13.635Z"
                      fill="#030104"
                    />
                    <path
                      d="M23.83 4.27515H21.168L21.179 7.50315L23.83 9.75215V4.27515Z"
                      fill="#030104"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_43_680">
                      <rect width="27.02" height="27.02" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                / {card?.name}
              </span>
            </div>
            <div id="gallery" className="photos-grid-container gallery">
              {/* <div className="main-photo">
                <a
                  href={card?.images[0]}
                  className="glightbox"
                  data-glightbox="type: image"
                >
                  <img src={card?.images[0]} alt="image" />
                </a>
              </div> */}
              {card?.images?.length > 1 ? (
                <>
                  <div className="main-photo d-sm-block d-none">
                    <a
                      href={card.images[0]?.image_url}
                      className="glightbox"
                      data-glightbox="type: image"
                    >
                      <img src={card.images[0].image_url} alt="image" />
                    </a>
                  </div>
                  <div className="sub">
                    {card?.images?.slice(1, 4).map((appPic, i) => (
                      <div className="img-box" key={i}>
                        <a
                          href={appPic.image_url}
                          className="glightbox"
                          data-glightbox="type: image"
                        >
                          <img src={appPic?.image_url} alt="image" />
                        </a>
                      </div>
                    ))}
                    {card?.images?.length > 4 && (
                      <div id="multi-link" className="img-box">
                        <a
                          href={card?.images[4]?.image_url}
                          className="glightbox"
                          data-glightbox="type: image"
                        >
                          <img src={card?.images[4]?.image_url} alt="image" />
                          <div className="transparent-box">
                            <div className="caption">
                              +{card?.images?.length - 4}{" "}
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                    <div
                      id="more-img"
                      className="extra-images-container hide-element"
                    >
                      {card?.images?.map((more, i) => (
                        <a
                          href={more?.image_url}
                          className="glightbox"
                          data-glightbox="type: image"
                          key={i}
                        >
                          <img src={more?.image_url} alt="image" />
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="photos_sm">
                    <div id="multi-link" className="img-box">
                      <a
                        href={card?.images[0].image_url}
                        className="glightbox"
                        data-glightbox="type: image"
                      >
                        <img src={card?.images[0].image_url} alt="image" />
                        <div className="transparent-box">
                          <div className="caption">
                            +{card?.images?.length}{" "}
                          </div>
                        </div>
                      </a>
                    </div>
                    <div
                      id="more-img"
                      className="extra-images-container hide-element"
                    >
                      {card?.more?.map((more, i) => (
                        <a
                          href={more?.url}
                          className="glightbox"
                          data-glightbox="type: image"
                          key={i}
                        >
                          <img src={more?.url} alt="image" />
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="main-single-photo">
                  <a
                    href={card?.images[0].image_url}
                    className="glightbox"
                    data-glightbox="type: image"
                  >
                    <img src={card.images[0].image_url} alt="image" />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="_inner_container">
            <div className="left_side">
              <div className="left_sqaure" id="special_sqaure">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="_medium_title">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_43_736)">
                        <path
                          d="M8.44356 0.00361089C11.9618 -0.114956 14.8511 2.70174 14.8511 6.19321C14.8511 10.1556 11.0485 13.0313 8.91716 17.1669C8.80894 17.3769 8.50667 17.3771 8.39809 17.1672C6.46999 13.446 3.1746 10.9507 2.56388 7.3658C1.93155 3.65608 4.68254 0.130408 8.44356 0.00361089ZM8.65793 9.43723C10.4495 9.43723 11.9019 7.98477 11.9019 6.19321C11.9019 4.40166 10.4495 2.9492 8.65793 2.9492C6.86633 2.9492 5.41388 4.40166 5.41388 6.19321C5.41388 7.98477 6.86633 9.43723 8.65793 9.43723Z"
                          fill="#DEC25F"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_43_736">
                          <rect
                            width="17.3245"
                            height="17.3245"
                            fill="white"
                            transform="matrix(-1 0 0 1 17.3246 0)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    {card.location}
                  </span>
                  <div className="d-flex align-items-center justify-content-end">
                    <span
                      style={{ display: "flex", alignItems: "center" }}
                      className="_medium_title rating__"
                    >
                      <svg
                        width="17"
                        height="15"
                        viewBox="0 0 17 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.28564 0L10.2416 5.72684H16.5713L11.4505 9.26622L13.4064 14.9931L8.28564 11.4537L3.16483 14.9931L5.12081 9.26622L0 5.72684H6.32966L8.28564 0Z"
                          fill="#DEC25F"
                        />
                      </svg>
                      4.7
                    </span>
                  </div>
                </div>
              </div>
              <div className="left_sqaure">
                <div className="d-flex align-items-center" id="sqaure-items">
                  <div className="d-flex me-4">
                    <aside>
                      <svg
                        width="50"
                        height="50"
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          y="0.186035"
                          width="49.814"
                          height="49.814"
                          rx="17.7907"
                          fill="#0DB254"
                          fillOpacity="0.05"
                        />
                        <path
                          d="M39.6917 25.5749C39.8877 25.2257 39.9913 24.8295 39.9919 24.4259V23.9893C39.9922 23.6874 39.9348 23.3884 39.8232 23.1095C39.7116 22.8305 39.5479 22.577 39.3415 22.3634L38.3241 21.3179V20.9789H41.1761L40.4812 15.234H35.055L34.3601 20.9789H37.2121V21.3179L36.1947 22.3634C35.9883 22.577 35.8246 22.8305 35.713 23.1095C35.6014 23.3884 35.544 23.6874 35.5443 23.9893V24.4259C35.545 24.8295 35.6485 25.2257 35.8445 25.5749H33.3204V35.3412H42.2158V25.5749H39.6917ZM38.88 28.4473H36.6562V27.2983H38.88V28.4473ZM38.88 32.4687H36.6562V31.3198H38.88V32.4687Z"
                          fill="#0DB254"
                        />
                        <path
                          d="M31.6526 25.753C31.6545 25.2586 31.5565 24.7693 31.3651 24.3163C31.1736 23.8632 30.8929 23.4564 30.5407 23.1218V14.6595H29.4288V15.8085H12.75V14.6595H11.6381V23.1218C11.2865 23.4569 11.0061 23.8638 10.8147 24.3167C10.6233 24.7696 10.525 25.2587 10.5262 25.753V26.7239H9.97021V35.3412H11.0821V31.3198H31.0967V35.3412H32.2086V26.7239H31.6526V25.753ZM13.8619 22.1279V20.4045C13.8619 19.9474 14.0377 19.509 14.3504 19.1858C14.6632 18.8626 15.0875 18.681 15.5298 18.681H18.8656C19.3079 18.681 19.7321 18.8626 20.0449 19.1858C20.3577 19.509 20.5334 19.9474 20.5334 20.4045V22.1279H13.8619ZM21.6454 20.4045C21.6454 19.9474 21.8211 19.509 22.1339 19.1858C22.4467 18.8626 22.8709 18.681 23.3132 18.681H26.649C27.0913 18.681 27.5156 18.8626 27.8284 19.1858C28.1411 19.509 28.3169 19.9474 28.3169 20.4045V22.1279H21.6454V20.4045ZM11.6381 25.753C11.6415 25.3861 11.7248 25.0247 11.8816 24.6956C12.0385 24.3664 12.265 24.0779 12.5443 23.8514C12.9606 23.4857 13.4879 23.2824 14.0343 23.2769H28.1445C28.6909 23.2824 29.2182 23.4857 29.6345 23.8514L29.6957 23.9031C29.9579 24.1297 30.1693 24.4125 30.3152 24.7319C30.4611 25.0514 30.5381 25.3998 30.5407 25.753V26.7239H11.6381V25.753Z"
                          fill="#0DB254"
                        />
                      </svg>
                    </aside>
                    <div className="ms-2">
                      <section className="_small_title">Bedroom</section>
                      <section className="_rooms_number">
                        {card.bedroom} rooms
                      </section>
                    </div>
                  </div>
                  <div className="d-flex ">
                    <aside>
                      <svg
                        width="51"
                        height="50"
                        viewBox="0 0 51 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.62793"
                          y="0.186035"
                          width="49.814"
                          height="49.814"
                          rx="17.7907"
                          fill="#0DB254"
                          fillOpacity="0.05"
                        />
                        <g clipPath="url(#clip0_0_1)">
                          <path
                            d="M28.9446 18.5925C28.7668 18.5925 28.5889 18.5246 28.4533 18.3889L28.0826 18.0183C27.8112 17.7469 27.8112 17.3069 28.0826 17.0355C28.354 16.7641 28.794 16.7641 29.0654 17.0355L29.4361 17.4061C29.8751 17.8452 29.5582 18.5925 28.9446 18.5925Z"
                            fill="#0DB254"
                          />
                          <path
                            d="M25.9796 18.9632C25.8017 18.9632 25.6238 18.8954 25.4882 18.7596L25.1175 18.389C24.8461 18.1176 24.8461 17.6776 25.1175 17.4062C25.3889 17.1348 25.8289 17.1348 26.1003 17.4062L26.471 17.7768C26.9101 18.2159 26.5931 18.9632 25.9796 18.9632Z"
                            fill="#0DB254"
                          />
                          <path
                            d="M28.9446 21.5577C28.7668 21.5577 28.5889 21.4899 28.4533 21.3541L28.0826 20.9835C27.8112 20.7121 27.8112 20.2721 28.0826 20.0007C28.354 19.7293 28.794 19.7293 29.0654 20.0007L29.4361 20.3713C29.8751 20.8104 29.5582 21.5577 28.9446 21.5577Z"
                            fill="#0DB254"
                          />
                          <path
                            d="M37.8863 24.5227H15.5553C15.1715 24.5227 14.8604 24.2115 14.8604 23.8277C14.8604 23.4439 15.1715 23.1328 15.5553 23.1328H16.3893V14.4434C16.3893 12.6977 17.8016 11.2826 19.5497 11.2826C20.2797 11.2826 20.9919 11.5378 21.555 11.9997L21.9914 12.3578C22.9681 11.783 24.2486 11.9143 25.0863 12.752L26.1346 13.8003C26.406 14.0717 26.406 14.5117 26.1346 14.7831L23.5138 17.4039C23.2424 17.6753 22.8024 17.6754 22.531 17.4039C21.4181 16.2911 21.4873 16.3556 21.4826 16.3556C20.6749 15.5479 20.5239 14.3283 21.0296 13.3666L20.6733 13.0743C20.3596 12.8169 19.9632 12.6742 19.5574 12.6725C18.6079 12.664 17.7792 13.436 17.7792 14.4434V23.1328C18.4912 23.1328 37.1811 23.1328 37.8863 23.1328C38.2701 23.1328 38.5813 23.444 38.5813 23.8278C38.5813 24.2116 38.2701 24.5227 37.8863 24.5227Z"
                            fill="#0DB254"
                          />
                          <path
                            d="M36.6848 25.9126L36.3887 27.541C35.9481 29.9647 34.1497 31.8469 31.8635 32.4621V33.4644C31.8635 33.8482 31.5524 34.1594 31.1686 34.1594C30.7848 34.1594 30.4736 33.8482 30.4736 33.4644V32.672C30.2567 32.6802 23.1601 32.6792 22.9682 32.672V33.4644C22.9682 33.8482 22.657 34.1594 22.2732 34.1594C21.8894 34.1594 21.5783 33.8482 21.5783 33.4644V32.4621C19.2921 31.8469 17.4937 29.9647 17.0531 27.5411L16.757 25.9126H36.6848V25.9126Z"
                            fill="#0DB254"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_0_1">
                            <rect
                              width="23.7209"
                              height="23.7209"
                              fill="white"
                              transform="matrix(-1 0 0 1 38.5813 10.8605)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </aside>
                    <div className="ms-2">
                      <section className="_small_title">bathroom</section>
                      <section className="_rooms_number">
                        {card.bathroom} rooms
                      </section>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column mt-2">
                <span className="_details_title p-0">description</span>
                <span className="_description">{card.description}</span>
              </div>
              <div className="calendar_box">
                <div className="d-flex flex-column mt-2">
                  <span className="_details_title p-0 mb-2">calendar</span>
                  <div className="left_sqaure">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <button
                        onClick={toggleCalendar}
                        className={showCalendar ? "active" : ""}
                      >
                        Day
                      </button>
                      <button onClick={() => openModal2()}>Month</button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`left_sqaure ${showCalendar ? "show" : "hide"}`}
                style={{
                  transition: "height 0.5s ease",
                  height: showCalendar ? "350px" : "0",
                  overflow: "hidden",
                }}
              >
                <CalendarComp
                  setBookingData={setBookingData}
                  bookingData={bookingData}
                  formattedDates={formattedDates}
                  card={card}
                />
              </div>
              {formattedDates && (
                <div className="d-flex flex-column mt-2">
                  <span className="_medium_title2 p-0">Special dates</span>
                  <div className="small_sqaure mt-2">
                    <div className="d-flex flex-column">
                      {formattedDates?.map((datesArray, i) => (
                        <Fragment key={i}>
                          {datesArray.map((date, i) => (
                            <div
                              className="d-flex align-items-center mb-1"
                              key={i}
                            >
                              <span className="d-flex align-items-center gap-2 _very_small_title me-5">
                                {" "}
                                <svg
                                  width="18"
                                  height="19"
                                  viewBox="0 0 18 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <g clipPath="url(#clip0_43_833)">
                                    <path
                                      d="M6.06985 10.4776C6.06985 10.7401 5.85505 10.9549 5.59258 10.9549H3.20616C2.94368 10.9549 2.72888 10.7401 2.72888 10.4776V8.88249C2.72888 8.61996 2.94368 8.40521 3.20616 8.40521H5.59258C5.85511 8.40521 6.06985 8.62001 6.06985 8.88249V10.4776Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M6.06985 14.6693C6.06985 14.9319 5.85505 15.1466 5.59258 15.1466H3.20616C2.94368 15.1466 2.72888 14.9318 2.72888 14.6693V13.0742C2.72888 12.8117 2.94368 12.5969 3.20616 12.5969H5.59258C5.85511 12.5969 6.06985 12.8117 6.06985 13.0742V14.6693Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M10.6174 10.4776C10.6174 10.7401 10.4026 10.9549 10.1401 10.9549H7.75364C7.49111 10.9549 7.27637 10.7401 7.27637 10.4776V8.88249C7.27637 8.61996 7.49117 8.40521 7.75364 8.40521H10.1401C10.4026 8.40521 10.6174 8.62001 10.6174 8.88249V10.4776Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M10.6174 14.6693C10.6174 14.9319 10.4026 15.1466 10.1401 15.1466H7.75364C7.49111 15.1466 7.27637 14.9318 7.27637 14.6693V13.0742C7.27637 12.8117 7.49117 12.5969 7.75364 12.5969H10.1401C10.4026 12.5969 10.6174 12.8117 10.6174 13.0742V14.6693Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M15.1091 10.4776C15.1091 10.7401 14.8943 10.9549 14.6318 10.9549H12.2453C11.9828 10.9549 11.7681 10.7401 11.7681 10.4776V8.88249C11.7681 8.61996 11.9829 8.40521 12.2453 8.40521H14.6318C14.8943 8.40521 15.1091 8.62001 15.1091 8.88249V10.4776Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M15.1091 14.6693C15.1091 14.9319 14.8943 15.1466 14.6318 15.1466H12.2453C11.9828 15.1466 11.7681 14.9318 11.7681 14.6693V13.0742C11.7681 12.8117 11.9829 12.5969 12.2453 12.5969H14.6318C14.8943 12.5969 15.1091 12.8117 15.1091 13.0742V14.6693Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M3.91992 4.83575C3.63478 4.83575 3.40149 4.60246 3.40149 4.31727V1.51147C3.40149 1.22627 3.63478 0.992981 3.91992 0.992981H4.99848C5.28362 0.992981 5.51696 1.22627 5.51696 1.51147V4.31727C5.51696 4.60241 5.28368 4.83575 4.99848 4.83575H3.91992Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M12.8993 4.83575C12.6141 4.83575 12.3809 4.60246 12.3809 4.31727V1.51147C12.3809 1.22627 12.6141 0.992981 12.8993 0.992981H13.9778C14.263 0.992981 14.4963 1.22627 14.4963 1.51147V4.31727C14.4963 4.60241 14.263 4.83575 13.9778 4.83575H12.8993Z"
                                      fill="#0DB254"
                                    />
                                    <path
                                      d="M17.2226 3.11322C17.2226 3.11322 16.3666 3.11322 15.7134 3.11322C15.6272 3.11322 15.4676 3.11322 15.4676 3.31202V4.19951C15.4676 5.04684 14.9983 5.73621 13.9309 5.73621H12.938C11.9259 5.73621 11.4013 5.04684 11.4013 4.19951L11.4013 3.35837C11.4013 3.19946 11.2903 3.11322 11.1578 3.11322C9.89347 3.11322 8.08364 3.11322 6.7744 3.11322C6.67714 3.11322 6.49227 3.11322 6.49227 3.36499V4.19951C6.49227 5.04684 6.06977 5.73621 4.95557 5.73621H3.96261C2.7288 5.73621 2.42591 5.04684 2.42591 4.19951V3.3981C2.42591 3.17297 2.22324 3.11322 2.1129 3.11322C1.46733 3.11322 0.670959 3.11322 0.670959 3.11322C0.395507 3.11322 0.170166 3.33856 0.170166 3.98503V17.3666C0.170166 17.271 0.395507 17.4964 0.670959 17.4964H17.2226C17.498 17.4964 17.7234 17.271 17.7234 17.3666V3.98503C17.7234 3.33856 17.498 3.11322 17.2226 3.11322ZM16.6105 15.8827C16.6105 16.1582 16.3852 16.3835 16.1097 16.3835H1.78384C1.50839 16.3835 1.28305 16.1582 1.28305 15.8827V7.59086C1.28305 7.3154 1.50839 7.09006 1.78384 7.09006H16.1097C16.3852 7.09006 16.6105 7.3154 16.6105 7.59086V15.8827Z"
                                      fill="#0DB254"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_43_833">
                                      <rect
                                        width="17.5532"
                                        height="17.5532"
                                        fill="white"
                                        transform="translate(0.170166 0.46814)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                {date.date}
                              </span>
                              <span className="days_title">
                                {date.price} € / Night
                              </span>
                            </div>
                          ))}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div
                className="d-flex flex-column mt-2"
                style={{ borderBottom: "1px solid rgba(188, 188, 188, 0.50)" }}
              >
                <span className="_details_title p-0 mb-3">
                  choose your services
                </span>
                <div className="btn-group d-flex align-items-center col-xs-12">
                  {card?.parking === 1 && (
                    <div className="select">
                      <input
                        type="checkbox"
                        id="item_1"
                        checked={bookingData?.services?.some(
                          (s) => s.name === "Parking"
                        )}
                        onChange={() => handleServiceSelection("Parking")}
                      />
                      <label
                        className="btn button_select d-flex align-items-center flex-column"
                        htmlFor="item_1"
                      >
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
                        <span>Parking</span>
                      </label>
                    </div>
                  )}
                  {card?.food === 1 && (
                    <div className="select">
                      <input
                        type="checkbox"
                        id="item_2"
                        checked={bookingData?.services?.some(
                          (s) => s.name === "Food"
                        )}
                        onChange={() => handleServiceSelection("Food")}
                      />
                      <label
                        className="btn button_select d-flex align-items-center flex-column"
                        htmlFor="item_2"
                      >
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
                      </label>
                    </div>
                  )}
                  {card?.laundry === 1 && (
                    <div className="select">
                      <input
                        type="checkbox"
                        id="item_3"
                        checked={bookingData?.services?.some(
                          (s) => s.name === "Laundry"
                        )}
                        onChange={() => handleServiceSelection("Laundry")}
                      />
                      <label
                        className="btn button_select d-flex align-items-center flex-column"
                        htmlFor="item_3"
                      >
                        <svg
                          viewBox="0 0 30 30"
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
                            <path d="M20.2234 20.9895C20.5194 20.3019 20.6836 19.5448 20.6836 18.75C20.6836 17.9552 20.5194 17.1981 20.2234 16.5105C19.3195 16.8609 18.6914 17.7395 18.6914 18.75C18.6914 19.7604 19.3195 20.6391 20.2234 20.9895Z" />
                            <path d="M15 24.4336C16.7023 24.4336 18.2319 23.6812 19.2744 22.4917C17.8785 21.8126 16.9336 20.3802 16.9336 18.75C16.9336 17.1198 17.8785 15.6875 19.2744 15.0083C18.2319 13.8188 16.7023 13.0664 15 13.0664C11.8661 13.0664 9.31641 15.6161 9.31641 18.75C9.31641 21.8839 11.8661 24.4336 15 24.4336Z" />
                            <path d="M15 11.3086C17.7339 11.3086 20.1278 12.7908 21.4214 14.9937C21.4485 15.0329 21.4723 15.0746 21.4929 15.1184C22.0965 16.1933 22.4414 17.432 22.4414 18.75C22.4414 20.0694 22.0958 21.3094 21.491 22.3851C21.4712 22.4266 21.4487 22.4663 21.4229 22.5037C20.1297 24.708 17.735 26.1914 15 26.1914C10.8968 26.1914 7.55859 22.8532 7.55859 18.75C7.55859 14.6468 10.8968 11.3086 15 11.3086ZM3.33984 29.1211C3.33984 29.6065 3.73336 30 4.21875 30H25.7812C26.2666 30 26.6602 29.6065 26.6602 29.1211V9.31641H3.33984V29.1211Z" />
                            <path d="M21.5625 5.56641H18.2812C17.7959 5.56641 17.4023 5.17289 17.4023 4.6875C17.4023 4.20211 17.7959 3.80859 18.2812 3.80859H21.5625C22.0479 3.80859 22.4414 4.20211 22.4414 4.6875C22.4414 5.17289 22.0479 5.56641 21.5625 5.56641ZM11.7187 5.56395C11.2347 5.56395 10.8424 5.17154 10.8424 4.6875C10.8424 4.20346 11.2347 3.81105 11.7187 3.81105C12.2028 3.81105 12.5951 4.20346 12.5951 4.6875C12.5951 5.17154 12.2028 5.56395 11.7187 5.56395ZM7.96875 5.53898C7.49853 5.53898 7.11732 5.15777 7.11732 4.6875C7.11732 4.21723 7.49853 3.83602 7.96875 3.83602C8.43896 3.83602 8.82018 4.21723 8.82018 4.6875C8.82018 5.15777 8.43896 5.53898 7.96875 5.53898ZM24.9023 0H5.09766C4.1284 0 3.33984 0.788555 3.33984 1.75781V7.55859H26.6602V1.75781C26.6602 0.788555 25.8716 0 24.9023 0Z" />
                          </g>
                        </svg>
                        <span>Laundry</span>
                      </label>
                    </div>
                  )}
                  {card?.rent === 1 && (
                    <div className="select">
                      <input
                        type="checkbox"
                        id="item_4"
                        checked={bookingData?.services?.some(
                          (s) => s.name === "Rent"
                        )}
                        onChange={() => handleServiceSelection("Rent")}
                      />
                      <label
                        className="btn button_select d-flex align-items-center flex-column"
                        htmlFor="item_4"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          fill="currentColor"
                          className="bi bi-car-front"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                          <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                        </svg>
                        <span>Rent</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              {user ? (
                <>
                  <div className="_reviews mt-2">
                    {reviews?.map((review, i) => (
                      <Fragment key={i}>
                        <div className="_review_box">
                          <div className="_review_img">
                            <img src={logo} alt="" />
                          </div>
                        </div>
                        <div className="_review_box">
                          <div className="_review_text d-flex flex-column">
                            <span className="d-flex flex-column _medium_title lh-1">
                              {review?.username}
                              {/* <fieldset className="rating">
                            <input
                              type="radio"
                              id="star5"
                              name="rating"
                              checked={reviews?.rating}
                            />
                            <label
                              className="full"
                              htmlFor="star5"
                              title="Awesome - 5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4half"
                              name="rating"
                              value={4.5}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="half"
                              htmlFor="star4half"
                              title="Pretty good - 4.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star4"
                              name="rating"
                              value={4}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="full"
                              htmlFor="star4"
                              title="Pretty good - 4 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3half"
                              name="rating"
                              value={3.5}
                              checked={reviews?.rating}
                            />
                            <label
                              className="half"
                              htmlFor="star3half"
                              title="Meh - 3.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star3"
                              name="rating"
                              value={3}
                              onChange={handleRatingChange}
                              checked={reviews?.rating}
                            />
                            <label
                              className="full"
                              htmlFor="star3"
                              title="Meh - 3 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star2half"
                              name="rating"
                              value={2.5}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="half"
                              htmlFor="star2half"
                              title="Kinda bad - 2.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star2"
                              name="rating"
                              value={2}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="full"
                              htmlFor="star2"
                              title="Kinda bad - 2 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star1half"
                              name="rating"
                              value={1.5}
                              onChange={handleRatingChange}
                              checked={reviews?.rating}
                            />
                            <label
                              className="half"
                              htmlFor="star1half"
                              title="Meh - 1.5 stars"
                            ></label>
                            <input
                              type="radio"
                              id="star1"
                              name="rating"
                              value={1}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="full"
                              htmlFor="star1"
                              title="Sucks big time - 1 star"
                            ></label>
                            <input
                              type="radio"
                              id="starhalf"
                              name="rating"
                              value={0.5}
                              onChange={handleRatingChange}
                            />
                            <label
                              className="half"
                              htmlFor="starhalf"
                              title="Sucks big time - 0.5 stars"
                            ></label>
                          </fieldset> */}
                            </span>
                            <span></span>
                            <span className="_description">{review?.text}</span>
                          </div>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <div className="_review_box d-flex flex-column">
                    <textarea
                      rows="3"
                      name="description"
                      placeholder="Write review ..."
                      value={reviewText}
                      onChange={handleReviewTextChange}
                      required
                    ></textarea>
                    <fieldset className="rating">
                      <input
                        type="radio"
                        id="star5"
                        name="rating"
                        value="5"
                        onChange={handleRatingChange}
                      />
                      <label
                        className="full"
                        htmlFor="star5"
                        title="Awesome - 5 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star4half"
                        name="rating"
                        value={4.5}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="half"
                        htmlFor="star4half"
                        title="Pretty good - 4.5 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star4"
                        name="rating"
                        value={4}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="full"
                        htmlFor="star4"
                        title="Pretty good - 4 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star3half"
                        name="rating"
                        value={3.5}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="half"
                        htmlFor="star3half"
                        title="Meh - 3.5 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star3"
                        name="rating"
                        value={3}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="full"
                        htmlFor="star3"
                        title="Meh - 3 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star2half"
                        name="rating"
                        value={2.5}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="half"
                        htmlFor="star2half"
                        title="Kinda bad - 2.5 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star2"
                        name="rating"
                        value={2}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="full"
                        htmlFor="star2"
                        title="Kinda bad - 2 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star1half"
                        name="rating"
                        value={1.5}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="half"
                        htmlFor="star1half"
                        title="Meh - 1.5 stars"
                      ></label>
                      <input
                        type="radio"
                        id="star1"
                        name="rating"
                        value={1}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="full"
                        htmlFor="star1"
                        title="Sucks big time - 1 star"
                      ></label>
                      <input
                        type="radio"
                        id="starhalf"
                        name="rating"
                        value={0.5}
                        onChange={handleRatingChange}
                      />
                      <label
                        className="half"
                        htmlFor="starhalf"
                        title="Sucks big time - 0.5 stars"
                      ></label>
                    </fieldset>

                    <div className="square" id="_review_button">
                      <button onClick={handleSubmit}>Submit</button>
                    </div>
                  </div>
                </>
              ) : (
                <p className="mt-3 mb-3">
                  Please{" "}
                  <button onClick={() => setShowLoginReview(true)}>
                    log in
                  </button>{" "}
                  to share your feedback. Please
                </p>
              )}
              <div className="_mobile-box left_sqaure">
                <button onClick={() => openModal()}>Rent now</button>
              </div>
            </div>
            <div className="right_side">
              <div className="right_box">
                <span className="_details_title text-nowrap ">
                  reservation details :
                </span>
                <div
                  className="right_box_inner_container"
                  style={{ marginBottom: "1rem" }}
                >
                  <div className="first_square">
                    <span className="_medium_title">calendar</span>
                  </div>
                  <div className="square">
                    <span className="_small_title">
                      {bookingData &&
                      bookingData?.startDate &&
                      bookingData?.endDate
                        ? `${bookingData?.startDate} - ${bookingData?.endDate}`
                        : "No Selected Date"}
                    </span>
                    <span className="_small_title">
                      night : {bookingData?.nightsCount}{" "}
                    </span>
                  </div>
                  <div className="first_square h-100">
                    <span className="_medium_title">services</span>
                  </div>
                  <div className="square">
                    {bookingData?.services?.length > 0 ? (
                      bookingData?.services?.map((service, i) => (
                        <Fragment key={i}>
                          <div className="d-flex align-items-center">
                            <span className="icon me-2">
                              {service.name.toLowerCase() === "rent" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  className="bi bi-car-front"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                                  <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                                </svg>
                              ) : service.name.toLowerCase() === "laundry" ? (
                                <svg
                                  viewBox="0 0 30 30"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <mask
                                    id="mask0_189_3738"
                                    maskUnits="userSpaceOnUse"
                                    x={0}
                                    y={0}
                                    width={30}
                                    height={30}
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
                              ) : service.name.toLowerCase() === "food" ? (
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
                              ) : service.name.toLowerCase() === "parking" ? (
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
                              ) : null}
                            </span>
                            <span className="_small_title">{service.name}</span>
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <span className="_small_title">No Selected Service</span>
                    )}
                  </div>
                </div>
                <span className="_details_title text-nowrap ">
                  Payment Details :
                </span>
                <div className="right_box_inner_container">
                  <div className="first_square h-100 pt-2">
                    <span className="_medium_title">night fees</span>
                  </div>

                  <div className="square">
                    <span>{totalPrice} €</span>
                    <span className="_small_title">
                      Normal : {normalNightsCount} * {normalNightsPrice}€
                    </span>
                    <span className="_small_title">
                      Special : {specialNightsCount} * {specialNightsPrice}€
                    </span>
                  </div>
                  <div className="first_square h-100">
                    <span className="_medium_title">services</span>
                  </div>
                  <div className="square">
                    {bookingData?.services?.map((service, index) => (
                      <div key={index}>
                        {service.name === "Parking" && (
                          <span className="_small_title">
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
                            {service.price}
                          </span>
                        )}
                        {service.name === "Food" && (
                          <span className="_small_title">
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
                            {service.price}
                          </span>
                        )}
                        {service.name === "Laundry" && (
                          <span className="_small_title">
                            <svg
                              viewBox="0 0 30 30"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <mask
                                id="mask0_189_3738"
                                maskUnits="userSpaceOnUse"
                                x={0}
                                y={0}
                                width={30}
                                height={30}
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
                            {service.price}
                          </span>
                        )}
                        {service.name === "Rent" && (
                          <span className="_small_title">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              className="bi bi-car-front"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                              <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                            </svg>
                            {service.price}
                          </span>
                        )}
                      </div>
                    ))}
                    {bookingData?.services?.length == 0 && (
                      <div className="_small_title">No Services Selected</div>
                    )}
                  </div>
                </div>
                <div className="right_box_footer">
                  <div className="_right_box_footer_square">
                    <p className="_medium_title">night fees</p>
                    <p className="_medium_title">{totalPrice} €</p>
                  </div>
                  <div className="square" id="_right_box_button">
                    {/* <Link to={`/checkout/${bookingData.id}`}> */}
                      <button onClick={submitBookingData}>rent now</button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals show={showModal2} onHide={closeModal2} size={"md"}>
        <span className="_description d-flex justify-content-center">
          please contact the owner on whatsapp.
        </span>
      </Modals>
      <Modals show={showModal} onHide={closeModal} size={"md"}>
        <span className="_details_title">reservation details :</span>
        <div
          className="right_box_inner_container"
          style={{ marginBottom: "1rem" }}
        >
          <div className="first_square">
            <span className="_medium_title">calendar</span>
          </div>
          <div className="square">
            <span className="_small_title">
              {bookingData && bookingData?.startDate && bookingData?.endDate
                ? `${bookingData?.startDate} - ${bookingData?.endDate}`
                : "No Selected Date"}
            </span>
            <span className="_small_title">
              night : {bookingData?.nightsCount}{" "}
            </span>
          </div>
          <div className="first_square">
            <span className="_medium_title">services</span>
          </div>
          <div className="square">
            {bookingData?.services?.length > 0 ? (
              bookingData?.services?.map((service, i) => (
                <Fragment key={i}>
                  <span className="_small_title">{service}</span>
                </Fragment>
              ))
            ) : (
              <span className="_small_title">No Selected Service</span>
            )}
          </div>
        </div>
        <span className="_details_title">Payment Details :</span>
        <div className="right_box_inner_container">
          <div className="first_square">
            <span className="_medium_title">night fees</span>
          </div>

          <div className="square">{bookingData?.nightsCount} * 200€</div>
          <div className="first_square">
            <span className="_medium_title">services</span>
          </div>
          <div className="square">
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
                    <path d="M0 3.8147e-06H30V30H0V3.8147e-06Z" fill="white" />
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
            {bookingData?.services?.length == 0 && (
              <div className="_small_title">No Services Selected</div>
            )}
          </div>
        </div>
        <div className="right_box_footer" style={{ background: "#fff" }}>
          <div className="right_box_inner_container" style={{ padding: 0 }}>
            <p className="_medium_title">night fees</p>
            <p className="_medium_title">{totalPrice} €</p>
          </div>
          <div className="_mobile-box" id="_right_box_button">
            <button onClick={submitBookingData}>rent now</button>
          </div>
        </div>
      </Modals>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login_signin_modal"
        show={showLoginReview}
        onHide={onHide}
      >
        <Modal.Body className="d-flex justify-content-center flex-column items-center">
          <LoginRegister />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="login_signin_modal"
        show={loginModal}
        onHide={closeLoginModal}
      >
        <Modal.Body className="d-flex justify-content-center flex-column items-center">
          <LoginRegister show={loginModal} />
        </Modal.Body>
      </Modal>
      <Footer />
    </>
  );
}
