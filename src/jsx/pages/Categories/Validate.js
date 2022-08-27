import React from "react";
import HeaderSlider from "./HeaderSlider";
import timer from "../../../images/carbon_timer.png";
import "../../../css/Betswamp.css";
import "../../../css/tickets.css";
import arrow2 from "../../../images/arrow2.png";
import arrow3 from "../../../images/arrow.png";
import arrow from "../../../images/extendicon.png";
import image2 from "../../../images/image 26.png";
import group from "../../../images/Group 289.png";
import group2 from "../../../images/Group 290.png";
import group3 from "../../../images/Group 291.png";
function Validate() {
  return (
    <div>
      <div className="container mb-3">
        <HeaderSlider />
      </div>
      <div className="Validate">
        <div className="container">
          <div className="row">
            <div className="col-md-8 Section-A">
              <div className="Section-A-1">
                <div className="card ative-cards">
                  <div className="card-body">
                    <div className="ative-content">
                      <h6 className="title">TIMER</h6>
                      <div className="ative-pool">
                        <span className="ap">EVENTS VALIDATED</span>
                        <span className="amount">10</span>
                      </div>
                    </div>
                    <div className="ative-teams">
                      <div className="teams">
                        <img src={timer} alt="" className="mx-3" />
                        <span className="team mt-5"> 2 MINS</span>
                      </div>
                    </div>
                    <div className="bar">
                      {/* <div className="boost-progressbar">
                        <button className="boost-button">BOOST</button>
                      </div> */}
                      <div className="progressive">
                        <div
                          className="progressive-bar"
                          role="progressbar"
                          aria-label="Example with label"
                          style={{ width: "25%" }}
                          aria-valuenow="100"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="Section-A-2">
                <div className="card ative-cards">
                  <div className="card-body" style={{ padding: "4rem 4rem" }}>
                    <div className="ative-content">
                      <h6 className="title">EVENT</h6>
                    </div>
                    <div>
                      <p>TEAM A VS TEABM B </p>
                      <br></br>
                      <p style={{ fontWeight: "800" }}>LINK</p>
                      <p style={{ color: "green" }}>
                        HTTPS://VERIFICATIONDEMO.COM/EVENT
                      </p>
                      <br></br>
                      <p style={{ fontWeight: "800" }}>FINAL OUTCOME</p>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style={{ fontSize: "0.7rem" }}
                      >
                        TEAM A
                      </button>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        style={{ fontSize: "0.7rem" }}
                      >
                        DRAW
                      </button>
                      <button
                        type="button"
                        class="btn buttonTeamb"
                        style={{
                          backgroundColor: "#48FF7B",
                          color: "#0A0A0A",
                          fontSize: "0.7rem",
                        }}
                      >
                        TEAM B
                      </button>
                      <p className="verify">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          style={{
                            backgroundColor: "#232323",
                            boxShadow: "inset 0px 4px 4px #000000",
                          }}
                        />
                        i verify my selection on this event is accurate and in
                        line with the actual outcome of the event
                      </p>
                      <span
                        className="button-validate"
                        style={{ display: "flex", margin: "4rem 0rem" }}
                      >
                        <button
                          className="bet-btton d-flex align-items-center justify-content-between my-3"
                          style={{ width: "25rem", marginRight: "3rem" }}
                        >
                          VALIDATE <img src={arrow2} alt="" className="pi" />
                        </button>
                        <button
                          className="bet-btton d-flex align-items-center justify-content-between my-3"
                          style={{
                            width: "25rem",
                            backgroundColor: "#2B2A2A",
                            color: "#FFFFFF",
                          }}
                        >
                          SKIP{" "}
                          <img
                            src={arrow3}
                            alt=""
                            className="pi"
                            style={{ color: "FFFFFF" }}
                          />
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 Section-B">
            <div>
              <div className="event-content">
                <div className="instruction-area position-relative">
                  <div className="betting-instruction">
                    <h5 className="heading-instruction">
                      HOW TO VALIDATE AN EVENT
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
    </div>
  );
}

export default Validate;
