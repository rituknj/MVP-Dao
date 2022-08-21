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
import telegram from "../../../images/telegram.png";

export default function BettingFooter() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="footer-area">
              <div className="footer-content">
                <div className="footer-img">
                  <img src={footerLogo} alt="" className="footerImage" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="footer-area">
              <div className="footer-content">
                <div className="footer-social-link">
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
                <div className="footer-audit-link">
                  <h4 className="audit-kyc">AUDIT AND KYC BY</h4>
                  <a href="/" target="_blank" className="mx-2">
                    {" "}
                    <img src={image} alt="" className="audit-link" />
                  </a>
                  <a href="/" target="_blank" className="mx-2">
                    {" "}
                    <img src={image2} alt="" className="audit-link" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BettingFooterItem />
        <div className="row">
          <div className="col-lg-12">
            <div className="footer-social-link-items text-center">
              <div className="social mb-3">
                <a href="/" target="_blank" className="mx-3">
                  <img src={fb} alt="" />
                </a>
                <a href="/" target="_blank" className="mx-3">
                  <img src={tweet} alt="" />
                </a>
                <a href="/" target="_blank" className="mx-3">
                  <img src={insta} alt="" />
                </a>
                <a href="/" target="_blank" className="mx-3">
                  <img src={sl} alt="" />
                </a>
                <a href="/" target="_blank" className="mx-3">
                  <img src={telegram} alt="" />
                </a>
              </div>
              <span className="copy-right">© 2021 Betswamp.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
