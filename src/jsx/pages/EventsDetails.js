import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/bettingnewlogo.png";
import "../../css/bettingcontent.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ImFire } from "react-icons/im";
import vector from "../../images/Vector.png";
import Vector from "../../images/Vector (2).png";
import disconnect from "../../images/clarity_disconnect-line.png";
import timer from "../../images/carbon_timer.png";
import connection from "../../images/connection.png";
import arrow2 from "../../images/arrow2.png";
import arrow from "../../images/extendicon.png";

export default function EventsDetails() {
  const [key, setKey] = useState("home");
  const [input, setInput] = useState(2);
  const [emptyimg, setEmptyImg] = useState(true);
  const [events, setEvents] = useState();

  const Close = () => {
    document.getElementById("bettingcard").style.display = "none";
  };
  const displaycard = () => {
    document.getElementById("bettingcard").style.display = "block";
  };
  const gettime = (time) => {
    const date = new Date(time * 1000).toLocaleTimeString();
    return date;
  };
  const getData = (time) => {
    const data = new Date(time * 1000).toLocaleDateString();
    return data;
  };
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
                  className="nav-link active navItem text-light mx-5"
                  aria-current="page"
                  href="/"
                >
                  DAO
                </Link>
              </li>
              {/* <li className="nav-item">
                <a
                  className="nav-link active navItem text-light mx-5"
                  aria-current="page"
                  href="/create-event"
                >
                  Create Event
                </a>
              </li> */}
              <li className="nav-item">
                <Link className="nav-link navItem text-light mx-5" href="/">
                  DASHBOARD
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navItem text-light mx-5" href="/">
                  WALLET
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/betting-app">
                  Mobile
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div>
          <div className="event-area">
            <div className="event-content">
              <Tabs
                defaultActiveKey="sports"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="sports" title="SPORTS">
                  <div className="container-fluid">
                    <div className="sports-heading">
                      <div className="sh d-flex align-items-center">
                        <h6 className="sports-heading">TRENDING</h6>
                        <img src={vector} alt="" className="mx-2" />
                      </div>
                      <div className="card-border">
                        {/* <div className="empty-details">
                      <p className="ed">no event available at the moment</p>
                    </div> */}

                        <div className="card background">
                          <div className="card-header area">
                            <h6 className="title">TITLE</h6>
                            <div className="pool-amount">
                              <h6 className="title2">UNMATCHED</h6>
                              <img
                                src={disconnect}
                                alt=""
                                className="mt-0 mx-2"
                              />
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
                      </div>
                    </div>
                    <div className="row" style={{margin:"1rem"}}>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                     
                          {" "}
                          <span>
                            <input
                              type="text"
                              placeholder="ENTER AMOUNT"
                              className="input-amount"
                              style={{}}
                            />
                          
                          </span> </div> <div className="col-lg-9 col-md-9 col-sm-9 col-9">
                          <span style={{color:"#AAAAAA",fontSize:"1.4rem"}}>Potential WINNINGS</span><br></br>
                          <span style={{color:"#AAAAAA",fontSize:"1.4rem"}}>$0.00</span></div>
                        </div>
                        
                      
               
                  </div>
                </Tab>
                {/* <Tab eventKey="e-sports" title="E-SPORTS">
              E-SPORTS
            </Tab>
            <Tab eventKey="everything else" title="EVERYTHING ELSE">
              EVERYTHING ELSE
            </Tab> */}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
