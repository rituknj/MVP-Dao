import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SportsDetails from "./SportsDetails";
import image from "../../../images/image 23.png";
import arrow from "../../../images/extendicon.png";
import Chats from "./Chats";

export default function EventsArea() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <div className="event-area">
            <div className="event-content">
              <Tabs
                defaultActiveKey="sports"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="sports" title="SPORTS">
                  <SportsDetails />
                </Tab>
                <Tab eventKey="e-sports" title="E-SPORTS">
                  E-SPORTS
                </Tab>
                <Tab eventKey="everything else" title="EVERYTHING ELSE">
                  EVERYTHING ELSE
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12">
          <div className="instruction-area my-3">
            <div className="event-content">
              <div className="instruction-area position-relative">
                <div className="betting-instruction">
                  <h5 className="heading-instruction">HOW TO PLACE A BET</h5>
                  <img src={image} alt="" className="image-instruction" />
                </div>
              </div>
            </div>
            <div className="read-instruction">
              <div className="read-area">
                <span className="read-btton">READ</span>
                <img src={arrow} alt="" className="read-arrow-img" />
              </div>
            </div>
          </div>
          <Chats />
        </div>
      </div>
    </div>
  );
}
