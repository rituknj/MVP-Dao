import React, { Component, Fragment } from "react";
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
      selectedcat: 'soccor'
    };
  }
  componentDidMount = () => { 
    console.log(this.props)
  };


  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab,
    });
  };

  selectedcategory = (cat) => {
    this.setState({selectedcat:cat})
    console.log("clicked on",this.state.selectedcat)
  };
  
  handelGamesTab = (tab) => {
    this.setState({
      activeTabTop:tab
    })
    console.log("Active tab is ", this.state.activeTabTop)
    
  };
 


  render() {
    return (
      <Fragment>
        <div className="container-fluid px-md-5">
          <p className="mt-2 mt-md-4 text-white">#Sports</p>
          <div className="nav-scroller-games">
            <div className="d-flex mt-2 mt-md-4 games-scroll">
       
              <div className="pe-2 pe-md-5">
                <NavLink to='/soccer' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 1 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(1)
                  }
                >
                  <img src={monotone_soccer} />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseSoccer"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSoccer"
                  >
                    Soccer
                  </p>
                </div>
                </NavLink>
              </div>
            
              <div className="pe-2 pe-md-5">
                <NavLink to='/rugby' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 2 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(2)}
                >
                  <img src={park_rugby} />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseSoccer"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSoccer"
                  >
                    Rugby
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/tennis' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 3 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(3)}
                >
                  <img src={monotone_tennis} />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseSoccer"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseSoccer"
                  >
                    Tennis
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/racing' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 4 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(4)}
                >
                  <img src={monotone_racing} width="40px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseRacing"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseRacing"
                  >
                    Hockey
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/boxing' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 5 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(5)}
                >
                  <img src={monotone_boxing} width="30px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseBoxing"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseBoxing"
                  >
                    Boxing
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/basketball' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 6 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(6)}
                >
                  <img src={monotone_basketball} width="30px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseBasketball"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseBasketball"
                  >
                    Basketball
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/baseball' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 7 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(7)}
                >
                  <img src={cil_baseball} width="30px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseBaseball"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseBaseball"
                  >
                    Baseball
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/cricket' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 8 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(8)}
                >
                  <img src={cil_cricket} width="30px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseCricket"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseCricket"
                  >
                    Cricket
                  </p>
                </div>
                </NavLink>
              </div>

              <div className="pe-2 pe-md-5">
                <NavLink to='/football' style={{textDecoration:"none"}}>
                <div
                  className={`text-center tab-view-card p-3 ${this.state.activeTabTop == 8 ? "active" : ""
                    }`}
                  onClick={() => this.handelGamesTab(9)}
                >
                  <img src={park_rugby} width="30px" />
                  <p
                    className="text-white m-0 mt-1 mt-md-3"
                    data-bs-toggle="collapse"
                    href="#collapseCricket"
                    role="button"
                    aria-expanded="false"
                    aria-controls="collapseCricket"
                  >
                   American <br/>Football
                  </p>
                </div>
                </NavLink>
              </div>

            </div>
          </div>
        </div>

       
      </Fragment>
    );
  }
}
export default Index;
