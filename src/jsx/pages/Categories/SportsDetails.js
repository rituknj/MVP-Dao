import React from "react";
import vector from "../../../images/Vector.png";

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
              <div className="col-md-6">
                <h5 className="card-header">TITLE</h5>
                <div className="card-body">
                  <p className="card-title">TEAM A</p>
                  <p className="card-title mt-4">TEAM A</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="matched-event">
                  <h6>MATCHED</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
