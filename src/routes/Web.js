import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
//Element
import SideBar from "../jsx/pages/Home/SideBar";
//Pages
import Home from "../jsx/pages/Home/Index";
import App from "../jsx/pages/App/Index";
import BLogs from "../jsx/pages/Blogs/BLogs";
import Admin from "../jsx/pages/Admin/Index";
import About from "../jsx/pages/About/Index";
import NEWPAGE from "./../jsx/pages/News/Newpage";
import Tennis from "./../jsx/pages/Categories/Tennis";
import Soccer from "./../jsx/pages/Categories/Soccer";
import Rugby from "./../jsx/pages/Categories/Rugby";
import Racing from "./../jsx/pages/Categories/Racing";
import Boxing from "./../jsx/pages/Categories/Boxing";
import Basketball from "./../jsx/pages/Categories/Basketball";
import Baseball from "./../jsx/pages/Categories/Baseball";
import Cricket from "./../jsx/pages/Categories/Cricket";
import Football from "./../jsx/pages/Categories/Football";
import Comingsoon from "../jsx/components/Elements/Comingsoon";
import BettingNavApp from "../jsx/pages/Categories/BettingNavApp";
import MobileHeader from "../jsx/Mobile/MobileHeader";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import Accumulate from "../jsx/pages/Categories/Accumulate";
import Single from "../jsx/pages/Categories/Single";
import NavTickets from "../jsx/pages/Categories/NavTickets";
import CreateEvent from "../jsx/pages/Admin/CreateEvent";
import Validate from "../jsx/pages/Categories/Validate";
import Wallet from "../jsx/pages/Categories/Wallet";
import EventsDetails from "../jsx/pages/EventsDetails";

const url = "https://safu.in.ngrok.io"

class Web extends Component {
  details =()=>{
    return <div>
      <EventsDetails url={url}/>
    </div>
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/app" component={Cricket} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/about" component={About} />
            <Route exact path="/create-event" component={CreateEvent} />
            <Route exact path="/comingsoon" component={Comingsoon} />
            <Route exact path="/tickets" component={NavTickets} />
            {!isMobile ? (
              <Route exact path="/betting-app" component={BettingNavApp} />
            ) : (
              <Route exact path="/betting-app" component={MobileHeader} />
            )}

            {!isMobile ? (
              <Route exact path="/betting-app" component={BettingNavApp} />
            ) : (
              <Route exact path="/betting-app" component={MobileHeader} />
            )}
            <Route exact path="/accumulate" component={Single} />
            <Route exact path="/Validate" component={Validate} />
            <Route exact path="/Wallet" component={Wallet} />
            <Route exact path="/event-detail/:_id" component={this.details} />

            {/* <Route exact path="/blogs" component={BLogs} />
            <Route exact path="/news" component={NEWPAGE} /> */}
            {/* <Route exact path="/soccer" component={Soccer} />
            <Route exact path="/rugby" component={Rugby} />
            <Route exact path="/tennis" component={Tennis} />
            <Route exact path="/racing" component={Racing} />
            <Route exact path="/boxing" component={Boxing} />
            <Route exact path="/basketball" component={Basketball} />
            <Route exact path="/baseball" component={Baseball} />
            <Route exact path="/cricket" component={Cricket} />
            <Route exact path="/football" component={Football} /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}
export default Web;
