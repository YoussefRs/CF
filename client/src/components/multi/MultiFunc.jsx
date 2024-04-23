import React from "react";
import "./MultiFunc.css";
import RangeSlider from "../sliders/RangeSlider";

export default function MultiFunc() {
  return (
    // <section id="hero">
    //   <div class="container">
    //     <div class="searchwrapper">
    //       <div class="searchbox" style={{ position: "relative" }}>
    //         <div class="row">
    //           <div class="col-md-5 d-flex align-items-center">
    //             <RangeSlider
    //               min={0}
    //               max={1000}
    //               onChange={({ min, max }) =>
    //                 console.log(`min = ${min}, max = ${max}`)
    //               }
    //             />
    //           </div>
    //           <div class="col-md-5">
    //             <input
    //               type="text"
    //               class="form-control"
    //               placeholder="Location"
    //             />
    //           </div>

    //           <div style={{ position: "absolute", right: "-87%" }}>
    //             <input type="button" class="btn btn-primary" value="Search" />
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section id="hero">
      <div class="container d-flex justify-content-center">
        <div class="searchwrapper">
          <div class="searchbox">
            <div class="row">
              <div class="col-md-5 d-flex align-items-center">
                <RangeSlider
                  min={0}
                  max={1000}
                  onChange={({ min, max }) =>
                    console.log(`min = ${min}, max = ${max}`)
                  }
                />
              </div>
              <div class="col-md-5" id="counter">
                <div className="_counter">
                  <span>Rooms</span>
                  <div className="_counter_btns">
                    <button>+</button>
                    <span>0</span>
                    <button>-</button>
                  </div>
                </div>
              </div>
              <div class="col-md-1">
                <input type="button" class="btn btn-primary" value="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
