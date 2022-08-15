import React from 'react'
import image from "../../images/image 23.png";
import arrow from "../../images/extendicon.png";

export default function MobileChatInst() {
  return (
    <div>
      <div className="col-md-12">
          <div className="instruction-area">
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
        </div>
    </div>
  )
}
