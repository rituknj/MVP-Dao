import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Image100 from "../../../images/usdc-coin-icon-1.png";
import Image101 from "../../../images/image-27.png";
function Wallet() {
  return (
    <>
      <div
        className="container"
        style={{ color: "white", fontFamily: "Montserrat" }}
      >
        <div className="row">
          <div className="col-lg-9 col-md-12">
            <div className="active-history-area my-5">
              <Tabs
                defaultActiveKey="sports"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="sports" title="BALANCE">
                  <div  style={{fontSize: "0.6rem"}}>
                    <div className="row" style={{ margin: "2rem" }}>
                      <div className="col-log-6 col-md-6">
                        <span>ESTIMATED BALANCE</span>
                        <br></br>
                        <span>$600,000,000</span>
                      </div>
                      <div className="col-log-6 col-md-6">
                        <span style={{ float: "right" }}>USERNAME</span>
                      </div>
                    </div>

                    <div className="row" style={{backgroundColor:"#0C0C0C",borderRadius:"20px", margin: "1rem",padding:"1rem"}}>
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image100} alt="" />
                      </div>
                      <div className="col-lg-11 col-md-11 col-sm-10 col-10">
                        <span>usdc</span>
                        <br></br>
                        <span>2000 USDC</span>
                        <br></br>
                        <span>$2000</span>
                      </div>
                    </div>

                    <div className="row" style={{backgroundColor:"#0C0C0C",borderRadius:"20px", margin: "1rem",padding:"1rem"}}>
                      <div className="col-lg-1 col-md-1 col-sm-2 col-2">
                        <img src={Image101} alt="" />
                      </div>
                      <div className="col-lg-8 col-md-8 col-sm-7 col-2">
                        <span>BETS</span><br></br>
                        <span>250 BETS</span><br></br>
                        <span>$2000</span>
                      </div>
                      <div className="col-lg-3 col-md-3 col-sm-3 col-8">
                        <button
                          type="button"
                          class="btn buttonTeamb"
                          style={{
                            backgroundColor: "#48FF7B",
                            color: "#0A0A0A",
                            fontSize: "0.5rem",
                            fontWeight: "800",
                            marginLeft: "1rem",
                            float:"right"
                          }}
                        >
                          BUY
                        </button>
                      </div>
                    </div>
                  </div>
                </Tab>

                {/* ........................................................................... */}

                <Tab eventKey="e-sports" title="VALIDATION POINTS"></Tab>
              </Tabs>
            </div>
          </div>
          <div className="col-lg-3 col-md-12"></div>
        </div>
      </div>
    </>
  );
}

export default Wallet;
