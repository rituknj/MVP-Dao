import React, { useState, useEffect } from "react";
import "../../../css/bettingcontent.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Slider from "react-slick";
import image from "../../../images/image 4.png";
import image2 from "../../../images/image 23.png";
import arrow from "../../../images/extendicon.png";
import arrow2 from "../../../images/arrow2.png";
import vector from "../../../images/Vector.png";
import Vector from "../../../images/Vector (2).png";
import timer from "../../../images/carbon_timer.png";
import ellipse from "../../../images/Ellipse 9.png";
import connection from "../../../images/connection.png";
import disconnect from "../../../images/clarity_disconnect-line.png";
import safu from "../../../images/safU Bets.png";
import emptyImg from "../../../images/emptyimg.png";
import cross from "../../../images/cross.png";
import "../../../css/headerslider.css";
import { ImFire } from "react-icons/im";
import {
  CreateEventOnDataBase,
  UpdateEventOnDataBase,
} from "./../../../web3/Countallevents";
import toast, { Toaster } from "react-hot-toast";
import {
  placeBet,
  getEventOccurrenceBetAmount,
  totalEvents,
  getSPORTfromDataBase,
  getEvnetsEsport,
} from "./../../../web3/betsMVPService";
import axios from "axios";

const notify = (msg) => toast.success(msg);
const alert = (msg) =>
  toast.error(msg, {
    style: {
      padding: "16px",
      color: "#000",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

const refurl = "https://safu-betting.netlify.app";

export default function BettingAppContent() {
  const [key, setKey] = useState("home");
  const [input, setInput] = useState(2);
  const [emptyimg, setEmptyImg] = useState(true);
  const [events, setEvents] = useState([]);
  const [teamone, setTeamone] = useState(0);
  const [teamtwo, setTeamtwo] = useState(0);
  const [amount, setAmount] = useState(0);
  const [totalstake, setTotalstake] = useState(0);
  const [id, setID] = useState();
  const [occure, setOccure] = useState(0);
  const [teamonestake, setTeamonestake] = useState();
  const [teamtwostake, setTeamtwostake] = useState();
  const [esportevent, setEsport] = useState(0);

  useEffect(() => {
    const init = async () => {
      const data = await getSPORTfromDataBase();
      setEvents(data);
      const esport = await getEvnetsEsport();
      setEsport(esport);
      console.log(esport);
    };
    init();
    setInterval(() => {
      init();
    }, 4000);
  }, []);

  const ShowInput = () => {
    console.log("showing");
    setInput(input);
  };

  const gettime = (time) => {
    const date = new Date(time * 1000).toLocaleTimeString();
    return date;
  };
  const getData = (time) => {
    const data = new Date(time * 1000).toLocaleDateString();
    return data;
  };

  const Close = () => {
    document.getElementById("bettingcard").style.display = "none";
  };
  const displaycard = () => {
    document.getElementById("bettingcard").style.display = "block";
  };
  const copytext = (text) => {
    navigator.clipboard.writeText(text);
    notify("Copied");
  };

  const onBet = async () => {
    console.log(id, occure, amount);
    if(amount == undefined || amount == 0){
      alert("Invalid bet amount")
      return true
    }
    const placebetdata = await placeBet(id, occure, amount);
    if (placebetdata.status) {
      await UpdateEventOnDataBase(id);
      notify("Bet placed successfully");
    }
  };

  return (
    <div>
      <Toaster />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <div className="bet-slip-area position-relative">
              <div className="bet-slip-content text-light">
                <span className="bet-slip-heading">BET SLIP</span>
              </div>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                onClick={() => {
                  ShowInput();
                }}
                className="mb-3 bg-transparent bets-tab"
              >
                {/* SINGLE */}
                <Tab eventKey="home" title="SINGLE">
                  <div className="single-area-content px-2">
                    {!emptyimg ? (
                      ""
                    ) : (
                      <div className="empty-image">
                        <img src={emptyImg} alt="" className="empty-img" />
                        <div className="emptyimg-text">
                          <p className="ei-text">BET SLIP EMPTY</p>
                          <p className="ei-text2">PLACE A BET TO GET STARTED</p>
                        </div>
                      </div>
                    )}

                    <div className="card section" id="bettingcard">
                      <div className="card-header bets-background">
                        <div className="close-card">
                          <h4 className="heading-bet">
                            {" "}
                            {teamone} <span className="vs">VS </span> {teamtwo}
                          </h4>
                          <img
                            src={cross}
                            alt=""
                            className="cross-img"
                            onClick={() => {
                              Close();
                              setEmptyImg(true);
                            }}
                          />
                        </div>
                      </div>
                      <div className="card-body bet-body-background">
                        <div
                          className={`teambox ${
                            occure == 0 ? "activeteam" : ""
                          }`}
                          onClick={() => {
                            setOccure(0);
                          }}
                        >
                          <h5 className="card-title heading">{teamone}</h5>
                          <div className="close-card">
                            <p className="card-text particpants">
                              PARTICIPANTS :
                            </p>
                            <p className="number">{teamonestake}</p>
                          </div>
                        </div>

                        <div
                          className={`teambox ${
                            occure == 1 ? "activeteam" : ""
                          }`}
                          onClick={() => {
                            setOccure(1);
                          }}
                        >
                          <h5 className="card-title heading">{teamtwo}</h5>
                          <div className="close-card">
                            <p className="card-text particpants">
                              PARTICIPANTS :
                            </p>
                            <p className="number">{teamtwostake}</p>
                          </div>
                        </div>

                        <div className="close-card">
                          <p className="card-text particpants">
                            TOTAL AMOUNT STAKED :
                          </p>
                          <p className="number">${totalstake}</p>
                        </div>
                        <div className="amount-card">
                          <input
                            type="text"
                            placeholder="ENTER AMOUNT"
                            className="input-amount"
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <div className="iaw">
                            <p className="winnigs">Potential WINNINGS</p>
                            <p className="wining-amount">$0.00</p>
                          </div>
                        </div>
                        <button
                          className="bet-btton d-flex align-items-center justify-content-between my-3"
                          onClick={() => onBet()}
                        >
                          PLACE BET <img src={arrow2} alt="" className="pi" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab>
                {/* ACCUMULATE */}
                <Tab
                  eventKey="profile"
                  title="ACCUMULATE"
                  style={{ padding: "0.5rem " }}
                >
                  <div className="empty-image">
                    <img src={emptyImg} alt="" className="empty-img" />
                    <div className="emptyimg-text">
                      <p className="ei-text">BET SLIP EMPTY</p>
                      <p className="ei-text2">PLACE A BET TO GET STARTED</p>
                    </div>
                  </div>
                  <div className="single-area-content px-2">
                    <div className="card section" id="accumulatecards">
                      <div className="card-header bets-background">
                        <div className="close-card">
                          <h4 className="heading-bet">
                            {" "}
                            TEAM A <span className="vs">VS </span> TEAM B
                          </h4>
                          <img src={cross} alt="" className="cross-img" />
                        </div>
                      </div>
                      <div className="card-body bet-body-background">
                        <h5 className="card-title heading">DRAW</h5>
                        <div className="close-card">
                          <p className="card-text particpants">
                            PARTICIPANTS :
                          </p>
                          <p className="number">5</p>
                        </div>
                        <div className="close-card">
                          <p className="card-text particpants">
                            TOTAL AMOUNT STAKED :
                          </p>
                          <p className="number">$2000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="single-area-content px-2 my-3">
                    <div className="card section" id="accumulatecards">
                      <div className="card-header bets-background">
                        <div className="close-card">
                          <h4 className="heading-bet">
                            {" "}
                            TEAM A <span className="vs">VS </span> TEAM B
                          </h4>
                          <img src={cross} alt="" className="cross-img" />
                        </div>
                      </div>
                      <div className="card-body bet-body-background">
                        <h5 className="card-title heading">DRAW</h5>
                        <div className="close-card">
                          <p className="card-text particpants">
                            PARTICIPANTS :
                          </p>
                          <p className="number">5</p>
                        </div>
                        <div className="close-card">
                          <p className="card-text particpants">
                            TOTAL AMOUNT STAKED :
                          </p>
                          <p className="number">$2000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="placeBet">
                    <div className="placebet">
                      <div className="amount-card">
                        <input
                          type="text"
                          placeholder="ENTER AMOUNT"
                          className="input-amount"
                        />
                        <div className="iaw">
                          <p className="winnigs">Potential WINNINGS</p>
                          <p className="wining-amount">$0.00</p>
                        </div>
                      </div>
                      <button className="bet-btton d-flex align-items-center justify-content-between my-3">
                        PLACE BET <img src={arrow2} alt="" className="pi" />
                      </button>
                    </div>
                  </div>
                </Tab>
              </Tabs>

              <div className="nav-area">
                <div className="nav-content"></div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="right-content-area">
              <div className="right-content">
                <div className="slider-container">
                  <Slider
                    dots={true}
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={3100}
                  >
                    <div className="slider-content">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="slider-area">
                            <img src={safu} alt="" className="safu-img" />
                            <button className="enter-button">ENTER</button>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <img src={image} alt="" className="game-img" />
                        </div>
                      </div>
                    </div>
                    <div className="slider-content">
                      <div className="slider-content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="slider-area">
                              <img src={safu} alt="" className="safu-img" />
                              <button className="enter-button">ENTER</button>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={image} alt="" className="game-img" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slider-content">
                      <div className="slider-content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="slider-area">
                              <img src={safu} alt="" className="safu-img" />
                              <button className="enter-button">ENTER</button>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={image} alt="" className="game-img" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slider-content">
                      <div className="slider-content">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="slider-area">
                              <img src={safu} alt="" className="safu-img" />
                              <button className="enter-button">ENTER</button>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <img src={image} alt="" className="game-img" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-12">
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
                                <div className="empty-details">
                                  <p className="ed">
                                    no event available at the moment
                                  </p>
                                </div>

                                {events &&
                                  events.map((res) => {
                                    return (
                                      <div
                                        className="card background my-3"
                                        onClick={() => {
                                          displaycard();
                                          setEmptyImg(false);
                                          setTeamtwo(res.teamtwo);
                                          setTeamone(res.teamone);
                                          setTeamonestake(
                                            res.teamOneParticipate
                                          );
                                          setTeamtwostake(
                                            res.teamtwoParticipate
                                          );
                                          setTotalstake(
                                            res.poolsize / 10 ** 18
                                          );
                                          setID(res.ID);
                                          setOccure(0);
                                        }}
                                      >
                                        <div className="card-header area">
                                          <h6 className="title">{res.name}</h6>
                                          <div className="pool-amount">
                                            <h6 className="title2">MATCHED</h6>
                                            <img
                                              src={connection}
                                              alt=""
                                              className="mt-0 mx-2"
                                            />
                                            <div className="pa">
                                              <p className="pool-size">
                                                POOL SIZE
                                              </p>
                                              <span className="amount">
                                                $
                                                {Number(
                                                  res.poolsize / 10 ** 18
                                                ).toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body background">
                                          <div className="row">
                                            <div className="col-lg-3">
                                              <div className="teams">
                                                <p className="team">
                                                  {res.teamone}
                                                </p>
                                                <p className="team2">
                                                  {res.teamtwo}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-lg-9">
                                              <div className="remaing-section">
                                                <div className="images-container">
                                                  <img
                                                    src={Vector}
                                                    alt=""
                                                    onClick={() =>
                                                      copytext(
                                                        `${refurl}/event-detail/${res._id}`
                                                      )
                                                    }
                                                  />
                                                  <ImFire
                                                    className="mx-3"
                                                    size={27}
                                                    fill={
                                                      res.isboosted
                                                        ? "#bfbf18"
                                                        : "#b2b2b2"
                                                    }
                                                  />
                                                  <div className="timings d-grid mx-2">
                                                    <span className="day">
                                                      {gettime(res.starttime)}
                                                    </span>
                                                    <span className="day">
                                                      {getData(res.starttime)}
                                                    </span>
                                                  </div>
                                                  <img src={timer} alt="" />
                                                </div>
                                                <div className="result-content">
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      {res.teamone}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.zero}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      DRAW
                                                    </h6>
                                                    <p className="percent">
                                                      {res.two}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center">
                                                    <h6 className="matches-name">
                                                      {res.teamtwo}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.one}%
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                                {/* <div className="card background">
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
                                            <img
                                              src={vector}
                                              alt=""
                                              className="mx-2"
                                            />
                                            <div className="timings d-grid mx-2">
                                              <span className="day">14:00</span>
                                              <span className="day">
                                                SPET 31
                                              </span>
                                            </div>
                                            <img src={timer} alt="" />
                                          </div>
                                          <div className="result-content">
                                            <div className="matches text-center mx-1">
                                              <h6 className="matches-name">
                                                TEAM A
                                              </h6>
                                              <p className="percent">60%</p>
                                            </div>
                                            <div className="matches text-center mx-1">
                                              <h6 className="matches-name">
                                                DRAW
                                              </h6>
                                              <p className="percent">60%</p>
                                            </div>
                                            <div className="matches text-center">
                                              <h6 className="matches-name">
                                                TEAM A
                                              </h6>
                                              <p className="percent">60%</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                <div className="view-more-area">
                                  <hr className="hr" />
                                  <div className="view-more">
                                    <p className="view-other-cards">
                                      VIEW MORE
                                    </p>
                                    <img
                                      src={arrow}
                                      alt=""
                                      className="arrow-img"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                        <Tab eventKey="e-sports" title="E-SPORTS">
                          <div className="container-fluid">
                            <div className="sports-heading">
                              <div className="sh d-flex align-items-center">
                                <h6 className="sports-heading">TRENDING</h6>
                                <img src={vector} alt="" className="mx-2" />
                              </div>
                              <div className="card-border">
                                <div className="empty-details">
                                  <p className="ed">
                                    no event available at the moment
                                  </p>
                                </div>

                                {esportevent &&
                                  esportevent.map((res) => {
                                    return (
                                      <div
                                        className="card background my-3"
                                        onClick={() => {
                                          displaycard();
                                          setEmptyImg(false);
                                          setTeamtwo(res.teamtwo);
                                          setTeamone(res.teamone);
                                          setTeamonestake(
                                            res.teamOneParticipate
                                          );
                                          setTeamtwostake(
                                            res.teamtwoParticipate
                                          );
                                          setTotalstake(
                                            res.poolsize / 10 ** 18
                                          );
                                          setID(res.ID);
                                          setOccure(0);
                                        }}
                                      >
                                        <div className="card-header area">
                                          <h6 className="title">{res.name}</h6>
                                          <div className="pool-amount">
                                            <h6 className="title2">MATCHED</h6>
                                            <img
                                              src={connection}
                                              alt=""
                                              className="mt-0 mx-2"
                                            />
                                            <div className="pa">
                                              <p className="pool-size">
                                                POOL SIZE
                                              </p>
                                              <span className="amount">
                                                $
                                                {Number(
                                                  res.poolsize / 10 ** 18
                                                ).toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body background">
                                          <div className="row">
                                            <div className="col-lg-3">
                                              <div className="teams">
                                                <p className="team">
                                                  {res.teamone}
                                                </p>
                                                <p className="team2">
                                                  {res.teamtwo}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-lg-9">
                                              <div className="remaing-section">
                                                <div className="images-container">
                                                  <img
                                                    src={Vector}
                                                    alt=""
                                                    onClick={() =>
                                                      copytext(
                                                        `${refurl}/event-detail/${res._id}`
                                                      )
                                                    }
                                                  />
                                                  <ImFire
                                                    className="mx-3"
                                                    size={27}
                                                    fill={
                                                      res.isboosted
                                                        ? "#bfbf18"
                                                        : "#b2b2b2"
                                                    }
                                                  />
                                                  <div className="timings d-grid mx-2">
                                                    <span className="day">
                                                      {gettime(res.starttime)}
                                                    </span>
                                                    <span className="day">
                                                      {getData(res.starttime)}
                                                    </span>
                                                  </div>
                                                  <img src={timer} alt="" />
                                                </div>
                                                <div className="result-content">
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      {res.teamone}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.zero}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      DRAW
                                                    </h6>
                                                    <p className="percent">
                                                      {res.two}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center">
                                                    <h6 className="matches-name">
                                                      {res.teamtwo}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.one}%
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                                <div className="view-more-area">
                                  <hr className="hr" />
                                  <div className="view-more">
                                    <p className="view-other-cards">
                                      VIEW MORE
                                    </p>
                                    <img
                                      src={arrow}
                                      alt=""
                                      className="arrow-img"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                     
                        <Tab eventKey="everything else" title="EVERYTHING ELSE">
                          <div className="container-fluid">
                            <div className="sports-heading">
                              <div className="sh d-flex align-items-center">
                                <h6 className="sports-heading">TRENDING</h6>
                                <img src={vector} alt="" className="mx-2" />
                              </div>
                              <div className="card-border">
                                <div className="empty-details">
                                  <p className="ed">
                                    no event available at the moment
                                  </p>
                                </div>

                                {events &&
                                  events.map((res) => {
                                    return (
                                      <div
                                        className="card background my-3"
                                        onClick={() => {
                                          displaycard();
                                          setEmptyImg(false);
                                          setTeamtwo(res.teamtwo);
                                          setTeamone(res.teamone);
                                          setTeamonestake(
                                            res.teamOneParticipate
                                          );
                                          setTeamtwostake(
                                            res.teamtwoParticipate
                                          );
                                          setTotalstake(
                                            res.poolsize / 10 ** 18
                                          );
                                          setID(res.ID);
                                          setOccure(0);
                                        }}
                                      >
                                        <div className="card-header area">
                                          <h6 className="title">{res.name}</h6>
                                          <div className="pool-amount">
                                            <h6 className="title2">MATCHED</h6>
                                            <img
                                              src={connection}
                                              alt=""
                                              className="mt-0 mx-2"
                                            />
                                            <div className="pa">
                                              <p className="pool-size">
                                                POOL SIZE
                                              </p>
                                              <span className="amount">
                                                $
                                                {Number(
                                                  res.poolsize / 10 ** 18
                                                ).toFixed(2)}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="card-body background">
                                          <div className="row">
                                            <div className="col-lg-3">
                                              <div className="teams">
                                                <p className="team">
                                                  {res.teamone}
                                                </p>
                                                <p className="team2">
                                                  {res.teamtwo}
                                                </p>
                                              </div>
                                            </div>
                                            <div className="col-lg-9">
                                              <div className="remaing-section">
                                                <div className="images-container">
                                                  <img
                                                    src={Vector}
                                                    alt=""
                                                    onClick={() =>
                                                      copytext(
                                                        `${refurl}/event-detail/${res._id}`
                                                      )
                                                    }
                                                  />
                                                  <ImFire
                                                    className="mx-3"
                                                    size={27}
                                                    fill={
                                                      res.isboosted
                                                        ? "#bfbf18"
                                                        : "#b2b2b2"
                                                    }
                                                  />
                                                  <div className="timings d-grid mx-2">
                                                    <span className="day">
                                                      {gettime(res.starttime)}
                                                    </span>
                                                    <span className="day">
                                                      {getData(res.starttime)}
                                                    </span>
                                                  </div>
                                                  <img src={timer} alt="" />
                                                </div>
                                                <div className="result-content">
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      {res.teamone}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.zero}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center mx-1">
                                                    <h6 className="matches-name">
                                                      DRAW
                                                    </h6>
                                                    <p className="percent">
                                                      {res.two}%
                                                    </p>
                                                  </div>
                                                  <div className="matches text-center">
                                                    <h6 className="matches-name">
                                                      {res.teamtwo}
                                                    </h6>
                                                    <p className="percent">
                                                      {res.one}%
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}

                                <div className="view-more-area">
                                  <hr className="hr" />
                                  <div className="view-more">
                                    <p className="view-other-cards">
                                      VIEW MORE
                                    </p>
                                    <img
                                      src={arrow}
                                      alt=""
                                      className="arrow-img"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                      
                      </Tabs>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-12">
                  <div className="instruction-area my-3">
                    <div className="event-content">
                      <div className="instruction-area position-relative">
                        <div className="betting-instruction">
                          <h5 className="heading-instruction">
                            HOW TO PLACE A BET
                          </h5>
                          <img
                            src={image2}
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
                  <div className="chats-area">
                    <div className="chats-content">
                      <h5 className="chats-heading">CHAT</h5>
                      <img src={ellipse} alt="" />
                    </div>
                  </div>
                  <div className="mx-1 my-3 chat-text-background">
                    <div className="chat-text">
                      <h6 className="username-heading">USERNAME</h6>
                      <p className="lorem-text">
                        Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS
                        TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                        BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A
                        VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                        BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                      </p>
                    </div>
                  </div>
                  <div className="mx-1 my-3 chat-text-background">
                    <div className="chat-text">
                      <h6 className="username-heading">USERNAME</h6>
                      <p className="lorem-text">
                        Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS
                        TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                        BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A
                        VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                        BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
                      </p>
                    </div>
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
