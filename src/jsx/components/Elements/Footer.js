import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import logoFooter from "../../../images/logo-footer.png";
import emailImg from "../../../images/email.png";
import facebook from "../../../images/ic_sharp-facebook.png";
import icons_twitter from "../../../images/akar-icons_twitter-fill.png";
import icons_instagram from "../../../images/akar-icons_instagram-fill.png";
import icons_discord from "../../../images/akar-icons_discord-fill.png";
import bi_medium from "../../../images/bi_medium.png";
import icons_github from "../../../images/akar-icons_github-fill.png";
import cib_telegram from "../../../images/cib_telegram-plane.png";
import footerLogo from "../../../images/bettingnewlogo.png";
import cryptokid from "../../../images/Crypto Kid.png";
import metfx from "../../../images/MetFX Watch.png";
import bet from "../../../images/BET RESPONSIBLY.png";
import eighteen from "../../../images/18.png";
import image from "../../../images/image 15.png";
import image2 from "../../../images/image 14.png";
import BettingFooterItem from "../../pages/Categories/BettingFooterItem";
import fb from "../../../images/fb.png";
import tweet from "../../../images/tweet.png";
import insta from "../../../images/insta.png";
import sl from "../../../images/sl.png";
import footerbg from "../../../images/footerBg.png";
import telegram from "../../../images/telegram.png";

