import React from "react";
import cross from "../../../images/cross.png";
import "../../../css/single.css";

export default function Single() {
  return (
    <div>
      <div className="single-area-content px-2">
        <div className="card section">
          <div className="card-header bets-background">
            <div className="close-card">
              <h5 className="heading-bet">
                {" "}
                TEAM <span className="vs">VS </span> TEAMB
              </h5>
              <img src={cross} alt="" className="cross-img" />
            </div>
          </div>
          <div className="card-body bet-body-background">
            <h5 className="card-title">Special title treatment</h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
            <input type="text" placeholder="ENTER AMOUNT" />
          </div>
        </div>
      </div>
    </div>
  );
}
