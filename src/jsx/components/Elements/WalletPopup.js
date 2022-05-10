import React,{useEffect, useState} from "react";
import { Button, Modal } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import { SiBinance } from "react-icons/si";
import BETS from './../../../images/logo.png'
import axios from "axios";
import BigInt, { max } from 'big-integer'
import { getBETBalanceBUSD, getBETSV2Balance, getBUSDBalance, approvePoints, isPointSapproved} from "../../../web3/betsService";
import {initInstance,loginProcess,getAccount} from './../../../web3/web3'
import {AiFillQuestionCircle} from 'react-icons/ai'
import Bar from './../../../images/bar.png'
import {earnvalidationpoints,getValidationPoint,totaltokenlocked,revokevalidationpointsearning} from './../../../web3/betsMVPService'

export default function WalletPopup(props) {

  const [bets, setBETs] = useState(0)
  const [busd, setbusd] = useState(0)
  const [betv2, setbetsv2] = useState(0)
  const [betprice, setBetPrice] = useState(0)
  const [betstolock, setBettolock] = useState(0)
  const [validationPoints, setValidationPoints] = useState(0)
  const [lockedAmount, setLockedAmount] = useState(0)

  useEffect(async()=>{
      await initInstance();
      await allCalls();
      setInterval(async()=>{
        const valpoints = await getValidationPoint();
        setValidationPoints(valpoints)
      },3000)
  },[])

  const allCalls =async()=>{
    const Bets = await getBETBalanceBUSD()
      setBETs(Bets)
      const busds = await getBUSDBalance();
      setbusd(busds)
      const betV2 = await getBETSV2Balance();
      setbetsv2(betV2)
      const valpoints = await getValidationPoint();
      setValidationPoints(valpoints)
      const locked = await totaltokenlocked()
      setLockedAmount(locked/10**18)
      API_call();
  }

  const [account, setAccount] = useState()

    useEffect(async()=>{
        await walletConnect()
    },[])

   const walletConnect = async()=> {
        if(account){
            setAccount(undefined)
            return true
        }
        await initInstance();
        await loginProcess();
        const address = await getAccount();
        setAccount(address)
    }
    const slicing = (address)=>{
        const first = address.slice(0,4);
        const second = address.slice(38);
        return first + "..." + second
    }

  const API_call =async()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/betswamp')
      .then(function (response) {
        console.log(response.data.market_data.current_price.usd);
        setBetPrice(response.data.market_data.current_price.usd)
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  const LockBets =async()=>{
    if(Number(lockedAmount)>0){
     const data =  await revokevalidationpointsearning()
     if(data.status){
       await allCalls()
     }
     return true
    }
    const amount = await isPointSapproved();
    if(Number(amount) > betstolock){
      await earnvalidationpoints(betstolock*10**18)
    }
    else{
      await approvePoints()
      await earnvalidationpoints(betstolock*10**18)
    }
  }


  const demoArr = [
    {
      name: "BETSWAMP V2",
      quantity: "250 BETS",
      rate: "$2.36",
      change: "+20.2%",
      worth: "$2000",
    },
    {
      name: "DAO BETS",
      quantity: "600 sBETS",
      rate: "$1.00",
      change: "+20.2%",
      worth: "0 sBETS LOCKED",
    },
    {
      name: "BUSD",
      quantity: "6000 BUSD",
      rate: "$1.00",
      change: "+0.12%",
      worth: "$6000",
    },
  ];

  const BETS_V2 = (demoArr, index) => {
    return (
      <div
        className="card mb-3 text-light"
        style={{
          backgroundColor: "#1C1C1C",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #000",
        }}
        key={index}
      >
        <div className="card-body d-flex ">
          <span
            style={{
              backgroundColor: "#0F0F0F",
              height: "fit-content",
              width: "fit-content",
              borderRadius: "50px 50px",
            }}
            className="p-2"
          >
            <img src={BETS} height={38}  />
          </span>
          <div className="w-100 " style={{marginLeft:'20px'}}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title">BETSWAMP V2</h5>
              <div>
                <p className="card-text">{bets} BETS</p>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Last updated 3 mins ago</small>
                <p className="card-text">$ {bets*betprice} </p>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DAO_sBETS = (demoArr, index) => {
    return (
      <div
        className="card mb-3 text-light"
        style={{
          backgroundColor: "#1C1C1C",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #000",
        }}
        key={index}
      >
        <div className="card-body d-flex ">
          <span
            style={{
              backgroundColor: "#0F0F0F",
              height: "fit-content",
              width: "fit-content",
              borderRadius: "50px 50px",
            }}
            className="p-2"
          >
             <img src={BETS} height={38}  />
          </span>
          <div className="w-100 " style={{marginLeft:'20px'}}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title">DAO sBETS</h5>
              <div>
                <p className="card-text">{betv2} sBETS</p>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Last updated 3 mins ago</small>
                <p className="card-text">$ {betv2*betprice} </p>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const BUSD = (demoArr, index) => {
    return (
      <div
        className="card mb-3 text-light"
        style={{
          backgroundColor: "#1C1C1C",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #000",
        }}
        key={index}
      >
        <div className="card-body d-flex ">
          <span
            style={{
              backgroundColor: "#0F0F0F",
              height: "fit-content",
              width: "fit-content",
              borderRadius: "50px 50px",
            }}
            className="p-2"
          >
            <SiBinance size={38} color="yellow" />
          </span>
          <div className="w-100 " style={{marginLeft:'20px'}}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title">BUSD</h5>
              <div>
                <p className="card-text">{busd} BUSD</p>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Last updated 3 mins ago</small>
                <p className="card-text">$ {busd} </p>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const totalprice = Number(busd) + Number(betprice*bets) + Number(betv2*betprice)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen={"md-down"}
    >
      <Modal.Body style={{ backgroundColor: "#0A0A0A" }}>
        <div className="d-flex justify-content-between">
          <span
            className="rounded-pill py-1 px-3"
            style={{ backgroundColor: "#1C1C1C", color: "#BCBCBC",cursor:'pointer' }}
            onClick={()=>walletConnect()}
          >
            {account ? <BsCircleFill color="green" /> : ""} &nbsp;&nbsp;
            {account ? slicing(account) : "Connect Wallet"}
          </span>
          <button
            className="border-0 rounded-pill px-3"
            style={{ backgroundColor: "#1C1C1C", color: "#BCBCBC" }}
          >
            BUY BETS
          </button>
        </div>
        <div className="text-center my-5 text-light">
          <h4 style={{ color: "#BCBCBC" }}>TOTAL BALANCE</h4>
          <h3>${totalprice}</h3>
        </div>
        <div
          className="container-fluid px-0 pt-3"
          style={{
            backgroundColor: "#1C1C1C",
            borderTopRightRadius: "25px",
            borderTopLeftRadius: "25px",
          }}
        >
          {/* {demoArr.map(renderArr)} */}
          <BETS_V2/>
          <DAO_sBETS/>
          <BUSD/>
          <div className="card-body">
          <div  style={{marginLeft:'20px'}}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title text-white">VALIDATION POINTS</h5>
              <div>
                <AiFillQuestionCircle size={20} fill='#BCBCBC'/>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Lock your sBets to earn more validation points</small>
            </p>
          </div>
          </div>
        </div>
        <div className="text-white ms-4 mt-5">
            <p className="m-0">TOTAL VALIDATION POINTS EARNED</p>
            <p>{validationPoints}</p>
            <p className="m-0">TOTAL LOCKED AMOUNT</p>
            <p>{lockedAmount} sBET</p>
        </div>
        <div className="p-4 text-white w-75 mx-auto">
          <p>AVAILABLE:&nbsp;&nbsp; {betv2} sBETS</p>
          <div className="d-flex justify-content-between">
            <span className="text-center" style={{cursor:'pointer'}} onClick={()=>setBettolock(bets*0.25)}> 25% <br/> <img src={Bar} style={{width:'100px',cursor:'pointer'}}/></span>
            <span className="text-center"style={{cursor:'pointer'}} onClick={()=>setBettolock(bets*0.5)}> 50% <br/> <img src={Bar} style={{width:'100px',cursor:'pointer'}}/></span>
            <span className="text-center"style={{cursor:'pointer'}} onClick={()=>setBettolock(bets*0.75)}> 75% <br/> <img src={Bar} style={{width:'100px',cursor:'pointer'}}/></span>
            <span className="text-center"style={{cursor:'pointer'}} onClick={()=>setBettolock(bets)}> 100% <br/> <img src={Bar} style={{width:'100px',cursor:'pointer'}}/></span>
          </div>
          <input className="mx-auto d-block w-100 mt-3" style={{outline:'none'}} placeholder='Lock Amount' type='number' value={betstolock} onChange={(e)=>setBettolock(e.target.value)}/>
        </div>

        <button className="w-100 p-3 font-weight-bold " style={{borderRadius:'10px'}} onClick={()=>LockBets()}>{Number(lockedAmount) <= 0 ? "Lock" : "Unlock"}</button>
      </Modal.Body>
    </Modal>
  );
}
