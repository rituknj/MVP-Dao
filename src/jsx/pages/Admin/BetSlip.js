import { one, zero } from "big-integer";
import React,{useEffect,useState} from "react";
import { GoPrimitiveDot } from "react-icons/go";
import {ImStopwatch, ImFire} from 'react-icons/im'
import {UserEventHistory, GetUserWonAmountOnEvent, claimrewards,CreatorReward, BoostEvent , userBethistory, totalAmountWon, gettotaluserwageramount,reclaimwager,AmountStackOnEventByaUser } from "../../../web3/betsMVPService";
import toast, { Toaster } from "react-hot-toast";
import { updatingeventdata } from "../../../web3/Countallevents";
import Username from "./Username";

const tost = () =>
  toast.success("Success.", {
    style: {
      padding: "16px",
      color: "#000",
      marginTop: "75px",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

export default function BetSlip() {
  const [events, setEvents] = useState([])
  const [userHistory, setUserHistory] = useState([])
  const [userTotalWinning, setUserTotalWinning] = useState(0)
  const [totalEvnetUserHistory, setTotalUserEvent] = useState(0)
  const [historyevents, setHistroyEvents] = useState(0)
  const [totaluserBetHistory, setTotalUserBetHistory] = useState(0)
  const [totaluserbetlost, setTotalUserBetLost] = useState(0)
  

  useEffect(() => {
    const getUserBetData = async()=>{
      let check = []
      let stake = 0
      let usereventhty = []
      usereventhty = await UserEventHistory();
      setTotalUserEvent(usereventhty.length)
      const totalwinning = await totalAmountWon();
      const userbethty = await userBethistory()
      setTotalUserBetHistory(userbethty.length)
      stake = await gettotaluserwageramount()
      
      setTotalUserBetLost(stake/10**18)
      setUserTotalWinning(totalwinning) 
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))

      decodestoredevents.forEach(async (element) => {
        for(let i = 0; i < userbethty.length; i++){
          if(Number(element.id) == userbethty[i]){
            let won = await GetUserWonAmountOnEvent(element.id)
            let reward = await CreatorReward(element.id)
            let wager = await AmountStackOnEventByaUser(element.id)
            element.won = won
            element.creatorReward = reward
            element.userWager = wager
            check.push(element)
          }
        } 
        setUserHistory(check)
        setEvents(check)
      })
    } 

    getUserBetData();
  }, [])
  
  useEffect(() => {
    let check = []
    const getUserBetData = async()=>{
      const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      decodestoredevents.forEach(async (element) => {
        let x = Object.create(element)
        let won = await GetUserWonAmountOnEvent(element.id)
        // let userWagerAmount = await AmountStackOnEventByaUser(element)
        x.won = won
        // x.userwageramount = userWagerAmount
        
        check.push(x)
      })
      
    } 
    // getUserBetData();
  }, [])
  
  const upcommingDate=(time,id)=>{
    var current = Math.round(new Date().getTime()/1000);
    var seconds =  time-current 
    if(seconds > 0){
      const days = Math.floor(seconds/86400)
      const hour = Math.floor(seconds / 3600) % 24;
      const min = Math.floor(seconds / 60) % 60;
      const sec = seconds % 60;
      return days+":"+hour+":"+min+":"+sec
    }
    else{
      return "00:00:00:00"
    }
  }

  const Boost=async(id)=>{
      const data = await BoostEvent(id)
      if(data.status){
        await updatingeventdata(id);
        tost()
      }
  }

  const ReclainWager =async(id)=>{
    const data = await reclaimwager(id);
    if(data.status){
      tost()
    }
  }


  const RewardClaim=async(id)=>{
    const data = await claimrewards(id);
    if(data.status){
      tost()
    }
  }

  //completedCards.starttime < Math.round((new Date()).getTime() / 1000) && completedCards.endtime > Math.round((new Date()).getTime() / 1000)
  const ActiveEvents = (completedCards, index) => {
    return (
      <>
    {completedCards.endtime > Math.round((new Date()).getTime() / 1000) ?  <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c", borderRadius:"10px" }}
      >
        <div className="card-body">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span className="text-light">
              <GoPrimitiveDot color="green" size={18} /> ACTIVE
            </span>
            <span className="text-secondary">#  {completedCards.Categories == 0 ? "SPORT" : completedCards.Categories == 1 ? "E-SPORT" : "OTHER"}</span>
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
            <span className="fs-6">${Number(completedCards.poolsize/10**18).toFixed(2)}</span>
          </p>
          <div className="d-flex justify-content-between text-secondary" style={{fontSize: "12px"}}>
            <ul className="p-0" style={{listStyle: "none"}}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
            </ul>
            <div>
                <p className="d-flex"><ImStopwatch size={18}/><h5 className="ml-2">{upcommingDate(completedCards.endtime,completedCards.id)}</h5></p>
                <ImFire size={20} fill={completedCards.isboosted ? "#FF9A02" : ""}/>&nbsp;&nbsp;&nbsp;<button onClick={()=>Boost(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                  BOOST
                </button>
            </div>
          </div>
        </div>
      </div>:''}
      </>
    );
  };

  const HistoryEvts = (completedCards, index) => {
    return (
      <>
    {completedCards.validate ?  <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c", borderRadius:"10px" }}
      >
        <div className="card-body">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span className="text-light">
              <GoPrimitiveDot color="red" size={18} /> ENDED
            </span>
            <span className="text-secondary">#  {completedCards.Categories == 0 ? "SPORT" : completedCards.Categories == 1 ? "E-SPORT" : "OTHER"}</span>
          </div>
          <h5 className="card-title text-center">
          {completedCards.teamone}<span className="text-danger"> vs </span>{completedCards.teamtwo}
          </h5>
          <p
            className="text-center text-light my-3"
            style={{ fontSize: "12px" }}
          >
            POOL SIZE
            <br />
            <span className="fs-6">${Number(completedCards.poolsize/10**18).toFixed(2)}</span>
          </p>
          <br />
          <br />
         
          <div className="d-flex justify-content-between text-secondary" style={{fontSize: "12px"}}>
            
            <ul className="p-0" style={{listStyle: "none"}}>
                {/* <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li> */}
                <br/>
                <li style={{fontSize: "14px",color:'#fff'}}>Winner</li>
                <li style={{fontSize: "17px",color:'#fff'}}>{completedCards.ocrd == "0" ? completedCards.teamone : completedCards.ocrd == "1" ? completedCards.teamtwo : "DRAW"}</li>
            </ul>
            <div>
            <p
              className="text-center text-light my-3"
              style={{ fontSize: "12px" }}
            >
              <p className="text-center fw-bold">
            YOU WON ${completedCards.won/10**18}<span className="text-success fw-normal">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; + ${completedCards.creatorReward/10**18} creator's reward</span>
          </p>
              </p>

                &nbsp;&nbsp;&nbsp;{completedCards.won > 0 ? '' :<button onClick={()=>RewardClaim(completedCards.id)} className="btn btn-success ms-auto fw-bold">
                CLAIM
                </button>}
            </div>
          </div>
        </div>
      </div>:''}
      </>
    );
  };

  const HistoryEvtsNotValidated = (completedCards, index) => {
    return (
      <>
    {completedCards.validationtime < Math.round((new Date()).getTime() / 1000) && !completedCards.validate ? <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c", borderRadius:"10px" }}
      >
        <div className="card-body">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span className="text-light">
              <GoPrimitiveDot color="red" size={18} /> ENDED
            </span>
            <span className="text-secondary">#  {completedCards.Categories == 0 ? "SPORT" : completedCards.Categories == 1 ? "E-SPORT" : "OTHER"}</span>
          </div>
          <h5 className="card-title text-center">
          {completedCards.teamone}<span className="text-danger"> vs </span>{completedCards.teamtwo}
          </h5>
          <p
            className="text-center text-light my-3"
            style={{ fontSize: "12px" }}
          >
            POOL SIZE
            <br />
            <span className="fs-6">${Number(completedCards.poolsize/10**18).toFixed(2)}</span>
          </p>
          <br />
          <br />
         
          <div className="d-flex justify-content-between text-secondary" style={{fontSize: "12px"}}>
            
            <ul className="p-0" style={{listStyle: "none"}}>
                {/* <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li> */}
                <br/>
                <li style={{fontSize: "14px",color:'#fff'}}>Winner</li>
                <li style={{fontSize: "17px",color:'#fff'}}>Not Declared</li>
            </ul>
            
            <div>
                <p
                  className="text-center text-light my-3"
                  style={{ fontSize: "12px" }}
                >
                    <p className="text-center fw-bold">
                  YOUR BET ${completedCards.userWager/10**18}
                </p>
              </p>
                <button onClick={()=>ReclainWager(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                  RECLAIM WAGERS
                </button>
            </div>
          </div>
        </div>
      </div>:''}
      </>
    );
  };

  const InActive = (completedCards, index) => {
    return (
      <>
    {completedCards.endtime < Math.round((new Date()).getTime() / 1000) && Math.round((new Date()).getTime() / 1000) < completedCards.validationtime ?  <div
        className="card my-4"
        key={index}
        style={{ backgroundColor: "#1c1c1c", borderRadius:"10px"}}
      >
        <div className="card-body">
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: "12px" }}
          >
            <span className="text-light">
              <GoPrimitiveDot color="#009dff" size={18} /> INACTIVE
            </span>
            <span className="text-secondary">#  {completedCards.Categories == 0 ? "SPORT" : completedCards.Categories == 1 ? "E-SPORT" : "OTHER"}</span>
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
            <span className="fs-6">${Number(completedCards.poolsize/10**18).toFixed(2)}</span>
          </p>
          
          <br />
          <br />
         
          <div className="d-flex justify-content-between text-secondary" style={{fontSize: "12px"}}>
            <ul className="p-0" style={{listStyle: "none"}}>
                <li>{completedCards.zero}% {completedCards.teamone}</li>
                <li>{completedCards.one}% {completedCards.teamtwo}</li>
                <li>{completedCards.two}% DRAW</li>
            </ul>
            <div>
            <p className="d-flex"><ImStopwatch size={18}/><h5 className="ml-2">00:00:00:00</h5></p>
                {/* <ImFire size={20}/>&nbsp;&nbsp;&nbsp;<button onClick={()=>RewardClaim(completedCards.id)} className="btn btn-warning ms-auto fw-bold">
                Claim
                </button> */}
            </div>
          </div>
        </div>
      </div>:''}
      </>
    );
  };


  return (
    <div className="container-fluid betslip-main">
       <div>
          <Toaster />
        </div>
      {/* CARD STAT */}
      
      <div className="row py-3 px-2 mb-3 betCards row-cols-auto position-relative">
      {/* <Username/> */}
        <div className="col px-3 py-2 my-3 col-w">
          <span>TOTAL</span>
          <h5>BETS MADE</h5>
          <hr className="text-light" />
          <p>{totaluserBetHistory}</p>
        </div>
        <div className="col px-3 py-2 my-3 col-b">
          <span>TOTAL</span>
          <h5>EVENT CREATED</h5>
          <hr className="text-primary" />
          <p>{totalEvnetUserHistory}</p>
        </div>
        <div className="col px-3 py-2 my-3 col-r">
          <span>TOTAL</span>
          <h5>AMOUNT WAGERED</h5>
          <hr className="text-danger" />
          <p>${(totaluserbetlost)}</p>
        </div>
        <div className="col px-3 py-2 my-3 col-g">
          <span>TOTAL</span>
          <h5>AMOUNT WON</h5>
          <hr className="text-success" />
          <p>${userTotalWinning/10**18}</p>
        </div>
      </div>

      {/* BET SLIPS */}
      <div
        className="row px-4 mb-3"
        style={{ borderBottomLeftRadius: "0", paddingTop:"35px" }}
      >
        <div className="col-md-4">
          <select
            className="form-select border-0 text-light"
            style={{padding:"30px 20px", maxWidth:"400px", width:"100%", backgroundColor:'#2B2A2A', borderRadius:'10px'}}
            id="specificSizeSelect"
            onChange={(e)=>setHistroyEvents(e.target.options.selectedIndex)}
          >
            <option selected >ACTIVE</option>
            <option >INACTIVE</option>
            <option >HISTORY(Validated)</option>
            <option >HISTORY(Not Validated)</option>
          </select>
        </div>
        {historyevents == 0 && events.length > 0 ?  
        <div className="container activeBets">
          {events.map((data)=> ActiveEvents(data))}
        </div> : historyevents == 1 && events.length > 0 ? 
         <div className="container activeBets">
         {events.map((data)=> InActive(data))}
       </div>: historyevents == 2 && events.length > 0 ?
       <div className="container activeBets">
       {userHistory.map((data)=> HistoryEvts(data))}
     </div> : historyevents == 3 && events.length > 0 ?
     <div className="container activeBets">
     {userHistory.map((data)=> HistoryEvtsNotValidated(data))}
   </div>:''}
      </div>
    </div>
  );
}
