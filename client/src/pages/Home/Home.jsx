import React from "react";
import "./Home.css";
import Logo from "../../assets/homepage_mats/Group_50.png";
import Cards from "../../components/cards/Cards";
import TestimonialsSlider from "../../components/sliders/TestimonialsSlider";
import Footer from "../../components/footer/Footer";
import { apartmentList } from "../../Dummy/AppData";


export default function Home() {

  return (
    <>
      <div className="_home">
        <section className="landingpage" id="home">
          <div className="container d-flex align-items-center mb-5">
            <div className="lp-alignment">
              <img
                src={Logo}
                srcSet={`${Logo} 1x, ${Logo} 2x, ${Logo} 3x`}
                alt="Logo"
              />
              <h1 className="_title_">Town Lofts</h1>
              <span className="_title_small_">
                am <span className="special_span">borussia park</span>
              </span>
            </div>
          </div>
        </section>

        {apartmentList && (
          <div className="_cards_container" id="properties">
            <div className="cards_layer"></div>
            <p className="title">Unsere Wohnungen</p>
            <div className="card_ctr">
              {apartmentList?.map((card, i) => (
                <Cards card={card} key={i} type={"normal"} />
              ))}
            </div>
          </div>
        )}
        <section className="_search_container">
          <div className="search_ctr">
            <div className="img_ctr">
              <div className="_floating_img">
                <div className="floating_boxes">
                  <div className="guy_box">
                    <img
                      className="img-circle"
                      src="http://themes.audemedia.com/html/goodgrowth/images/testimonial3.jpg"
                      alt=""
                    />
                    <p>
                      Tauchen Sie ein in den Luxus des Lebens in diesem
                      prächtigen Anwesen, das Eleganz nahtlos vereint.
                    </p>
                  </div>
                  <div className="girl_box">
                    <img src="https://i.ibb.co/8x9xK4H/team.jpg" alt="" />
                    <p>Hallo! Ich möchte mieten.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="search_content">
              <div className="_content">
                <div className="search_title">
                  <h1>
                    Reservieren <span>und relaxen</span> !
                  </h1>
                </div>
                <div className="search_description">
                  <p>
                    Willkommen in unseren charmanten Apartments im Herzen von
                    Mönchengladbach, Nordrhein-Westfalen, Deutschland. Mit
                    modernen Annehmlichkeiten und einer gemütlichen Atmosphäre
                    bieten unsere Unterkünfte den perfekten Rückzugsort für
                    Ihren Aufenthalt. Dank der günstigen Lage in der Nähe von
                    Sehenswürdigkeiten und öffentlichen Verkehrsmitteln bieten
                    unsere Apartments einfachen Zugang zu allem, was die Stadt
                    zu bieten hat. Buchen Sie Ihren Aufenthalt bei uns und
                    erleben Sie Komfort, Bequemlichkeit und Gastfreundschaft wie
                    nie zuvor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="_testimonial_container" id="testimonails">
          <p>testimonials</p>
          <div className="testo_ctr">
            <TestimonialsSlider />
          </div>
        </div>
        <div className="_socials_container" id="followus">
          <div className="socials_ctr">
            <div className="join_flower_ctr">
              <div className="join_ctr">
                <div className="join_title">
                  <span>Treten Sie uns bei</span>
                </div>
                <h5>
                  Bleiben Sie mit uns in Verbindung! Folgen Sie uns auf Social
                  Media, um stets über unsere neuesten Updates informiert zu
                  bleiben.
                </h5>
                <p>
                  Eingebettet in eine ruhige Nachbarschaft, bietet dieses
                  Zuhause luxuriöse Annehmlichkeiten und exquisites Design. Vom
                  prächtigen Eingang bis zu den sorgfältig gestalteten
                  Innenräumen strahlt jedes Detail Eleganz aus. Unterhalten Sie
                  Ihre Gäste in den großzügigen Wohnbereichen oder ziehen Sie
                  sich in den ruhigen Komfort der privaten Schlafzimmer zurück.
                  Genießen Sie entspannte Spaziergänge durch wunderschön
                  angelegte Gärten oder entspannen Sie in den luxuriösen,
                  spa-ähnlichen Badezimmern. Erleben Sie das Höchstmaß an
                  raffiniertem Wohnen in diesem außergewöhnlichen Rückzugsort.
                </p>
              </div>
              <div className="flower_ctr">
                <div className="_flower_box">
                  <div className="leaf leaf_hover" id="leaf1">
                    <svg
                      width="50"
                      height="70"
                      viewBox="0 0 70 70"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1_243)">
                        <path
                          d="M70 35C70 52.4699 57.2004 66.9498 40.4688 69.5748V45.1172H48.624L50.1758 35H40.4688V28.4348C40.4688 25.6662 41.825 22.9688 46.1727 22.9688H50.5859V14.3555C50.5859 14.3555 46.5801 13.6719 42.7506 13.6719C34.7566 13.6719 29.5312 18.5172 29.5312 27.2891V35H20.6445V45.1172H29.5312V69.5748C12.7996 66.9498 0 52.4699 0 35C0 15.6707 15.6707 0 35 0C54.3293 0 70 15.6707 70 35Z"
                          fill="#1877F2"
                        />
                        <path
                          d="M48.624 45.1172L50.1758 35H40.4688V28.4346C40.4688 25.6668 41.8247 22.9688 46.1725 22.9688H50.5859V14.3555C50.5859 14.3555 46.5806 13.6719 42.7513 13.6719C34.7565 13.6719 29.5312 18.5172 29.5312 27.2891V35H20.6445V45.1172H29.5312V69.5747C31.3132 69.8543 33.1395 70 35 70C36.8605 70 38.6868 69.8543 40.4688 69.5747V45.1172H48.624Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_243">
                          <rect width="70" height="70" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="leaf leaf_hover" id="leaf2">
                    <svg
                      width="50"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1_331)">
                        <path
                          d="M3.75001 4.08249C-0.96499 8.97999 9.86457e-06 14.1825 9.86457e-06 29.9875C9.86457e-06 43.1125 -2.28999 56.27 9.69501 59.3675C13.4375 60.33 46.5975 60.33 50.335 59.3625C55.325 58.075 59.385 54.0275 59.94 46.97C60.0175 45.985 60.0175 14.0075 59.9375 13.0025C59.3475 5.48499 54.72 1.15249 48.6225 0.274994C47.225 0.0724939 46.945 0.0124939 39.775 -6.07967e-06C14.3425 0.0124939 8.76751 -1.12001 3.75001 4.08249Z"
                          fill="url(#paint0_linear_1_331)"
                        />
                        <path
                          d="M29.995 7.84755C20.9175 7.84755 12.2975 7.04005 9.00499 15.4901C7.64499 18.9801 7.84249 23.5126 7.84249 30.0026C7.84249 35.6976 7.65999 41.0501 9.00499 44.5126C12.29 52.9676 20.98 52.1576 29.99 52.1576C38.6825 52.1576 47.645 53.0626 50.9775 44.5126C52.34 40.9876 52.14 36.5226 52.14 30.0026C52.14 21.3476 52.6175 15.7601 48.42 11.5651C44.17 7.31505 38.4225 7.84755 29.985 7.84755H29.995ZM28.01 11.8401C46.945 11.8101 49.355 9.70506 48.025 38.9476C47.5525 49.2901 39.6775 48.1551 29.9975 48.1551C12.3475 48.1551 11.84 47.6501 11.84 29.9926C11.84 12.1301 13.24 11.8501 28.01 11.8351V11.8401ZM41.82 15.5176C40.3525 15.5176 39.1625 16.7076 39.1625 18.1751C39.1625 19.6426 40.3525 20.8326 41.82 20.8326C43.2875 20.8326 44.4775 19.6426 44.4775 18.1751C44.4775 16.7076 43.2875 15.5176 41.82 15.5176ZM29.995 18.6251C23.7125 18.6251 18.62 23.7201 18.62 30.0026C18.62 36.2851 23.7125 41.3776 29.995 41.3776C36.2775 41.3776 41.3675 36.2851 41.3675 30.0026C41.3675 23.7201 36.2775 18.6251 29.995 18.6251ZM29.995 22.6176C39.7575 22.6176 39.77 37.3876 29.995 37.3876C20.235 37.3876 20.22 22.6176 29.995 22.6176Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <linearGradient
                          id="paint0_linear_1_331"
                          x1="3.86506"
                          y1="56.1677"
                          x2="59.6287"
                          y2="7.90493"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#FFDD55" />
                          <stop offset="0.5" stopColor="#FF543E" />
                          <stop offset="1" stopColor="#C837AB" />
                        </linearGradient>
                        <clipPath id="clip0_1_331">
                          <rect width="60" height="60" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="leaf" id="leaf3"></div>
                  <div className="leaf leaf_hover" id="leaf4">
                    <svg
                      width="50"
                      height="66"
                      viewBox="0 0 66 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_1_334)">
                        <path
                          d="M33 66C51.2254 66 66 51.2254 66 33C66 14.7746 51.2254 0 33 0C14.7746 0 0 14.7746 0 33C0 51.2254 14.7746 66 33 66Z"
                          fill="#FF0000"
                        />
                        <path
                          d="M43.7988 20.5859H22.2012C21.3381 20.5859 20.4835 20.756 19.6861 21.0864C18.8888 21.4169 18.1644 21.9012 17.5543 22.5117C16.9441 23.1222 16.4603 23.8469 16.1304 24.6445C15.8005 25.442 15.631 26.2968 15.6316 27.1599V38.8401C15.631 39.7032 15.8005 40.558 16.1304 41.3556C16.4603 42.1531 16.9441 42.8779 17.5543 43.4884C18.1644 44.0989 18.8888 44.5832 19.6861 44.9136C20.4835 45.244 21.3381 45.4141 22.2012 45.4141H43.7988C44.6619 45.4141 45.5166 45.244 46.3139 44.9136C47.1113 44.5832 47.8357 44.0989 48.4458 43.4884C49.0559 42.8779 49.5397 42.1531 49.8696 41.3556C50.1995 40.558 50.369 39.7032 50.3684 38.8401V27.1599C50.369 26.2968 50.1995 25.442 49.8696 24.6445C49.5397 23.8469 49.0559 23.1222 48.4458 22.5117C47.8357 21.9012 47.1113 21.4169 46.3139 21.0864C45.5166 20.756 44.6619 20.5859 43.7988 20.5859ZM28.4234 38.3234V27.6766L37.5766 33L28.4234 38.3234Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_334">
                          <rect width="66" height="66" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="_contact_ctr" id="contact_us">
          <div className="_contact_box">
            <span>Kontaktieren Sie uns</span>
            <div className="contact_inputs">
              <div className="contact_fields">
                <input placeholder="Vorname" />
                <input placeholder="Nachname" />
                <input placeholder="Telefonnummer" />
                <input placeholder="email" />
              </div>
              <div className="message_field">
                <textarea placeholder="message..."></textarea>
              </div>
            </div>
            <button>Absenden</button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
