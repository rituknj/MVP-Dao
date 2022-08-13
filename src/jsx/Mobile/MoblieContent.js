import React from "react";
import { Link } from "react-router-dom";
import "../../css/bettingcontent.css";

export default function MoblieContent() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row my-4">
          <div className="col-md-12">
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
        </div>
      </div>
    </div>
  );
}
