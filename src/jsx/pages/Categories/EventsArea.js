import React from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SportsDetails from "./SportsDetails";

export default function EventsArea() {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9">
            <div className="event-area">
              <div className="event-content">
                <Tabs
                  defaultActiveKey="sports"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="sports" title="SPORTS">
                    <SportsDetails/>
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
          <div className="col-lg-3"></div>
        </div>
      </div>
    </div>
  );
}
