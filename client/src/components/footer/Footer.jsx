import React from "react";
import "./Footer.css";
import name from "../../assets/homepage_mats/name.png";
import logo from "../../assets/homepage_mats/logo.png";

export default function Footer() {
  return (
    <section className="_footer py-5">
      <div className="_footer_items">
        <div className="_footer_items_wrapper">
          <div className="_item_1">
            <div className="_footer_img">
              <img src={logo} />
              <img src={name} />
            </div>
            <p>
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. It has survived not only five
              centuries,
            </p>
          </div>
          <div className="_item_2">
            <ul>
              Company
              <li>about us</li>
              <li>why choose us</li>
              <li>pricing</li>
              <li>testimonials</li>
            </ul>
          </div>
          <div className="_item_3">
            <ul>
              Resources
              <li>privacy policy</li>
              <li>term & conditions</li>
              <li>contact us</li>
            </ul>
          </div>
        </div>
        <div className="footer_rights">
          <p>© 2024 All Rights Reserved.</p>
        </div>
      </div>
    </section>
  );
}
