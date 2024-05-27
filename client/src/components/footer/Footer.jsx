import React from "react";
import "./Footer.css";
import name from "../../assets/homepage_mats/name.png";
import logo from "../../assets/homepage_mats/logo3.png";

export default function Footer() {
  return (
    <section className="_footer py-5">
      <div className="_footer_items">
        <div className="_footer_items_wrapper">
          <div className="_item_1">
            <div className="_footer_img">
              <img src={logo} />
            </div>
            <p>
              Entdecken Sie gemütliche Apartments in Mönchengladbach,
              Nordrhein-Westfalen, Deutschland. Buchen Sie noch heute Ihren
              Aufenthalt!
            </p>
          </div>
          <div className="_item_2">
            <ul className="p-0">
              Firma
              <li>Über uns</li>
              <li>Preise</li>
              <li>Referenzen</li>
            </ul>
          </div>
          <div className="_item_3">
            <ul>
              Ressourcen
              <li>AGB</li>
              <li>Datenschutzrichtlinie</li>
              <li>Widerrufsrecht</li>
              <li>Impressum</li>
            </ul>
          </div>
        </div>
        <div className="footer_rights">
          <p>© 2024 Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </section>
  );
}
