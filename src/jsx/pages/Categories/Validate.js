import React, { useEffect, useState } from "react";
import HeaderSlider from "./HeaderSlider";
import timer from "../../../images/carbon_timer.png";
import "../../../css/Betswamp.css";
import "../../../css/tickets.css";
import arrow2 from "../../../images/arrow2.png";
import arrow3 from "../../../images/arrow.png";
import arrow from "../../../images/extendicon.png";
import image2 from "../../../images/image 26.png";
import group from "../../../images/Ellipse 43 (1).png";
import logo from "../../../images/bettingnewlogo.png";
import group2 from "../../../images/Ellipse 43.png";
import group3 from "../../../images/Ellipse 44.png";
import Image300 from "../../../images/Vector-100.png";
import Image301 from "../../../images/Vector-102.png";
import { nodeName } from "rsuite/esm/DOMHelper";
import { Link } from "react-router-dom";
import Footer from "../../components/Elements/Footer";
import { gettotaluserwageramount, userBethistory, UserEventHistory, notvalidatedevents } from "../../../web3/betsMVPService";

function Validate() {
  const [totalamount, setTotalamount] = useState(0)
  const [totalEvnetUserHistory, setTotalUserEvent] = useState(0)
  const [totaluserBetHistory, setTotalUserBetHistory] = useState(0)
  const [nonvalidate, setNonvalidate] = useState([]);
  const [link, setLink] = useState('')
  const [endtime, setEndtime] = useState(0)
  const [teamone, setTeamone] = useState('')
  const [teamtwo, setTeamtwo] = useState('')
  const [eventid, setEventID] = useState(0);
  const [i, setI] = useState(0)

  useEffect(()=>{
    const init = async()=>{
      const non = await notvalidatedevents();
      setNonvalidate(non)
      setLink(non[0].link)
      setEndtime(non[0].endtime)
      setTeamone(non[0].teamone)
      setTeamtwo(non[0].teamtwo)
      setEventID(non[0].ID)
      const stake = await gettotaluserwageramount()
      setTotalamount(stake/10**18)
      const usereventhty = await UserEventHistory();
      setTotalUserEvent(usereventhty.length)
      const userbethty = await userBethistory()
      setTotalUserBetHistory(userbethty.length)
    }
    init();
  },[])

const skipevent =async()=>{
  
  setLink(nonvalidate[i].link)
  setEndtime(nonvalidate[i].endtime)
  setTeamone(nonvalidate[i].teamone)
  setTeamtwo(nonvalidate[i].teamtwo)
  setEventID(nonvalidate[i].ID)
}
 


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src={logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/"
                >
                  DOCS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/betting-app"
                >
                  BETS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/create-event"
                >
                  CREATE
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/tickets"
                >
                  TICKET
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/Validate"
                >
                  VALIDATE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navItem text-light mx-3" to="/Wallet">
                  WALLET
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
                      <p>{teamone} VS {teamtwo} </p>
                      <br></br>
                      <p style={{ fontWeight: "800" }}>
                        <span>LINK</span>
                        <span>
                          <img
                            src={Image300}
                            alt=""
                            style={{ width: "1rem", marginLeft: "1rem" }}
                          />
                        </span>
                      </p>
                      <p style={{ color: "green" }}>
                        <span>{link}</span>
                        <span>
                          <img
                            src={Image301}
                            alt=""
                            style={{ width: "1rem", marginLeft: "1rem" }}
                          />
                        </span>
                      </p>
                      <br></br>
                      <p style={{ fontWeight: "800" }}>FINAL OUTCOME</p>
                      <div className="row">
                        <div
                          className="col-lg-4 col-md-4 col-sm-12 col-12"
                          style={{
                            marginTop: "1rem",
                            textAlign: "center",
                          }}
                        >
                          <button
                            style={{
                              width: "75%",
                              fontSize: "0.7rem",
                              backgroundColor: "#1C1C1C",
                              borderRadius: "10px",
                              border: "none",
                              color: "#FFFFFF",
                              padding: "1rem 2rem",
                            }}
                          >
                            TEAM A
                          </button>
                        </div>
                        <div
                          className="col-lg-4 col-md-4 col-sm-12 col-12"
                          style={{ marginTop: "1rem", textAlign: "center" }}
                        >
                          <button
                            style={{
                              width: "75%",
                              fontSize: "0.7rem",
                              backgroundColor: "#1C1C1C",
                              borderRadius: "10px",
                              border: "none",
                              color: "#FFFFFF",
                              padding: "1rem 2rem",
                            }}
                          >
                            DRAW
                          </button>
                        </div>
                        <div
                          className="col-lg-4 col-md-4 col-sm-12 col-12"
                          style={{ marginTop: "1rem", textAlign: "center" }}
                        >
                          <button
                            style={{
                              width: "75%",
                              fontSize: "0.7rem",
                              backgroundColor: "#48FF7B",
                              borderRadius: "10px",
                              border: "none",
                              color: "#0A0A0A",
                              padding: "1rem 2rem",
                              fontWeight: "800",
                            }}
                          >
                            TEAM B
                          </button>
                        </div>
                      </div>
                      <p className="verify">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          style={{
                            backgroundColor: "rgb(159 159 159)",
                            boxShadow: "inset 0px 4px 4px #000000",
                          }}
                        />
                        I verify my selection on this event is accurate and in
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
                          onClick={()=>skipevent(0)}
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
                      <img src={group3} alt="" className="lights" />{" "}
                      <h6 className="card-title total">TOTAL</h6>
                    </div>
                    <h5 className="card-subtitle stats-content">BETS MADE</h5>
                    <p className="card-text sc">{totaluserBetHistory}</p>
                  </div>
                </div>
                <div className="card stats-bg my-4">
                  <div className="card-body">
                    <div className="group d-flex align-items-center">
                      <img src={group2} alt="" className="lights2" />{" "}
                      <h6 className="card-title total">TOTAL</h6>
                    </div>
                    <h5 className="card-subtitle stats-content">
                      EVENTS CREATED
                    </h5>
                    <p className="card-text sc">{totalEvnetUserHistory}</p>
                  </div>
                </div>
                <div className="card stats-bg">
                  <div className="card-body">
                    <div className="group d-flex align-items-center">
                      <img src={group} alt="" className="lights3" />{" "}
                      <h6 className="card-title total">TOTAL</h6>
                    </div>
                    <h5 className="card-subtitle stats-content">
                      AMOUNT WAGERED
                    </h5>
                    <p className="card-text sc">${totalamount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Validate;
