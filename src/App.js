import React, { Component, Fragment } from "react";
import Web from "./routes/Web";
import './css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import {isMobile} from 'react-device-detect'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSadCry } from "react-icons/fa";
import "./App.css";

window.match = 1
window.anmount = 0
window.maincat = "SPORTS"
window.maincatNum = 0

  if (isMobile) {
    window.collapsed = true
  } else {
    window.collapsed = false
  }

  const error = (msg) => toast.error(msg, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: false,
    style:{
      background:'#fff',
      color:'#000'
    }
    });
 
class App extends Component {

  componentDidMount =async()=>{
    try {
      if(!window.ethereum){
        console.log("Non Ethererum browser detected, please install Metamask first")
        error("Non Ethererum browser detected, please install Metamask first");
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
        <ToastContainer icon={false}/>
        <Web />
      </Fragment>
    );
  }
}
export default App;
