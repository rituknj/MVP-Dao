import React, { Component, Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Client from "../../../Client";
import Header from "../../components/Elements/Header";
import Footer from "../../components/Elements/Footer";
import NewsCard from "../../components/Cards/NewsCard";
import PartnerCom from "../../components/Cards/Partner";
import Videocom from "../../components/Cards/Videos";
import ExternalBlog from "../../components/Cards/ExternalBlog";
import Amessador from "../../components/Cards/Amessador";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  initInstance,
  loginProcess,
  ChainID,
  getAccount,
} from "./../../../web3/web3";
import NFTs from "./../../../images/nfts.png";
import { FaTwitter } from "react-icons/fa";
import { AiFillLinkedin, AiOutlineRight } from "react-icons/ai";
import { Watch } from "react-loader-spinner";
import dateFormat, { masks } from "dateformat";

import { totalEvents } from "../../../web3/betsMVPService";
import { TotalEventsCount } from "../../../web3/Countallevents";

////Images
import eco1 from "./../../../images/eco1.png";
import eco2 from "./../../../images/eco2.png";
import eco3 from "./../../../images/eco4.png";
import eco4 from "./../../../images/eco5.png";
import arrowRight from "../../../images/arrow-right.svg";
import lineImage from "../../../images/line.png";
import HeroModal from "./HeroModal";
import Emailsub from "./Emailsub";
import { envdev } from "./../../../web3/environments";
import toast, { Toaster } from "react-hot-toast";
import { GetUserName } from "../../../web3/ContextMethods";
var chart = null;

let downloaded = [];

const SalesChart = loadable(() =>
  pMinDelay(import("../../components/Chart/SalesChart"), 1000)
);

