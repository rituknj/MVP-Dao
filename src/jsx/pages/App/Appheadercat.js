import React, { Component, Fragment } from "react";
import Down from './../../../images/down.png'
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
    
  };


  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab
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
    console.log('this is ', this.state.activeTabTop)
  };


 


  render() {
    return (
      <Fragment>
        <div className="container-fluid px-md-5 p-2 slider top-image">
            <p className="mt-4 mt-md-4 text-white sporttag">#Sports</p>
        <div className="catogories-dropdown">
        </div>
        </div>
        

       
      </Fragment>
    );
  }
}
export default Index;
