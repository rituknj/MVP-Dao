import React from "react";
import vector from "../../../images/Vector.png";
import Group from "../../../images/Group 57.png";
import Vector from "../../../images/Vector (2).png";
import timer from "../../../images/carbon_timer.png";

export default function SportsDetails() {
  return (
    <div>
      <div className="container">
        <div className="sports-content">
          <div className="sports">
            <h6 className="sports-trending">TRENDING</h6>
            <img src={vector} alt="" className="img-vector" />
          </div>
          <div className="card betting-card">
            <div className="row">
              <div className="col-lg-2">
                <h5 className="card-header">TITLE</h5>
                <div className="card-body">
                  <p className="card-title">TEAM A</p>
                  <p className="card-title mt-4">TEAM A</p>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="matched">
                  <div className="matched-event">
                    <img src={Group} alt="" className="match-img" />
                  </div>
                  <div className="pool-size">
                    <span className="size">POOL SIZE</span>
                    <div className="amount">
                      <p>
                        <b>$3,600</b>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="other-area">
                  <div className="other-content">
                    <img src={Vector} alt="" className="image-content" />
                    <img src={vector} alt="" className="image-content" />
                    <div className="time-day-content">
                      <span className="time">14:00</span>
                      <span className="day">SPET 31 </span>
                    </div>
                    <img src={timer} alt="" className="image-content" />
                  </div>
                  <div className="remaing-other-content">
                    <p className="teams">
                      Team A <br />
                      <span className="percent">60%</span>
                    </p>
                    <p className="teams mx-3">
                      DRAW <br /> <span className="percent">60%</span>
                    </p>
                    <p className="teams mx-3">
                      Team A <br /> <span className="percent">60%</span>
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-2">
                <div className="pool-size">
                  <span className="size">POOL SIZE</span>
                </div>
                <div className="amount">
                  <p>
                    <b>$3,600</b>
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
