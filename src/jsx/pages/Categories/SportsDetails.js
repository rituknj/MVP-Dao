import React from "react";
import vector from "../../../images/Vector.png";
import Group from "../../../images/Group 57.png";

export default function SportsDetails() {
  return (
    <div>
      <div className="container">
        <div className="sports-content">
          <div className="sports">
            <h6 className="sports-trending">TRENDING</h6>
            <img src={vector} alt="" className="img-vector" />
          </div>
          <div className="card betting-card">
            <div className="row">
              <div className="col-lg-2">
                <h5 className="card-header">TITLE</h5>
                <div className="card-body">
                  <p className="card-title">TEAM A</p>
                  <p className="card-title mt-4">TEAM A</p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="matched-event">
                  <img src={Group} alt="" className="match-img" />
                </div>
              </div>
              <div className="col-lg-2">
                <div className="pool-size">
                  <span className="size">POOL SIZE</span>
                </div>
                <div className="amount">
                  <p>
                    <b>$3,600</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