const error = (msg) =>
  toast.error(msg, {
    style: {
      padding: "16px",
      color: "#000",
    },
    iconTheme: {
      primary: "#0b0b0b",
      secondary: "#ffffff",
    },
  });

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSupply: 0,
      price: 0,
      ambassadorData: [],
      partnersData: [],
      postsData: [],
      liquidity: 0,
      activeusers: 0,
      isOpen: false,
      payout: 0,
      events: 0,
      decodestoredevents: [],
      item: [],
      bloglength: [],
      partner: [],
      video: [],
      Lineprice: [],
      Linetime: [],
      Ambassador: [],
      dataset: {},
      activeevents: 0,
      totalbetsmade: 0,
      indernalblog: [],
      modalShow: false,
      EthereumBrowser: false,
      responsive: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 5,
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
          items: 1,
        },
      },
      chartWidth:
        document.getElementById("linechart") != null
          ? document.getElementById("linechart").clientWidth
          : 600,
      chart: null,
      responsive_game_card: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 3,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      },
      responsive_video_card: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      },
    };
    this.videoOnReady = this.videoOnReady.bind(this);
  }

  componentDidMount = async () => {
    // FETCH AMBASSADOR DATA FROM SANITY
    Client.fetch(
      `*[_type=="ambassador"] {
          name,
          title,
          twitter,
          linkedin,
          image{
              asset -> {
                  _id,
                  url
              },
              alt
          }
      }`
    )
      .then((data) => this.setState({ ambassadorData: data }))
      .catch(console.error);

    // PARTNERS SECTION
    Client.fetch(
      `*[_type=="partners"] {
            name,
            image{
                asset -> {
                  _id,
                    url
                },
               alt
            }
        }`
    )
      .then((data) => this.setState({ partnersData: data }))
      .catch(console.error);

    // FETCHING POSTS FROM SANITY
    Client.fetch(
      `*[_type=="post"] {
              title,
              source,
              url,
              publishedAt,
              length,
          }`
    )
      .then((data) => this.setState({ postsData: data }))
      .catch(console.error);

    AOS.init();

    await initInstance();
    await loginProcess();

    // const currentusername = await GetUserName();

    window.localStorage.clear();
    let events = await totalEvents();

    this.setState({
      totalSupply: 0,
      activeusers: 0,
      payout: 0,
      events: events,
      totalbetsmade: 0,
      activeevents: 0,
    });

    // AOS.init();

    request(
      "GET",
      "https://api.pancakeswap.info/api/v2/tokens/0x749f031FDa3a4904b026f2275A697096492a129d"
    )
      .then((r1) => {
        var x1 = JSON.parse(r1.target.responseText);
        let val = Number(x1.data.price).toFixed(13);
        this.setState({
          price: val,
          realprice: x1.data.price,
        });
      })
      .catch((err) => {
        console.log("error is", err);
      });

    function request(method, url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
      });
    }

    try {
      window.localStorage.setItem("events", JSON.stringify("[]"));
      // window.localStorage.setItem('events', JSON.stringify(''))
      // console.log("window.allEvents window.allEventstorde",this.state.decodestoredevents.length,this.state.events,Number(this.state.events) > 0 && Number(this.state.events) == Number(downloaded.length))
      await TotalEventsCount();
      downloaded = JSON.parse(window.localStorage.getItem("events"));
      this.setState({
        decodestoredevents: downloaded.reverse(),
      });
    } catch (e) {
      console.log("Error on home page", e);
    }
    setInterval(() => {
      window.allEvents = this.state.events;
      window.allEventstorde = this.state.decodestoredevents.length;
    }, 200);
  };

  parterImg = () => {
    let items = [];
    for (var i = this.state.partner.length; i > 0; i--) {
      items.push(<PartnerCom img={this.state.partner[i - 1]} />);
    }
    return items;
  };

  amessador = () => {
    let items = [];
    for (var i = this.state.Ambassador.length; i > 0; i--) {
      items.push(<Amessador img={this.state.Ambassador[i - 1]} />);
    }
    return items;
  };

  videoOnReady(event) {
    // access to player in all event handlers via event.target
    this.setState({
      playerPlayVideo: event.target.playVideo,
    });
  }
  videos = () => {
    let items = [];
    for (var i = this.state.video.length; i > 0; i--) {
      items.push(<Videocom videos={this.state.video[i - 1]} />);
    }
    return items;
  };

  getNewsCard = () => {
    let items = [];
    for (var i = this.state.bloglength.length; i > 0; i--) {
      items.push(<NewsCard news={this.state.bloglength[i - 1]} />);
    }
    return items;
  };
  internalblogs = () => {
    let items = [];
    for (var i = this.state.indernalblog.length; i > 0; i--) {
      items.push(<ExternalBlog blogs={this.state.indernalblog[i - 1]} />);
    }
    return items;
  };

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }

  renderAmb(ambassadorData, index) {
    return (
      <div
        data-aos="zoom-in"
        data-aos-duration="400"
        data-aos-easing="linear"
        style={{ textAlign: "center", color: "#ffff" }}
        key={index}
      >
        {ambassadorData.image && ambassadorData.image.asset && (
          <img
            src={ambassadorData.image.asset.url}
            alt=""
            width="100"
            style={{ borderRadius: "80px" }}
          />
        )}
        <p className="m-0">{ambassadorData.name}</p>
        <p className="m-0">{ambassadorData.title}</p>
        <div className="d-flex m-0 justify-content-evenly">
          <a href={ambassadorData.twitter} target="_blank" rel="noreferrer">
            <FaTwitter color="#fff" />
          </a>
        </div>
      </div>
    );
  }

  renderPartners(partnersData, index) {
    return (
      <div
        data-aos="zoom-in"
        data-aos-duration="400"
        data-aos-easing="linear"
        key={index}
      >
        {partnersData.image && partnersData.image.asset && (
          <a href={partnersData.name} target="_blank" rel="noreferrer">
            <img
              src={partnersData.image.asset.url}
              alt=""
              style={{ width: "100%" }}
            />
          </a>
        )}
      </div>
    );
  }
  renderPosts(postsData, index) {
    return (
      <div className="latestCards text-light" key={index}>
        <div id="head">
          <div className="text-end">
            <span className="fw-bold">
              {dateFormat(postsData.publishedAt, "mmmm dS, yyyy")}
            </span>
            &nbsp;&nbsp;&nbsp;
            {/* <span>ANNOUNCEMENT</span> */}
          </div>
          <div id="title">{postsData.title}</div>
        </div>
        <div id="bottom">
          <p>{postsData.source}</p>
          <div id="misc">
            <div className="d-flex justify-content-between">
              <span>{postsData.length} MINS READ</span>
              <a href={postsData.url} target="_blank" rel="noreferrer">
                READ <AiOutlineRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  walletConnect = async () => {
    await loginProcess();
    await initInstance();
    const address = await getAccount();
    window.login = address;
  };
  handleClick = (e) => {
    if (!window.ethereum) {
      e.preventDefault();
      error("Install Metamask first");
    } else if (!window.login) e.preventDefault();
    this.walletConnect();
  };

  render() {
    // setInterval(()=>{
    //   window.allEvents = this.state.events
    //   window.allEventstorde = this.state.decodestoredevents.length
    // },200)

    return (
      <Fragment>
        <Header />
        <div style={{ position: "relative" }}>
          <div className="topBoxBg">
            <div className="container mb-5 mb-md-0" id="section-home">
              <div className="space-100"></div>
              <div className="row">
                <div
                  className="col-md-8 col-11 hometopBox"
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                >
                  <h2 className="text-white text-center text-md-start">
                    A DAO YOU CAN LITERALY
                    <br />
                    <span>BET</span> ON
                  </h2>
                  <p className="mt-5 mt-md-4 text-white text-center text-md-start">
                    Get the best APY in the market staking on the betswamp DAO
                    and have
                    <br /> fun betting on your favorite market.{" "}
                  </p>
                  <div className="text-center text-md-center my-1 my-md-0 topAppBtn">
                    {/* <a
                      href="https://dao.betswamp.com"
                      target="_blank"
                      rel="noreferrer"
                      className="btn-md theam-bg-red homeTopBtnDao"
                    >
                      TEST DAO
                      <AiOutlineRight
                        style={{ position: "absolute", right: "5px" }}
                        className="mt-1  fw-bold"
                      />
                    </a> */}
                    {Number(this.state.events) == 0 ? (
                      <NavLink
                        to="/app"
                        className="btn-md theam-bg-red homeTopBtn"
                        onClick={this.handleClick}
                      >
                        TEST BETTING
                        <AiOutlineRight
                          style={{ position: "absolute", right: "5px" }}
                          className="mt-1  fw-bold"
                        />
                      </NavLink>
                    ) : Number(this.state.events) > 0 &&
                      Number(this.state.events) ==
                        Number(this.state.decodestoredevents.length) ? (
                      <NavLink
                        to="/app"
                        className="btn-md theam-bg-red homeTopBtn"
                        onClick={this.handleClick}
                      >
                        TEST BETTING
                        <AiOutlineRight
                          style={{ position: "absolute", right: "5px" }}
                          className="mt-1  fw-bold"
                        />
                      </NavLink>
                    ) : (
                      <div className="btn btn-md theam-bg-red homeTopBtnloader">
                        {" "}
                        Loading...&nbsp;&nbsp;
                        <Watch color="red" height="26" width="26" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-3 col-12 homeTopImage d-flex">
                  <a
                    id="play-video"
                    className="video-play-button "
                    href="#"
                    onClick={() => this.setState({ modalShow: true })}
                  >
                    <span></span>
                  </a>
                  <HeroModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "#000" }}>
            <div
              className="container-fluid px-md-5 pt-5 pt-lg-0 mt-5 mt-lg-0"
              id="section-analytics"
            >
              <div className="space-100"></div>
              <div
                className="row"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <div className="col-lg-12 belowPlay">
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    arrows={false}
                    showDots={false}
                    responsive={this.state.responsive_center}
                    ssr={true} // means to render carousel on server-side.
                    infinite={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    itemClass="px-2"
                  >
                    <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                      <h5 className="text-white m-0">Price</h5>
                      <h4 className="text-white mt-3">0</h4>
                      {/* <h4 className="text-white mt-3">
                        $ {Number(this.state.price).toFixed(4)}
                      </h4> */}
                    </div>

                    <div className=" overflow-hidden text-center py-3 align-items-stretch col-12">
                      <h5 className="text-white m-0">Holders</h5>
                      <h4 className="text-white mt-3">0</h4>
                    </div>

                    <div className="overflow-hidden text-center py-3 align-items-stretch col-12">
                      <h5 className="text-white m-0">Market Cap</h5>
                      <h4 className="text-white mt-3">0</h4>
                      {/* <h4 className="text-white mt-3">
                        ${" "}
                        {(
                          (Number(this.state.price).toFixed(4) * 250000000) /
                          10 ** 6
                        ).toFixed(2)}{" "}
                        M
                      </h4> */}
                    </div>

                    <div className="overflow-hidden text-center py-3 align-items-stretch col-12">
                      <h5 className="text-white m-0">Total Supply</h5>
                      <h4 className="text-white mt-3">0</h4>
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="space-100"></div>
            <div className="space-100"></div>
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-8 text-white">
                  <img src={NFTs} alt="" style={{ width: "100%" }} />
                </div>
                <div
                  className="col-6 col-md-4 text-white side-text-nfts"
                  style={{ width: "40%", marginTop: "50px" }}
                >
                  <div className="mt-2 mt-md-4 text-white d-flex">
                    <div className="vl me-2"></div>{" "}
                    <span>
                      <p
                        className="m-0"
                        style={{ textShadow: "0px 0px 10px #FFFFFF" }}
                      >
                        DECENTRALIZED
                      </p>{" "}
                      <h4>ECOSYSTEM</h4>
                    </span>
                  </div>
                  <p>
                    BETSWAMP IS BUILDING A DECENTRALIZED ECOSYSTEM WHERE ALL ITS
                    UTILITES ARE POWERED BY A ROBUST AND SUSTAINABLE DAO WHICH
                    PROVIDES INVESTORS A SECURED PLATFORM THEY CAN COUNT ON.
                  </p>
                  <NavLink
                    to="/app"
                    className="btn btn-md text-white mt-2 mt-md-5 nftsTopBtn position-relative"
                  >
                    LEARN MORE
                    <AiOutlineRight
                      style={{ position: "absolute", right: "5px" }}
                      className="mt-1  fw-bold"
                    />
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="container-fluid px-md-5" id="section-analytics">
              {/*  */}
            </div>

            <div className="space-100"></div>
            <div
              className="container-fluid px-md-5 overflow-hidden"
              id="section-statistics"
            >
              <div className="space-50"></div>
              <div className="mt-3 mt-md-5 text-white px-2 px-md-4 py-4 div-p d-flex">
                <div className="vl me-2"></div>{" "}
                <span>
                  <p
                    className="m-0"
                    style={{ textShadow: "0px 0px 10px #FFFFFF" }}
                  >
                    BETSWAMP
                  </p>{" "}
                  <h4 className="m-0">ECOSYSTEM</h4>
                </span>
              </div>
              <div
                className="row pb-5"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-easing="linear"
              >
                <div className="col-lg-12">
                  <Carousel
                    swipeable={true}
                    draggable={true}
                    arrows={false}
                    showDots={false}
                    responsive={this.state.responsive_center}
                    ssr={true} // means to render carousel on server-side.
                    infinite={false}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container overflow-visible"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    deviceType={this.props.deviceType}
                    itemClass="px-2"
                  >
                    <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                      <h5 className="m-0 text-white text-start">DAO</h5>
                      <h4 className="text-white mt-4">
                        {/* {(this.state.payout / 10 ** 18).toFixed(0)} B USD */}
                      </h4>
                      <img
                        src={eco1}
                        alt=""
                        style={{ width: "125%", marginLeft: "-40px" }}
                      />
                    </div>

                    <div className="card chart-card overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                      <p
                        style={{
                          fontSize: "10px",
                          color: "#fff",
                          textAlign: "start",
                          margin: "0",
                        }}
                      >
                        DECENTRALISED
                      </p>
                      <h5 className="m-0 mb-3 text-white text-start">
                        P2P BETTING
                      </h5>
                      {/* <h4 className="text-white mt-4">P2P BETTING</h4> */}
                      <img
                        src={eco2}
                        alt=""
                        style={{ width: "128%", marginLeft: "-40px" }}
                      />
                    </div>

                    <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                      <h5 className="m-0 text-white text-start">BETSVERSE</h5>
                      <h4 className="text-white mt-4">
                        {/* {this.state.activeusers} */}
                      </h4>
                      <img src={eco3} alt="" />
                    </div>

                    <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                      <h5 className="m-0 text-white text-start">NFT</h5>
                      <h4 className="text-white mt-4">
                        {/* {this.state.totalbetsmade} */}
                      </h4>
                      <img src={eco4} alt="" />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
            <div className="space-50"></div>

            <div className="container-fluid px-md-5 my-5" id="section-partners">
              <div className="mt-2 mt-md-4 text-white px-0 px-md-4 pb-4 div-p d-flex">
                <div className="vl me-2"></div>{" "}
                <span>
                  <h4 style={{ marginTop: "10px" }}>AMBASSADORS</h4>
                </span>
              </div>
              <div className="space-50"></div>
              <Carousel
                swipeable={true}
                draggable={false}
                arrows={true}
                showDots={false}
                responsive={this.state.responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={true}
                autoPlaySpeed={2500}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container w-100"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                itemClass="d-flex justify-content-center align-items-center flex-column"
              >
                {/* {this.amessador()} */}
                {this.state.ambassadorData.map(this.renderAmb)}
              </Carousel>
            </div>
            <div className="space-100"></div>
            <div
              className="container-fluid px-md-5 my-5"
              id="section-partners"
              style={{ backgroundColor: "#0b0b0b", padding: "50px 0" }}
            >
              <div className="mt-2 mt-md-4 text-white px-2 px-md-4 pb-4 div-p d-flex">
                <div className="vl me-2"></div>{" "}
                <span>
                  <p
                    className="m-0"
                    style={{ textShadow: "0px 0px 10px #FFFFFF" }}
                  >
                    STRATEGIC
                  </p>{" "}
                  <h4>PARTNERS</h4>
                </span>
              </div>
              <div className="space-50"></div>
              <Carousel
                swipeable={true}
                draggable={true}
                arrows={true}
                showDots={false}
                responsive={this.state.responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={5000}
                keyBoardControl={true}
                customTransition="ease-in-out .5"
                transitionDuration={500}
                containerClass="carousel-container w-100"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                itemClass="d-flex justify-content-center align-items-center flex-column"
              >
                {/* {this.amessador()} */}
                {this.state.partnersData.map(this.renderPartners)}
              </Carousel>
            </div>

            <div
              className="container-fluid px-md-5 my-5"
              id="section-bet-cards"
            >
              <div className="space-100"></div>
              <div className="mt-2 mt-md-5 text-white d-flex">
                <div className="vl me-2"></div>{" "}
                <span>
                  <p
                    className="m-0"
                    style={{ textShadow: "0px 0px 10px #FFFFFF" }}
                  >
                    LATEST
                  </p>{" "}
                  <h4>UPDATES</h4>
                </span>
              </div>
              <div className="space-50"></div>
              <Carousel
                swipeable={true}
                draggable={true}
                arrows={true}
                showDots={false}
                responsive={this.state.responsive_game_card}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                // autoPlaySpeed={5000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container w-100 postSlider"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={this.props.deviceType}
                itemClass="carousel-item-padding-40-px px-4 w-auto"
              >
                {this.state.postsData.map(this.renderPosts)}
              </Carousel>
            </div>

            {false ? (
              <div className="container-fluid px-md-5 my-5" id="section-news">
                <div className="space-100"></div>
                <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1">
                  NEWS <img src={lineImage} alt="" className="ms-3" />
                </p>
                <div className="space-50"></div>
                <Carousel
                  swipeable={true}
                  draggable={false}
                  arrows={true}
                  showDots={false}
                  responsive={this.state.responsive_game_card}
                  ssr={true} // means to render carousel on server-side.
                  autoPlay={true}
                  autoPlaySpeed={1500}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  itemClass="carousel-item-padding-40-px px-4"
                >
                  {this.getNewsCard()}
                </Carousel>

                <div className="space-100"></div>

                {/* ***************************In House Articles************************** */}

                <Carousel
                  swipeable={true}
                  draggable={false}
                  arrows={true}
                  showDots={false}
                  responsive={this.state.responsive_game_card}
                  ssr={true} // means to render carousel on server-side.
                  autoPlay={true}
                  autoPlaySpeed={1500}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  itemClass="carousel-item-padding-40-px px-4"
                >
                  {this.internalblogs()}
                </Carousel>
              </div>
            ) : (
              ""
            )}

            {false ? (
              <div
                className="container-fluid px-md-5 my-5"
                id="section-partners"
              >
                <div className="space-100"></div>
                <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1 text-uppercase">
                  partners <img src={lineImage} alt="" className="ms-3" />
                </p>
                <div className="space-50"></div>
                <Carousel
                  swipeable={true}
                  draggable={false}
                  arrows={true}
                  showDots={false}
                  responsive={this.state.responsive}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  autoPlay={true}
                  autoPlaySpeed={1500}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                  deviceType={this.props.deviceType}
                  itemClass="d-flex justify-content-center align-items-center flex-column"
                >
                  {this.parterImg()}
                </Carousel>
              </div>
            ) : (
              ""
            )}
            <div className="space-100"></div>
            <Toaster />
            {/* <div
              className="container-fluid"
              style={{ backgroundColor: '#0b0b0b', padding: '50px 0' }}
            >
              <div className="container faq-box">
                <div className="subscribe">
                  <div className="outer-box text-white">
                    <h4 className="font-weight-bold">GET THE LATEST</h4>
                    <p>
                      SUBSCRIBE TO GET THE LATEST OF OUR NEWS, AND
                      <br />
                      LATEST UPDATES
                    </p>
                    <input
                      className="sub-input py-3 px-4"
                      placeholder="email@domain.com"
                    />
                    <form>
                      <div className="sighup-btn">
                        <button
                          className="btn btn-md mt-1 mt-md-5 pl-4 pr-4 btn-signup text-light"
                          style={{
                            boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.25)',
                          }}
                        >
                          SIGN UP
                          <AiOutlineRight
                            style={{ position: 'absolute', right: '5px' }}
                            className="mt-1  fw-bold"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="text-white faqbox">
                  <div className="question-box">
                    <h4 className="font-weight-bold">HAVE A QUESTION?</h4>
                    <p>SEND US A MAIL</p>
                    <div>
                      <p className="text-white text-email mb-0">
                        <img src={emailImg} alt="" width="22" />{' '}
                        admin@betswamp.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <Emailsub />

            <div className="d-flex">
              <Footer />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Index;
