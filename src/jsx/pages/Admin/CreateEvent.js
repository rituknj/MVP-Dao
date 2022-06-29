import React, { useState, useEffect, useLayoutEffect } from "react";
import { StepFour } from "../../components/Elements/StepFour";
import { StepOne } from "../../components/Elements/StepOne";
import { StepThree } from "../../components/Elements/StepThree";
import { StepTwo } from "../../components/Elements/StepTwo";
import MultiStep from "multistep-by-nikhil";
import icon from "../../../images/icon-park-outline_history-query.png";
import { FiArrowLeft } from "react-icons/fi";
import {
  CreatorReward,
  UserEventHistory,
} from "./../../../web3/betsMVPService";
import { MdOutlineArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { GoPrimitiveDot } from "react-icons/go";
import {FaQuestionCircle} from 'react-icons/fa'
let FILL = false;

export default function CreateEvent() {
  const [historyVisibility, setHistoryVisibility] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [option, setOption] = useState(1);
  const [notComplete, setNotcomplete] = useState([]);

  useLayoutEffect(() => {
    const completed = async () => {
      const events = [];
      const userEvnet = await UserEventHistory();
      console.log("User Event", userEvnet);
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

  const steps = [
    { name: "Name A", component: <StepOne /> },
    { name: "Email", component: <StepTwo /> },
    { name: "Password", component: <StepThree /> },
    { name: "Agreement", component: <StepFour /> },
  ];

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

  const getdays = (time) => {
    return new Date(time * 1000).toLocaleString();
  };

  const renderCompleted = (completedCards, index) => {
    return (
      <>
        {}
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
        {completedCards.endtime < Math.round((new Date()).getTime() / 1000) ? (
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

  setInterval(() => {
    if (window.eventTitle2 && window.description2 && window.url2) {
      window.FILL = true;
    }
  }, 200);

  return (
    <div className="createEvent-main py-3">
      <div className="container-fluid d-flex justify-content-between">
        {historyVisibility && (
          <button onClick={() => setHistoryVisibility(false)} id="history">
            <FiArrowLeft />
            &nbsp; BACK
          </button>
        )}
        <button
          onClick={() => setHistoryVisibility(true)}
          id="history"
          className="ms-auto"
        >
          History &nbsp;
          <img src={icon} alt="" />
        </button>
      </div>
      <div className="multistep my-5 mx-auto text-light">
        {/* CIRCULAR STEPS ON TOP */}
        <div className="row formSteps py-4">
          <div className="col">
            <span>1</span>
          </div>
          <div className="col">
            <span>2</span>
          </div>
          <div className="col">
            <span>3</span>
          </div>
          <div className="col">
            <span>4</span>
          </div>
        </div>

        {/* FORM STEP 1 */}
        <div className="stepOne my-5">
          <h5>Create events on literally anything verifiable</h5>
          <br />
          <div className="mb-3">
            <label for="inputSubCategory" className="form-label">
              CATEGORY
            </label>
            <select
              className="form-select bg-dark border-0 text-light "
              id="specificSizeSelect"
            >
              <option value="SPORTS">SPORTS</option>
              <option value="WEATHER">WEATHER</option>
              <option value="REALITY TV SHOWS">REALITY TV SHOWS</option>
              <option value="POLITICS">POLITICS</option>
              <option value="AWARDS">AWARDS</option>
              <option value="DEAD POOL">DEAD POOL</option>
              <option value="GAMES">GAMES</option>
              <option value="MARKET PREDICTION">MARKET PREDICTION</option>
              <option value="SPECIAL">SPECIAL</option>
            </select>
          </div>
          <br />
          <br />
          <div className="mb-3">
            <label for="inputSubCategory" className="form-label">
              SUB CATEGORY
            </label>
            <select
              className="form-select bg-dark border-0 text-light "
              id="specificSizeSelect"
            >
              <option value="Select">Select</option>
              <option>Blah</option>
              <option>Blah Blah</option>
            </select>
          </div>
          <br />
          <div className="my-3">
            <label for="inputEventTitle" className="form-label">
              EVENT TITLE&nbsp;
              <span
                type="button"
                className="fs-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
              >
                <FaQuestionCircle/>
              </span>
            </label>
            <div className="d-flex">
              <input
                type="text"
                className="form-control w-50"
                id="inputEventTitle"
                aria-describedby="eventHelp"
                required
                autoFocus
              />
              &nbsp;&nbsp;
              <span className="mt-2 text-danger">V/s</span>&nbsp;&nbsp;
              <input
                type="text"
                className="form-control w-50"
                id="inputEventTitle"
                aria-describedby="eventHelp"
                required
              />
            </div>
          </div>
          <br />
          <div className="my-3">
            <label for="inputEventTitle" className="form-label">
              DESCRIPTION&nbsp;
              <span
                type="button"
                className="fs-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
              >
                <FaQuestionCircle/>
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEventTitle"
              aria-describedby="eventHelp"
              required
            />
          </div>
          <br />
          <div className="my-3">
            <label for="inputEventTitle" className="form-label">
              SOURCE OF VALIDATION&nbsp;
              <span
                type="button"
                className="fs-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
              >
                <FaQuestionCircle/>
              </span>
            </label>
            <input
              type="url"
              className="form-control"
              id="inputEventTitle"
              aria-describedby="eventHelp"
              required
            />
          </div>
        </div>

        {/* FORM STEP 2 */}
        {/* <div className="stepTwo">
          <h5>Enter the possible outcomes of the event</h5>
          <br />
          <div className="my-3">
            <label for="inputOutcomeCount" className="form-label">
              NUMBER OF OUTCOMES&nbsp;
              <span
                type="button"
                className="fs-5"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Tooltip on top"
              >
                <FaQuestionCircle/>
              </span>
            </label>
            <select
              className="form-select bg-dark border-0 text-light "
              id="specificSizeSelect"
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
                title="Tooltip on top"
              >
                <FaQuestionCircle/>
              </span>
            </label>
            <select
              className="form-select bg-dark border-0 text-light "
              id="specificSizeSelect"
            >
              <option value="dummy">DUMMY</option>
              <option value="data">DATA</option>
            </select>
          </div>
          <br />
          <div className="mb-5">
            <label for="inputOpposingOutcome" className="form-label">
              OPPOSING OUTCOME
            </label>
            <input
              type="text"
              className="form-control"
              id="inputOpposingOutcome"
              value="NOTHING"
            />
          </div>
        </div> */}

        {/* FORM STEP 3 */}
        {/* <div className="stepThree">
          <h5>Enter the starting and ending date for the event</h5>
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
            />
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
            />
          </div>
        </div> */}

        {/* FORM STEP 4 */}
        {/* <div className="stepFour">
          <div>
            <Toaster />
          </div>
          <h5>Place a Bet on Your Preferred Outcome</h5>
          <br />
          <div className="container px-0 selectBet">
            <p>PREFERRED OUTCOME</p>
            <div id={`betA`}>
              <p className="fs-6 mb-2">{window.preferredoutcome}</p>
              <p>
                Participants: <span>0</span>
              </p>
              <p>
                Total amount betted: <span>${window.anmount}</span>
              </p>
              <GoPrimitiveDot
                style={{ position: "absolute", top: "15px", right: "15px" }}
              />
            </div>
          </div>
          <br />
          <div className="my-3">
            <label for="inputBetAmount" className="form-label">
              ENTER AMOUNT TO BET
            </label>
            <input type="number" className="form-control mb-5" id="inputBetAmount" />
            <button
              className="btn my-3 px-3 py-3 fw-bold justify-content-between d-flex self-pause"
              style={{
                backgroundColor: "#fff",
                color: "#000",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <span>CREATE EVENT</span>
              <MdOutlineArrowForwardIos className="mt-1" />
            </button>
          </div>
        </div> */}

        {/* FORM NAVIGATION */}

        <button
          className="btn my-3 px-3 py-3 fw-bold justify-content-between d-flex self-pause"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <MdArrowBackIos className="mt-1" />
          <span>RECHECK</span>
        </button>
        <button
          className="btn my-3 px-3 py-3 fw-bold justify-content-between d-flex self-pause"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <span>NEXT</span>
          <MdOutlineArrowForwardIos className="mt-1" />
        </button>
      </div>

      {/* HISTORY */}
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
    </div>
  );
}
