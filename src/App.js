import React, { Component, Fragment } from "react";
import Web from "./routes/Web";
import './css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
import {isMobile} from 'react-device-detect'

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
  render() {
    return (
      <Fragment>
        <Web />
      </Fragment>
    );
  }
}
export default App;
