import React, { useState } from "react";
import Slider from "react-slick";
import image from "../../images/image 4.png";
import safu from "../../images/safU Bets.png";
import "../../css/headerslider.css";
import MobileNav from "./MobileNav";
import MobileArea from "./MobileArea";
import cross from "../../images/cross.png";
import "../../css/bettingcontent.css";
import ellipse from "../../images/Ellipse 9.png";
import image2 from "../../images/image 23.png";
import arrow from "../../images/extendicon.png";
import BettingFooter from "../pages/Categories/BettingFooter";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SportsDetails from "../pages/Categories/SportsDetails";
import Accumulate from "../pages/Categories/Accumulate";

export default function MobileHeader() {
  const [key, setKey] = useState("home");
  return (
    <div>
      <MobileNav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
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
        </div>
      </div>

      {/* BET INSTRUCTION */}

      <div className="col-md-12">
        <div className="instruction-area">
          <div className="event-content">
            <div className="instruction-area position-relative">
              <div className="betting-instruction">
                <h5 className="heading-instruction">HOW TO PLACE A BET</h5>
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
        </div>
      </div>

      {/* CHATS */}
      <div className="row">
        <div className="col-md-12">
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
                Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM
              </p>
            </div>
          </div>
          <div className="mx-1 my-3 chat-text-background">
            <div className="chat-text">
              <h6 className="username-heading">USERNAME</h6>
              <p className="lorem-text">
                Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM
                A VS TEAM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="container-fluid">
        <div className="row my-4">
        <div className="col-lg-12">
            <div className="bet-slip-area">
              <div className="bet-slip-content text-light">
                <span className="bet-slip-heading">BET SLIP</span>
              </div>
              <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3 bg-transparent bets-tab"
              >
                <Tab eventKey="home" title="SINGLE">
                  <div className="single-area-content px-2">
                    <div className="card section">
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
                </Tab>
                <Tab eventKey="profile" title="ACCUMULATE">
                  <Accumulate />
                </Tab>
              </Tabs>

              <div className="nav-area">
                <div className="nav-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="event-area">
              <div className="event-content">
                <Tabs
                  defaultActiveKey="sports"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="sports" title="SPORTS">
                    <SportsDetails />
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
        </div>
      </div>
      <MobileArea />
      <BettingFooter />
    </div>
  );
}
