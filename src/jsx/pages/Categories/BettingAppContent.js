import React, { useState } from "react";
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

export default function BettingAppContent() {
  const [key, setKey] = useState("home");
  const [input, setInput] = useState(2);
  const [emptyimg, setEmptyImg] = useState(true);

  const ShowInput = () => {
    console.log("showing");
    setInput(input);
  };
  const Close = () => {
    document.getElementById("bettingcard").style.display = "none";
  };
  const displaycard = () => {
    document.getElementById("bettingcard").style.display = "block";
  };

  return (
    <div>
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
                            TEAM A <span className="vs">VS </span> TEAM B
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
                      </div>
                    </div>
                  </div>
                  <div className="placeBet">
                    <div className="placebet">
                      <button className="bet-btton d-flex align-items-center justify-content-between my-3">
                        PLACE BET <img src={arrow2} alt="" className="pi" />
                      </button>
                    </div>
                  </div>
                </Tab>
                {/* ACCUMULATE */}
                <Tab eventKey="profile" title="ACCUMULATE">
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
                                <div
                                  className="card background my-3"
                                  onClick={() => {
                                    displaycard();
                                    setEmptyImg(false);
                                  }}
                                >
                                  <div className="card-header area">
                                    <h6 className="title">TITLE</h6>
                                    <div className="pool-amount">
                                      <h6 className="title2">MATCHED</h6>
                                      <img
                                        src={connection}
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
                                </div>
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
                                </div>
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
                          E-SPORTS
                        </Tab>
                        <Tab eventKey="everything else" title="EVERYTHING ELSE">
                          EVERYTHING ELSE
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
