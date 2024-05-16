import React from "react";
import "./Details.css";
import "glightbox/dist/css/glightbox.css";
import Footer from "../../components/footer/Footer";
import { useParams, useLocation, Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import Modals from "../../components/modals/Modal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CalendarComp from "../../components/calendar/CalendarComp";
import ReservationComp from "../../components/reservation/ReservationComp";

export default function Details() {
  const location = useLocation();
  const { showModal2, closeModal2 } = useModal();

  const { card } = location.state || {};

  console.log(card);
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
              <div className="reservation-container">
                <ReservationComp id="1978163" />
              </div>
            </div>
            <div className="right_side">
              <div className="right_box">
                <CalendarComp
                  id={card?.id}
                  loadCalendarUrl={card?.loadCalendarUrl}
                  verification={card?.verification}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals
        show={showModal2}
        onHide={closeModal2}
        customClass={"whatsapp_modal"}
        customBackdropClass={"whatsapp_backdrop"}
      >
        <span className="whatsapp_title d-flex justify-content-center">
          Bitte kontaktieren Sie den Besitzer über WhatsApp.
        </span>
        <span className="whatsapp_number">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M44.5951 40.2089C43.2325 40.7658 42.362 42.8991 41.4789 43.9889C41.0261 44.5472 40.4861 44.6344 39.79 44.3545C34.6754 42.3169 30.7548 38.9039 27.9325 34.1972C27.4544 33.4673 27.5401 32.8908 28.1167 32.213C28.9689 31.2089 30.0404 30.0684 30.2711 28.7156C30.7829 25.7231 26.8708 16.4405 21.7042 20.6466C6.83732 32.7614 46.5048 64.8928 53.664 47.5144C55.689 42.5883 46.8536 39.2836 44.5951 40.2089ZM36.0001 65.7113C30.7422 65.7113 25.5686 64.3134 21.039 61.6669C20.312 61.2408 19.4331 61.1283 18.6203 61.3491L8.77794 64.0505L12.2064 56.4975C12.6733 55.4695 12.5537 54.2728 11.8942 53.3587C8.2267 48.2752 6.28748 42.2733 6.28748 36C6.28748 19.6158 19.6159 6.28734 36.0001 6.28734C52.3844 6.28734 65.7114 19.6158 65.7114 36C65.7114 52.3828 52.3829 65.7113 36.0001 65.7113ZM36.0001 0C16.1495 0 0.000132218 16.1494 0.000132218 36C0.000132218 42.9834 1.98294 49.6898 5.75029 55.5103L0.281382 67.5548C-0.223462 68.6672 -0.0392427 69.9694 0.75107 70.8961C1.35857 71.6062 2.23748 72 3.14451 72C5.17232 72 16.2297 68.5252 19.0436 67.7531C24.2453 70.5361 30.0798 72 36.0001 72C55.8493 72 72.0001 55.8492 72.0001 36C72.0001 16.1494 55.8493 0 36.0001 0Z"
            />
          </svg>
          <span>49 176 83174731</span>
        </span>
        <div className="whatsapp_button">
          <button className="btn" onClick={closeModal2}>
            OK
          </button>
        </div>
      </Modals>
      <Footer />
    </>
  );
}