class Footer extends Component {
  //   socialIcons = () => {
  //     return (
  //       <div className="d-flex justify-content-center justify-content-sm-start my-3 flex-wrap social-icons">
  //         <a href="https://www.facebook.com/Betswamp?_rdc=1&_rdr" target="_blank">
  //           <img src={facebook} className="mx-2" />
  //         </a>
  //         <a href="https://twitter.com/betswamp" target="_blank">
  //           {" "}
  //           <img src={icons_twitter} className="mx-2" />
  //         </a>
  //         <a href="https://www.instagram.com/betswamp/" target="_blank">
  //           {" "}
  //           <img src={icons_instagram} className="mx-2" />
  //         </a>
  //         <a href="#">
  //           <img src={icons_discord} className="mx-2" />
  //         </a>
  //         <a href="https://betswamp.medium.com/" target="_blank">
  //           {" "}
  //           <img src={bi_medium} className="mx-2" />
  //         </a>
  //         <a href="https://github.com/Betswamp" target="_blank">
  //           {" "}
  //           <img src={icons_github} className="mx-2" />
  //         </a>
  //         <a href="https://t.me/Betswamp_DAO" target="_blank">
  //           <img src={cib_telegram} className="mx-2" />
  //         </a>
  //       </div>
  //     );
  //   };
  render() {
    return (
      <Fragment>
        <div className="container position-relative">
          <img src={footerbg} alt="" className="img-footer" />

          <div className="row">
            <div className="col-lg-4 col-md-4 col-4">
              <div className="footer-area">
                <div className="footer-content">
                  <div className="footer-img">
                    <img src={footerLogo} alt="" className="footerImage" />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-4" style={{ marginTop: "3.5rem" }}>
              {" "}
              <a href="/" target="_blank" className="mx-2">
                {" "}
                <img src={image} alt="" className="audit-link" />
              </a>
            </div>
            <div className="col-4" style={{ marginTop: "3.5rem" }}>
              <a href="/" target="_blank" className="mx-2 text-decoration-none">
                {" "}
                <img src={image2} alt="" className="audit-link" />
                <h4 className="audit-kyc">AUDIT AND KYC BY</h4>
              </a>
            </div> */}
          </div>
          <div className="row ">
            <div className="col-lg-6 col-md-12">
              <div className="footer-area">
                <div className="footer-content">
                  <div className="footer-social-link footer-desktop">
                    {/* <a href="/" target="_blank" className="mx-2">
                      {" "}
                      <img src={cryptokid} alt="" className="social-link" />
                    </a>
                    <a href="/" target="_blank" className="mx-2">
                      {" "}
                      <img src={metfx} alt="" className="social-link" />
                    </a> */}
                    <a href="/" target="_blank" className="mx-2">
                      {" "}
                      <img src={bet} alt="" className="social-link" />
                    </a>
                    <a href="/" target="_blank" className="mx-2">
                      {" "}
                      <img src={eighteen} alt="" className="social-link" />
                    </a>
                  </div>
                  <div className="footer-audit-link"></div>

                  {/* ............................................................................................................................................ */}

                  <div className="footer-area  footer-mobile">
                    <div className="footer-content">
                      <div className="footer-social-link">
                        <div className="row" style={{ marginBottom: "2rem" }}>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <a href="/" target="_blank" className="mx-2">
                              {" "}
                              <img
                                src={cryptokid}
                                alt=""
                                className="social-link"
                              />
                            </a>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <a href="/" target="_blank" className="mx-2">
                              {" "}
                              <img
                                src={metfx}
                                alt=""
                                className="social-link social-link-2"
                              />
                            </a>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <a href="/" target="_blank" className="mx-2">
                              {" "}
                              <img src={bet} alt="" className="social-link" />
                            </a>
                          </div>
                          <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                            <a href="/" target="_blank" className="mx-2">
                              {" "}
                              <img
                                src={eighteen}
                                alt=""
                                className="social-link social-link-2"
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BettingFooterItem />
          <div className="row">
            <div className="col-lg-12 col-md-6 col-sm-6 ">
              <div className="footer-social-link-items text-center">
                <div className="social mb-3">
                  <div className="row">
                    <div className="col-2">
                      <a href="/" target="_blank" className="mx-3">
                        <img src={fb} alt="" />
                      </a>
                    </div>
                    <div className="col-2">
                      <a href="/" target="_blank" className="mx-3">
                        <img src={tweet} alt="" />
                      </a>
                    </div>
                    <div className="col-2">
                      <a href="/" target="_blank" className="mx-3">
                        <img src={insta} alt="" />
                      </a>
                    </div>
                    <div className="col-2">
                      <a href="/" target="_blank" className="mx-3">
                        <img src={sl} alt="" />
                      </a>
                    </div>
                    <div className="col-2">
                      <a href="/" target="_blank" className="mx-3">
                        <img src={telegram} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="copy-right">© 2021 Betswamp.com</span>
              </div>
            </div>
          </div>
        </div>
        {/* <footer
          className="container-fluid px-md-5 py-0 py-md-5"
          style={{ backgroundImage: `url(${logoFooter})` }}
        >
          <div className="space-100"></div>

          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
              <img src={logo} width="146" />
            </div>
            <div className="col-md-12 d-block d-md-none mb-4 mb-md-0 text-center">
              {this.socialIcons()}
            </div>
            <div className="col-md-2 text-center text-md-start">
              <p className="text-white font-weight-bold mb-4">INFO</p>
              <ul className="list-unstyled text-small footerList">
                <Link
                  to="/about"
                  className="text-white font-weight-bold"
                  href="#"
                  style={{ textDecoration: "none" }}
                >
                  ABOUT
                </Link>
                <br />
                <br />
                <li>
                  <a className="text-white" href="#">
                    NEWS
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 text-center text-md-start">
              <p className="text-white font-weight-bold mb-4">INFO</p>
              <ul className="list-unstyled text-small footerList">
                <Link
                  to="/about"
                  className="text-white font-weight-bold"
                  href="#"
                  style={{ textDecoration: "none" }}
                >
                  APPS
                </Link>
                <br />
                <br />
                <li>
                  <a className="text-white" href="#">
                    BETTING PLATFORM
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 text-center text-md-start">
              <p className="text-white font-weight-bold mb-2 mb-md-4">
                CONTACT
              </p>
              <p className="text-white text-email mb-0">
                <img src={emailImg} width="22" /> admin@betswamp.com
              </p>
            </div>
            <div className="col-md-3 text-center text-md-start my-5 my-md-0">
              <Link to="/app">
                {" "}
                <button className="btn btn-md theam-bg-red">Launch app</button>
              </Link>
            </div>
          </div>
          <div className="space-100"></div>
          <div className="d-none d-md-block">{this.socialIcons()}</div>
          <div className="media-icons"></div>
          <div className="row mt-4" id="footer-bottom">
            <div className="col-6">
              <p className="theam-text-grey">Legal Disclaimer</p>
            </div>
            <div className="col-6 text-end">
              <p className="theam-text-grey">© 2021 Betswamp.com</p>
            </div>
          </div>
        </footer> */}
      </Fragment>
    );
  }
}
export default Footer;
