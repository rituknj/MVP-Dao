import React from "react";
import footerLogo from "../../../images/bettingnewlogo.png";
import cryptokid from "../../../images/Crypto Kid.png";
import metfx from "../../../images/MetFX Watch.png";
import bet from "../../../images/BET RESPONSIBLY.png";
import eighteen from "../../../images/18.png";
import image from "../../../images/image 15.png";
import image2 from "../../../images/image 14.png";
import BettingFooterItem from "./BettingFooterItem";
import fb from "../../../images/fb.png";
import tweet from "../../../images/tweet.png";
import insta from "../../../images/insta.png";
import sl from "../../../images/sl.png";
import footerbg from "../../../images/footerBg.png";
import telegram from "../../../images/telegram.png";

export default function BettingFooter() {
  return (
    <div>
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
          <div className="col-4" style={{ marginTop: "3.5rem" }}>
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
          </div>
        </div>
        <div className="row ">
          <div className="col-lg-6 col-md-12">
            <div className="footer-area">
              <div className="footer-content">
                <div className="footer-social-link footer-desktop">
                  <a href="/" target="_blank" className="mx-2">
                    {" "}
                    <img src={cryptokid} alt="" className="social-link" />
                  </a>
                  <a href="/" target="_blank" className="mx-2">
                    {" "}
                    <img src={metfx} alt="" className="social-link" />
                  </a>
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
    </div>
  );
}
