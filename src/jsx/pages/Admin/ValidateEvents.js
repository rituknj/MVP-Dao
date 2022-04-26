import { computeHeadingLevel } from "@testing-library/react";
import { event } from "jquery";
import React,{useEffect, useState} from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { totalEvents, totalAmountWon } from "../../../web3/betsMVPService";

export default function ValidateEvents() {
    const [allvalidatevents, setAllValidateEvent] = useState([])
    const [allnonevnets, setAllnonevents] = useState([])
    const [totalwon, setTotalWon] = useState(0)
    const [skip, setSkip] = useState(0)

    useEffect(async()=>{
      const totalwon = await totalAmountWon();
      setTotalWon(totalwon)
      console.log('total won',totalwon)
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      const evnets = []
      const nonvalidated = []
      decodestoredevents.forEach(element => {
        if(element.validate){
          evnets.push(element)
        }
      });
      decodestoredevents.forEach(element => {
        if(!element.validate){
          nonvalidated.push(element)
        }
      });
      setAllnonevents(nonvalidated)
      setAllValidateEvent(evnets)
    },[])


  console.log("All non evnets ",allnonevnets)
  const formatRemainingTime = (time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${minutes}:${seconds}`;
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer text-danger">Too late...</div>;
    }

    return (
      <div className="timer text-light text-center">
        <div className="text">Remaining time</div>
        <div className="value">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };

  // FAKE CARDS
  const fakeCards = [
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$1,600",
      reward: "$3",
    },
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$1,600",
      reward: "$30",
    },
    {
      hashtags: "#SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      pool: "$1,600",
      reward: "$30",
    },
  ];

  const renderFake = (fakeCards, index) => {
    return (
      <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="card-head p-3">
          <p>{fakeCards.subcategory}</p>
          <h5 className="card-title">{fakeCards.teamone} vs {fakeCards.teamtwo}</h5>
          <span>{fakeCards.starttime}</span>
        </div>
        <div className="card-body">
          <div>
            <p>STATISTICS</p>
            <ul className="p-0">
              <li>{fakeCards.zero}% {fakeCards.teamone}</li>
              <li>{fakeCards.one}% {fakeCards.teamtwo}</li>
              <li>{fakeCards.two}% DRAW</li>
            </ul>
          </div>
          <p className="mt-3">POOL SIZE</p>
          <span>{fakeCards.poolsize}</span>
          <p className="mt-3">REWARDS</p>
          <span>$00</span>
          <button className="btn">CLAIM</button>
        </div>
      </div>
    );
  };

  const slipEvents =()=>{
   if(skip == allnonevnets.length-1){
     setSkip(0)
   }
   else{
    setSkip(skip+1)
   }
    
  }
  console.log(skip)

  return (
    <div className="validate-event-main">
      {/* CARD STAT */}
      <div className="row py-3 px-2 mb-3 justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto">
        <div
          className="col p-2 shadow rounded my-3 mx-1"
          style={{ borderColor: "#FF4003" }}
        >
          <span>TOTAL</span>
          <h5>EVENTS VALIDATED</h5>
          <hr style={{ color: "#FF4003" }} />
          <p>{allvalidatevents.length}</p>
        </div>
        <div className="col p-2 shadow rounded my-3 mx-1 border-primary">
          <span>TOTAL</span>
          <h5>REWARDS EARNED</h5>
          <hr className="text-primary" />
          <p>50</p>
        </div>
        <div
          className="col p-2 shadow rounded my-3 mx-1"
          style={{ borderColor: "#ED2FC3" }}
        >
          <span>TOTAL</span>
          <h5>BETS LOST</h5>
          <hr className="text-danger" />
          <p>300</p>
        </div>
        <div
          className="col p-2 shadow rounded my-3 mx-1"
          style={{ borderColor: "#FF9A02" }}
        >
          <span>TOTAL</span>
          <h5>AMOUNT WON</h5>
          <hr className="text-success" />
          <p>${totalwon}</p>
        </div>
        <div className="col p-2 shadow rounded my-3 mx-1 border-success">
          <span>PENDING</span>
          <h5>REWARDS</h5>
          <hr className="text-success" />
          <p>$2,000</p>
        </div>
      </div>

      {/* TIMER & TERMS */}
      {allnonevnets && allnonevnets.length > 0 ?  <div
        className="row py-3 px-3 px-xxl-5 px-sm-2 mb-3 terms"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div
          className="row mx-auto px-2 py-4"
          style={{
            backgroundColor: "#1C1C1C",
            width: "90%",
            borderRadius: "10px",
          }}
        >
          <div className="col-lg-5">
            <CountdownCircleTimer
              isPlaying
              size={300}
              duration={Number(allnonevnets[skip].validationtime) - Math.round((new Date()).getTime() / 1000)}
              colors={["#006600", "#33cc33", "#ff9900", "#ff0000"]}
              colorsTime={[120, 75, 40, 0]}
              onComplete={() => [true, 1000]}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="col-lg-6">
            <div className="container py-3 mb-2 rounded">
              <h5>EVENT</h5>
              <p>{allnonevnets[skip].teamone} VS {allnonevnets[skip].teamtwo}</p>
              <br />
              <h5>LINK</h5>
              {/* <a href="#">https://verificationdemo.com/event</a> */}
              <br />
              <br />
              <h5>PREFFERED ODD</h5>
              <input type="radio" name="team" id="odd1" />
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd1">{allnonevnets[skip].teamone}</label>
              <br />
              <input type="radio" name="team" id="odd2" />
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd2">{allnonevnets[skip].teamtwo}</label>
              <br />
              <input type="radio" name="team" id="odd3" />
              &nbsp;&nbsp;&nbsp;
              <label htmlFor="odd3">DRAW</label>
            </div>
            <div className="d-flex">
              <input type="checkbox" id="acceptTerm" />
              &nbsp;&nbsp;
              <label htmlFor="acceptTerm">
                I verify my selection on this event is accurate and in line with
                the actual outcome of the event
              </label>
            </div>
            <div className="d-flex justify-content-evenly">
              <button
                className="btn my-3 p-3 fw-bold justify-content-between d-flex"
                style={{ backgroundColor: "#fff", color: "#000", width: "45%" }}
              >
                <span>VALIDATE</span>
                <MdOutlineArrowForwardIos className="mt-1" />
              </button>
              <button
                className="btn my-3 p-3 fw-bold justify-content-between d-flex shadow"
                style={{
                  backgroundColor: "#3b3b3b",
                  color: "#fff",
                  width: "45%",
                }}
                onClick={()=>slipEvents()}
              >
                <span>SKIP</span>
                <MdOutlineArrowForwardIos className="mt-1" />
              </button>
            </div>
          </div>


        </div>
      </div>:''}

      {/* VALIDATE CARDS */}
      <div className="validCards container-fluid">
      {allvalidatevents.map((data)=>renderFake(data))}
      </div>
    </div>
  );
}
