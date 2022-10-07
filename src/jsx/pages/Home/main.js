import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/bettingnewlogo.png";
import { BsArrowRightShort } from "react-icons/bs";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "../../../css/mainnew.css";

export default function main() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <img src={logo} alt="" />
          </Link>
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
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/"
                >
                  DOCS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active navItem text-light mx-3"
                  aria-current="page"
                  to="/betting-app"
                >
                  BETS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/create-event"
                >
                  CREATE
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/tickets"
                >
                  TICKET
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link navItem text-light mx-3"
                  to="/Validate"
                >
                  VALIDATE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navItem text-light mx-3" to="/Wallet">
                  WALLET
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}

      <div className="container background-image">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="newmaincontent">
              <h1 className="headingnew">
                CREATE OR PLACE <span className="betspan">BETS</span> USING
                STABLECOINS AND NFTS
              </h1>
              <div className="decentralized">
                <div className="blink">
                  <span className="arrowblink">
                    <MdOutlineKeyboardArrowRight />
                  </span>
                </div>
                <p> decentralized peer-to-peer betting protocol</p>
              </div>
            </div>

            <div className="button-betnow">
              <button className="bbnow">
                BET NOW <BsArrowRightShort size={22} />
              </button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea">
              <img
                src="https://safu.betswamp.com/asset/hr_img_1.svg"
                alt=""
                className="svgimg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CARDS SECTION */}

      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="card text-bg-dark bb">
              <div className="card-header newcardheader">
                <div className="au">
                  <h5 className="activeh5">ACTIVE</h5>
                  <p className="usersh5">USERS</p>
                </div>
                <span id="aa">
                  <iconify-icon icon="bi:people-fill"></iconify-icon>
                </span>
              </div>
              <div className="card-body newbackground">
                <h5 className="card-title number">0</h5>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="card text-bg-dark bb">
              <div className="card-header newcardheader">
                <div className="au">
                  <h5 className="activeh5">TOTAL</h5>
                  <p className="usersh5">BETS CREATED</p>
                </div>
                <span id="cc">
                  <iconify-icon icon="uil:create-dashboard"></iconify-icon>
                </span>
              </div>
              <div className="card-body newbackground">
                <h5 className="card-title number">0</h5>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-3">
          <div className="col-lg-6 col-md-12">
            <div className="card text-bg-dark bb">
              <div className="card-header newcardheader">
                <div className="au">
                  <h5 className="activeh5">DAILY</h5>
                  <p className="usersh5">PAYOUTS</p>
                </div>
                <span id="dd">
                  <iconify-icon icon="fluent-emoji-flat:dollar-banknote"></iconify-icon>
                </span>
              </div>
              <div className="card-body newbackground">
                <h5 className="card-title number">
                  <span className="dollar">$</span>0
                </h5>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="card text-bg-dark bb">
              <div className="card-header newcardheader">
                <div className="au">
                  <h5 className="activeh5">TOTAL</h5>
                  <p className="usersh5">PAYOUTS</p>
                </div>
                <span id="tt">
                  <iconify-icon icon="noto:money-bag"></iconify-icon>
                </span>
              </div>
              <div className="card-body newbackground">
                <h5 className="card-title number">
                  <span className="dollar">$</span>0
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ODDS */}

      <div className="container background-image2">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="newmaincontent">
              <h1 className="headingnew2">CREATE THE BET, STATE THE ODDS</h1>
              <div className="decentralized">
                <p>
                  {" "}
                  become the bookmaker, create bets on anything verifiable and
                  get rewarded regardless if you win or lose.
                </p>
              </div>
            </div>

            <div className="button-learn">
              LEARN MORE <MdOutlineKeyboardArrowRight size={22} />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea">
              <img
                src="https://safu.betswamp.com/asset/create.svg"
                alt=""
                className="svgimg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* VERIFIABLE */}

      <div className="container my-5">
        <div className="row my-5">
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea">
              <img
                src="https://safu.betswamp.com/asset/bet.svg"
                alt=""
                className="svgimg"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="newmaincontent">
              <h1 className="headingnew2">BET ON ANYTHING VERIFIABLE</h1>
              <div className="decentralized">
                <p>
                  place bets on a vast variety of markets with no restrictions,
                  enjoy attractive odds with instant and limitless withdrawals,
                  no house, no tricks,plus you are guaranteed to get paid
                  bonuses on every single bet you make regardless if you win or
                  lose
                </p>
              </div>
            </div>

            <div className="button-learn">
              LEARN MORE <MdOutlineKeyboardArrowRight size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* OUTCOMES*/}

      <div className="container my-5">
        <div className="row my-5">
          <div className="col-lg-6 col-md-12">
            <div className="newmaincontent">
              <h1 className="headingnew2">
                VALIDATE OUTCOMES OF BETS CORRECTLY AND EARN
              </h1>
              <div className="decentralized">
                <p>
                  earn passively by becoming a validator, providing accurate
                  verdicts on bets made, build your reputation and unlock access
                  to various nft rewards and bonuses. you don't even have to bet
                  to earn with this.
                </p>
              </div>
            </div>
            <div className="button-learn">
              GET STARTED <MdOutlineKeyboardArrowRight size={22} />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea">
              <img
                src="https://safu.betswamp.com/asset/validation.svg"
                alt=""
                className="svgimg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* EASY, FAIR AND SAFE */}
      <div className="container my-5">
        <div className="row my-5">
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea BB">
              <img
                src="https://safu.betswamp.com/asset/safe.svg"
                alt=""
                className="svgimg"
              />
            </div>
          </div>

          <div className="col-lg-6 col-md-12">
            <div className="rightbackgroundimage">
              <div className="newmaincontent">
                <h1 className="headingnew2">EASY, FAIR AND SAFE</h1>
                <div className="decentralized">
                  <p>
                    a trustless peer-to-peer smart contract built with no
                    central authority, winnings are calculated and distributed
                    directly to your crypto wallet based on the equivalence of
                    your bet in percentage to the entire pool in the event you
                    bet on.
                  </p>
                </div>
              </div>

              <div className="button-learn">
                LEARN MORE <MdOutlineKeyboardArrowRight size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GET STARTED */}
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <section className="getstarted  layout_pg">
              <div className="content my-5">
                <h1 className="fs-2">GET STARTED</h1>
                <p>
                  create or place a bet by following <br />
                  the easy steps below
                </p>
                <div className="cn1">
                  <h1>1</h1>
                  <div className="cont">
                    <p>install a wallet</p>
                    <a href="/" className="link mt-5">
                      learn how <MdOutlineKeyboardArrowRight />
                    </a>
                  </div>
                </div>
                <div className="cn1">
                  <h1>2</h1>
                  <div className="cont">
                    <p>fund wallet with usdt</p>
                    <a href="/" className="link mt-5">
                      learn how <MdOutlineKeyboardArrowRight />
                    </a>
                  </div>
                </div>
                <div className="cn1">
                  <h1>3</h1>
                  <div className="cont">
                    <p>set network to ropsten</p>
                    <a href="/" className="link mt-5">
                      learn how <MdOutlineKeyboardArrowRight />
                    </a>
                  </div>
                </div>
                <div className="cn1">
                  <h1>4</h1>
                  <div className="cont">
                    <p>create or place a bet</p>
                    <a href="/" className="link mt-5">
                      learn how <MdOutlineKeyboardArrowRight />
                    </a>
                  </div>
                </div>

                <button className="mt-xl-5 mt-5 bbnow">
                  LAUNCH APP
                  <BsArrowRightShort size={22} />
                </button>
              </div>
              <div className="img">
                <img
                  src="/asset/getstarted.svg"
                  alt=""
                  srcset=""
                  className="img-fluid"
                />
              </div>
            </section>
          </div>
          <div className="col-lg-6 col-md-12">
            <img
              src="https://safu.betswamp.com/asset/getstarted.svg"
              alt=""
              className="svgimg"
            />
          </div>
        </div>
      </div>
      {/* ECOSYSTEM */}

      {/* COMPARISON */}

      <div className="container">
        <h1 className="headingnew2 text-center my-3">HOW WE COMPARE</h1>
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <div className="safubetsleft my-5">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="sbs">SAFUBETS</h4>
                <img src="https://safu.betswamp.com/asset/g_1.png" alt="" />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="safubetsright my-5">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="sbs">TRADITIONAL SPORTSBOOK</h4>
                <img src="https://safu.betswamp.com/asset/r_i.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROADMAP */}

      <div className="container">
        <h1 className="headingnew2 text-center my-3">ROADMAP</h1>

        <div className="row">
          <div className="card mb-3 roadmapcard">
            <div className="card-body roadmapbody">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img src="https://safu.betswamp.com/asset/g_1.png" alt="" />
                  <h4 className="phase1 mt-2">PHASE 1</h4>
                </div>
                <div className="rightpercentarea">
                  <h4 className="sevenfive">75%</h4>
                  <p>completed</p>
                </div>
              </div>
              <div className="progress road">
                <div
                  className="progress-bar roadmap"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{ width: "75%" }}
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="card-body roadmapbody">
              <ul>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
              </ul>
            </div>
          </div>
          <div className="card mb-3 roadmapcard">
            <div className="card-body roadmapbody">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img src="https://safu.betswamp.com/asset/g_1.png" alt="" />
                  <h4 className="phase1 mt-2">PHASE 2</h4>
                </div>
                <div className="rightpercentarea">
                  <h4 className="sevenfive">0%</h4>
                  <p>completed</p>
                </div>
              </div>
              <div className="progress road">
                <div
                  className="progress-bar roadmap"
                  role="progressbar"
                  aria-label="Basic example"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <div className="card-body roadmapbody">
              <ul>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
                <li className="liststyle">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  dolores, impedit.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* BETS TOKEN */}
      <div className="container my-5">
        <div className="row my-5">
          <div className="col-lg-6 col-md-12">
            <div className="rightimagearea">
              <img
                src="https://safu.betswamp.com/asset/chips.svg"
                alt=""
                className="betstoken"
              />
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="newmaincontent">
              <h1 className="headingnew">
                <span className="betspan">BETS</span> TOKEN
              </h1>
              <div className="decentralized">
                <p>
                  lorem ipsum dolor sit amet consectetur adipisicing elit. nihil
                  nemo, a cupiditate aspernatur explicabo optio aliquid animi id
                  numquam voluptate?
                </p>
              </div>
            </div>

            <button className="mt-xl-5 mt-5 bbnow">
              JOIN WHITELIST
              <BsArrowRightShort size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
