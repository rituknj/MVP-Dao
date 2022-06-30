import React, { useState, useEffect } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import BETS from "./../../../images/logo.png";
import { SiBinance } from "react-icons/si";
import { FaQuestionCircle } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import axios from "axios";
import {
  earnvalidationpoints,
  getValidationPoint,
  totaltokenlocked,
  revokevalidationpointsearning,
  claimpoints,
  pendingpoint,
} from "./../../../web3/betsMVPService";
import {
  getBETBalanceBUSD,
  getBETSV2Balance,
  getBUSDBalance,
  approvePoints,
  isPointSapproved,
} from "../../../web3/betsService";
import { initInstance, loginProcess, getAccount } from "./../../../web3/web3";
import toast, { Toaster } from "react-hot-toast";

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

export default function AdminWallet() {
  const [bets, setBETs] = useState(0);
  const [busd, setbusd] = useState(0);
  const [betv2, setbetsv2] = useState(0);
  const [betprice, setBetPrice] = useState(0);
  const [betstolock, setBettolock] = useState(0);
  const [validationPoints, setValidationPoints] = useState(0);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [getpendingpoint, setGetPendingPoints] = useState(0);
  const [account, setAccount] = useState();

  useEffect(() => {
    initInstance();
    walletConnect();
    allCalls();
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
    const valpoints = await getValidationPoint();
    setValidationPoints(valpoints);
    const locked = await totaltokenlocked();
    setLockedAmount(locked / 10 ** 18);
    const pending = await pendingpoint();
    setGetPendingPoints(pending);
    API_call();
  };

  const API_call = async () => {
    axios.get("https://api.coingecko.com/api/v3/coins/betswamp")
      .then(function (response) {
        setBetPrice(response.data.market_data.current_price.usd);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Unlock = async () => {
    const data = await revokevalidationpointsearning();
    if (data.status) {
      tost();
      await allCalls();
    }
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


  const walletConnect = async () => {
    // if (account) {
    //   setAccount(undefined);
    //   return true;
    // }
    await initInstance();
    await loginProcess();
    const address = await getAccount();
    setAccount(address);
  };

  const slicing = (address) => {
    const first = address.slice(0, 4);
    const second = address.slice(38);
    return first + "..." + second;
  };
  const totalprice = Number(busd) + Number(betprice * bets) + Number(betv2 * betprice);

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
            <img src={BETS} height={38} />
          </span>
          <div className="w-100 " style={{ marginLeft: "20px" }}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title">BETSWAMP V2</h5>
              <div>
                <p className="card-text">{bets} BETS</p>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Last updated 3 mins ago</small>
              <p className="card-text">
              $ {Number(bets * betprice).toFixed(2)}{" "}
              </p>
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
            <img src={BETS} height={38} />
          </span>
          <div className="w-100 " style={{ marginLeft: "20px" }}>
            <div className="d-flex justify-content-between w-100">
              <h5 className="card-title">DAO sBETS</h5>
              <div>
                <p className="card-text">{betv2} sBETS</p>
              </div>
            </div>
            <p className="card-text d-flex justify-content-between">
              <small className="text-muted">Last updated 3 mins ago</small>
              {/* <p className="card-text">
                    $ {Number(betv2 * betprice).toFixed(2)}{" "}
                  </p> */}
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
          <div className="w-100 " style={{ marginLeft: "20px" }}>
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

  return (
    <div className="admin-wallet-main bg-black">
      <div
        className="outerRow px-0 px-sm-4 pb-3 px-xl-4 px-xxl-5 mb-3"
        style={{ backgroundColor: "#0F0F0F", paddingTop: "35px" }}
      >
        <div className="d-flex justify-content-between">
          <span
            className="rounded-pill py-1 px-3"
            style={{
              backgroundColor: "#1C1C1C",
              color: "#BCBCBC",
              cursor: "pointer",
            }}
            onClick={() => walletConnect()}
          >
            {account ? <BsCircleFill color="green" /> : ""} &nbsp;&nbsp;
              {account ? slicing(account) : "Connect Wallet"}
          </span>
          <a
            href="https://pancakeswap.finance/swap?outputCurrency=0x749f031FDa3a4904b026f2275A697096492a129d"
            target="_blank"
          >
            <button
              className="border-0 rounded-pill px-3"
              style={{ backgroundColor: "#1C1C1C", color: "#BCBCBC" }}
            >
              BUY BETS
            </button>
          </a>
        </div>

        <div className="mt-5 text-light">
          <p style={{ color: "#BCBCBC", fontSize: "12px", marginBottom: "0" }}>
            ESTIMATED BALANCE
          </p>
          <h5>${Number(totalprice).toFixed(2)}</h5>
        </div>

        <hr
          style={{
            backgroundColor: "#2C2B2B",
            width: "120%",
            marginLeft: "-100px",
          }}
        />
        <div
          className="container-fluid px-0 pt-3"
          style={{
            backgroundColor: "#1C1C1C",
          }}
        >
          {/* {demoArr.map(renderArr)} */}
          <BETS_V2 />
          <DAO_sBETS />
          <BUSD />
        </div>
      </div>

      <div
        className="d-flex mt-5 ps-5"
        style={{
          backgroundColor: "#0F0F0F",
          borderRadius: "40px 0px 0px 0px",
          paddingTop: "35px",
        }}
      >
        <div className="col-xl-6 px-2 pb-5">
          <div className="text-light">
            <p
              style={{ color: "#BCBCBC", fontSize: "12px", marginBottom: "0" }}
            >
              TOTAL VALIDATION POINTS EARNED&nbsp;&nbsp;
              
              <span
                type="button"
                className="fs-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
              >
                <FaQuestionCircle />
              </span>
            </p>
            <h5>{validationPoints}&nbsp;&nbsp;{" "}
              <span className="text-muted">(Pending {getpendingpoint})</span></h5>
          </div>
         {Number(getpendingpoint) > 0 ? <button
            className="btn mt-4 mb-5 fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#3b3b3b",
              color: "#fff",
              width: "100%",
              padding: "25px",
              borderRadius: "10px",
              maxWidth: "650px",
            }}
            onClick={() => ValidationPointsClaim()}
          >
            <span>CLAIM</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>:''}

          <div className="text-light mt-4">
            <p
              style={{ color: "#BCBCBC", fontSize: "12px", marginBottom: "0" }}
            >
              TOTAL LOCKED AMOUNT
            </p>
            <h5>{lockedAmount} BET</h5>
          </div>
          <div
            className="amount d-flex justify-content-center justify-content-md-between my-4"
            style={{ maxWidth: "650px" }}
          >
            <button className="btn"  onClick={() => setBettolock(bets * 0.25)}>25%</button>
            <button className="btn"  onClick={() => setBettolock(bets * 0.5)}>50%</button>
            <button className="btn"  onClick={() => setBettolock(bets * 0.75)}>75%</button>
            <button className="btn"  onClick={() => setBettolock(bets)}>100%</button>
          </div>
          <input
            type="number"
            className="px-2 py-3"
            style={{
              background: "#151515",
              borderRadius: "10px",
              fontSize:"14px",
              outline:"none",
              border:"1px solid #403F3F",
              width:"100%",
              color:"#fff",
              maxWidth:"650px"
            }}
            value={betstolock}
            onChange={(e) => setBettolock(e.target.value)}
          />
          <button
            className="btn fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              width: "100%",
              padding: "25px",
              borderRadius: "10px",
              maxWidth: "650px",
              marginTop:"60px",
            }}
            onClick={()=>LockBets()}
          >
            <span>LOCK</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>
          {Number(lockedAmount) > 0 ?<button
            className="btn fw-bold justify-content-between d-flex shadow"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              width: "100%",
              padding: "25px",
              borderRadius: "10px",
              maxWidth: "650px",
              marginTop:"60px",
            }}
            onClick={()=>Unlock()}
          >
            <span>UNLOCK</span>
            <MdOutlineArrowForwardIos className="mt-1" />
          </button>:''}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
