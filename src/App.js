import React, { Component, Fragment } from "react";
import Web from "./routes/Web";
import './css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import {isMobile} from 'react-device-detect'
import toast, { Toaster } from "react-hot-toast";

window.match = 1
window.anmount = 0
window.maincat = "SPORTS"
window.maincatNum = 0

  if (isMobile) {
    window.collapsed = true
  } else {
    window.collapsed = false
  }

  const error = (msg) =>
  toast.error(msg, {
    style: {
      padding: "16px",
      color: "#000",
      marginTop:"75px"
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });
class App extends Component {

  componentDidMount =async()=>{
    try {
      if(!window.ethereum){
        alert("Non Ethererum browser detected, please install Metamask first");
      }
    } catch (error) {
      
    }
  }

  render() {
    try {
      window.ethereum.on('chainChanged', async (accounts) => {
        window.location.reload();
        });
    } catch (error) {
      
    }
      
    return (
      <Fragment>
        <Toaster/>
        <Web />
      </Fragment>
    );
  }
}
export default App;
