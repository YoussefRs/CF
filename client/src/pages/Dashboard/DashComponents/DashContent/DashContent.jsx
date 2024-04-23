import React from "react";
import "./DashContent.css";

export default function DashContent() {
  return (
    <>
      <div className="container-fluid overflow-auto py-4">
        <div className="mb-4">
          <h1 className="h3 mb-0 text-start">Dashboard</h1>
        </div>
        <div className="row">
          <div className="col-xl-4 col-md-6 mb-4">
            <div className="card border-left-success shadow h-100 py-2">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col-8 mr-2">
                    <div className="_date mb-1">
                      Earnings <small>(Annual)</small>
                    </div>
                    <div className="_number mt-3">$0,000</div>
                    <div className="_gold_text ">$0,000</div>
                  </div>
                  <div className="col-4 mr-2 d-flex align-items-center justify-content-center">
                    <div className="svg_ctr text-xs font-weight-bold text-muted text-uppercase mb-1">
                      <svg
                        width="53"
                        height="51"
                        viewBox="0 0 53 51"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M42.1012 0.604492H10.899C4.88925 0.604492 0 5.49374 0 11.5034C0 17.5422 4.94008 22.4024 10.8339 22.4024H15.7292V13.863C15.7292 10.0387 18.8404 6.92743 22.6645 6.92743H22.6797C26.4958 6.93561 29.6003 10.0469 29.6003 13.863V22.4024H42.1012C48.1109 22.4024 53 17.5131 53 11.5034C53 5.49374 48.1109 0.604492 42.1012 0.604492ZM45.1853 9.98363L38.9744 16.1946C38.3681 16.801 37.3849 16.8011 36.7785 16.1946L33.673 13.0891C33.0666 12.4827 33.0666 11.4996 33.673 10.8932C34.2793 10.2868 35.2625 10.2868 35.8689 10.8932L37.8765 12.9007L42.9895 7.78775C43.5958 7.18136 44.579 7.18136 45.1854 7.78775C45.7917 8.39415 45.7917 9.37734 45.1853 9.98363Z"
                          fill="url(#paint0_linear_161_2147)"
                        />
                        <path
                          d="M36.4907 26.7721L26.4949 25.7331V13.8628C26.4949 11.7507 24.7851 10.0373 22.673 10.0327C20.5546 10.0282 18.8348 11.7443 18.8348 13.8628V33.7294H18.8L15.0193 30.5722C13.4246 29.2406 11.045 29.4902 9.76141 31.1238C8.53051 32.6904 8.76818 34.9517 10.2978 36.2282L17.9718 42.6318H40.5729V31.3945C40.5729 29.0445 38.8226 27.0626 36.4907 26.7721Z"
                          fill="url(#paint1_linear_161_2147)"
                        />
                        <path
                          d="M18.8345 48.8428C18.8345 49.7003 19.5297 50.3955 20.3872 50.3955H39.02C39.8775 50.3955 40.5728 49.7003 40.5728 48.8428V45.7373H18.8345V48.8428Z"
                          fill="url(#paint2_linear_161_2147)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_161_2147"
                            x1="17.2826"
                            y1="-0.602343"
                            x2="22.0629"
                            y2="25.2589"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#AE7D36" />
                            <stop offset="1" stopColor="#F5F5B2" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_161_2147"
                            x1="19.2781"
                            y1="8.22788"
                            x2="34.5418"
                            y2="41.1479"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#AE7D36" />
                            <stop offset="1" stopColor="#F5F5B2" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_161_2147"
                            x1="25.923"
                            y1="45.4794"
                            x2="26.4684"
                            y2="51.1422"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#AE7D36" />
                            <stop offset="1" stopColor="#F5F5B2" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-md-6 mb-4">
            <div
              className="card border-left-warning shadow h-100 py-2"
              id="card-second"
            >
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col-8 mr-2">
                    <div className="_date mb-1">
                      Earnings <small>(Annual)</small>
                    </div>
                    <div className="_number mt-3">$0,000</div>
                    <div className="_gold_text ">$0,000</div>
                  </div>
                  <div className="col-4 mr-2 d-flex align-items-center justify-content-center">
                    <div className="svg_ctr text-xs font-weight-bold text-muted text-uppercase mb-1">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 42 42"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_161_2161)">
                          <path
                            d="M0 0V4.20003H2.09997V42H16.7999V33.6H25.2V42H39.8999V4.20003H41.9999V0H0ZM12.6 29.4H8.39996V25.2H12.6V29.4ZM12.6 21H8.39996V16.7999H12.6V21ZM12.6 12.6H8.39996V8.39996H12.6V12.6ZM23.1 29.4H18.9V25.2H23.1V29.4ZM23.1 21H18.9V16.7999H23.1V21ZM23.1 12.6H18.9V8.39996H23.1V12.6ZM33.5999 29.4H29.3999V25.2H33.5999V29.4ZM33.5999 21H29.3999V16.7999H33.5999V21ZM33.5999 12.6H29.3999V8.39996H33.5999V12.6Z"
                            fill="url(#paint0_linear_161_2161)"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_161_2161"
                            x1="34.2096"
                            y1="32.7805"
                            x2="8.60068"
                            y2="7.37815"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#07D25F" />
                            <stop offset="1" stopColor="#028139" />
                          </linearGradient>
                          <clipPath id="clip0_161_2161">
                            <rect width="42" height="42" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6 mb-4">
            <div
              className="card border-left-warning shadow h-100 py-2"
              id="card-third"
            >
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col-8 mr-2">
                    <div className="_date mb-1">
                      Earnings <small>(Annual)</small>
                    </div>
                    <div className="_number mt-3">$0,000</div>
                    <div className="_gold_text ">$0,000</div>
                  </div>
                  <div className="col-4 mr-2 d-flex align-items-center justify-content-center">
                    <div className="svg_ctr text-xs font-weight-bold text-muted text-uppercase mb-1">
                      <svg
                        width="56"
                        height="56"
                        viewBox="0 0 56 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.8768 8.07275C17.1238 8.07275 13.2353 11.963 13.2353 16.7143C13.2353 21.4655 17.1255 25.3558 21.8768 25.3558C26.628 25.3558 30.5183 21.4638 30.5183 16.7143C30.52 11.963 26.628 8.07275 21.8768 8.07275ZM1.75001 46.1703C1.74651 47.1433 2.53401 47.9307 3.50701 47.9272H40.2465C41.2195 47.9307 42.007 47.1415 42.0035 46.1703C42.0035 36.589 35.2905 28.5478 26.2938 26.5335C25.634 26.3795 24.9445 26.621 24.5228 27.153L22.0553 30.3048L19.6018 27.1005C19.2815 26.6735 18.781 26.418 18.06 26.4233C8.67476 28.3045 1.75001 36.4455 1.75001 46.1703ZM39.55 9.16825C35.9205 9.16825 32.9368 12.1415 32.9368 15.7693C32.9368 19.3953 35.9205 22.3825 39.55 22.3825C43.1778 22.3825 46.1493 19.3953 46.1493 15.7693C46.1493 12.1415 43.1778 9.16825 39.55 9.16825ZM31.9725 24.8325C37.898 27.6413 42.4533 32.8423 44.4238 39.1668H52.507C53.4695 39.1615 54.2465 38.3863 54.25 37.4237C54.25 30.429 49.3518 24.5438 42.7788 23.072C42.1155 22.9215 41.426 23.1683 41.0078 23.702L39.6778 25.396L38.3583 23.6635C38.0345 23.233 37.5288 22.974 36.8025 22.9863C34.944 23.3468 33.3813 23.9768 31.9725 24.8325Z"
                          fill="url(#paint0_linear_161_2176)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_161_2176"
                            x1="2"
                            y1="-0.999998"
                            x2="28"
                            y2="47.9273"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#C23B01" />
                            <stop offset="1" stopColor="#FF6E2F" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <div
                  className="card bg-primary text-white shadow"
                  id="card-long"
                >
                  <div className="card-body d-flex relative flex-column p-4">
                    <h3>Pending Request</h3>
                    <section className="tables scrollable-container my-4">
                      <div className="table__wrapper scrollable-container">
                        <table className="customers_table" id="dash_table">
                          <thead className="table__header">
                            <tr>
                              <td>Apartment</td>
                              <td>Check in</td>
                              <td>check out</td>
                              <td>Total Price</td>
                            </tr>
                          </thead>
                          <tbody className="table__body">
                            <tr>
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
                                  azfzafazfazz
                                </span>
                              </td>
                              <td>test</td>
                              <td>test</td>
                              <td className="d-flex align-items-center gap-2">
                                test
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </section>
                    <button className="dash_more">More +</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4">
                <div
                  className="card bg-success text-white shadow"
                  id="card-long"
                >
                  <div className="card-body">Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
