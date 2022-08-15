import React from "react";
import ellipse from "../../../images/Ellipse 9.png";

export default function Chats() {
  return (
    <div>
      <div className="chats-area">
        <div className="chats-content">
          <h5 className="chats-heading">CHAT</h5>
          <img src={ellipse} alt="" />
        </div>
      </div>
      <div className="mx-1 my-3 chat-text-background">
        <div className="chat-text">
          <h6 className="username-heading">USERNAME</h6>
          <p className="lorem-text">
            Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS
            TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
            BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
            BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
          </p>
        </div>
      </div>
      <div className="mx-1 my-3 chat-text-background">
        <div className="chat-text">
          <h6 className="username-heading">USERNAME</h6>
          <p className="lorem-text">
            Lorem ipsum dolor sit amet TEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS
            TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
            BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
            BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM BTEAM A VS TEAM
          </p>
        </div>
      </div>
    </div>
  );
}
