import React, { Component, Fragment } from "react";
import greenDot from "./../../../images/green-dot.png";
import cardBackground from "./../../../images/ground.png";
import carbon_timer from "./../../../images/carbon_timer.png";
import { NavLink } from "react-router-dom";
import SideBar from "./SideBar";

class GameCardHome extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    
  };

  handelSideMenu = () => {
    document.getElementById('sidebari').style.display = 'inline'
  };

  getdays = (endime) =>{
    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = endime - ts
    lefttime = parseInt(Math.floor(lefttime/3600)/24);
    if(lefttime <  0){
      lefttime = 0
    }
    // console.log("time remaining",parseInt(lefttime/24), ts);
    return lefttime
  }

  render() {
    
    return (
      <>
      
      <Fragment>
        
        <div className="card game-card overflow-hidden">
          <div
            className="row p-3 image-card"
            style={{ backgroundImage: `url(${cardBackground})` }}
          >
            <div class="layer"></div>
            <div className="col-12 text-white">
              <img src={greenDot} className="me-2" width="12" />
            </div>
            <div className="col-12 mt-4">
              <h4 className="team-name">
                {this.props.teamone} <span className="theam-text-color">vs</span> {this.props.teamtwo}
                City
              </h4>
            </div>
            <div className="col-12 mt-4">
              <p className="theam-text-color m-0">Pool size</p>
            </div>
            <div className="col-6">
              <h3>{this.props.poolsize} BETS</h3>
            </div>
            <div className="col-6">
              <h5 className="text-end">
                <img
                  src={carbon_timer}
                  className="me-2"
                  width="18"
                  style={{ verticalAlign: "sub" }}
                />
                {this.getdays(this.props.lastdate)} Days left
              </h5>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-8">
              <ul>
                <li>30% &nbsp;&nbsp;Chealsea</li>
                <li>65% &nbsp;&nbsp;Machester City</li>
                <li>5% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li>
              </ul>
            </div>
            <div className="col-4 button-row">
             <NavLink to={`/${this.props.url.toLowerCase()}`}> <button className="btn" >BET</button></NavLink>
            </div>
          </div>
        </div>
      </Fragment>
      </>
    );
  }
}
export default GameCardHome;
