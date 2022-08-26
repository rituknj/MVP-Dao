import React from "react";
import HeaderSlider from "./HeaderSlider";
import timer from "../../../images/carbon_timer.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "../../../css/tickets.css";

export default function Tickets() {
  return (
    <div>
      <div className="container mb-3">
        <HeaderSlider />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="active-history-area my-5">
              <Tabs
                defaultActiveKey="sports"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="sports" title="ACTIVE BETS">
                  <div className="active-bets-area">
                    <div className="card ative-cards">
                      <div className="card-body">
                        <div className="ative-content">
                          <h6 className="title">TITLE</h6>
                          <div className="ative-pool">
                            <span className="ap">POOL SIZE</span>
                            <span className="amount">$3,600</span>
                          </div>
                        </div>
                        <div className="ative-teams">
                          <div className="teams">
                            <p className="team mt-5">TEAM A</p>
                            <p className="team2 mt-4">TEAM B</p>
                          </div>
                          <div className="ative-contents">
                            <div className="timings d-grid mx-2">
                              <span className="day">14:00</span>
                              <span className="day">SPET 31</span>
                            </div>
                            <img src={timer} alt="" className="mx-3" />
                            <div className="boost-progressbar">
                              <div className="progress">
                                <div
                                  className="progress-bar"
                                  role="progressbar"
                                  aria-label="Example with label"
                                  style={{ width: "25%" }}
                                  aria-valuenow="25"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                              <button className="boost-button">BOOST</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="e-sports" title="HISTORY">
                  E-SPORTS
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
