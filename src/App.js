import React, { Component, Fragment } from "react";
import Web from "./routes/Web";
import './css/bootstrap.min.css';
import './css/style.css';
import './css/responsive.css';
window.match = 1
window.collapsed = false
window.anmount = 0
window.maincat = 9
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
