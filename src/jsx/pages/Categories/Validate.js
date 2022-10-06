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
import toast, { Toaster } from "react-hot-toast";
import { gettotaluserwageramount, userBethistory, UserEventHistory, notvalidatedevents, validatedevents, validateEvent } from "../../../web3/betsMVPService";
import { UpdateEventOnDataBase } from "../../../web3/Countallevents";

const tost = () =>
  toast.success("Success.", {
    style: {
      padding: "16px",
      color: "#000",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

function Validate() {
  const [totalamount, setTotalamount] = useState(0)
  const [totalEvnetUserHistory, setTotalUserEvent] = useState(0)
  const [totaluserBetHistory, setTotalUserBetHistory] = useState(0)
  const [nonvalidate, setNonvalidate] = useState();
  const [link, setLink] = useState('')
  const [endtime, setEndtime] = useState(0)
  const [teamone, setTeamone] = useState('')
  const [checked, setChecked] = useState(true)
  const [eventid, setEventID] = useState(0);
  const [i, setI] = useState(0)
  const [occur, setoccur] = useState(0);
  const [validated, setValidated] = useState([])

  useEffect(()=>{
    const init = async()=>{
      const non = await notvalidatedevents();
      const valid = await validatedevents()
      setValidated(valid)
      console.log("Events", non)
      setNonvalidate(non)
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

  useEffect(()=>{
    const init = async()=>{
      const non = await notvalidatedevents();
      setEventID(non[i].ID)
    }
    init();
  },[i])



const skipevent =()=>{
  if(i == nonvalidate.length-1){
    setI(0)
  }
  else{
    setI(i + 1)
  }
}

const validateEvenets = async (id) => {
  const data = await validateEvent(id, occur);
  if (data.status) {
    await UpdateEventOnDataBase(id);
    tost();
  }
};


const countdown = (tab) => {
  var now = new Date().getTime();
  const time = tab * 1000;
  var distance = time - now;

  if(distance < 0){
    return "0D 0H 0M 0S"
  }
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return days + "D " + hours + "H " + minutes + "M ";
};
 

console.log()
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
                        <span className="amount">{validated.length}</span>
                      </div>
                    </div>
                    <div className="ative-teams">
                      <div className="teams">
                        <img src={timer} alt="" className="mx-3" />
                        <span className="team mt-5">{nonvalidate && countdown(nonvalidate[i].endtime)}</span>
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
                      <p>{nonvalidate && nonvalidate[i].teamone} VS { nonvalidate && nonvalidate[i].teamtwo} </p>
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
                        <span>{nonvalidate && nonvalidate[i].link}</span>
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
                              backgroundColor: `${occur == 0 ? "#48FF7B": "#1C1C1C"}`,
                              borderRadius: "10px",
                              border: "none",
                              color: `${occur == 0 ? "#0A0A0A": "#fff"}`,
                              padding: "1rem 2rem",
                            }}
                            onClick={()=>setoccur(0)}
                          >
                            {nonvalidate && nonvalidate[i].teamone}
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
                              backgroundColor: `${occur == 1 ? "#48FF7B": "#1C1C1C"}`,
                              borderRadius: "10px",
                              border: "none",
                              color: `${occur == 1 ? "#0A0A0A": "#fff"}`,
                              padding: "1rem 2rem",
                            }}
                            onClick={()=>setoccur(1)}
                          >
                            {nonvalidate && nonvalidate[i].teamtwo}
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
                              backgroundColor: `${occur == 2 ? "#48FF7B": "#1C1C1C"}`,
                              borderRadius: "10px",
                              border: "none",
                              color: `${occur == 2 ? "#0A0A0A": "#fff"}`,
                              padding: "1rem 2rem",
                              fontWeight: "800",
                            }}
                            onClick={()=>setoccur(2)}
                          >
                            DRAW
                          </button>
                        </div>
                      </div>
                      <p className="verify">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                          onClick={()=>setChecked(!checked)}
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
                          onClick={()=>validateEvenets()}
                          disabled={checked}
                         
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
                          onClick={()=>{skipevent() }}
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
      <Toaster/>
    </div>
  );
}

export default Validate;
