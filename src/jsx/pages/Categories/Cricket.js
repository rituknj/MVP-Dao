import React, { Component, Fragment } from "react";
import greenDot from "./../../../images/green-dot.png";
import cardBackground from "./../../../images/ground.png";
import carbon_timer from "./../../../images/carbon_timer.png";
import { isMobile } from "react-device-detect";
import {
  placeBet,
  getEventOccurrenceBetAmount,
  totalEvents,
  bettorscounts,
  cancelevent,
} from "./../../../web3/betsMVPService";
import {
  TotalEventsCount,
  addingnewevents,
  updatingeventdata,
} from "./../../../web3/Countallevents";
import { getBETBalanceBUSD } from "./../../../web3/betsService";
import { initInstance, getAccount } from "./../../../web3/web3";
import redDot from "./../../../images/red-dot.png";
import FIRE from "./../../../images/fire.png";
import PLUS from "./../../../images/plus.png";
import OPEN from "./../../../images/open.png";
import { GoPrimitiveDot } from "react-icons/go";
import { TiStopwatch } from "react-icons/ti";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { ImFire } from "react-icons/im";
import { FaMinus, FaSquareFull } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
// import { Modal, RadioGroup, Radio, ButtonToolbar, Button, Paragraph   } from 'rsuite';

import AppHeader from "../../components/Elements/AdminHeader";

import {
  allactiveusers,
  totalpayout,
  totalbetcreated,
  getActiveEvents,
} from "./../../../web3/betsMVPService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Match from "./../../../images/match.png";
import UNMatch from "./../../../images/un-match.png";
import Search from "./../../../images/search.png";
import Filter from "./../../../images/filter.png";
import Appheadercat from "./../App/Appheadercat";
import Soccer from "./../Categories/Soccer";
import Footer from "../../components/Elements/Footer";

