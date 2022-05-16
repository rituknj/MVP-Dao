import React, { Component, Fragment } from "react";
import Down from "./../../../images/down.png";
import GameCard from "../../components/Cards/GameCard";
import AppHeader from "../../components/Elements/AppHeader";
import { NavLink, Link, useRouteMatch } from "react-router-dom";
//images
import monotone_soccer from "../../../images/emojione-monotone_soccer-ball.png";
import park_rugby from "../../../images/icon-park_rugby.png";
import monotone_tennis from "../../../images/emojione-monotone_tennis.png";
import monotone_racing from "../../../images/hockey.png";
import monotone_boxing from "../../../images/emojione-monotone_boxing-glove.png";
import monotone_basketball from "../../../images/emojione-monotone_basketball.png";
import cil_baseball from "../../../images/cil_baseball.png";
import cil_cricket from "../../../images/ic_outline-sports-cricket.png";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabTop: 0,
      activeTabBottom: 1,
      selectedcat: "soccor",
    };
  }
  componentDidMount = () => {};

  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab,
    });
  };

  selectedcategory = (cat) => {
    this.setState({ selectedcat: cat });
    console.log("clicked on", this.state.selectedcat);
  };

  handelGamesTab = (tab) => {
    this.setState({
      activeTabTop: tab,
    });
    console.log("this is ", this.state.activeTabTop);
  };

  handlechange=(cat)=>{
    window.maincatogries = cat
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid px-md-5 p-2 slider top-image">
          <p className="mt-4 mt-md-4 text-white sporttag">#{window.maincatogries}</p>
          <div class="dropdown categories-dropdown">
            <button
              class="btn btn-secondary dropdown-toggle border-0 px-4 py-2 fs-5"
              style={{backgroundColor:"#4D4A4A"}}
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"  style={{backgroundColor:"#4D4A4A"}}>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("SPORTS")} >
                SPORTS
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("WEATHER")} >
                WEATHER
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("REALITY TV SHOWS")} >
                REALITY TV SHOWS
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("POLITICS")} >
                POLITICS
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("AWARDS")} >
                AWARDS
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("DEAD POOL")} >
                DEAD POOL
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("GAMES")} >
                GAMES
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("MARKET PREDICTION")} >
                MARKET PREDICTION
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("SPECIAL")} >
                SPECIAL
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button" onClick={()=>this.handlechange("OTHERS")} >
                OTHERS
                </button>
              </li>
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Index;
