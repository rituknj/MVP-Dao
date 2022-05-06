import React from "react";
import { Button, Modal } from "react-bootstrap";
import { BsCircleFill } from "react-icons/bs";
import { SiBinance } from "react-icons/si";

export default function WalletPopup(props) {
  const demoArr = [
    {
      name: "BETSWAMP V2",
      quantity: "250 BETS",
      rate: "$2.36",
      change: "+20.2%",
      worth: "$2000",
    },
    {
      name: "DAO BETS",
      quantity: "600 sBETS",
      rate: "$1.00",
      change: "+20.2%",
      worth: "0 sBETS LOCKED",
    },
    {
      name: "BUSD",
      quantity: "6000 BUSD",
      rate: "$1.00",
      change: "+0.12%",
      worth: "$6000",
    },
  ];

  const renderArr = (demoArr, index) => {
    return (
      <div className="card mb-3 text-light" 
      style={{ backgroundColor: "#1C1C1C", width: "100%", border: "none", borderBottom:"1px solid #000" }} key={index}>
        <div className="card-body d-flex">
          <span
            style={{
              backgroundColor: "#0F0F0F",
              height: "fit-content",
              width: "fit-content",
              borderRadius: "50%",
            }}
            className="p-2"
          >
            <SiBinance size={38} color="yellow" />
          </span>
          <div>
            <h5 className="card-title">{demoArr.name}</h5>
            <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      fullscreen={"md-down"}
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body style={{ backgroundColor: "#0A0A0A" }}>
        <div className="d-flex justify-content-between">
          <span
            className="rounded-pill py-1 px-3"
            style={{ backgroundColor: "#1C1C1C", color: "#BCBCBC" }}
          >
            <BsCircleFill color="green" /> 0x000...000
          </span>
          <button
            className="border-0 rounded-pill px-3"
            style={{ backgroundColor: "#1C1C1C", color: "#BCBCBC" }}
          >
            BUY BETS
          </button>
        </div>
        <div className="text-center my-5 text-light">
          <h4 style={{ color: "#BCBCBC" }}>TOTAL BALANCE</h4>
          <h3>$3000</h3>
        </div>
        <div className="container-fluid px-0 pt-3" style={{ backgroundColor: "#1C1C1C", borderTopRightRadius: "25px", borderTopLeftRadius: "25px" }}>
          {demoArr.map(renderArr)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
