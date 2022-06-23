import React, { Component, Fragment } from "react";
import {getSubCategory} from './../../../web3/betsMVPService'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabTop: 0,
      activeTabBottom: 1,
      selectedcat: "soccor",
    };
  }
  componentDidMount = async() => {
    window.maincatogries = await getSubCategory(0);
  };

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

  handlechange = async(cat)=>{
    if(cat == "SPORTS"){
      window.maincatogries = await getSubCategory(0);
      window.maincat = "SPORTS"
      window.maincatNum = 0
    }
    else if(cat == "WEATHER"){
      window.maincatogries = await getSubCategory(1);
      window.maincat = "WEATHER"
      window.maincatNum = 1
    }
    else if(cat == "REALITY TV SHOWS"){
      window.maincatogries= await getSubCategory(2);
      window.maincat = "REALITY TV SHOWS"
      window.maincatNum = 2
    }
    else if(cat == "POLITICS"){
      window.maincatogries = await getSubCategory(3);
      window.maincat = "POLITICS"
      window.maincatNum = 3
    }
    else if(cat== "AWARDS"){
      window.maincatogries = await getSubCategory(4);
      window.maincat = "AWARDS"
      window.maincatNum = 4
    }
    else if(cat == "DEAD POOL"){
      window.maincatogries = await getSubCategory(5);
      window.maincat = "DEAD POOL"
      window.maincatNum = 5
    }
    else if(cat == "GAMES"){
      window.maincatogries = await getSubCategory(6);
      window.maincat = "GAMES"
      window.maincatNum = 6
    }
    else if(cat == "MARKET PREDICTION"){
      window.maincatogries = await getSubCategory(7);
      window.maincat = "MARKET PREDICTION"
      window.maincatNum = 7
    }
    else if(cat == "SPECIAL"){
      window.maincatogries = await getSubCategory(8);
      window.maincat = "SPECIAL"
      window.maincatNum = 8
    }
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid px-md-5 p-2 slider top-image">
          <p className="mt-4 mt-md-4 text-white sporttag p-3 font-weight-bold">#{window.maincat}</p>
          <div className="dropdown categories-dropdown">
            <p className="text-white" style={{fontSize:'12px'}}>SELECT CATEGORY</p>
            <button
              className="btn btn-secondary dropdown-toggle border-0"
              style={{backgroundColor:"#4D4A4A", borderRadius:"10px"}}
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {window.maincat == "Main Category" ? "CATOGRIES" : window.maincat}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2"  style={{backgroundColor:"#4D4A4A"}}>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("SPORTS")} >
                SPORTS
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("WEATHER")} >
                WEATHER
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("REALITY TV SHOWS")} >
                REALITY TV SHOWS
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("POLITICS")} >
                POLITICS
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("AWARDS")} >
                AWARDS
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("DEAD POOL")} >
                DEAD POOL
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("GAMES")} >
                GAMES
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("MARKET PREDICTION")} >
                MARKET PREDICTION
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("SPECIAL")} >
                SPECIAL
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button" onClick={()=>this.handlechange("OTHERS")} >
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
