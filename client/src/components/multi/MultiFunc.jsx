import React, { useState } from "react";
import "./MultiFunc.css";
import RangeSlider from "../sliders/RangeSlider";
import { Modal } from "react-bootstrap";
import ReusableModal from "../modals/Modal";

export default function MultiFunc() {
  const [showSmFilter, setShowSmFilter] = useState(false);
  return (
    // <section id="hero">
    //   <div className="container">
    //     <div className="searchwrapper">
    //       <div className="searchbox" style={{ position: "relative" }}>
    //         <div className="row">
    //           <div className="col-md-5 d-flex align-items-center">
    //             <RangeSlider
    //               min={0}
    //               max={1000}
    //               onChange={({ min, max }) =>
    //                 console.log(`min = ${min}, max = ${max}`)
    //               }
    //             />
    //           </div>
    //           <div className="col-md-5">
    //             <input
    //               type="text"
    //               className="form-control"
    //               placeholder="Location"
    //             />
    //           </div>

    //           <div style={{ position: "absolute", right: "-87%" }}>
    //             <input type="button" className="btn btn-primary" value="Search" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section id="hero" className="mt-md-0 mt-5">
      <div className="container justify-content-center d-none d-sm-flex px-0">
        <div className="searchwrapper">
          <div className="searchbox">
            <div className="row">
              <div className="col-sm-1 col-12 d-flex align-items-center justify-content-center">
                {<p className="fw-bold text-nowrap">Price :</p>}
              </div>
              <div className="col-sm-8 col-12 my-4 my-sm-0 d-flex  align-items-center">
                <RangeSlider
                  min={0}
                  max={1000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
              <div className="col-sm-3 col-12 mb-2 mt-3 my-sm-0 ">
                <button
                  type="button"
                  className="btn btn-primary d-flex align-items-center justify-content-center"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.7106 18.0667C11.0153 17.3138 11.7534 16.7827 12.6155 16.7827C13.4776 16.7827 14.2157 17.3138 14.5205 18.0667H21.8599C22.2853 18.0667 22.6302 18.4116 22.6302 18.8371C22.6302 19.2625 22.2853 19.6074 21.8599 19.6074H14.5205C14.2157 20.3603 13.4776 20.8914 12.6155 20.8914C11.7534 20.8914 11.0153 20.3603 10.7106 19.6074H3.37114C2.94569 19.6074 2.60077 19.2625 2.60077 18.8371C2.60077 18.4116 2.94569 18.0667 3.37114 18.0667H10.7106ZM22.6302 12.6741C22.6302 13.0996 22.2853 13.4445 21.8599 13.4445H11.5884C11.1629 13.4445 10.818 13.0996 10.818 12.6741C10.818 12.2487 11.1629 11.9038 11.5884 11.9038H21.8599C22.2853 11.9038 22.6302 12.2487 22.6302 12.6741ZM7.47975 14.7284C6.61766 14.7284 5.87955 14.1974 5.57479 13.4445H3.37114C2.94569 13.4445 2.60077 13.0996 2.60077 12.6741C2.60077 12.2487 2.94569 11.9038 3.37114 11.9038H5.57479C5.87955 11.1509 6.61766 10.6198 7.47975 10.6198C8.61434 10.6198 9.53405 11.5395 9.53405 12.6741C9.53405 13.8087 8.61434 14.7284 7.47975 14.7284ZM12.6155 7.28158C13.041 7.28158 13.3859 6.93667 13.3859 6.51122C13.3859 6.08577 13.041 5.74086 12.6155 5.74086H4.39829C3.97284 5.74086 3.62792 6.08577 3.62792 6.51122C3.62792 6.93667 3.97284 7.28158 4.39829 7.28158H12.6155ZM22.6302 6.51122C22.6302 6.93667 22.2853 7.28158 21.8599 7.28158H18.6291C18.3244 8.03449 17.5863 8.56553 16.7241 8.56553C15.5896 8.56553 14.6698 7.64581 14.6698 6.51122C14.6698 5.37663 15.5896 4.45691 16.7241 4.45691C17.5863 4.45691 18.3244 4.98795 18.6291 5.74086H21.8599C22.2853 5.74086 22.6302 6.08577 22.6302 6.51122Z"
                      fill="white"
                      fillOpacity="0.73"
                    />
                  </svg>
                  <span className="ms-1">Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="searchwrapper_sm d-flex d-sm-none"
        onClick={() => {
          setShowSmFilter(true);
        }}
      >
        <div className="label">
          <span>Filter ...</span>
        </div>
        <div className="button">
          <button className="btn btn-filter">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.7106 18.0667C11.0153 17.3138 11.7534 16.7827 12.6155 16.7827C13.4776 16.7827 14.2157 17.3138 14.5205 18.0667H21.8599C22.2853 18.0667 22.6302 18.4116 22.6302 18.8371C22.6302 19.2625 22.2853 19.6074 21.8599 19.6074H14.5205C14.2157 20.3603 13.4776 20.8914 12.6155 20.8914C11.7534 20.8914 11.0153 20.3603 10.7106 19.6074H3.37114C2.94569 19.6074 2.60077 19.2625 2.60077 18.8371C2.60077 18.4116 2.94569 18.0667 3.37114 18.0667H10.7106ZM22.6302 12.6741C22.6302 13.0996 22.2853 13.4445 21.8599 13.4445H11.5884C11.1629 13.4445 10.818 13.0996 10.818 12.6741C10.818 12.2487 11.1629 11.9038 11.5884 11.9038H21.8599C22.2853 11.9038 22.6302 12.2487 22.6302 12.6741ZM7.47975 14.7284C6.61766 14.7284 5.87955 14.1974 5.57479 13.4445H3.37114C2.94569 13.4445 2.60077 13.0996 2.60077 12.6741C2.60077 12.2487 2.94569 11.9038 3.37114 11.9038H5.57479C5.87955 11.1509 6.61766 10.6198 7.47975 10.6198C8.61434 10.6198 9.53405 11.5395 9.53405 12.6741C9.53405 13.8087 8.61434 14.7284 7.47975 14.7284ZM12.6155 7.28158C13.041 7.28158 13.3859 6.93667 13.3859 6.51122C13.3859 6.08577 13.041 5.74086 12.6155 5.74086H4.39829C3.97284 5.74086 3.62792 6.08577 3.62792 6.51122C3.62792 6.93667 3.97284 7.28158 4.39829 7.28158H12.6155ZM22.6302 6.51122C22.6302 6.93667 22.2853 7.28158 21.8599 7.28158H18.6291C18.3244 8.03449 17.5863 8.56553 16.7241 8.56553C15.5896 8.56553 14.6698 7.64581 14.6698 6.51122C14.6698 5.37663 15.5896 4.45691 16.7241 4.45691C17.5863 4.45691 18.3244 4.98795 18.6291 5.74086H21.8599C22.2853 5.74086 22.6302 6.08577 22.6302 6.51122Z"
                fill="white"
                fillOpacity="0.73"
              />
            </svg>
          </button>
        </div>
      </div>
      <ReusableModal
        show={showSmFilter}
        onHide={() => {
          setShowSmFilter(false);
        }}
        customclassName={"search_modal"}
        children={
          <div className="searchwrapper searchwrapper_modal">
            <p className="title">Filter price</p>
            {/* <p className="sub_title">Price</p> */}
            <div className="searchbox">
              <div className="row">
                <div className="col-md-5 d-flex align-items-center">
                  <RangeSlider
                    min={0}
                    max={1000}
                    onChange={({ min, max }) =>
                      console.log(`min = ${min}, max = ${max}`)
                    }
                  />
                </div>
                <div className="col-12 mt-5">
                  <button
                    type="button"
                    className="btn btn-filter d-flex align-items-center justify-content-sm-between justify-content-center"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.7106 18.0667C11.0153 17.3138 11.7534 16.7827 12.6155 16.7827C13.4776 16.7827 14.2157 17.3138 14.5205 18.0667H21.8599C22.2853 18.0667 22.6302 18.4116 22.6302 18.8371C22.6302 19.2625 22.2853 19.6074 21.8599 19.6074H14.5205C14.2157 20.3603 13.4776 20.8914 12.6155 20.8914C11.7534 20.8914 11.0153 20.3603 10.7106 19.6074H3.37114C2.94569 19.6074 2.60077 19.2625 2.60077 18.8371C2.60077 18.4116 2.94569 18.0667 3.37114 18.0667H10.7106ZM22.6302 12.6741C22.6302 13.0996 22.2853 13.4445 21.8599 13.4445H11.5884C11.1629 13.4445 10.818 13.0996 10.818 12.6741C10.818 12.2487 11.1629 11.9038 11.5884 11.9038H21.8599C22.2853 11.9038 22.6302 12.2487 22.6302 12.6741ZM7.47975 14.7284C6.61766 14.7284 5.87955 14.1974 5.57479 13.4445H3.37114C2.94569 13.4445 2.60077 13.0996 2.60077 12.6741C2.60077 12.2487 2.94569 11.9038 3.37114 11.9038H5.57479C5.87955 11.1509 6.61766 10.6198 7.47975 10.6198C8.61434 10.6198 9.53405 11.5395 9.53405 12.6741C9.53405 13.8087 8.61434 14.7284 7.47975 14.7284ZM12.6155 7.28158C13.041 7.28158 13.3859 6.93667 13.3859 6.51122C13.3859 6.08577 13.041 5.74086 12.6155 5.74086H4.39829C3.97284 5.74086 3.62792 6.08577 3.62792 6.51122C3.62792 6.93667 3.97284 7.28158 4.39829 7.28158H12.6155ZM22.6302 6.51122C22.6302 6.93667 22.2853 7.28158 21.8599 7.28158H18.6291C18.3244 8.03449 17.5863 8.56553 16.7241 8.56553C15.5896 8.56553 14.6698 7.64581 14.6698 6.51122C14.6698 5.37663 15.5896 4.45691 16.7241 4.45691C17.5863 4.45691 18.3244 4.98795 18.6291 5.74086H21.8599C22.2853 5.74086 22.6302 6.08577 22.6302 6.51122Z"
                        fill="white"
                        fillOpacity="0.73"
                      />
                    </svg>
                    <span className="ms-2">Filter</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-cancel d-flex align-items-center justify-content-sm-between justify-content-center"
                    onClick={() => {
                      setShowSmFilter(false);
                    }}
                  >
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}
