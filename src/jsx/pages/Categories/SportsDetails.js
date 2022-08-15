import React from "react";
import vector from "../../../images/Vector.png";
import Vector from "../../../images/Vector (2).png";
import timer from "../../../images/carbon_timer.png";
import connection from "../../../images/connection.png";
import disconnect from "../../../images/clarity_disconnect-line.png";
import arrow from "../../../images/arrow.png";

export default function SportsDetails() {
  return (
    <div>
      <div className="container-fluid">
        <div className="sports-heading">
          <div className="sh d-flex align-items-center">
            <h6 className="sports-heading">TRENDING</h6>
            <img src={vector} alt="" className="mx-2" />
          </div>
          <div className="card-border">
            <div className="card background my-3">
              <div className="card-header area">
                <h6 className="title">TITLE</h6>
                <div className="pool-amount">
                  <h6 className="title2">MATCHED</h6>
                  <img src={connection} alt="" className="mt-0 mx-2" />
                  <div className="pa">
                    <p className="pool-size">POOL SIZE</p>
                    <span className="amount">$3,600</span>
                  </div>
                </div>
              </div>
              <div className="card-body background">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="teams">
                      <p className="team">TEAM A</p>
                      <p className="team2">TEAM B</p>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="remaing-section">
                      <div className="images-container">
                        <img src={Vector} alt="" />
                        <img src={vector} alt="" className="mx-2" />
                        <div className="timings d-grid mx-2">
                          <span className="day">14:00</span>
                          <span className="day">SPET 31</span>
                        </div>
                        <img src={timer} alt="" />
                      </div>
                      <div className="result-content">
                        <div className="matches text-center mx-1">
                          <h6 className="matches-name">TEAM A</h6>
                          <p className="percent">60%</p>
                        </div>
                        <div className="matches text-center mx-1">
                          <h6 className="matches-name">DRAW</h6>
                          <p className="percent">60%</p>
                        </div>
                        <div className="matches text-center">
                          <h6 className="matches-name">TEAM A</h6>
                          <p className="percent">60%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card background">
              <div className="card-header area">
                <h6 className="title">TITLE</h6>
                <div className="pool-amount">
                  <h6 className="title2">UNMATCHED</h6>
                  <img src={disconnect} alt="" className="mt-0 mx-2" />
                  <div className="pa">
                    <p className="pool-size">POOL SIZE</p>
                    <span className="amount">$3,600</span>
                  </div>
                </div>
              </div>
              <div className="card-body background">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="teams">
                      <p className="team">TEAM A</p>
                      <p className="team2">TEAM B</p>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className="remaing-section">
                      <div className="images-container">
                        <img src={Vector} alt="" />
                        <img src={vector} alt="" className="mx-2" />
                        <div className="timings d-grid mx-2">
                          <span className="day">14:00</span>
                          <span className="day">SPET 31</span>
                        </div>
                        <img src={timer} alt="" />
                      </div>
                      <div className="result-content">
                        <div className="matches text-center mx-1">
                          <h6 className="matches-name">TEAM A</h6>
                          <p className="percent">60%</p>
                        </div>
                        <div className="matches text-center mx-1">
                          <h6 className="matches-name">DRAW</h6>
                          <p className="percent">60%</p>
                        </div>
                        <div className="matches text-center">
                          <h6 className="matches-name">TEAM A</h6>
                          <p className="percent">60%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="view-more-area">
            <hr className="hr" />
              <div className="view-more">
                <p className="view-other-cards">VIEW MORE</p>
                <img src={arrow} alt="" className="arrow-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
