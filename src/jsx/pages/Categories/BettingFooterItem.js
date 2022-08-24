import React from "react";
import mail from "../../../images/mail.png";

export default function BettingFooterItem() {
  return (
    <div>
      <div className="row my-5">
        <div className="col-lg-2 col-md-3">
          <div className="footer-items">
            <h6 className="item">ABOUT</h6>
            <ul className="footer-list-items">
              <li className="list-items">
                <p className="li">DOCUMENTATION</p>
              </li>
              <li className="list-items">
                <p className="li">NEWS</p>
              </li>
              <li className="list-items">
                <p className="li">TEAM</p>
              </li>
              <li className="list-items">
                <p className="li">WHITEPAPER</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <div className="footer-items">
            <h6 className="item">APPS</h6>
            <ul className="footer-list-items">
              <li className="list-items">
                <p className="li">BETTING PLATFORM</p>
              </li>
              <li className="list-items">
                <p className="li">DAO</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <div className="footer-items">
            <h6 className="item">DAO</h6>
            <ul className="footer-list-items">
              <li className="list-items">
                <p className="li">BONDING</p>
              </li>
              <li className="list-items">
                <p className="li">STAKING</p>
              </li>
              <li className="list-items">
                <p className="li">DOCUMENTATION</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <div className="footer-items">
            <h6 className="item">LEARN</h6>
            <ul className="footer-list-items">
              <li className="list-items">
                <p className="li">CREATING AN EVENT</p>
              </li>
              <li className="list-items">
                <p className="li">PLACING A BET</p>
              </li>
              <li className="list-items">
                <p className="li">VALIDATING AN EVENT</p>
              </li>
              <li className="list-items">
                <p className="li">CLAIMING REWARDS</p>
              </li>
              <li className="list-items">
                <p className="li">BOOST AN EVENT</p>
              </li>
              <li className="list-items">
                <p className="li">CONNECTING WALLET</p>
              </li>
              <li className="list-items">
                <p className="li">VALIDATOR’S REWARD</p>
              </li>
              <li className="list-items">
                <p className="li">MENTAL HEALTH AND ADDICTION</p>
              </li>
              <li className="list-items">
                <p className="li">CREATING AN EVENT</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 col-md-3">
          <div className="footer-items">
            <h6 className="item">CONTACT</h6>
            <ul className="footer-list-items">
              <li className="list-items d-flex align-items-center justify-content-center">
                <img src={mail} alt="" />{" "}
                <p className="li my-1 mx-1">admin@betswamp.com</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
