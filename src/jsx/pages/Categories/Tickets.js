import React, { useEffect, useState } from "react";
import HeaderSlider from "./HeaderSlider";
import timer from "../../../images/carbon_timer.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import arrow from "../../../images/extendicon.png";
import group from "../../../images/Ellipse 43 (1).png";
import group2 from "../../../images/Ellipse 43.png";
import group3 from "../../../images/Ellipse 44.png";
import image2 from "../../../images/image 26.png";
import "../../../css/tickets.css";
import "../../../css/Betswamp.css";
import toast, { Toaster } from "react-hot-toast";
import { getEvnetsfromDataBase, BoostEvent, userBethistory, gettotaluserwageramount, CreatorReward } from "../../../web3/betsMVPService";
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

export default function Tickets() {

  const [events, setEvents] = useState([]);
  const [totaluserBetHistory, setTotalUserBetHistory] = useState(0)
  const [totalamount, setTotalamount] = useState(0)

  useEffect(() => {
    const init = async () => {
      // const data = await getEvnetsfromDataBase();
      // setEvents(data);
   
      const userbethty = await userBethistory()
      setTotalUserBetHistory(userbethty.length)
      const stake = await gettotaluserwageramount()
      setTotalamount(stake/10**18)
      
    };
    init();
    setInterval(() => {
      init();
    }, 4000);
  }, []);

  useEffect(()=>{
   const init =async()=>{
    const data = await getEvnetsfromDataBase();
    const events = []
    for(let i = 0; i < data.length; i++){
      const event = data[i] 
      // const reward = await CreatorReward(data[i].ID)
      // event.rewardofcreator = reward
      // console.log(reward)
      events.push(event)
      // console.log(event)
    }
    setEvents(events);
   }
   init();
  },[])

  const gettime = (time) => {
    const date = new Date(time * 1000).toLocaleTimeString();
    return date;
  };
  const getData = (time) => {
    const data = new Date(time * 1000).toLocaleDateString();
    return data;
  };

 
  const eventBoosting = async(id)=>{
    const data = await BoostEvent(id);
    if(data.status){
      toast()
      await UpdateEventOnDataBase(id)
    }
  }

  // console.log(events)
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
                {events && events.map((res)=>{
                  return  <>
                 {res.endtime > (new Date().getTime()/1000) ? <div
                      className="card ative-cards"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                        margin: "1rem",
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
                              <h6 className="title">{res.Name}</h6>
                              <div className="ative-pool">
                                <span className="ap">POOL SIZE</span>
                                <span className="amount">${res.poolsize/10**18}</span>
                              </div>
                            </div>
                            <div className="ative-teams">
                              <div className="teams">
                                <p className="team mt-5">{res.teamone}</p>
                                <p className="team2 mt-4">{res.teamtwo}</p>
                              </div>
                              <div className="ative-contents">
                                <div className="timings d-grid mx-2">
                                  <span className="day">{gettime(res.endtime)}</span>
                                  <span className="day">{getData(res.endtime)}</span>
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
                                    <button className="boost-button" onClick={()=>eventBoosting(res.ID)}>
                                      BOOST
                                    </button>
                                  </div>
                                 
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
                              <span className="pp">{res.zero}% </span>
                              <span className="pp-team">{res.teamone}</span>
                            </p>
                            <br></br>
                            <p>
                              <span className="pp">{res.one}% </span>
                              <span className="pp-team">DRAW</span>
                            </p>
                            <br></br>
                            <p>
                              <span className="pp">{res.two}% </span>
                              <span className="pp-team">{res.teamtwo}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>: ''}
                    </>
                })}
                </div>
                </Tab>
                <Tab eventKey="e-sports" title="HISTORY">
                 
                    {events && events.map((res)=>{
                      return  <>
                      {console.log(res.endtime < new Date().getTime())}
                      {res.endtime < new Date().getTime()/1000 ? <div
                      className="first-card"
                      style={{
                        backgroundColor: "#111111",
                        position: "relative",
                        margin: "2rem",
                        borderRadius: "2rem",
                      }}
                    >
                      <div className="row ">
                      <div className="col-lg-9 col-md-9 col-sm-9 col-12">
                        <div
                          className="card ative-cards"
                          style={{
                            padding: "2rem",
                            margin: "0px 0px",
                            borderRadius: "2rem 0rem 0rem 2rem",
                          }}
                        >
                          <div className="row">
                            <div className="col-lg-2 col-md-2 col-sm-12 col-12">
                              <h6 className="title">{res.Name}</h6>
                            </div>
                            <div
                              className="col-lg-10 col-md-10 col-sm-12 col-12"
                              style={{ display: "block", alignItem: "right" }}
                            >
                              <div
                                className="row"

                                // style={{ fontSize: "0.2rem" }}
                              >
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span className="ap">POOL SIZE</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span className="amount">${res.poolsize/10**18}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span className="ap">BONUS</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span
                                        className="amount"
                                        style={{ color: "#FF4874" }}
                                      >
                                        $30
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span
                                        className="ap"
                                        style={{ fontSize: "0.4rem" }}
                                      >
                                        CREATOR'S REWARD
                                      </span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span className="amount">$600</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span className="ap">WON</span>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-6 col-6">
                                      <span
                                        className="amount"
                                        style={{ color: "#48FF7B" }}
                                      >
                                        $3,600
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="row"
                            style={{
                              color: "#FFFFFF",
                              marginTop: "2rem",
                              fontSize: "0.6rem",
                            }}
                          >
                            <div className="col-lg-9 col-md-9 col-sm-12 col-12">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                  <span>{res.teamone}</span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                  <span
                                    style={{
                                      display: "block",
                                      textAlign: "right",
                                    }}
                                  >
                                    WINNER
                                  </span>
                                </div>
                              </div>
                              <div
                                className="row"
                                style={{ marginTop: "1rem" }}
                              >
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                  <span>{res.teamtwo}</span>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                  <span
                                    style={{
                                      display: "block",
                                      textAlign: "right",
                                    }}
                                  >
                                    DRAW
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-3 col-md-3 col-sm-12 col-12">
                              <div className="ative-pool">
                                <button
                                  style={{
                                    width: "95%",
                                    fontSize: "1rem",
                                    backgroundColor: "#48FF7B",
                                    borderRadius: "10px",
                                    border: "none",
                                    color: "black",
                                    padding: "1rem 1rem",
                                    fontWeight: "800",
                                  }}
                                >
                                  CLAIM
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>



                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-12">
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
                            backgroundColor: "#111111",
                            fontFamily: "Montserrat",
                            lineHeight: "1rem",
                            marginTop: "1rem",
                          }}
                        >
                          <p>
                            <span className="pp">{res.zero}% </span>
                            <span className="pp-team">{res.one}</span>
                          </p>
                          <br></br>
                          <p>
                            <span className="pp">{res.two}% </span>
                            <span className="pp-team">DRAW</span>
                          </p>
                          <br></br>
                          <p>
                            <span className="pp">{res.one}% </span>
                            <span className="pp-team">{res.teamtwo}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    </div>: ''}
                    </>
                    })}
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
                    <p className="card-text sc">{events.length}</p>
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
                    <p className="card-text sc">{totalamount}</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
