import React, { Component, Fragment } from "react";
import Web from "./routes/Web";
import './css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import {isMobile} from 'react-device-detect'
import { envdev } from "./web3/environments";
import { ChainID } from "./web3/web3";

window.match = 1
window.anmount = 0
window.maincat = "SPORTS"
window.maincatNum = 0

  if (isMobile) {
    window.collapsed = true
  } else {
    window.collapsed = false
  }

class App extends Component {

  componentDidMount =async()=>{
    const id = await ChainID();
    if( id === envdev.REACT_APP_CHAIN){
      console.log("id != envdev.REACT_APP_CHAIN",id,envdev.REACT_APP_CHAIN)
    }
    else{
      console.log("id != envdev.REACT_APP_CHAIN",id,envdev.REACT_APP_CHAIN)
      alert("Wrong Network, can not load data.");
    }
  }

  render() {
    window.ethereum.on('chainChanged', async (accounts) => {
      window.location.reload();
      });
      
    return (
      <Fragment>
        <Web />
      </Fragment>
    );
  }
}
export default App;
