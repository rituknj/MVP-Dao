import React from "react";
import Slider from "react-slick";
import image from "../../../images/image 4.png";
import safu from "../../../images/safU Bets.png";
import "../../../css/headerslider.css";
import EventsArea from "./EventsArea";

export default function HeaderSlider() {
  return (
    <div>
      <div className="slider-container">
        <Slider
          dots={true}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3100}
        >
          <div className="slider-content">
            <div className="row">
              <div className="col-lg-6">
                <div className="slider-area">
                  <img src={safu} alt="" className="safu-img" />
                  <button className="enter-button">ENTER</button>
                </div>
              </div>
              <div className="col-lg-6">
                <img src={image} alt="" className="game-img" />
              </div>
            </div>
          </div>
          <div className="slider-content">
            <div className="slider-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="slider-area">
                    <img src={safu} alt="" className="safu-img" />
                    <button className="enter-button">ENTER</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={image} alt="" className="game-img" />
                </div>
              </div>
            </div>
          </div>
          <div className="slider-content">
            <div className="slider-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="slider-area">
                    <img src={safu} alt="" className="safu-img" />
                    <button className="enter-button">ENTER</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={image} alt="" className="game-img" />
                </div>
              </div>
            </div>
          </div>
          <div className="slider-content">
            <div className="slider-content">
              <div className="row">
                <div className="col-lg-6">
                  <div className="slider-area">
                    <img src={safu} alt="" className="safu-img" />
                    <button className="enter-button">ENTER</button>
                  </div>
                </div>
                <div className="col-lg-6">
                  <img src={image} alt="" className="game-img" />
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      <EventsArea />
    </div>
  );
}
