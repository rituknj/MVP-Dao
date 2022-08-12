import React from "react";
import vector from "../../../images/Vector.png";
import Group from "../../../images/Group 57.png";

export default function SportsDetails() {
  return (
    <div>
      <div className="container">
        <div className="sports-heading">
          <div className="sh d-flex align-items-md-baseline">
            <h6 className="sports-heading">TRENDING</h6>
            <img src={vector} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
