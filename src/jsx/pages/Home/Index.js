import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Elements/Header";
import Footer from "../../components/Elements/Footer";
import GameCardHome from './GameCard'
import NewsCard from "../../components/Cards/NewsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
import AOS from "aos";
import "aos/dist/aos.css";
import { initInstance } from "./../../../web3/web3";
import { gettotalsupply } from './../../../web3/betsService'
import {formatNumber, fromWei} from './../../../web3/utils'
import { getEvent, getActiveEvents } from "../../../web3/betsMVPService";
////Images
import TopImage from "../../../images/landing-Bets-cards-games.png";
import arrowRight from "../../../images/arrow-right.svg";
import playImage from "../../../images/play.png";
import statiImage from "../../../images/stati.png";
import validateImage from "../../../images/validate.png";
import mobileImage from "../../../images/mobile.png";
import lineImage from "../../../images/line.png";
import ueImage from "../../../images/ue.png";
import bscImage from "../../../images/bsc.png";
import segaImage from "../../../images/sega.png";
import xboxImage from "../../../images/xbox.png";
import psImage from "../../../images/ps.png";
import chartImage from "../../../images/chart.png";

const SalesChart = loadable(() =>
    pMinDelay(import("../../components/Chart/SalesChart"), 1000)
);
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalSupply:0,
            price:0,
            item:[],
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
                    items: 2,
                },
            },
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
        };
    }

    componentDidMount = async() => {
        AOS.init();
        await initInstance();

        const active_events = await getActiveEvents();
        let items = [];
        for (var i = active_events.length - 2; i <= active_events.length; i++) {
            let events = await getEvent(i)
            this.state.item.push(events)
        }
        console.log("3 events", this.state.item)

        let totalSupply = await gettotalsupply(); 
        totalSupply = fromWei(totalSupply)
        this.setState({
            totalSupply:totalSupply
        })

        // fetching price of total
        request('GET', "https://api.pancakeswap.info/api/v2/tokens/0x749f031FDa3a4904b026f2275A697096492a129d")
        .then((r1) => {
          var x1 = JSON.parse(r1.target.responseText);
          let val = Number(x1.data.price).toFixed(13)
          this.setState({
              price:val
          })
        }).catch(err => {
          console.log(err);
        })


      function request(method, url) {
        return new Promise(function (resolve, reject) {
          var xhr = new XMLHttpRequest();
          xhr.open(method, url);
          xhr.onload = resolve;
          xhr.onerror = reject;
          xhr.send();
        });
      }




    };

    //GameCard
    getGameCard = () => {
        // await initInstance();
        // const active_events = await getActiveEvents();
        // let items = [];
        // for (var i = active_events.length - 3; i <= active_events.length; i++) {
        //     let events = await getEvent(i)
        //     console.log("3 events", events)
        //     // this.setState({
        //     //     item: events
        //     // })
            
        // }
        
    };

    getNewsCard = () => {
        let items = [];
        for (var i = 1; i <= 10; i++) {
            items.push(<NewsCard key={i} />);
        }
        return items;
    };

    render() {
        return (
            <Fragment>
                <Header />
                <div className="container mb-5 mb-md-0" id="section-home">
                    <div className="space-100"></div>
                    <div className="space-100"></div>
                    <div className="row">
                        <div
                            className="col-lg-8 col-md-7 col-sm-12"
                            data-aos="zoom-in-up"

                            data-aos-easing="linear"
                        >
                            <h2 className="text-white text-center text-md-start">
                                Decentralized <br />
                                <span>Peer-to-Peer Betting</span>
                            </h2>
                            <p className="mt-5 mt-md-4 text-white text-center text-md-start">
                                Create events on litrally anything verifiable and place
                                unlimited bets.{" "}
                            </p>
                            <div className="text-center text-md-start my-4 my-md-0">
                                <NavLink
                                    to="/app"
                                    className="btn btn-md theam-bg-red mt-2 mt-md-5 homeTopBtn"
                                >Launch app</NavLink>
                            </div>
                        </div>
                        <div
                            className="col-lg-4 col-md-5 col-sm-12 text-center homeTopImage"
                            data-aos="zoom-in-up"
                            data-aos-easing="linear"
                        >
                            <img src={TopImage} className="img-fluid my-5 my-md-0" />
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-md-5" id="section-analytics">
                    <p className="mt-2 mt-md-4 text-white px-2 px-md-4 pb-4 div-p">
                        Market Analytics{" "}
                        <img src={arrowRight} className="ms-3" width="21px" />
                    </p>
                    <div
                        className="row"
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
                                responsive={this.state.responsive}
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
                                <div className="card chart-card py-4 px-2  overflow-hidden align-items-stretch col-12">
                                    <img src={chartImage} className="mt-3" />
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3  align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Price</h5>
                                    <h4 className="text-white mt-3">$ {Number(this.state.price).toFixed(4)}</h4>
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">24 Hr change</h5>
                                    <h4 className="theam-text-green mt-3">5.89 %</h4>
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Market cap</h5>
                                    <h4 className="text-white mt-3">{Number(this.state.price*this.state.totalSupply/1000000).toFixed(2)} M</h4>
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Total Supply</h5>
                                    <h4 className="text-white mt-3">250,000,000 M</h4>
                                </div>

                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-md-5" id="section-analytics">
                    <div className="row py-5">
                        <div className="col-lg-12 position-relative" id="video-frame">
                            <video poster="placeholder.png" controls={false}>
                                <source src="movie.mp4" type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                            </video>
                            <a id="play-video" className="video-play-button " href="#">
                                <span></span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-md-5" id="section-statistics">
                    <p className="mt-2 mt-md-4 text-white px-2 px-md-4 pb-4 div-p">
                        <img src={statiImage} className="me-2" width="20.02" /> Platform
                        Statistics
                    </p>
                    <div
                        className="row py-5"
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
                                infinite={true}
                                keyBoardControl={true}
                                customTransition="all .5"
                                transitionDuration={500}
                                containerClass="carousel-container"
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                deviceType={this.props.deviceType}
                                itemClass="px-2"
                            >

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Total Payout</h5>
                                    <h4 className="text-white mt-4">$100,000,00</h4>
                                </div>

                                <div className="card chart-card overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Total 24hr Payout</h5>
                                    <h4 className="text-white mt-4">$25,000,00</h4>
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Active users</h5>
                                    <h4 className="text-white mt-4">4,000,00</h4>
                                </div>

                                <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12">
                                    <h5 className="theam-text-color m-0">Total bet Created</h5>
                                    <h4 className="text-white mt-4">250,00</h4>
                                </div>

                            </Carousel>
                        </div>
                    </div>
                </div>
                <div className="space-100"></div>
                <div className="container-fluid px-md-5 my-5" id="section-bet-cards">
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        arrows={false}
                        showDots={false}
                        responsive={this.state.responsive_game_card}
                        ssr={true} // means to render carousel on server-side.
                        infinite={false}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={this.props.deviceType}
                        itemClass="carousel-item-padding-40-px px-4"
                    >   
                        
                        {this.state.item.map(item => <GameCardHome url={item[2]} teamone={item[7]} teamtwo={item[8]} poolsize={item[4]} lastdate={item[6]} />)}
                        
                    </Carousel>
                    <div className="mt-4 px-4">
                        <p className="mt-2 mt-md-4 text-white text-end">
                            {/* View Events
                            <img src={arrowRight} className="ms-3" width="20" /> */}
                        </p>
                    </div>
                </div>
                <div className="container-fluid px-md-5 mt-5" id="section-validate">
                    <div className="space-100"></div>
                    <div className="space-100"></div>
                    <div className="row">
                        <div
                            className="col-lg-7 mt-5"
                            data-aos="zoom-in-down"

                            data-aos-easing="linear"
                        >
                            <h1 className="font-raleway">
                                GET PAID TO
                                <br />
                                <span className="theam-text-color font-raleway">
                                    VALIDATE
                                </span>{" "}
                                EVENTS
                            </h1>
                            <p>
                                BUILD YOUR REPUTATION AS A VALIDATOR AND Earn passive income
                                WHILE YOU AT IT.
                            </p>
                        </div>
                        <div
                            className="col-lg-4 text-center"
                            data-aos="zoom-in-down"
                            data-aos-easing="linear"
                        >
                            <img src={validateImage} className="img-fluid" />
                        </div>
                        <div className="col-lg-1"></div>
                    </div>
                </div>
                <div className="container-fluid my-2" id="section-bet-on">
                    <div className="space-20"></div>
                    <div className="row">
                        <div
                            className="col-lg-6 p-0 order-1 order-md-0"
                            data-aos="fade-right"
                            data-aos-duration="1500"
                            data-aos-easing="linear"
                        >
                            <img src={mobileImage} width="70%" />
                        </div>
                        <div
                            className="col-lg-6 d-flex justify-content-center align-items-center flex-column order-0 order-md-1"
                            data-aos="zoom-in"
                            data-aos-duration="1500"
                            data-aos-easing="linear"
                        >
                            <h1 className="mt-5">
                                Bet on <br />
                                the <span className="theam-text-color">go</span>
                            </h1>
                            <p className="mt-3">Coming soon to your app store</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid px-md-5 my-5" id="section-news">
                    <div className="space-100"></div>
                    <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1">
                        NEWS <img src={lineImage} className="ms-3" />
                    </p>
                    <div className="space-50"></div>
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        arrows={false}
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
                </div>

                <div
                    className="container-fluid px-md-5 my-5"
                    id="section-partners"
                >
                    <div className="space-100"></div>
                    <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1 text-uppercase">
                        partners <img src={lineImage} className="ms-3" />
                    </p>
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
                        autoPlaySpeed={1500}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        deviceType={this.props.deviceType}
                        itemClass="d-flex justify-content-center align-items-center flex-column"
                    >
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="100"
                            data-aos-easing="linear"
                        >
                            <img src={ueImage} width="100" />
                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="400"
                            data-aos-easing="linear"
                        >
                            <img src={bscImage} width="100%" />
                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="800"
                            data-aos-easing="linear"
                        >
                            <img src={segaImage} width="100%" />
                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="1000"
                            data-aos-easing="linear"
                        >
                            <img src={xboxImage} width="100%" />
                        </div>
                        <div
                            data-aos="zoom-in"
                            data-aos-duration="1200"
                            data-aos-easing="linear"
                        >
                            <img src={psImage} width="100%" />
                        </div>
                    </Carousel>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
export default Index;
