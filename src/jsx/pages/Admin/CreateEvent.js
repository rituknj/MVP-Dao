import React, { useState, useEffect, useLayoutEffect } from "react";
import icon from "../../../images/icon-park-outline_history-query.png";
import { FiArrowLeft } from "react-icons/fi";
import {
  createEvent,
  CreatorReward,
  getSubCategory,
  placeBet,
  UserEventHistory,
  addRefLink,
  getEvent,
} from "./../../../web3/betsMVPService";
import { MdOutlineArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { CreateEventOnDataBase, UpdateEventOnDataBase } from "../../../web3/Countallevents";
import toast, { Toaster } from "react-hot-toast";
import { GetUserName } from "./../../../web3/ContextMethods";
import Username from "./Username";
import BettingNavApp from "../Categories/BettingNavApp";
import logo from "../../../images/bettingnewlogo.png";
let FILL = false;
window.cat = "SPORTS";
const tost = (msg) =>
  toast.success(msg, {
    style: {
      padding: "16px",
      color: "#000",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

const tostError = (error) => toast.error(error);
const apiURL = 'http://localhost:8080/kws/v5/events'

export default function CreateEvent() {
  const [historyVisibility, setHistoryVisibility] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [option, setOption] = useState(1);
  const [formsteps, setFormset] = useState(0);
  const [subCategories, setsubcategory] = useState([]);
  const [subCat, setSubCat] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();
  const [describe, setDescribe] = useState('');
  const [url, setUrl] = useState();
  const [starttime, setStartTime] = useState();
  const [endtime, setEndTime] = useState();
  const [betamount, setBetAmount] = useState();
  const [outcomes, setoutCome] = useState(2);
  const [username, setUserName] = useState("");
  const [preferredoutcome, setPreferredoutcome] = useState();
  const [oppossingoutcome, setOppossingoutcome] = useState();
  const [eventTital, setEventTital] = useState('')
  const [ref, setRef] = useState("");

  useLayoutEffect(() => {
    const completed = async () => {
      const events = [];
      const userEvnet = await UserEventHistory();
      console.log("User Event", userEvnet);
      const user = await GetUserName();
      setUserName(user);
      const subcat = await getSubCategory(0);
      window.maincategoriesnum = 0;
      setsubcategory(subcat);
      const decodestoredevents = JSON.parse(
        window.localStorage.getItem("events")
      );
      decodestoredevents.forEach(async (element) => {
        if (userEvnet.includes(element.id)) {
          const reward = await CreatorReward(element.id);
          element.creatoraward = reward;
          events.push(element);
        }
      });
      setCompleted(events);
    };
    completed();
    window.eventTitle2 = window.eventTitle;
    window.description2 = window.description;
    window.url2 = window.url;
  }, [window.url, window.description, window.eventTitle]);

  useEffect(() => {
    setOppossingoutcome(preferredoutcome == team1 ? team2 : team1);
  }, [preferredoutcome]);

  const getdays = (time) => {
    return new Date(time * 1000).toLocaleString();
  };

  const steps = (tab) => {
    setFormset(formsteps + tab);
  };

  const sendEvents = async(data)=>{
   await axios.post(apiURL,{evnet:data}).then((res)=>{
      console.log(res)
    }).catch(console.error)
  }

  const renderCompleted = (completedCards, index) => {
    return (
      <>
        {completedCards.validate ? (
          <div
            className="card my-4"
            key={index}
            style={{ backgroundColor: "#1c1c1c", borderRadius: "10px" }}
          >
            <div className="card-header text-secondary">
              <span>#{completedCards.subcategory}</span>
              <h4 className="text-light fs-5">{completedCards.name}</h4>
              <div className="justify-content-between d-flex">
                <span>Starts: {getdays(completedCards.starttime)}</span>
                <span>Ends: {getdays(completedCards.endtime)}</span>
              </div>
            </div>
            <div
              className="card-body bg-dark text-light"
              style={{
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}
            >
              <span className="card-text">ODDS</span>
              <p>
                {completedCards.teamone}
                <br />
                {completedCards.teamtwo}
                <br />
                DRAW
              </p>
              <span>POOL SIZE</span>
              <p>{completedCards.poolsize / 10 ** 18}</p>
              <span>CREATOR's REWARD</span>
              <p>{completedCards.creatoraward / 10 ** 18}</p>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
  };

  const renderNotCompleted = (completedCards, index) => {
    return (
      <>
        {completedCards.endtime < Math.round(new Date().getTime() / 1000) ? (
          ""
        ) : (
          <div
            className="card my-4"
            key={index}
            style={{ backgroundColor: "#1c1c1c", borderRadius: "10px" }}
          >
            <div className="card-header text-secondary">
              <span>#{completedCards.subcategory}</span>
              <h4 className="text-light fs-5">{completedCards.name}</h4>
              <div className="justify-content-between d-flex">
                <span>Starts: {getdays(completedCards.starttime)}</span>
                <span>Ends: {getdays(completedCards.endtime)}</span>
              </div>
            </div>
            <div className="card-body bg-dark text-light">
              <span className="card-text">ODDS</span>
              <p>
                {completedCards.teamone}
                <br />
                {completedCards.teamtwo}
                <br />
                DRAW
              </p>
              <span>POOL SIZE</span>
              <p>{completedCards.poolsize / 10 ** 18}</p>
              <span>CREATOR's REWARD</span>
              <p>{completedCards.reward}</p>
              <NavLink
                to="/app"
                className="btn my-3 p-4 fw-bold justify-content-between d-flex"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  width: "400px",
                  position: "absolute",
                  bottom: "15px",
                  right: "20px",
                }}
              >
                PLACE BET
                <MdOutlineArrowForwardIos className="mt-1" />
              </NavLink>
            </div>
          </div>
        )}
      </>
    );
  };

  const fetchSubCatogories = async (event) => {
    console.log("value", event.target.value);
    window.cat = event.target.value;
    if (event.target.value == "SPORTS") {
      const subcat = await getSubCategory(0);
      window.maincategoriesnum = 0;
      console.log("subcat", subcat);
      setsubcategory(subcat);
    } else if (event.target.value == "E-SPORTS") {
      const subcat = await getSubCategory(1);
      window.maincategoriesnum = 1;
      console.log("subcat", subcat);
      setsubcategory(subcat);
    } else if (event.target.value == "OTHERS") {
      const subcat = await getSubCategory(2);
      window.maincategoriesnum = 3;
      console.log("subcat", subcat);
      setsubcategory(subcat);
    }
  };

  const sub = async (e) => {
    console.log(e.target.value);
    setSubCat(e.target.value);
  };

  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const CreateEvent = async () => {
    const star = parseInt((new Date(starttime).getTime() / 1000).toFixed(0));
    const end = parseInt((new Date(endtime).getTime() / 1000).toFixed(0));
    if (!team1 || team1 == "") {
      tostError("Please Enter Valid Event Title");
    } else if (!validURL(url)) {
      tostError("Please Enter Valid Url");
    } else if (star > end) {
      tostError("StartTime can not be greater than EndTime");
    } else if (!betamount || betamount == 0) {
      tostError("Bet Amount should be greater than 0");
    } else {
      const data = await createEvent(window.maincategoriesnum,subCat,describe,url,eventTital, star,end,preferredoutcome,oppossingoutcome);
      if (data.status) {
        tost("Event Create Successfully");
        const id = await UserEventHistory();
        // const userevent = await getEvent();
        await CreateEventOnDataBase(id[id.length - 1]);
        const link = await addRefLink(
          id[id.length - 1],
          `${username}/${id[id.length - 1]}`
        );
        if (link.status) {
          const placebetdata = await placeBet(id[id.length - 1], 0, betamount);
          await UpdateEventOnDataBase(id[id.length - 1]);
          if (placebetdata.status) {
            tost("Creator Bet Successfully");
          }
        }
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link active navItem text-light mx-5"
                  aria-current="page"
                  href="/"
                >
                  DAO
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link active navItem text-light mx-5"
                  aria-current="page"
                  href="/create-event"
                >
                  Create Event
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/">
                  DASHBOARD
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/">
                  WALLET
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/betting-app">
                  Mobile
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div className="createEvent-main py-3">
        <h5 className="createevent mt-5">
          {" "}
          Create events on anything verifiable
        </h5>
        <div className="container-fluid d-flex justify-content-between">
          {historyVisibility && (
            <button onClick={() => setHistoryVisibility(false)} id="history">
              <FiArrowLeft />
              &nbsp; BACK
            </button>
          )}
          {/* <button
          onClick={() => setHistoryVisibility(true)}
          id="history"
          className="ms-auto"
        >
          History &nbsp;
          <img src={icon} alt="" />
        </button> */}
        </div>
        {!historyVisibility ? (
          <div className="multistep my-5 mx-auto text-light">
            {/* CIRCULAR STEPS ON TOP */}
            <div className="row formSteps py-4">
              <div className="col">
                <span
                  style={{
                    border: `${
                      formsteps >= 0 ? "2px solid #48FF7B" : "2px solid #fff"
                    }`,
                    color: `${formsteps >= 0 ? "#48FF7B" : "#fff"}`,
                    fontWeight: "900",
                  }}
                >
                  1
                </span>
              </div>
              <div className="col">
                <span
                  style={{
                    border: `${
                      formsteps >= 1 ? "2px solid #48FF7B" : "2px solid #fff"
                    }`,
                    color: `${formsteps >= 1 ? "#48FF7B" : "#fff"}`,
                  }}
                >
                  2
                </span>
              </div>
              <div className="col">
                <span
                  style={{
                    border: `${
                      formsteps >= 2 ? "2px solid #48FF7B" : "2px solid #fff"
                    }`,
                    color: `${formsteps >= 2 ? "#48FF7B" : "#fff"}`,
                  }}
                >
                  3
                </span>
              </div>
              {/* <div className="col">
              <span
                style={{
                  border: `${
                    formsteps >= 3 ? "2px solid #48FF7B" : "2px solid #fff"
                  }`,
                  color: `${formsteps >= 3 ? "#48FF7B" : "#fff"}`,
                }}
              >
                4
              </span>
            </div> */}
            </div>

            {/* FORM STEP 1 */}
            {formsteps == 0 ? (
              <div className="stepOne my-5">
                {/* <h5>Create events on literally anything verifiable</h5> */}
                <br />
                <div className="my-3">
                  <label for="inputEventTitle" className="form-label">
                    EVENT TITLE&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  <div className="d-flex">
                    <input
                      type="text"
                      className="form-control w-50"
                      id="inputEventTitle"
                      aria-describedby="eventHelp"
                      placeholder="eg:  UEFA 2022"
                      required
                      autoFocus
                      value={eventTital}
                      onChange={(e) => setEventTital(e.target.value)}
                    />
                    &nbsp;&nbsp;
                    {/* <span className="mt-2 text-danger">V/s</span>&nbsp;&nbsp;
                  <input
                    type="text"
                    className="form-control w-50"
                    id="inputEventTitle"
                    aria-describedby="eventHelp"
                    placeholder="team two"
                    required
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                  /> */}
                  </div>
                </div>
                <div className="mb-3">
                <label for="inputSubCategory" className="form-label">
                  CATEGORY
                </label>
                <select
                  className="form-select bg-dark border-0"
                  id="specificSizeSelect"
                  value={window.cat}
                  required
                  onChange={(e) => fetchSubCatogories(e)}
                >
                  <option value="SPORTS">SPORTS</option>
                  <option value="E-SPORTS">E-SPORTS</option>
                  <option value="OTHERS">OTHERS</option>
                </select>
              </div>
                <br />
                <br />
                <div className="mb-3">
                  <label for="inputSubCategory" className="form-label">
                    SUB CATEGORY
                  </label>
                  <select
                    className="form-select bg-dark border-0"
                    id="specificSizeSelect"
                    required
                    onChange={(e) => sub(e)}
                  >
                    {subCategories.length > 0 ? (
                      <option value="Select">Select</option>
                    ) : (
                      ""
                    )}
                    {subCategories.map((cat) => (
                      <option value={`${cat}`}>{cat}</option>
                    ))}
                  </select>
                </div>
                <br />
                <br />
                <div className="my-3">
                  <label for="inputEventTitle" className="form-label">
                    COMPETING TEAM A OR PLAYER A&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg:  Argentina"
                    className="form-control"
                    id="inputEventTitle"
                    aria-describedby="eventHelp"
                    required
                    value={team1}
                    onChange={(e) => setTeam1(e.target.value)}
                  />
                </div>
                <br />
                <div className="my-3">
                  <label for="inputEventTitle" className="form-label">
                    COMPETING TEAM B OR PLAYER B&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg:  Brazil"
                    className="form-control"
                    id="inputEventTitle"
                    aria-describedby="eventHelp"
                    required
                    value={team2}
                    onChange={(e) => setTeam2(e.target.value)}
                  />
                </div>
              </div>
            ) : formsteps == 1 ? (
              <div className="stepTwo">
                <h5>Enter the possible outcomes of the event</h5>
                <br />
                <div className="my-3">
                  <label for="inputOutcomeCount" className="form-label">
                    NUMBER OF POSSIBLE OUTCOMES&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  <select
                    className="form-select bg-dark border-0 text-light "
                    id="specificSizeSelect"
                    onChange={(e) => setoutCome(e.target.value)}
                  >
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
                <br />
                <div className="mb-3">
                  <label for="inputPreferredOutcome" className="form-label">
                    PREFERRED OUTCOME&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  {/* <input
                    type="text"
                    placeholder="eg:  Argentina"
                    className="form-control"
                    id="inputEventTitle"
                    aria-describedby="eventHelp"
                    required
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                  /> */}
                  <select
                  className="form-select bg-dark border-0 text-light "
                  id="specificSizeSelect"
                  onChange={(e) => setPreferredoutcome(e.target.value)}
                >
                  <option selected>SELECT</option>
                  <option value={team1}>{team1}</option>
                  <option value={team2}>{team2}</option>
                </select>
                </div>
                <br />
                <div className="mb-3">
                  <label for="inputPreferredOutcome" className="form-label">
                    SOURCE OF VALIDATION&nbsp;
                    <span
                      type="button"
                      className="fs-5"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Discription will be updated soon"
                    >
                      {/* <FaQuestionCircle /> */}
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="ie:  a link that can be used to verify the outcome of the event"
                    className="form-control"
                    id="inputEventTitle"
                    aria-describedby="eventHelp"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  {/* <select
                  className="form-select bg-dark border-0 text-light "
                  id="specificSizeSelect"
                  onChange={(e) => setPreferredoutcome(e.target.value)}
                >
                  <option selected>SELECT</option>
                  <option value={team1}>{team1}</option>
                  <option value={team2}>{team2}</option>
                </select> */}
                </div>
                {/* <div className="mb-5">
                <label for="inputOpposingOutcome" className="form-label">
                  OPPOSING OUTCOME
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOpposingOutcome"
                  value={preferredoutcome == team1 ? team2 : team1}
                />
              </div> */}
              </div>
            ) : formsteps == 2 ? (
              <div className="stepThree">
                {/* <h5>Enter the starting and ending date for the event</h5> */}
                <br />
                <div className="my-3">
                  <label for="inputStartDate" className="form-label">
                    STARTING DATE/TIME
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="inputStartDate"
                    aria-describedby="eventHelp"
                    autoFocus
                    value={starttime}
                    onChange={(e) => setStartTime(e.target.value)}
                    style={{ colorScheme: "dark" }}
                  />
                  {/* <p style={{ fontSize: "10px", color: "#a5a5a5" }}>
                  Click on calendar icon to select the data
                </p> */}
                </div>
                <br />
                <div className="mb-5">
                  <label for="inputEndDate" className="form-label">
                    ENDING DATE/TIME
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="inputEndDate"
                    value={endtime}
                    onChange={(e) => setEndTime(e.target.value)}
                    style={{ colorScheme: "dark" }}
                  />
                  {/* <p style={{ fontSize: "10px", color: "#a5a5a5" }}>
                  Click on calendar icon to select the data
                </p> */}
                </div>
              </div>
            ) : (
              <div className="stepFour">
                <div>
                  <Toaster />
                </div>
                <h4 className="text-left" style={{ color: "#AAAAAA", fontSize:"16px" }}>
                  PLACE A BET ON YOUR PREFERRED OUTCOME
                </h4>
                <h5
                  className="text-left fw-bolder"
                  style={{ fontFamily: "Montserrat" }}
                >
                  TEAM A
                </h5>
                <br />
                {/* <div className="container px-0 selectBet">
                  <p>PREFERRED OUTCOME</p>
                  <div id={`betA`}>
                    <p className="fs-6 mb-2">{window.preferredoutcome}</p>
                    <p>
                      Participants: <span>0</span>
                    </p>
                    <p>
                      Total amount betted: <span>${betamount}</span>
                    </p>
                    <GoPrimitiveDot
                      style={{
                        position: "absolute",
                        top: "15px",
                        right: "15px",
                      }}
                    />
                  </div>
                </div> */}
                <br />
                <div className="my-3">
                  <label for="inputBetAmount" className="form-label">
                    ENTER AMOUNT TO BET
                  </label>
                  <input
                    type="number"
                    className="form-control mb-5"
                    id="inputBetAmount"
                    placeholder="USDC"
                    value={betamount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />

                  <button
                    className="btn px-3 py-3 fw-bold justify-content-between d-flex self-pause"
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      width: "100%",
                      marginTop: "100px",
                      borderRadius: "10px",
                    }}
                    onClick={() => CreateEvent()}
                  >
                    <span>CREATE EVENT</span>
                    <MdOutlineArrowForwardIos className="mt-1" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM NAVIGATION */}

            {formsteps >= 3 ? (
              <button
                className="btn my-3 px-3 py-3 fw-bold justify-content-between d-flex self-pause"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  width: "100%",
                  borderRadius: "10px",
                }}
                onClick={() => setFormset(0)}
              >
                <MdArrowBackIos className="mt-1" />
                <span>RECHECK</span>
              </button>
            ) : (
              ""
            )}
            {formsteps < 3 ? (
              <button
                className="btn px-3 py-4 fw-bold justify-content-between d-flex self-pause"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  width: "100%",
                  marginTop: "100px",
                  borderRadius: "10px",
                }}
                onClick={() => steps(1)}
              >
                <span>NEXT</span>
                <MdOutlineArrowForwardIos className="mt-1" />
              </button>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div
            className="container-fluid completed mt-5"
            style={
              historyVisibility === true
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <div className="col-md-3">
              <select
                className="form-select bg-dark border-0 text-light py-3"
                id="specificSizeSelect"
                onChange={(e) => setOption(e.target.value)}
                style={{ borderRadius: "10px" }}
              >
                <option selected value={1}>
                  COMPLETED
                </option>
                <option value={2}>PENDING</option>
              </select>
            </div>
            {option == 1 ? (
              <div className="container-fluid">
                {completed.map((data) => renderCompleted(data))}
              </div>
            ) : option == 2 ? (
              <div className="container-fluid">
                {completed.map((data) => renderNotCompleted(data))}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </>
  );
}
