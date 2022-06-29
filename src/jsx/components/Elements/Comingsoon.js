import React, { useEffect, useState } from "react";
import AppHeader from "../../components/Elements/AdminHeader";
import coming from "../../../images/coming.png";
import CountdownTimer from "./CountdownTimer";
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import Footer from "./Footer";
import { Link } from "react-router-dom";

export default function Comingsoon({ targetDate }) {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div>
      <AppHeader />
      <div className="row coming-main">
        <div className="col-md-6 columnOne">
          <h1>
            DECENTRALISED <span>P2P</span> BETTING
          </h1>
          <br /><br />
          <p className="text-light mb-xl-n5">LAUNCHING IN</p>
          <div>
            {/* ENTER TIMESTAMP IN EPOCH */}
            <CountdownTimer targetDate={1657126800000} />
          </div>
        <Link
        to="/app"
          className="btn mt-5 px-3 py-3 fw-bold justify-content-between d-flex self-pause"
          style={{
            backgroundColor: "#fff",
            color: "#000",
            width: "100%",
            maxWidth:"400px",
            borderRadius: "10px",
          }}
        >
          <span>TEST PLATFORM</span>
          <MdOutlineArrowForwardIos className="mt-1" />
        </Link>
        </div>
        <div className="col-md-6 columnTwo">
          <img src={coming} alt="" />
        </div>
      </div>
      <Footer/>
    </div>
  );
}
