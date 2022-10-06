import React, {useEffect, useState} from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image100 from "../../../images/usdc-coin-icon-1.png";
import Image200 from "../../../images/IMAGE111.png";
import Image101 from "../../../images/image-27.png";
import arrow from "../../../images/extendicon.png";
import logo from "../../../images/bettingnewlogo.png";
import Image201 from "../../../images/image-28.png";
import Image202 from "../../../images/USD-Coin-Logo-PNG-Images-1.png";
import Image203 from "../../../images/Ellipse-24.png";
import BettingFooter from "./BettingFooter";
import { Link } from "react-router-dom";
import Footer from "../../components/Elements/Footer";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { approvePoints, getBETBalanceBUSD, getBETSV2Balance, getBUSDBalance, isPointSapproved } from "../../../web3/betsService";
import { claimpoints, earnvalidationpoints, getValidationPoint, pendingpoint, totaltokenlocked } from "../../../web3/betsMVPService";
import { GetUserName } from "../../../web3/ContextMethods";

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

function Wallet() {

  const [bets, setBETs] = useState(0);
  const [busd, setbusd] = useState(0);
  const [betv2, setbetsv2] = useState(0);
  const [betprice, setBetPrice] = useState(0);
  const [betstolock, setBettolock] = useState(0);
  const [validationPoints, setValidationPoints] = useState(0);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [getpendingpoint, setGetPendingPoints] = useState(0);
  const [account, setAccount] = useState();
  const [name, setUserName] = useState('')
  const [isuser, setIsuser] = useState('')
  const [user, setUser] = useState("");

  const API_call = async () => {
    axios.get("https://api.coingecko.com/api/v3/coins/betswamp")
      .then(function (response) {
        setBetPrice(response.data.market_data.current_price.usd);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const slicing = (address) => {
    const first = address.slice(0, 4);
    const second = address.slice(38);
    return first + "..." + second;
  };

  useEffect(() => {
    const inti = async()=>{
    //  initInstance();
    //  walletConnect();
     allCalls();
    }
 
     inti(); 
     setInterval(async () => {
       await allCalls();
     }, 3000);
   }, []);

   const allCalls = async () => {
    const Bets = await getBETBalanceBUSD();
    setBETs(Bets);
    const busds = await getBUSDBalance();
    setbusd(busds);
    const betV2 = await getBETSV2Balance();
    setbetsv2(betV2);
    const name = await GetUserName();
    setUser(name);
    const valpoints = await getValidationPoint();
    setValidationPoints(valpoints);
    const locked = await totaltokenlocked();
    setLockedAmount(locked / 10 ** 9);
    const pending = await pendingpoint();
    setGetPendingPoints(pending);
    API_call();
  };


  const LockBets = async () => {
    const amount = await isPointSapproved();
    if (Number(amount) > betstolock) {
      const data = await earnvalidationpoints(betstolock);
      if (data.status) {
        tost();
      }
    } else {
      await approvePoints();
      const data = await earnvalidationpoints(betstolock);
      if (data.status) {
        tost();
      }
    }
  };

  const ValidationPointsClaim = async () => {
    const data = await claimpoints();
    if (data.status) {
      tost();
    }
  };
  const totalprice = Number(busd) + Number(betprice * bets) + Number(betv2 * betprice);



  return (
    <>
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
      <div
        className="container"
        style={{
          color: "white",
          fontFamily: "Montserrat",
        }}
      >
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="active-history-area my-5">
              <Tabs
                defaultActiveKey="sports"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="sports" title="BALANCE">
                  <div style={{ fontSize: "0.6rem", marginBottom: "5rem" }}>
                    <div className="row" style={{ margin: "2rem" }}>
                      <div className="col-log-6 col-md-6">
                        <span>ESTIMATED BALANCE</span>
                        <br></br>
                        <span>${Number(totalprice).toFixed(2)}</span>
                      </div>
                      <div className="col-log-6 col-md-6">
                        <div
                          style={{
                            float: "right",
                            backgroundColor: "#0C0C0C",
                            borderRadius: "20px",
                            padding: "0.3rem",
                            paddingRight: "1rem",
                          }}
                        >
                          <span>
                            <img src={Image203} alt="/" />
                          </span>
                          <span>{user}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{
                        backgroundColor: "#0C0C0C",
                        borderRadius: "20px",
                        margin: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image100} alt="" />
                      </div>
                      <div className="col-lg-11 col-md-11 col-sm-10 col-10">
                        <span>usdc</span>
                        <br></br>
                        <span>{busd} USDC</span>
                        <br></br>
                        <span>${busd}</span>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{
                        backgroundColor: "#0C0C0C",
                        borderRadius: "20px",
                        margin: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image101} alt="" />
                      </div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-2">
                        <span>BETS</span>
                        <br></br>
                        <span>{bets} BETS</span>
                        <br></br>
                        <span>${Number(bets * betprice).toFixed(2)}{" "}</span>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-8">
                        <button
                          type="button"
                          class="btn buttonTeamb"
                          style={{
                            backgroundColor: "#48FF7B",
                            color: "#0A0A0A",
                            fontSize: "0.5rem",
                            fontWeight: "800",
                            marginLeft: "1rem",
                            float: "right",
                          }}
                        >
                          BUY
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab>

                {/* ........................................................................... */}

                <Tab eventKey="e-sports" title="VALIDATION POINTS">
                  <div style={{ fontSize: "0.6rem", marginBottom: "5rem" }}>
                    <div
                      className="row"
                      style={{
                        backgroundColor: "#111111",
                        borderRadius: "20px",
                        margin: "1rem",
                        marginTop: "2rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-log-6 col-md-6">
                        <span>TOTAL VALIDATION POINTS EARNED </span>
                        <br></br>
                        <span>{validationPoints}&nbsp;&nbsp;{" "}</span>
                      </div>
                      <div className="col-log-6 col-md-6">
                        <button
                          type="button"
                          class="btn buttonTeamb"
                          style={{
                            backgroundColor: "#FF9A02",
                            color: "#0A0A0A",
                            fontSize: "0.5rem",
                            fontWeight: "800",
                            margin: "1rem",
                            float: "right",
                          }}
                          onClick={() => ValidationPointsClaim()}
                        >
                          CLAIM
                        </button>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{
                        margin: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <span style={{ fontWeight: 1200 }}>SELECT TOKEN</span>
                      </div>
                    </div>
                    <div
                      className="row"
                      style={{
                        backgroundColor: "#0C0C0C",
                        borderRadius: "20px",
                        margin: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image200} alt="" />
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <span>sBETS</span>
                        <br></br>
                        <span>250 sBETS</span>
                        <br></br>
                        <span>$2000</span>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-5">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <input
                              type="text"
                              placeholder="ENTER AMOUNT"
                              className="input-amount"
                              style={{ margin: "1rem", float: "right" }}
                              onChange={(e) => setBettolock(e.target.value)}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              style={{
                                width: "75%",
                                fontSize: "0.7rem",
                                backgroundColor: "#4FFFCA",
                                borderRadius: "10px",
                                border: "none",
                                color: "#0A0A0A",
                                padding: "1rem 2rem",
                                fontWeight: "800",
                                float: "right",
                                margin: "1rem",
                              }}
                              onClick={()=>LockBets()}
                            >
                              LOCK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{
                        backgroundColor: "#0C0C0C",
                        borderRadius: "20px",
                        margin: "1rem",
                        padding: "1rem",
                      }}
                    >
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image100} alt="" />
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <span>ANOTHER TOKEN</span>
                        <br></br>
                        <span>2000 ANT</span>
                        <br></br>
                        <span>$2000</span>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-5 col-5">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <input
                              type="text"
                              placeholder="ENTER AMOUNT"
                              className="input-amount"
                              style={{ margin: "1rem", float: "right" }}
                            />
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                            <button
                              style={{
                                width: "75%",
                                fontSize: "0.7rem",
                                backgroundColor: "#4FFFCA",
                                borderRadius: "10px",
                                border: "none",
                                color: "#0A0A0A",
                                padding: "1rem 2rem",
                                fontWeight: "800",
                                float: "right",
                                margin: "1rem",
                              }}
                            >
                              LOCK
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              {/* ...................................................................................... */}
            </div>
          </div>
          <div className="col-lg-3 col-md-12">
            <div className="instruction-area" style={{ marginTop: "-24px" }}>
              <div className="event-content">
                <div className="instruction-area position-relative">
                  <div className="betting-instruction">
                    <h5 className="heading-instruction">
                      HOW TO EARN VALIDATION POINTS
                    </h5>
                    <img
                      src={Image201}
                      style={{ width: "40%" }}
                      alt=""
                      className="image-instruction"
                    />
                  </div>
                </div>
              </div>
              <div className="read-instruction">
                <div className="read-area">
                  <span className="read-btton">READ</span>
                  <img src={arrow} alt="" className="read-arrow-img" />
                </div>
              </div>
            </div>
            <div className="instruction-area" style={{ marginTop: "-24px" }}>
              <div className="event-content">
                <div className="instruction-area position-relative">
                  <div className="betting-instruction">
                    <h5 className="heading-instruction">
                      HOW TO FUND YOUR WALLET WITH USDC
                    </h5>
                    <img
                      src={Image202}
                      style={{ width: "40%" }}
                      alt=""
                      className="image-instruction"
                    />
                  </div>
                </div>
              </div>
              <div className="read-instruction">
                <div className="read-area">
                  <span className="read-btton">READ</span>
                  <img src={arrow} alt="" className="read-arrow-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <Toaster/>
      </div>
    </>
  );
}

export default Wallet;
