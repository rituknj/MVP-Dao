import React from "react";
import HeaderSlider from "./HeaderSlider";
import timer from "../../../images/carbon_timer.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import arrow from "../../../images/extendicon.png";
import group from "../../../images/Group 289.png";
import group2 from "../../../images/Group 290.png";
import group3 from "../../../images/Group 291.png";
import image2 from "../../../images/image 26.png";
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
                    <div
                      className="card ative-cards"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-9 col-sm-9 col-12">
                          <div
                            className="card-body cb"
                            style={{
                              // width: "78%",
                              backgroundColor: "#0C0C0C",
                              borderRadius: "2rem 0rem 0rem 2rem",
                            }}
                          >
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
                                <div className="ative-percent d-flex">
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
                                    <button className="boost-button">
                                      BOOST
                                    </button>
                                  </div>
                                  {/* <div
                                className="percents"
                                style={{
                                  width: "7rem",
                                  position: " absolute",
                                  right: "2rem",
                                  fontSize: "0.7rem",
                                  color: "white",
                                  padding: "1rem",
                                }}
                              >
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-12">
                          <div
                            className="percents"
                            style={{
                              // width:"16%",
                              // position: " absolute",
                              // right: "2rem",
                              fontSize: "0.7rem",
                              color: "#AAAAAA",
                              padding: "1rem",
                              fontWeight: "800",
                              // backgroundColor:"#111111",
                              fontFamily: "Montserrat",
                              lineHeight: "1rem",
                              marginTop: "1rem",
                            }}
                          >
                            <p>
                              <span className="pp">30% </span>
                              <span className="pp-team">TEAM A</span>
                            </p>
                            <br></br>
                            <p>
                              <span className="pp">65% </span>
                              <span className="pp-team">DRAW</span>
                            </p>
                            <br></br>
                            <p>
                              <span className="pp">5% </span>
                              <span className="pp-team">TEAM B</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="card ative-cards"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                      }}
                    >
                    <div className="row">
                    <div className="col-md-9 col-sm-9 col-12">
                      <div
                        className="card-body cb"
                        style={{
                          // width: "78%",
                          backgroundColor: "#0C0C0C",
                          borderRadius: "2rem 0rem 0rem 2rem",
                        }}
                      >
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
                            <div className="ative-percent d-flex">
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
                              {/* <div className="percents">
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-3 col-sm-3 col-12">
                      <div
                        className="percents"
                        style={{
                          // width:"16%",
                          // position: " absolute",
                          // right: "2rem",
                          fontSize: "0.7rem",
                          color: "#AAAAAA",
                          padding: "1rem",
                          fontWeight: "800",
                          // backgroundColor:"#111111",
                          fontFamily: "Montserrat",
                          lineHeight: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        <p>
                          <span className="pp">30% </span>
                          <span className="pp-team">TEAM A</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">65% </span>
                          <span className="pp-team">DRAW</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">5% </span>
                          <span className="pp-team">TEAM B</span>
                        </p>
                      </div>
                      </div>
                      </div>
                    </div>
                    <div
                      className="card ative-cards"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                      }}
                    >
                    <div className="row">
                    <div className="col-md-9 col-sm-9 col-12">
                      <div
                        className="card-body cb"
                        style={{
                          // width: "78%",
                          backgroundColor: "#0C0C0C",
                          borderRadius: "2rem 0rem 0rem 2rem",
                        }}
                      >
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
                            <div className="ative-percent d-flex">
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
                              {/* <div className="percents">
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-3 col-sm-3 col-12">
                      <div
                        className="percents"
                        style={{
                          // width:"16%",
                          // position: " absolute",
                          // right: "2rem",
                          fontSize: "0.7rem",
                          color: "#AAAAAA",
                          padding: "1rem",
                          fontWeight: "800",
                          // backgroundColor:"#111111",
                          fontFamily: "Montserrat",
                          lineHeight: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        <p>
                          <span className="pp">30% </span>
                          <span className="pp-team">TEAM A</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">65% </span>
                          <span className="pp-team">DRAW</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">5% </span>
                          <span className="pp-team">TEAM B</span>
                        </p>
                      </div>
                      </div>
                      </div>
                    </div>
                    <div
                      className="card ative-cards"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                      }}
                    >
                    <div className="row">
                    <div className="col-md-9 col-sm-9 col-12">
                      <div
                        className="card-body cb"
                        style={{
                          // width: "78%",
                          backgroundColor: "#0C0C0C",
                          borderRadius: "2rem 0rem 0rem 2rem",
                        }}
                      >
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
                            <div className="ative-percent d-flex">
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
                              {/* <div className="percents">
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                                <p>
                                  <span className="pp">30%</span>
                                  <span className="pp-team">TEAM A</span>
                                </p>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                      <div className="col-md-3 col-sm-3 col-12">
                      <div
                        className="percents"
                        style={{
                          // width:"16%",
                          // position: " absolute",
                          // right: "2rem",
                          fontSize: "0.7rem",
                          color: "#AAAAAA",
                          padding: "1rem",
                          fontWeight: "800",
                          // backgroundColor:"#111111",
                          fontFamily: "Montserrat",
                          lineHeight: "1rem",
                          marginTop: "1rem",
                        }}
                      >
                        <p>
                          <span className="pp">30% </span>
                          <span className="pp-team">TEAM A</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">65% </span>
                          <span className="pp-team">DRAW</span>
                        </p>
                        <br></br>
                        <p>
                          <span className="pp">5% </span>
                          <span className="pp-team">TEAM B</span>
                        </p>
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="e-sports" title="HISTORY">
                  <div className="card ative-cards">
                    <div className="ative-content">
                      <h6 className="title">TITLE</h6>
                      <div
                        className="ative-pool"
                        style={{ marginLeft: "220px", marginTop: "10px" }}
                      >
                        <span className="ap">POOL SIZE</span>
                        <span className="amount">$3,600</span>
                      </div>
                      <div className="ative-pool">
                        <span className="ap">BONUS</span>
                        <span className="amount" style={{ color: "#FF4874" }}>
                          $30
                        </span>
                      </div>
                      <div className="ative-pool">
                        <span className="ap">
                          CREATOR'S <br /> REWARD
                        </span>
                        <span className="amount">$600</span>
                      </div>
                      <div className="ative-pool">
                        <span className="ap">WON</span>
                        <span className="amount" style={{ color: "#48FF7B" }}>
                          $3,600
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="card ative-cards">
                    <div className="card-header">Featured</div>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                  <div className="card ative-cards">
                    <div className="card-header">Featured</div>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div>
                  <div className="card ative-cards">
                    <div className="card-header">Featured</div>
                    <div className="card-body">
                      <h5 className="card-title">Special title treatment</h5>
                      <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p>
                    </div>
                  </div> */}
                </Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="instruction-area" style={{ marginTop: "-24px" }}>
              <div className="event-content">
                <div className="instruction-area position-relative">
                  <div className="betting-instruction">
                    <h5 className="heading-instruction">
                      HOW TO CLAIM BET REWARDS
                    </h5>
                    <img src={image2} alt="" className="image-instruction" />
                  </div>
                </div>
              </div>
              <div className="read-instruction">
                <div className="read-area">
                  <span className="read-btton">READ</span>
                  <img src={arrow} alt="" className="read-arrow-img" />
                </div>
              </div>
              <div className="statics-content">
                <h4 className="stats">STATISTICS</h4>
              </div>
              <div className="card stats-bg">
                <div className="card-body">
                  <div className="group d-flex align-items-center">
                    <img src={group3} alt="" />{" "}
                    <h6 className="card-title total">TOTAL</h6>
                  </div>
                  <h5 className="card-subtitle stats-content">BETS MADE</h5>
                  <p className="card-text sc">500</p>
                </div>
              </div>
              <div className="card stats-bg my-4">
                <div className="card-body">
                  <div className="group d-flex align-items-center">
                    <img src={group2} alt="" />{" "}
                    <h6 className="card-title total">TOTAL</h6>
                  </div>
                  <h5 className="card-subtitle stats-content">
                    EVENTS CREATED
                  </h5>
                  <p className="card-text sc">500</p>
                </div>
              </div>
              <div className="card stats-bg">
                <div className="card-body">
                  <div className="group d-flex align-items-center">
                    <img src={group} alt="" />{" "}
                    <h6 className="card-title total">TOTAL</h6>
                  </div>
                  <h5 className="card-subtitle stats-content">
                    AMOUNT WAGERED
                  </h5>
                  <p className="card-text sc">500</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
