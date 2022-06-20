import React, { useEffect, useState } from "react";
import { CloseButton, Modal } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import { SiBinance } from "react-icons/si";
import BETS from "./../../../images/logo.png";
import axios from "axios";
import BigInt, { max } from "big-integer";
import {
  getBETBalanceBUSD,
  getBETSV2Balance,
  getBUSDBalance,
  approvePoints,
  isPointSapproved,
} from "../../../web3/betsService";
import { initInstance, loginProcess, getAccount } from "./../../../web3/web3";
import { AiFillQuestionCircle } from "react-icons/ai";
import Bar from "./../../../images/bar.png";
import {
  earnvalidationpoints,
  getValidationPoint,
  totaltokenlocked,
  revokevalidationpointsearning,
  claimpoints,
  pendingpoint,
} from "./../../../web3/betsMVPService";
import toast, { Toaster } from "react-hot-toast";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

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

export default function WalletPopup(props) {
  const [bets, setBETs] = useState(0);
  const [busd, setbusd] = useState(0);
  const [betv2, setbetsv2] = useState(0);
  const [betprice, setBetPrice] = useState(0);
  const [betstolock, setBettolock] = useState(0);
  const [validationPoints, setValidationPoints] = useState(0);
  const [lockedAmount, setLockedAmount] = useState(0);
  const [getpendingpoint, setGetPendingPoints] = useState(0);

  useEffect(() => {
    initInstance();
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
    console.log("points",valpoints,pending)
    API_call();
  };

  const [account, setAccount] = useState();

  useEffect(() => {
    walletConnect();
  }, []);

  const walletConnect = async () => {
    if (account) {
      setAccount(undefined);
      return true;
    }
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

  const API_call = async () => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/betswamp")
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
              <p className="card-text">
                $ {Number(betv2 * betprice).toFixed(2)}{" "}
              </p>
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

  const totalprice =
    Number(busd) + Number(betprice * bets) + Number(betv2 * betprice);
  // document.getElementsByClassName("modal-dialog").style.margin = "6rem -225px 0 auto !important"

  return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen={"md-down"}
      >
        <ModalHeader
          className="d-md-none"
          style={{ backgroundColor: "#0A0A0A", borderRadius: "0px" }}
        >
          <span onClick={props.onHide} style={{}}>
            <CloseButton variant="white" />
          </span>
        </ModalHeader>
        <Modal.Body style={{ backgroundColor: "#0A0A0A" }}>
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
          <div className="text-center my-5 text-light">
            <h4 style={{ color: "#BCBCBC" }}>TOTAL BALANCE</h4>
            <h3>${Number(totalprice).toFixed(2)}</h3>
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
            <BETS_V2 />
            <DAO_sBETS />
            <BUSD />
            <div className="card-body">
              <div style={{ marginLeft: "20px" }}>
                <div className="d-flex justify-content-between w-100">
                  <h5 className="card-title text-white">VALIDATION POINTS</h5>
                  <div>
                    <AiFillQuestionCircle size={20} fill="#BCBCBC" />
                  </div>
                </div>
                <p className="card-text d-flex justify-content-between">
                  <small className="text-muted">
                    Lock your sBets to earn more validation points
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="text-white ms-4 mt-5">
            <p className="m-0">TOTAL VALIDATION POINTS EARNED</p>
            <p>
              {validationPoints}&nbsp;&nbsp;{" "}
              <span className="text-muted">(Pending {getpendingpoint})</span>
            </p>
            {Number(getpendingpoint) > 0 ? (
              <button
                className="w-100 p-3 font-weight-bold mb-4"
                style={{ borderRadius: "10px" }}
                onClick={() => ValidationPointsClaim()}
              >
                Claim
              </button>
            ) : (
              ""
            )}
            <p className="m-0">TOTAL LOCKED AMOUNT</p>
            <p>{lockedAmount} BET</p>
          </div>
          <div className="p-4 text-white w-75 mx-auto">
            <p>AVAILABLE:&nbsp;&nbsp; {betv2} sBETS</p>
            <div className="d-flex justify-content-between">
              <span
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => setBettolock(bets * 0.25)}
              >
                {" "}
                25% <br />{" "}
                <img src={Bar} style={{ width: "auto", cursor: "pointer" }} />
              </span>
              <span
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => setBettolock(bets * 0.5)}
              >
                {" "}
                50% <br />{" "}
                <img src={Bar} style={{ width: "auto", cursor: "pointer" }} />
              </span>
              <span
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => setBettolock(bets * 0.75)}
              >
                {" "}
                75% <br />{" "}
                <img src={Bar} style={{ width: "auto", cursor: "pointer" }} />
              </span>
              <span
                className="text-center"
                style={{ cursor: "pointer" }}
                onClick={() => setBettolock(bets)}
              >
                {" "}
                100% <br />{" "}
                <img src={Bar} style={{ width: "auto", cursor: "pointer" }} />
              </span>
            </div>
            <input
              className="mx-auto d-block w-100 mt-3"
              style={{ outline: "none" }}
              placeholder="Lock Amount"
              type="number"
              value={betstolock}
              onChange={(e) => setBettolock(e.target.value)}
            />
          </div>

          <button
            className="w-100 p-3 font-weight-bold "
            style={{ borderRadius: "10px" }}
            onClick={() => LockBets()}
          >
            Lock
          </button>
          {Number(lockedAmount) > 0 ? (
            <button
              className="w-100 p-3 font-weight-bold"
              style={{ borderRadius: "10px" }}
              onClick={() => Unlock()}
            >
              Unlock
            </button>
          ) : (
            ""
          )}
        </Modal.Body>

        <div>
          <Toaster />
        </div>
      </Modal>
  );
}
