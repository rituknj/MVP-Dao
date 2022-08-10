import React from "react";
import { Link } from "react-router-dom";
import "../../../css/bettingcontent.css";
import HeaderSlider from "./HeaderSlider";

export default function BettingAppContent() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <div className="bet-slip-area">
              <div className="bet-slip-content text-light">
                <span className="bet-slip-heading">BET SLIP</span>
              </div>
              <div className="navLink-itmes">
                <ul className="nav">
                  <li className="nav-item navLink">
                    <Link className="nav-link item" aria-current="page" to="/">
                      SINGLE
                    </Link>
                  </li>
                  <li className="nav-item navLink">
                    <Link className="nav-link item" to="/">
                      ACCUMULATE
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="nav-area">
                <div className="nav-content"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="right-content-area">
              <div className="right-content">
                <HeaderSlider/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
