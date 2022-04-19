import { one, zero } from "big-integer";
import React,{useEffect,useState} from "react";
import { GoPrimitiveDot } from "react-icons/go";
import {ImStopwatch, ImFire} from 'react-icons/im'
import { getBetsHistory, getusertotalwinnings, getEvent, GetUserWonAmountOnEvent, AmountStackOnEventByaUser,bettorscountspercent } from "../../../web3/betsMVPService";

export default function BetSlip() {
  const [events, setEvents] = useState([])
  const [userTotalWinning, setUserTotalWinning] = useState(0)
  const [totalbetmade, setTotalBetMade] = useState(0)
  const [historyevents, setHistroyEvents] = useState(1)

  useEffect(async() => {
    const getUserBetData = async()=>{
      let check = []
      const userBethistory = await getBetsHistory();
      setTotalBetMade(userBethistory.length)
      const totalwinning = await getusertotalwinnings();
      setUserTotalWinning(totalwinning) 
      // console.log("User History outer",userBethistory)
      // userBethistory.forEach(async (element) => {
      //   console.log("User History",userBethistory)
      //   let i = await getEvent(element)
      //   let x = Object.create(i)
      //   let won = await GetUserWonAmountOnEvent(element)
      //   let userWagerAmount = await AmountStackOnEventByaUser(element)
      //   let zero = await bettorscountspercent(x[0],0,x[15])
      //   let one = await bettorscountspercent(x[0],1,x[15])
      //   let two = await bettorscountspercent(x[0],2,x[15])
      //   x.won = won
      //   x.userwageramount = userWagerAmount
      //   x.zero = zero
      //   x.one = one
      //   x.two = two
        
      //   check.push(x)
      //   setEvents(check)
      // })
    } 

    await getUserBetData();
  }, [])
  
  useEffect(async() => {
    const getUserBetData = async()=>{
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      setEvents(decodestoredevents)
      var ts = Math.round((new Date()).getTime() / 1000);
      console.log(ts)
    } 
    await getUserBetData();
  }, [])
  
  const timing=(time)=>{
    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = time - ts
    lefttime = parseInt(Math.floor(lefttime / 3600) / 24);
    return lefttime
  } 

  const completedCards = [
    {
      hashtags: "#SPORTS #SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$0",
      reward: "$0",
    },
    {
      hashtags: "#SPORTS #SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$0",
      reward: "$0",
    },
    {
      hashtags: "#SPORTS #SOCCER",
      title: "Chealsea  vs  Machester City",
      starts: "20 DEC 2020",
      ends: "20 DEC 2021",
      pool: "$0",
      reward: "$0",
    },
  ];

  const renderCompleted = (completedCards, index) => {
    return (
      <>
    {completedCards.starttime < Math.round((new Date()).getTime() / 1000) && completedCards.endtime > Math.round((new Date()).getTime() / 1000) ?  <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <div className="card-body">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span className="text-light">
              <GoPrimitiveDot color="green" size={18} /> ACTIVE
            </span>
            <span className="text-secondary">#{completedCards.subcategory}</span>
          </div>
          <h5 className="card-title text-center">
          {completedCards.teamone} <span className="text-danger">vs</span>{completedCards.teamtwo}
          </h5>
          <p
            className="text-center text-light my-3"
            style={{ fontSize: "12px" }}
          >
            POOL SIZE
            <br />
            <span className="fs-6">${completedCards.poolsize}</span>
          </p>
          <div className="d-flex justify-content-between text-secondary" style={{fontSize: "12px"}}>
            <ul className="p-0" style={{listStyle: "none"}}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
            </ul>
            <div>
                <p><ImStopwatch/> {timing(completedCards.endtime)} DAYS LEFT</p>
                <ImFire size={20}/>&nbsp;&nbsp;&nbsp;<a href="#" className="btn btn-warning ms-auto fw-bold">
                BOOST
                </a>
            </div>
          </div>
        </div>
      </div>:''}
      </>
    );
  };

  return (
    <div className="container-fluid betslip-main">
      {/* CARD STAT */}
      <div className="row py-3 px-2 mb-3 justify-content-xl-around justify-content-lg-between justify-content-center row-cols-auto">
        <div className="col p-2 shadow rounded my-3 mx-1 border-light">
          <span>TOTAL</span>
          <h5>BETS MADE</h5>
          <hr className="text-light" />
          <p>{totalbetmade}</p>
        </div>
        <div className="col p-2 shadow rounded my-3 mx-1 border-primary">
          <span>TOTAL</span>
          <h5>BETS WON</h5>
          <hr className="text-primary" />
          <p>50</p>
        </div>
        <div className="col p-2 shadow rounded my-3 mx-1 border-danger">
          <span>TOTAL</span>
          <h5>BETS LOST</h5>
          <hr className="text-danger" />
          <p>300</p>
        </div>
        <div className="col p-2 shadow rounded my-3 mx-1 border-success">
          <span>TOTAL</span>
          <h5>AMOUNT WON</h5>
          <hr className="text-success" />
          <p>${userTotalWinning}</p>
        </div>
      </div>

      {/* BET SLIPS */}
      <div
        className="row py-3 px-3 px-xxl-5 px-sm-2 mb-3"
        style={{ borderBottomLeftRadius: "0" }}
      >
        <div className="col-md-2">
          <select
            className="form-select bg-dark border-0 text-light py-3"
            id="specificSizeSelect"
          >
            <option selected value={historyevents} onChange={()=>setHistroyEvents(1)}>ACTIVE</option>
            <option value={historyevents} onChange={()=>setHistroyEvents(2)}>UPCOMING</option>
            <option value={historyevents} onChange={()=>setHistroyEvents(3)}>HISTORY</option>
          </select>
        </div>
        {historyevents == 1 && events.length > 0 ?  
        <div className="container activeBets">
          {events.map((data)=> renderCompleted(data))}
        </div> : historyevents == 2 && events.length > 0 ? 
         <div className="container activeBets">
         {events.map((data)=> renderCompleted(data))}
       </div>: historyevents == 3 && events.length > 0 ?
       <div className="container activeBets">
       {events.map((data)=> renderCompleted(data))}
     </div> : ''}
      </div>
    </div>
  );
}