const tost = () =>
  toast.success("Success.", {
    style: {
      padding: "16px",
      color: "#000",
      marginTop: "75px",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

const styles = {
  radioGroupLabel: {
    padding: "8px 12px",
    display: "inline-block",
    verticalAlign: "middle",
  },
};

class GameCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allevents: [],
      active: false,
      id: null,
      activeSubCat: [],
      subcategorys: [],
      searchItem: "",
      specificCats: [],
      zeroEventAmount: 0,
      oneEventAmount: 0,
      twoEventAmount: 0,
      stackvalueone: 0,
      stackvaluetwo: 0,
      stackvaluethree: 0,
      teamone: "",
      teamtwo: "",
      selectedteam: "",
      betvalue: 0,
      onbetteam: "",
      currenttime: 0,
      occurance: 0,
      poolsize: 0,
      participant: 0,
      category: null,
      eventoneparticipant: 0,
      eventtwoparticipant: 0,
      eventthreeparticipant: 0,
      endtime: 0,
      v: 0,
      potential_wins: 0,
      account: 0,
      zero: 0,
      one: 0,
      two: 0,
      globalendtime: 0,
      BUSDbal: 0,
      match: 0,
      activeTabTop: false,
      catogries: "",
      activeTabBottom: 1,
      selectedcat: false,
      payout: 0,
      activeusers: 0,
      activeevents: 0,
      totalbetsmade: 0,
      events: 0,
      open: false,
      backdrop: "static",
      path: "/app",
      isboosted: false,
      filtershow: false,
      filteractive:0,
      startingtime:0,
      responsive_center: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
      },
    };
  }
  componentDidMount = async () => {
    await initInstance();
    let bal = await getBETBalanceBUSD();
    let account = await getAccount();
    this.setState({
      BUSDbal: bal,
      account: account,
    });

    let active_events = await totalEvents();
    let getstoredevents = window.localStorage.getItem("events");
    if (getstoredevents == null) {
      window.localStorage.setItem("events", JSON.stringify(""));
      await TotalEventsCount();
    }

    setInterval(async () => {
      await addingnewevents();
      this.setState({ subcategorys: window.maincatogries });
    }, 3000);

    setInterval(async () => {
      this.setState({
        match: window.match,
      });
    }, 500);

    let activeUser = await allactiveusers();
    let totalpay = await totalpayout();
    let totalEvent = await totalEvents();
    let totalbetsmade = await totalbetcreated();
    let activeevnets = await getActiveEvents();

    this.setState({
      payout: totalpay,
      activeusers: activeUser.length,
      activeevents: activeevnets,
      totalbetsmade: totalbetsmade,
      events: totalEvent,
    });
  };
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  filterCat = async (sub) => {
    let decodestoredevents = JSON.parse(window.localStorage.getItem("events"));
    const events = [];
    let check2;
    for (let i = decodestoredevents.length - 1; i >= 0; i--) {
      check2 = decodestoredevents[i];
   if (check2.subcategory == sub && Number(check2.Categories) == window.maincatNum) {
        console.log(check2);
        events.push(check2);
      }
    }
    this.setState({
      allevents: events,
      specificCats: events,
      filteractive: 0
    });
    this.setState({ activeSubCat: sub });
  };

  SearchCategory = async (data) => {
    let decodestoredevents = JSON.parse(window.localStorage.getItem("events"));
    const events = [];
    let check2;
    for (let i = 0; i < decodestoredevents.length; i++) {
      check2 = decodestoredevents[i];
      if (
        check2.teamone.includes(data.toString()) ||
        check2.teamtwo.includes(data.toString()) ||
        check2.descript.includes(data.toString())
      ) {
        events.push(check2);
      }
    }
    this.setState({
      allevents: events,
    });
  };

  Sorting = async (data) => {
   // JSON.parse(window.localStorage.getItem('events'))
   let decodestoredevents = this.state.specificCats
   const events = []
   let check1
   let check2  
   if(data == 1){
    console.log(data)
     this.setState({
       allevents: JSON.parse(window.localStorage.getItem('events')),
       activeSubCat:'ALL',
       filteractive:1
     })
   }

   else if(data == 2){
    console.log(data)
    for(let i = 0; i < decodestoredevents.length; i++){
      if(decodestoredevents[i].isboosted){
        events.push(decodestoredevents[i])
      }
    }
    this.setState({
      allevents: events,
      filteractive:2
    })
  }

   else if(data == 3){
    console.log(data)
     for(let i = 0; i < decodestoredevents.length; i++){
       if(decodestoredevents[i].poolsize >= 1000){
         events.push(decodestoredevents[i])
       }
     }
     this.setState({
       allevents: events,
       filteractive:3
     })
   }


   else if(data == 4){
    console.log(data)
     const time = new Date().getTime()/1000
     for(let i = 0; i < decodestoredevents.length; i++){
       if(time < decodestoredevents[i].starttime){
         events.push(decodestoredevents[i])
       }
     }
     this.setState({
       allevents: events,
       filteractive:4
     })
   }

   else if(data == 5){
    
    console.log(data)
    for(let i = 0; i < decodestoredevents.length; i++){
      if(Number(decodestoredevents[i].endtime)-Number(decodestoredevents[i].starttime) <= 2592000){
        events.push(decodestoredevents[i])
      }
    }
    this.setState({
      allevents: events,
      filteractive:5
    })
  }

   else if(data == 6){
    console.log(data)
     for(let i = 0; i < decodestoredevents.length; i++){
       if(decodestoredevents[i].starttime+2592000  >= decodestoredevents[i].endtime){
         events.push(decodestoredevents[i])
       }
     }
     this.setState({
       allevents: events,
       filteractive:6
     })
   }
   
  };

  cancelevent = async (id) => {
    await cancelevent(id);
  };


  // ******************* handling sliders for different filters*******************************//
  handelSideMenu = async (
    eventid,
    teamone,
    teamtwo,
    endtime,
    poolsize,
    bettercount,
    category,
    potentialwins,
    zero,
    one,
    two,
    boosted,
    start
  ) => {
    if (isNaN(potentialwins)) {
      potentialwins = 0;
    }

    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);

    var current = Math.round(new Date().getTime() / 1000);
    var seconds = endtime - current;
    var lefttime = Math.floor(seconds / 86400);
    if (lefttime < 0) {
      lefttime = 0;
    }

    if (this.state.active === false) {
      this.setState({
        onbetteam: teamone,
      });
    }
    if (this.state.active === true) {
      this.setState({
        onbetteam: teamtwo,
      });
    }
    this.setState({
      globalendtime: endtime,
      zero: zero,
      one: one,
      two: two,
      endtime: endtime,
      category: category,
      id: eventid,
      teamone: teamone,
      teamtwo: teamtwo,
      currenttime: lefttime,
      poolsize: Number(poolsize / 10 ** 18).toFixed(2),
      participant: bettercount,
      potential_wins: potentialwins,
      isboosted: boosted,
      startingtime:start
    });

    document.getElementById("sidebar").style.transform = "translateX(0%)";
    document.getElementById("sidebar").style.position = "relative";
    document.getElementById(eventid).style.display = "none";
  };

  handel_Side_Menu_Booted = async (
    eventid,
    teamone,
    teamtwo,
    endtime,
    poolsize,
    bettercount,
    category,
    potentialwins,
    zero,
    one,
    two,
    boosted,
    start
  ) => {
    if (isNaN(potentialwins)) {
      potentialwins = 0;
    }

    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);

    var current = Math.round(new Date().getTime() / 1000);
    var seconds = endtime - current;
    var lefttime = Math.floor(seconds / 86400);
    if (lefttime < 0) {
      lefttime = 0;
    }

    if (this.state.active === false) {
      this.setState({
        onbetteam: teamone,
      });
    }
    if (this.state.active === true) {
      this.setState({
        onbetteam: teamtwo,
      });
    }
    this.setState({
      globalendtime: endtime,
      zero: zero,
      one: one,
      two: two,
      endtime: endtime,
      category: category,
      id: eventid,
      teamone: teamone,
      teamtwo: teamtwo,
      currenttime: lefttime,
      poolsize: Number(poolsize / 10 ** 18).toFixed(2),
      participant: bettercount,
      potential_wins: potentialwins,
      isboosted: boosted,
      startingtime:start
    });

    document.getElementById("sidebarb").style.transform = "translateX(0%)";
    document.getElementById("sidebarb").style.position = "relative";
    document.getElementById(eventid).style.display = "none";
  };

  handel_Side_Menu_Trending = async (
    eventid,
    teamone,
    teamtwo,
    endtime,
    poolsize,
    bettercount,
    category,
    potentialwins,
    zero,
    one,
    two,
    boosted,
    start
  ) => {
    if (isNaN(potentialwins)) {
      potentialwins = 0;
    }

    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);

    var current = Math.round(new Date().getTime() / 1000);
    var seconds = endtime  - current;
    var lefttime = Math.floor(seconds / 86400);
    if (lefttime < 0) {
      lefttime = 0;
    }

    if (this.state.active === false) {
      this.setState({
        onbetteam: teamone,
      });
    }
    if (this.state.active === true) {
      this.setState({
        onbetteam: teamtwo,
      });
    }
    this.setState({
      globalendtime: endtime,
      zero: zero,
      one: one,
      two: two,
      endtime: endtime,
      category: category,
      id: eventid,
      teamone: teamone,
      teamtwo: teamtwo,
      currenttime: lefttime,
      poolsize: Number(poolsize / 10 ** 18).toFixed(2),
      participant: bettercount,
      potential_wins: potentialwins,
      isboosted: boosted,
      startingtime:start
    });

    document.getElementById("sidebart").style.transform = "translateX(0%)";
    document.getElementById("sidebart").style.position = "relative";
    document.getElementById(eventid).style.display = "none";
  };

  handel_Side_Menu_Latest = async (
    eventid,
    teamone,
    teamtwo,
    endtime,
    poolsize,
    bettercount,
    category,
    potentialwins,
    zero,
    one,
    two,
    boosted,
    start
  ) => {
    if (isNaN(potentialwins)) {
      potentialwins = 0;
    }

    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);

    var current = Math.round(new Date().getTime() / 1000);
    var seconds = endtime  - current;
    var lefttime = Math.floor(seconds / 86400);
    if (lefttime < 0) {
      lefttime = 0;
    }

    if (this.state.active === false) {
      this.setState({
        onbetteam: teamone,
      });
    }
    if (this.state.active === true) {
      this.setState({
        onbetteam: teamtwo,
      });
    }
    this.setState({
      globalendtime: endtime,
      zero: zero,
      one: one,
      two: two,
      endtime: endtime,
      category: category,
      id: eventid,
      teamone: teamone,
      teamtwo: teamtwo,
      currenttime: lefttime,
      poolsize: Number(poolsize / 10 ** 18).toFixed(2),
      participant: bettercount,
      potential_wins: potentialwins,
      isboosted: boosted,
      startingtime: start
    });

    document.getElementById("sidebarl").style.transform = "translateX(0%)";
    document.getElementById("sidebarl").style.position = "relative";
    document.getElementById(eventid).style.display = "none";
  };




  setfalse = () => {
    this.setState({
      occurance: 0,
      betvalue: this.state.stackvalueone,
    });
  };

  settrue = () => {
    this.setState({
      occurance: 1,
      betvalue: this.state.stackvaluetwo,
    });
  };

  setdraw = () => {
    this.setState({
      occurance: 2,
      betvalue: this.state.stackvaluethree,
    });
  };

  Onplacebet = async () => {
    try {
      const data = await placeBet(
        this.state.id,
        this.state.occurance,
        this.state.stackvalueone
      );
      if (data.status) {
        tost();
        updatingeventdata(this.state.id);
      }
    } catch (e) {
      console.log("bet Error", e);
    }
  };
  getdata = (v) => {};

  countbettors = async (id) => {
    let one = await bettorscounts(id, 0);
    let two = await bettorscounts(id, 1);
    let three = await bettorscounts(id, 2);
    let zeroamount = await getEventOccurrenceBetAmount(id, 0);
    let oneamount = await getEventOccurrenceBetAmount(id, 1);
    let twoamount = await getEventOccurrenceBetAmount(id, 2);
    this.setState({
      eventoneparticipant: one,
      eventtwoparticipant: two,
      eventthreeparticipant: three,
      zeroEventAmount: zeroamount,
      oneEventAmount: oneamount,
      twoEventAmount: twoamount,
    });
  };

  // getdays = (endime) => {
  //   var current = Math.round(new Date().getTime() / 1000);
  //   var seconds = endime - current;
  //   var day = Math.floor(seconds/ 86400);
  //   if (day > 0) {
  //     return day;
  //   } else {
  //     return 0;
  //   }
  // };

  getdays(time){
    var current = Math.round(new Date().getTime()/1000);
    var seconds =  time-current 
    if(seconds > 0){
      const days = Math.floor(seconds/86400)
      const hour = Math.floor(seconds / 3600) % 24;
      const min = Math.floor(seconds / 60) % 60;
      const sec = seconds % 60;
      return days
    }
    else{
      return "0"
    }
  }




  //*************************** Handing close slider for filder  ***************************//
  mouseclass = (event) => {
    let x = event.screenX;
    let y = event.screenY;
    if (x > 600 && !isMobile) {
      document.getElementById("sidebar").style.transform = "translateX(-200%)";
      document.getElementById("sidebar").style.position = "absolute";
      document.getElementById(this.state.id).style.display = "inline-block";
    }
  };

  inSilderClone =()=>{
    document.getElementById("sidebar").style.transform = "translateX(-200%)";
    document.getElementById("sidebar").style.position = "absolute";
    document.getElementById(this.state.id).style.display = "inline-block";
  }

  mouseclass_Boosted = (event) => {
    let x = event.screenX;
    let y = event.screenY;
    if (x > 600 && !isMobile) {
      document.getElementById("sidebarb").style.transform = "translateX(-200%)";
      document.getElementById("sidebarb").style.position = "absolute";
      document.getElementById(this.state.id).style.display = "inline-block";
    }
  };

  inSilderClone_Boosted =()=>{
    document.getElementById("sidebarb").style.transform = "translateX(-200%)";
    document.getElementById("sidebarb").style.position = "absolute";
    document.getElementById(this.state.id).style.display = "inline-block";
  }

  mouseclass_Latest = (event) => {
    let x = event.screenX;
    let y = event.screenY;
    if (x > 600 && !isMobile) {
      document.getElementById("sidebarl").style.transform = "translateX(-200%)";
      document.getElementById("sidebarl").style.position = "absolute";
      document.getElementById(this.state.id).style.display = "inline-block";
    }
  };

  inSilderClone_Latest =()=>{
    document.getElementById("sidebarl").style.transform = "translateX(-200%)";
    document.getElementById("sidebarl").style.position = "absolute";
    document.getElementById(this.state.id).style.display = "inline-block";
  }

  mouseclass_Trending = (event) => {
    let x = event.screenX;
    let y = event.screenY;
    if (x > 600 && !isMobile) {
      document.getElementById("sidebart").style.transform = "translateX(-200%)";
      document.getElementById("sidebart").style.position = "absolute";
      document.getElementById(this.state.id).style.display = "inline-block";
    }
  };

  inSilderClone_Trending =()=>{
    document.getElementById("sidebart").style.transform = "translateX(-200%)";
    document.getElementById("sidebart").style.position = "absolute";
    document.getElementById(this.state.id).style.display = "inline-block";
  }

  

  winningamount = (amountstake, poolsize) => {
    let totalstake = poolsize + amountstake;
    let winningspercents = (amountstake / totalstake) * 100;
    let potentialwinnings =
      ((totalstake - amountstake) / 100) * winningspercents;
    if (isNaN(potentialwinnings)) {
      potentialwinnings = 0;
    }
    return Number(potentialwinnings + amountstake).toFixed(2);
  };

  getGameCard = () => {
    let items = [];
    for (var i = 1; i <= 10; i++) {
      items.push(
        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-4">
          <Soccer />
        </div>
      );
    }
    return items;
  };

  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab,
    });
    if (tab) {
      window.match = tab;
    } else {
      window.match = tab;
    }
  };

  catorgy = (Cat) => {
    this.setState({
      catogries: Cat,
    });
  };

  selectedcategory = (cat) => {
    if (!this.state.selectedcat) {
      this.setState({ selectedcat: true });
    } else {
      this.setState({ selectedcat: false });
    }
  };
  filtershow = (tab) =>{

  }

  getdaysOnCard(time){
    return new Date(time * 1000).toDateString();
  }

  render() {
    return (
      <Fragment>
        <AppHeader />
        {/* <div className="modal-container">
      <Modal backdrop={this.state.backdrop} keyboard={false} open={this.state.open} onClose={this.handleClose}>
        <Modal.Body>
          


        </Modal.Body>
      </Modal>
    </div> */}
        <br />
        <div>
          <div
            className="container-fluid mt-5 bg-black appTopInfo"
            id="section-statistics"
            style={{ paddingTop: "41px", paddingBottom: "41px" }}
          >
            <div className="col-lg-12 appStat">
              <Carousel
                swipeable={true}
                draggable={true}
                arrows={false}
                showDots={false}
                responsive={this.state.responsive_center}
                infinite={true}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="px-2"
              >
                <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                  <h6 className="m-0">Total Payout</h6>
                  <h6 className="mt-4 fw-lighter">
                    {this.state.payout / 10 ** 18} BUSD
                  </h6>
                </div>

                <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                  <h6 className="m-0">Total Events</h6>
                  <h6 className="mt-4 fw-lighter">{this.state.events}</h6>
                </div>

                <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                  <h6 className="m-0">Active users</h6>
                  <h6 className="mt-4 fw-lighter">{this.state.activeusers}</h6>
                </div>

                <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                  <h6 className="m-0">Total bet Created</h6>
                  <h6 className="mt-4 fw-lighter">
                    {this.state.totalbetsmade}
                  </h6>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
        <Appheadercat />
        <div className="container-fluid px-md-5">
          <div className="space-20"></div>
          <div className="d-flex flex-wrap">
            <div className="me-md-4 me-2">
              <button
                className={`d-flex justify-content-around btn admin-match-button  ${
                  this.state.activeTabBottom == 1 ? " active" : ""
                }`}
                onClick={() => this.handelMatchTab(1)}
              >
                <p
                  className={`${
                    this.state.activeTabBottom != 1 ? "text-secondary " : ""
                  }`}
                >
                  Matched Events
                </p>{" "}
                <img className="mt-2" src={Match} width={20} />
              </button>
            </div>
            <div className="">
              <button
                className={`d-flex justify-content-around btn admin-match-button ${
                  this.state.activeTabBottom == 2 ? " active" : ""
                }`}
                onClick={() => this.handelMatchTab(2)}
              >
                <p
                  className={`${
                    this.state.activeTabBottom != 2 ? "text-secondary " : ""
                  }`}
                >
                  Un-Matched Events
                </p>
                <img className="mt-1 ml-2" src={UNMatch} width={25} />
              </button>
            </div>
          </div>
        </div>
        <div
          className="sub-catogries mt-0 p-1 p-md-5 text-white flex-column flex-md-row"
          id="navbarsExample05"
        >
          <div style={{ overflow: "visible" }} className="my-4 eventDrpDwn">
            <p className="text-white" style={{ fontSize: "12px" }}>
              SELECT SUB CATEGORY
            </p>
            <div className="main-dropdown" disabled>
              <div class="dropdown subcategory">
                <button
                  class="btn btn-secondary dropdown-toggle border-0"
                  style={{ backgroundColor: "#4D4A4A", borderRadius: "10px" }}
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {window.maincatogries && window.maincatogries.length > 0
                    ? `${this.state.activeSubCat}`
                    : "No Categories Found"}
                </button>
                <ul
                  class="dropdown-menu w-100"
                  aria-labelledby="dropdownMenu2"
                  style={{ backgroundColor: "#4D4A4A" }}
                >
                  {this.state.subcategorys &&
                    this.state.subcategorys.map((data) => {
                      return (
                        <li>
                          <button
                            class="dropdown-item text-white"
                            type="button"
                            onClick={() => this.filterCat(data)}
                          >
                            {data}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>
          <div className="sub-tools">
            <div className="search-bar">
              <input
                value={this.state.searchItem}
                onChange={(e) => this.setState({ searchItem: e.target.value })}
              />
              &nbsp;
              <img
                src={Search}
                width={22}
                height={22}
                style={{ marginTop: "5px" }}
                onClick={() => this.SearchCategory(this.state.searchItem)}
              />
            </div>
            <div>
              <span
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                type="button"
                aria-expanded="false"
                onClick={()=> this.setState({ filtershow : !this.state.filtershow})}
              >
                <img className="mt-2" src={Filter} width={25} height={25} />
              </span>
            </div>
          </div>
        </div>
        <div
        // SET DISPLAY CONDITION HERE
          className="eventFilters container-fluid py-5" id='filterdata'
          style={{ backgroundColor: "#0F0F0F", borderTop: "1px solid #1C1C1C", display:`${this.state.filtershow ? '' : 'none'}`}}
        >
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 1 ? "red" : ""}`}  onClick={() => {this.Sorting(1);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">All Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              View all events from every category.
            </p>
          </div>
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 2 ? "red" : ""}`}  onClick={() => {this.Sorting(2);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">Boosted Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              These are events that are Promoted.
            </p>
          </div>
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 3 ? "red" : ""}`}  onClick={() => {this.Sorting(3);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">Trending Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              View events with pool size over or equal to $1,000.
            </p>
          </div>
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 4 ? "red" : ""}`}  onClick={() => {this.Sorting(4);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">Latest Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              View recently created events.
            </p>
          </div>
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 5 ? "red" : ""}`}  onClick={() => {this.Sorting(5);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">Short term Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              View events with duration less or equal to 1 month.
            </p>
          </div>
          <div className="px-sm-5 px-0 mb-4">
            <FaSquareFull className="mb-1" color={`${this.state.filteractive == 6 ? "red" : ""}`}  onClick={() => {this.Sorting(6);this.setState({ filtershow : !this.state.filtershow})}}/>
            &nbsp;&nbsp;
            <span className="text-light fw-bold">Long term Bets</span>
            <p style={{ color: "#AAAAAA", marginLeft: "25px" }}>
              View events with duration over or equal to 1 month.
            </p>
          </div>
        </div>

        <div>
          <Toaster />
        </div>
        <div className="row gx-0">
          <div className="col-12">

  {/* **********************Events Mapping start from here************************* */}

      { this.state.filteractive == 1 ? 
        <div
          className="theam-bg-dark p-1 p-md-5"
            style={{ backgroundColor: "#1C1C1C" }}
              >
                <div className="betting-cards" onClick={this.mouseclass}>
                  {/* Slider */}
                  <div className="sidebarNew shadow-lg gx-3" id="sidebar">
                    <div className="container-fluid category-title py-4">
                      <div className="d-flex justify-content-between">
                        <div id="img-head">
                          <h4 className="fs-5">
                            {" "}
                            {Math.round(new Date().getTime() / 1000) >
                            this.state.globalendtime ? (
                              <img
                                src={redDot}
                                className="red-dot"
                                width="12"
                              />
                            ) : (
                              <img src={greenDot} className="me-2" width="12" />
                            )}{" "}
                            {this.state.category}
                          </h4>
                          <span>
                            {this.state.teamone}{" "}
                            <span className="text-danger">vs</span>{" "}
                            {this.state.teamtwo}
                          </span>
                        </div>
                        <div id="date"><p>{this.getdaysOnCard(this.state.startingtime)}</p></div>
                      </div>
                      <div className="d-flex mt-5 justify-content-between">
                        <div id="poolSize">
                          <p>Pool Size</p>
                          <span>${this.state.poolsize}</span>
                        </div>
                        <div id="timeLeft">
                          <TiStopwatch /> {this.state.currenttime} Days Left
                        </div>
                      </div>
                    </div>
                    <div className="category-body pb-4">
                      <div className="row p-3">
                        <div className="col-8">
                          <ul>
                            <li>
                              {Number(this.state.zero).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamone}
                            </li>
                            <li>
                              {Number(this.state.one).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamtwo}
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 button-row gap-2">
                          <div>
                            <ImFire
                              fill={
                                this.state.isboosted ? "#FF9A02" : "#8c8c8c"
                              }
                            />
                          </div>
                          <div
                            className="text-white mb-1"
                            style={{ fontSize: "10px",cursor:'pointer'}}
                            onClick={()=>this.inSilderClone()}
                          >
                            Close &nbsp;
                            <FaMinus size={14} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row p-3">
                        <p style={{ fontSize: "12px", marginBottom: "0" }}>
                          Available Balance
                        </p>
                        <span>{this.state.BUSDbal}</span>
                      </div>
                      <hr />
                      <div className="container selectBet">
                        <p>SELECT PREFERRED ODD</p>
                        <br />
                        <div
                          id={`betA`}
                          className={`${
                            this.state.occurance == 0 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 0 });
                            this.setfalse();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamone}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventoneparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.zeroEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                        <br />
                        <div
                          id="betA"
                          className={` ${
                            this.state.occurance == 1 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 1 });
                            this.settrue();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamtwo}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventtwoparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.oneEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            className="text-danger"
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="returnBet container d-flex justify-content-between mt-3">
                        <div id="return">
                          <p>Potential Return</p>
                          <span className="text-light">
                            {this.state.stackvalueone == 0
                              ? this.state.potential_wins
                              : this.winningamount(
                                  Number(this.state.stackvalueone),
                                  Number(this.state.poolsize)
                                )}
                            &nbsp;BUSD
                          </span>
                        </div>
                        <div id="amount">
                          <p className="text-end mb-2">ENTER AMOUNT TO BET</p>
                          <div className="border rounded p-2 text-light">
                            <input
                              className="text-light"
                              type="text"
                              value={this.state.stackvalueone}
                              onChange={(e) =>
                                this.setState({ stackvalueone: e.target.value })
                              }
                            />
                            <span
                              onClick={() =>
                                this.setState({
                                  stackvalueone: this.state.BUSDbal,
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              MAX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sideBtnContainer">
                        <button
                          className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex"
                          onClick={() => this.Onplacebet()}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            width: "80%",
                          }}
                        >
                          <span>PLACE BET</span>
                          <MdOutlineArrowForwardIos className="mt-1" />
                        </button>
                        {/* <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex shadow" style={{backgroundColor:"#3b3b3b", color:"#fff", width:"80%",}}><span>VIEW STREAM</span><TiSocialYoutube className='mt-1'/></button> */}
                      </div>
                    </div>
                  </div>

                  {/* *******************Slider*************** */}

                  {this.state.match == 1 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) > 0 && Number(events.teamOneParticipate) > 0 ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handelSideMenu(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : this.state.match == 2 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) == 0 ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handelSideMenu(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                      {events.subcategory}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
      :  
      
    
// //////////////////////from here booted, latest and trending event filter start//////////////////////////////// 
          <div className="match-main-div">
              <div
                className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                <p className="fw-bold ms-3 text-light">
                  BOOSTED EVENTS &nbsp;&nbsp;
                  <ImFire size={22} color="orange" />
                </p>
                <div className="betting-cards" onClick={this.mouseclass_Boosted}>
                  {/* Slider */}
                  <div className="sidebarNew shadow-lg gx-3" id="sidebarb">
                    <div className="container-fluid category-title py-4">
                      <div className="d-flex justify-content-between">
                        <div id="img-head">
                          <h4 className="fs-5">
                            {" "}
                            {Math.round(new Date().getTime() / 1000) >
                            this.state.globalendtime ? (
                              <img
                                src={redDot}
                                className="red-dot"
                                width="12"
                              />
                            ) : (
                              <img src={greenDot} className="me-2" width="12" />
                            )}{" "}
                            {this.state.category}
                          </h4>
                          <span>
                            {this.state.teamone}{" "}
                            <span className="text-danger">vs</span>{" "}
                            {this.state.teamtwo}
                          </span>
                        </div>
                        <div id="date"><p>{this.getdaysOnCard(this.state.startingtime)}</p></div>
                      </div>
                      <div className="d-flex mt-5 justify-content-between">
                        <div id="poolSize">
                          <p>Pool Size</p>
                          <span>${this.state.poolsize}</span>
                        </div>
                        <div id="timeLeft">
                          <TiStopwatch /> {this.state.currenttime} Days Left
                        </div>
                      </div>
                    </div>
                    <div className="category-body pb-4">
                      <div className="row p-3">
                        <div className="col-8">
                          <ul>
                            <li>
                              {Number(this.state.zero).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamone}
                            </li>
                            <li>
                              {Number(this.state.one).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamtwo}
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 button-row gap-2">
                          <div>
                            <ImFire
                              fill={
                                this.state.isboosted ? "#FF9A02" : "#8c8c8c"
                              }
                            />
                          </div>
                          <div
                            className="text-white mb-1"
                            style={{ fontSize: "10px",cursor:'pointer'}}
                            onClick={()=>this.inSilderClone_Boosted()}
                          >
                            Close &nbsp;
                            <FaMinus size={14} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row p-3">
                        <p style={{ fontSize: "12px", marginBottom: "0" }}>
                          Available Balance
                        </p>
                        <span>{this.state.BUSDbal}</span>
                      </div>
                      <hr />
                      <div className="container selectBet">
                        <p>SELECT PREFERRED ODD</p>
                        <br />
                        <div
                          id={`betA`}
                          className={`${
                            this.state.occurance == 0 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 0 });
                            this.setfalse();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamone}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventoneparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.zeroEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                        <br />
                        <div
                          id="betA"
                          className={` ${
                            this.state.occurance == 1 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 1 });
                            this.settrue();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamtwo}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventtwoparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.oneEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            className="text-danger"
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="returnBet container d-flex justify-content-between mt-3">
                        <div id="return">
                          <p>Potential Return</p>
                          <span className="text-light">
                            {this.state.stackvalueone == 0
                              ? this.state.potential_wins
                              : this.winningamount(
                                  Number(this.state.stackvalueone),
                                  Number(this.state.poolsize)
                                )}
                            &nbsp;BUSD
                          </span>
                        </div>
                        <div id="amount">
                          <p className="text-end mb-2">ENTER AMOUNT TO BET</p>
                          <div className="border rounded p-2 text-light">
                            <input
                              className="text-light"
                              type="text"
                              value={this.state.stackvalueone}
                              onChange={(e) =>
                                this.setState({ stackvalueone: e.target.value })
                              }
                            />
                            <span
                              onClick={() =>
                                this.setState({
                                  stackvalueone: this.state.BUSDbal,
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              MAX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sideBtnContainer">
                        <button
                          className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex"
                          onClick={() => this.Onplacebet()}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            width: "80%",
                          }}
                        >
                          <span>PLACE BET</span>
                          <MdOutlineArrowForwardIos className="mt-1" />
                        </button>
                        {/* <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex shadow" style={{backgroundColor:"#3b3b3b", color:"#fff", width:"80%",}}><span>VIEW STREAM</span><TiSocialYoutube className='mt-1'/></button> */}
                      </div>
                    </div>
                  </div>

                  {/* *******************Slider*************** */}

                  {this.state.match == 1 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) > 0 && Number(events.teamOneParticipate) > 0 && events.isboosted ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Booted(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                      {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : this.state.match == 2 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {(Number(events.teamtwoParticipate) == 0 || Number(events.teamOneParticipate) == 0) && events.isboosted ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Booted(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>


              <div
                className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                <p className="fw-bold ms-3 text-light">
                  TRENDING EVENTS &nbsp;&nbsp;
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.75098 11.2502L0.000977755 20.0002L7.50098 3.75024L11.251 8.75024L20.001 0.000244141L12.501 16.2502L8.75098 11.2502Z"
                      fill="#07D2FF"
                    />
                  </svg>
                </p>
                <div className="betting-cards" onClick={this.mouseclass_Trending}>
                  {/* Slider */}
                  <div className="sidebarNew shadow-lg gx-3" id="sidebart">
                    <div className="container-fluid category-title py-4">
                      <div className="d-flex justify-content-between">
                        <div id="img-head">
                          <h4 className="fs-5">
                            {" "}
                            {Math.round(new Date().getTime() / 1000) >
                            this.state.globalendtime ? (
                              <img
                                src={redDot}
                                className="red-dot"
                                width="12"
                              />
                            ) : (
                              <img src={greenDot} className="me-2" width="12" />
                            )}{" "}
                            {this.state.category}
                          </h4>
                          <span>
                            {this.state.teamone}{" "}
                            <span className="text-danger">vs</span>{" "}
                            {this.state.teamtwo}
                          </span>
                        </div>
                        <div id="date"><p>{this.getdaysOnCard(this.state.startingtime)}</p></div>
                      </div>
                      <div className="d-flex mt-5 justify-content-between">
                        <div id="poolSize">
                          <p>Pool Size</p>
                          <span>${this.state.poolsize}</span>
                        </div>
                        <div id="timeLeft">
                          <TiStopwatch /> {this.state.currenttime} Days Left
                        </div>
                      </div>
                    </div>
                    <div className="category-body pb-4">
                      <div className="row p-3">
                        <div className="col-8">
                          <ul>
                            <li>
                              {Number(this.state.zero).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamone}
                            </li>
                            <li>
                              {Number(this.state.one).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamtwo}
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 button-row gap-2">
                          <div>
                            <ImFire
                              fill={
                                this.state.isboosted ? "#FF9A02" : "#8c8c8c"
                              }
                            />
                          </div>
                          <div
                            className="text-white mb-1"
                            style={{ fontSize: "10px",cursor:'pointer' }}
                            onClick={()=>this.inSilderClone_Trending()}
                          >
                            Close &nbsp;
                            <FaMinus size={14} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row p-3">
                        <p style={{ fontSize: "12px", marginBottom: "0" }}>
                          Available Balance
                        </p>
                        <span>{this.state.BUSDbal}</span>
                      </div>
                      <hr />
                      <div className="container selectBet">
                        <p>SELECT PREFERRED ODD</p>
                        <br />
                        <div
                          id={`betA`}
                          className={`${
                            this.state.occurance == 0 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 0 });
                            this.setfalse();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamone}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventoneparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.zeroEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                        <br />
                        <div
                          id="betA"
                          className={` ${
                            this.state.occurance == 1 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 1 });
                            this.settrue();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamtwo}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventtwoparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.oneEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            className="text-danger"
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="returnBet container d-flex justify-content-between mt-3">
                        <div id="return">
                          <p>Potential Return</p>
                          <span className="text-light">
                            {this.state.stackvalueone == 0
                              ? this.state.potential_wins
                              : this.winningamount(
                                  Number(this.state.stackvalueone),
                                  Number(this.state.poolsize)
                                )}
                            &nbsp;BUSD
                          </span>
                        </div>
                        <div id="amount">
                          <p className="text-end mb-2">ENTER AMOUNT TO BET</p>
                          <div className="border rounded p-2 text-light">
                            <input
                              className="text-light"
                              type="text"
                              value={this.state.stackvalueone}
                              onChange={(e) =>
                                this.setState({ stackvalueone: e.target.value })
                              }
                            />
                            <span
                              onClick={() =>
                                this.setState({
                                  stackvalueone: this.state.BUSDbal,
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              MAX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sideBtnContainer">
                        <button
                          className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex"
                          onClick={() => this.Onplacebet()}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            width: "80%",
                          }}
                        >
                          <span>PLACE BET</span>
                          <MdOutlineArrowForwardIos className="mt-1" />
                        </button>
                        {/* <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex shadow" style={{backgroundColor:"#3b3b3b", color:"#fff", width:"80%",}}><span>VIEW STREAM</span><TiSocialYoutube className='mt-1'/></button> */}
                      </div>
                    </div>
                  </div>

                  {/* *******************Slider*************** */}

                  {this.state.match == 1 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) > 0 && Number(events.teamOneParticipate) > 0 && Number(events.poolsize)/10**18 >= 1000 ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Trending(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : this.state.match == 2 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) == 0 
                          && Number(events.poolsize)/10**18  >= 1000 ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Trending(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div
                className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5"
                style={{ backgroundColor: "#1C1C1C" }}
              >
                <p className="fw-bold ms-3 text-light">
                  LATEST EVENTS &nbsp;&nbsp;
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 21 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.4434 10.6503C20.4434 10.4208 20.3305 10.219 20.1588 10.0924L20.1625 10.0862L17.7443 8.69012L19.1362 6.27917L19.1316 6.27632C19.1755 6.17696 19.1954 6.06863 19.1897 5.96012C19.184 5.85162 19.1528 5.74599 19.0986 5.6518C19.044 5.5577 18.968 5.4778 18.8768 5.41858C18.7855 5.35937 18.6816 5.32251 18.5734 5.31101V5.30427H15.7807V2.51959H15.775C15.7634 2.41156 15.7265 2.30778 15.6673 2.21667C15.6081 2.12556 15.5282 2.04968 15.4342 1.99518C15.3399 1.94084 15.234 1.90958 15.1253 1.90394C15.0166 1.89831 14.9081 1.91846 14.8087 1.96276L14.8053 1.9568L12.3464 3.37649L10.9848 1.01794L10.9798 1.02079C10.9157 0.933061 10.8319 0.861658 10.735 0.812365C10.6382 0.763072 10.5311 0.737274 10.4225 0.737061C10.193 0.737061 9.99092 0.849879 9.86461 1.02157L9.85839 1.01794L8.47422 3.4154L6.09077 2.03927L6.08792 2.0442C5.98855 2.00023 5.88023 1.9803 5.77172 1.98602C5.66321 1.99175 5.55758 2.02296 5.46339 2.07714C5.36923 2.13167 5.28927 2.20765 5.23001 2.29891C5.17074 2.39017 5.13386 2.49413 5.12235 2.60233H5.11534V5.37066H2.36309V5.37611C2.25505 5.38773 2.15128 5.42464 2.06017 5.48385C1.96906 5.54305 1.89318 5.62289 1.83868 5.7169C1.78448 5.81118 1.75328 5.91691 1.7476 6.02551C1.74192 6.13411 1.76193 6.24252 1.806 6.34194L1.80003 6.34557L3.1606 8.70231L0.724239 10.109L0.727091 10.114C0.63936 10.1781 0.567957 10.2619 0.518664 10.3588C0.469371 10.4556 0.443573 10.5627 0.443359 10.6713C0.443359 10.9008 0.556178 11.1029 0.72787 11.2292L0.724239 11.2354L3.14245 12.6315L1.7505 15.0424L1.75517 15.045C1.7112 15.1444 1.69127 15.2527 1.69699 15.3612C1.70272 15.4697 1.73393 15.5754 1.7881 15.6696C1.84268 15.7637 1.91868 15.8436 2.00994 15.9028C2.10119 15.962 2.20512 15.9988 2.31329 16.0104V16.0174H5.10575V18.8018H5.11145C5.13531 19.0134 5.25384 19.2115 5.45224 19.3262C5.54659 19.3805 5.65243 19.4117 5.76114 19.4173C5.86984 19.423 5.97834 19.4028 6.0778 19.3586L6.08117 19.3646L8.5401 17.9449L9.9017 20.3034L9.90663 20.3006C9.97073 20.3883 10.0546 20.4597 10.1514 20.509C10.2482 20.5583 10.3553 20.5841 10.464 20.5843C10.6935 20.5843 10.8955 20.4715 11.0218 20.3001L11.0278 20.3034L12.412 17.906L14.7957 19.2821L14.7985 19.2772C14.8979 19.3211 15.0062 19.3411 15.1147 19.3353C15.2232 19.3296 15.3289 19.2984 15.4231 19.2442C15.5172 19.1897 15.5972 19.1137 15.6565 19.0225C15.7157 18.9312 15.7526 18.8272 15.7641 18.719H15.7711V15.951H18.5236V15.9455C18.6317 15.9339 18.7354 15.897 18.8266 15.8378C18.9177 15.7786 18.9935 15.6987 19.048 15.6047C19.1022 15.5104 19.1334 15.4046 19.1391 15.296C19.1448 15.1873 19.1248 15.0789 19.0807 14.9794L19.0867 14.9761L17.7261 12.6193L20.1625 11.2126L20.1596 11.2077C20.2474 11.1436 20.3188 11.0597 20.3681 10.9629C20.4174 10.8661 20.4432 10.759 20.4434 10.6503ZM8.8132 13.6056L6.25961 12.4774L7.3865 14.4291L6.74953 14.7968L5.02172 11.8047L5.67658 11.4263L8.14822 12.5057L7.06282 10.6259L7.70005 10.2582L9.42734 13.2503L8.8132 13.6056ZM10.0197 12.909L8.29216 9.9166L10.4098 8.69427L10.7334 9.25499L9.2528 10.1096L9.61537 10.7377L11.0644 9.9013L11.3881 10.4615L9.93905 11.2984L10.3327 11.9803L11.8134 11.1257L12.1371 11.6864L10.0197 12.909ZM14.923 10.0782L13.2118 8.32651L13.8776 10.6814L13.2004 11.0725L10.616 8.57522L11.3292 8.16337L13.1026 10.0224L12.4239 7.53133L12.9219 7.24397L14.7355 9.07993L14.0119 6.61452L14.7251 6.20266L15.6005 9.68733L14.923 10.0782Z"
                      fill="#FFD706"
                    />
                  </svg>
                </p>
                <div className="betting-cards" onClick={this.mouseclass_Latest}>
                  {/* Slider */}
                  <div className="sidebarNew shadow-lg gx-3" id="sidebarl">
                    <div className="container-fluid category-title py-4">
                      <div className="d-flex justify-content-between">
                        <div id="img-head">
                          <h4 className="fs-5">
                            {" "}
                            {Math.round(new Date().getTime() / 1000) >
                            this.state.globalendtime ? (
                              <img
                                src={redDot}
                                className="red-dot"
                                width="12"
                              />
                            ) : (
                              <img src={greenDot} className="me-2" width="12" />
                            )}{" "}
                            {this.state.category}
                          </h4>
                          <span>
                            {this.state.teamone}{" "}
                            <span className="text-danger">vs</span>{" "}
                            {this.state.teamtwo}
                          </span>
                        </div>
                        <div id="date"><p>{this.getdaysOnCard(this.state.startingtime)}</p></div>
                      </div>
                      <div className="d-flex mt-5 justify-content-between">
                        <div id="poolSize">
                          <p>Pool Size</p>
                          <span>${this.state.poolsize}</span>
                        </div>
                        <div id="timeLeft">
                          <TiStopwatch /> {this.state.currenttime} Days Left
                        </div>
                      </div>
                    </div>
                    <div className="category-body pb-4">
                      <div className="row p-3">
                        <div className="col-8">
                          <ul>
                            <li>
                              {Number(this.state.zero).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamone}
                            </li>
                            <li>
                              {Number(this.state.one).toFixed(2)}% &nbsp;&nbsp;
                              {this.state.teamtwo}
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 button-row gap-2">
                          <div>
                            <ImFire
                              fill={
                                this.state.isboosted ? "#FF9A02" : "#8c8c8c"
                              }
                            />
                          </div>
                          <div
                            className="text-white mb-1"
                            style={{ fontSize: "10px",cursor:'pointer' }}
                            onClick={()=>this.inSilderClone_Latest()}
                          >
                            Close &nbsp;
                            <FaMinus size={14} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="row p-3">
                        <p style={{ fontSize: "12px", marginBottom: "0" }}>
                          Available Balance
                        </p>
                        <span>{this.state.BUSDbal}</span>
                      </div>
                      <hr />
                      <div className="container selectBet">
                        <p>SELECT PREFERRED ODD</p>
                        <br />
                        <div
                          id={`betA`}
                          className={`${
                            this.state.occurance == 0 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 0 });
                            this.setfalse();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamone}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventoneparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.zeroEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                        <br />
                        <div
                          id="betA"
                          className={` ${
                            this.state.occurance == 1 ? "active" : " "
                          }`}
                          onClick={() => {
                            this.setState({ occurance: 1 });
                            this.settrue();
                          }}
                        >
                          <p className="fs-6 mb-2">{this.state.teamtwo}</p>
                          <p>
                            Participants:{" "}
                            <span>{this.state.eventtwoparticipant}</span>
                          </p>
                          <p>
                            Total amount betted:{" "}
                            <span>
                              {(
                                Number(this.state.oneEventAmount) /
                                10 ** 18
                              ).toFixed(2)}
                              &nbsp;BUSD
                            </span>
                          </p>
                          <GoPrimitiveDot
                            className="text-danger"
                            style={{
                              position: "absolute",
                              top: "15px",
                              right: "15px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="returnBet container d-flex justify-content-between mt-3">
                        <div id="return">
                          <p>Potential Return</p>
                          <span className="text-light">
                            {this.state.stackvalueone == 0
                              ? this.state.potential_wins
                              : this.winningamount(
                                  Number(this.state.stackvalueone),
                                  Number(this.state.poolsize)
                                )}
                            &nbsp;BUSD
                          </span>
                        </div>
                        <div id="amount">
                          <p className="text-end mb-2">ENTER AMOUNT TO BET</p>
                          <div className="border rounded p-2 text-light">
                            <input
                              className="text-light"
                              type="text"
                              value={this.state.stackvalueone}
                              onChange={(e) =>
                                this.setState({ stackvalueone: e.target.value })
                              }
                            />
                            <span
                              onClick={() =>
                                this.setState({
                                  stackvalueone: this.state.BUSDbal,
                                })
                              }
                              style={{ cursor: "pointer" }}
                            >
                              MAX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="sideBtnContainer">
                        <button
                          className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex"
                          onClick={() => this.Onplacebet()}
                          style={{
                            backgroundColor: "#fff",
                            color: "#000",
                            width: "80%",
                          }}
                        >
                          <span>PLACE BET</span>
                          <MdOutlineArrowForwardIos className="mt-1" />
                        </button>
                        {/* <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex shadow" style={{backgroundColor:"#3b3b3b", color:"#fff", width:"80%",}}><span>VIEW STREAM</span><TiSocialYoutube className='mt-1'/></button> */}
                      </div>
                    </div>
                  </div>

                  {/* *******************Slider*************** */}

                  {this.state.match == 1 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) > 0 &&Number(events.teamOneParticipate) > 0 && new Date().getTime()/1000 < events.starttime ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Latest(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : this.state.match == 2 ? (
                    <div className="game-cards row">
                      {this.state.allevents.map((events) => (
                        <>
                          {Number(events.teamtwoParticipate) == 0 && new Date().getTime()/1000 < events.starttime ? (
                            <div className="col" id={`${events.id}`}>
                              <div
                                className="card game-card overflow-hidden"
                                onClick={() =>
                                  this.handel_Side_Menu_Latest(
                                    events.id,
                                    events.teamone,
                                    events.teamtwo,
                                    events.endtime,
                                    events.poolsize,
                                    events.BettorsCount,
                                    events.subcategory,
                                    events.potential_wins,
                                    events.zero,
                                    events.one,
                                    events.two,
                                    events.isboosted,
                                    events.starttime
                                  )
                                }
                              >
                                <div
                                  className="row p-3 image-card"
                                  style={{
                                    backgroundImage: `url(${cardBackground})`,
                                  }}
                                >
                                  <div class="layer"></div>
                                  <div className="col-12 text-white">
                                    {Math.round(new Date().getTime() / 1000) >
                                    events.endtime ? (
                                      <img
                                        src={redDot}
                                        className="red-dot"
                                        width="12"
                                      />
                                    ) : (
                                      <img
                                        src={greenDot}
                                        className="me-2"
                                        width="12"
                                      />
                                    )}
                                  </div>
                                  <div className="col-12 mt-4">
                                    <h4 className="team-name">
                                      {events.teamone}{" "}
                                      <span className="theam-text-color">
                                        vs
                                      </span>{" "}
                                      {events.teamtwo}
                                    </h4>
                                  </div>
                                  <div className="col-12 mt-4">
                                    <p className="theam-text-color m-0">
                                    {events.Categories == 0 ? "SPORT" : events.Categories == 1 ? "E-SPORT" : "OTHER"}
                                    </p>
                                    <p className="theam-text-color m-0">
                                      Pool size
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <h3>
                                      {Number(
                                        events.poolsize / 10 ** 18
                                      ).toFixed(2)}{" "}
                                      BUSD
                                    </h3>
                                  </div>
                                  <div className="col-6">
                                    <h5 className="text-end">
                                      <img
                                        src={carbon_timer}
                                        className="me-2"
                                        width="18"
                                        style={{ verticalAlign: "sub" }}
                                      />
                                      {this.getdays(events.endtime)} Days left
                                    </h5>
                                  </div>
                                </div>
                                <div className="row p-3">
                                  <div className="col-8">
                                    <ul>
                                      <li>
                                        {Number(events.zero).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamone}
                                      </li>
                                      <li>
                                        {Number(events.one).toFixed(2)}%
                                        &nbsp;&nbsp;{events.teamtwo}
                                      </li>
                                      {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                                    </ul>
                                  </div>
                                  <div className="col-4 button-row gap-2">
                                    <div>
                                      <ImFire
                                        fill={
                                          this.state.isboosted
                                            ? "#FF9A02"
                                            : "#8c8c8c"
                                        }
                                      />
                                    </div>
                                    <div
                                      className="text-white mb-1"
                                      style={{ fontSize: "10px" }}
                                    >
                                      OPEN
                                    </div>
                                    <div>
                                      <img
                                        src={PLUS}
                                        style={{ width: "10px" }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>}

          </div>
          <Footer/>
          <div style={{ textAlign: "center" }}>
            <h3>V 2.0</h3>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default GameCard;
