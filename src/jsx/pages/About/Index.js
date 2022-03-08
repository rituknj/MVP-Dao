import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Elements/Header";
import Footer from "../../components/Elements/Footer";
import GameCard from "../../components/Cards/GameCard";
import NewsCard from "../../components/Cards/NewsCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { trade, lineData } from "./demo.js";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios'
import { initInstance } from "./../../../web3/web3";
import { gettotalsupply } from './../../../web3/betsService';
import {fromWei} from './../../../web3/utils'
import whitepaper from './../../../images/PDF/Betswamp-Whitepaper-v1.2.pdf';
////Images
import farmeFirst from "../../../images/farme-1.png";
import farmeSec from "../../../images/frame-2.png";
import farmeTh from "../../../images/frame-3.png";
import emailImg from "../../../images/email.png";
import whiteDot from "../../../images/white-dot.png";
import loading from "../../../images/loading.png";
import navIcon from "../../../images/nav.png";
import greyDot from "../../../images/dot-grey.png";
import { createChart } from "lightweight-charts";
var chart = null;
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            price:0,
            totalSupply:0,
            faq:null,
            Lineprice:[],
            responsive: {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: { max: 4000, min: 1480 },
                    items: 4,
                },
                desktop: {
                    breakpoint: { max: 3000, min: 1024 },
                    items: 4,
                },
                tablet: {
                    breakpoint: { max: 1480, min: 464 },
                    items: 1,
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                },
            },
            roadMapSlide: {
                superLargeDesktop: {
                    // the naming can be any, depends on you.
                    breakpoint: { max: 4000, min: 1480 },
                    items: 1,
                },
                desktop: {
                    breakpoint: { max: 2000, min: 1024 },
                    items: 1,
                },
                tablet: {
                    breakpoint: { max: 1480, min: 464 },
                    items: 1,
                },
                mobile: {
                    breakpoint: { max: 464, min: 0 },
                    items: 1,
                },
            },
            chartWidth: document.getElementById("chart") != null
                ? document.getElementById("chart").clientWidth
                : 600,
            chart: null,
            currentToken: farmeFirst,
            loader: true,
            roadMap: {
                0: {
                    title: 'Phase 1',
                    pointone:' Market analysis and product research',
                    pointtwo:'System architecture and concept design',
                    pointthree:' Token and platform contracts developed and tested',
                    pointfour:'  MVP development initialized',
                    pointfive:'  Token contract deployed',
                    pointsix:'  Platform contract deployed',
                    pointseven:'  Private Pre-sale',
                    pointteight:' Phase 1 marketing initialied ',
                    is_active: true,
                },
                1: {
                    title: 'Phase 2',
                    pointone:'Public presale',
                    pointtwo:'Dex listing (Pancakeswap)',
                    pointthree:'Team expansion',
                    pointfour:' Coingecko listing',
                    pointfive:'Coinmarketcap listing',
                    pointsix:' Platform beta testing',
                    pointseven:'Phase 2 marketing initialized',
                    is_active: true,
                },
                2: {
                    title: 'Phase 3',
                    pointone:'Strategic partnership deals',
                    pointtwo:'Whitepaper update',
                    pointthree:'Betswamp platform launch',
                    pointfour:' CEX Exchange listing',
                    pointfive:'Phase 3 marketing initialized',
                    is_active: false,
                },
                3: {
                    title: 'Phase 4',
                    pointone:'$BNB to $BETS swap itegration',
                    pointtwo:'Betswamp Tournaments launch',
                    pointthree:'Strategic partnership deals expansion',
                    pointfour:' NFT reward badges integration',
                    pointfive:'Phase 4 marketing initialized',
                    is_active: false,
                },
                4: {
                    title: 'Phase 5',
                    pointone:'Betswamp Android and IOS app launch',
                    pointtwo:'Phase 5 marketing initialized',
                    pointthree:' CEX Exchange listing',
                    is_active: false,
                },
                4: {
                    title: 'Phase 6',
                    pointone:'The first set of operational online gambling licenses acquired in selected countries',
                    pointtwo:'Regional marketing expansion and Strategic partnership  within these countries',
                    pointthree:'Continuous Regional focused marketing and brand expansion',
                    is_active: false,
                },
            }
        };
    }
    updateSize = () => {
        chart.resize(document.getElementById("chart").clientWidth, 600);
    };

    componentDidMount = async() => {
        window.addEventListener("resize", this.updateSize);
        AOS.init();
        chart = createChart(document.querySelector("#chart"), {
            width: this.state.chartWidth,
            height: 600,
            layout: {
                backgroundColor: "transparent",
                textColor: "rgba(255, 255, 255, 0.8)",
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
            rightPriceScale: {
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.1,
                },
            },
            grid: {
                vertLines: {
                    color: "transparent",
                },
                horzLines: {
                    color: "transparent",
                },
            },
            entireTextOnly: false,
        });
        var candleSeries = chart.addCandlestickSeries();
        fetch(`https://api.coingecko.com/api/v3/coins/betswamp/ohlc?vs_currency=usd&days=30`)
        .then(res => res.json())
        .then(data => {
           const cdata = data.map(d => {
                return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
            });
            console.log('api data', data)
            candleSeries.setData(cdata);
        })
       .catch(err => console.log("there was an error to fetch to data, the error was",err))
        

       let LineData = []
       let Lineprice = []
     
       const Line = 'https://api.coingecko.com/api/v3/coins/betswamp/market_chart?vs_currency=usd&days=30*'
       await axios
         .get(Line)
         .then(function (response) {
           LineData = response.data.prices
           if (LineData) {
               Lineprice = LineData.map(d => {
                   return {time:d[0]/1000,value:d[1]}
               })
           }
         })
         .catch(function (error) {
           console.log('error is', error)
         })
       this.setState({
         Lineprice: Lineprice,
       })
       console.log("line data", this.state.Lineprice)

        // candleSeries.setData(trade);
        chart.addLineSeries({
                color: "rgba(4, 111, 232, 1)",
                lineWidth: 1,
            })
            .setData(this.state.Lineprice);
            
        setTimeout(async () => {
            this.setState({
                chartWidth: document.getElementById("chart").clientWidth,
                loader: false
            });
            await this.updateSize();
        }, 1500);
        setTimeout(async () => {
            this.setState({
                loader: false
            });
        }, 2000);


        await initInstance();
        let totalSupply = await gettotalsupply(); 
        totalSupply = fromWei(totalSupply)
        this.setState({
            totalSupply:totalSupply
        })

        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer Nv0ftzZGsdUuPsXPYJcAZ1DHEMKs5zqawWFlRRDv");
         var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/faqs", requestOptions)
         .then(response => response.json())
         .then(result => this.setState({faq:result}))
        .catch(error => console.log('error', error));
        console.log("faq",this.state.faq)









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

    updateSize = () => {
        if (document.getElementById("chart").clientWidth <= 738) {
            chart.resize(document.getElementById("chart").clientWidth, 400);
        } else {
            chart.resize(document.getElementById("chart").clientWidth, 600);
        }
    };

    handleClick = (img) => {
        this.setState({
            currentToken: img,
        });
    };

    //GameCard
    getGameCard = () => {
        let items = [];
        for (var i = 1; i <= 10; i++) {
            items.push(<GameCard key={i} />);
        }
        return items;
    };

    getNewsCard = () => {
        let items = [];
        for (var i = 1; i <= 10; i++) {
            items.push(<NewsCard key={i} />);
        }
        return items;
    };
    faqs = () => {
        let items = [];
        for (var i = 0; i < this.state.faq.length; i++) {
            items.push(
                <div className="accordion-item text-white mb-4 mb-md-5" key={i}>
                    <h2 className="accordion-header head-color" id={`heading-${i}`}>
                        <button
                            class={`accordion-button ${i == 1 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${i}`}
                            aria-expanded="true"
                            aria-controls={`#collapse-${i}`}
                        >
                            Question {this.state.faq[i].questions}
                        </button>
                    </h2>
                    <div
                        id={`collapse-${i}`}
                        class={`accordion-collapse collapse ${i == 1 ? "show" : ""}`}
                        aria-labelledby={`heading-${i}`}
                    >
                        <div className="accordion-body">
                            <p className="pt-2 pb-4"> {this.state.faq[i].answers}</p>
                        </div>
                    </div>
                </div>
            );
        }
        return items;
    };

    doSpeicalThing = (e) => {
        let roadMap = this.state.roadMap
      
        if (e == 0) {
            // roadMap[0].is_active = true
            // roadMap[1].is_active = false
            // roadMap[2].is_active = false
        } else {
            // roadMap[e].is_active = true
        }
        this.setState({
            roadMap: roadMap
        })
    }

    render() {
        return (
            <Fragment>
                {false ?
                    <div className="loading">
                        <img src={loading} width="250" />
                    </div>
                    : ""}

                <Header />
                <div className="container-fluid">
                    <div
                        className="pb-md-1 pb-2"
                        id="chart"
                        style={{ width: "100%" }}
                    >

                    </div>
                </div>
                <div
                    className="container-fluid px-md-5 py-md-5 py-3"
                    id="section-analytics"
                >
                    <div className="row" data-aos="fade-up" data-aos-easing="linear">
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
                                itemClass="carousel-item-padding-40-px px-3"
                            >
                                <div>
                                    <div className="card chart-card  overflow-hidden text-center py-3">
                                        <h5 className="theam-text-color m-0">Price</h5>
                                        <h4 className="text-white mt-3">$ {Number(this.state.price).toFixed(4)}</h4>
                                    </div>
                                </div>
                                <div>
                                    <div className="card chart-card  overflow-hidden text-center py-3">
                                        <h5 className="theam-text-color m-0">Holders</h5>
                                        <h4 className="theam-text-green mt-3">731</h4>
                                    </div>
                                </div>
                                <div>
                                    <div className="card chart-card  overflow-hidden text-center py-3">
                                        <h5 className="theam-text-color m-0">Market cap</h5>
                                        <h4 className="text-white mt-3">{((Number(this.state.price).toFixed(4) * 250000000)/10**6).toFixed(2)} M</h4>
                                    </div>
                                </div>
                                <div>
                                    <div className="card chart-card  overflow-hidden text-center py-3">
                                        <h5 className="theam-text-color m-0">Total Supply</h5>
                                        <h4 className="text-white mt-3">250,000,000 M</h4>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
                <div
                    className="container-fluid px-md-5 py-md-5 py-3"
                    id="about-section-1"
                >
                    <div
                        className="row"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                    >
                        <div className="col-lg-12">
                            <h4>About</h4>
                            <p className="mt-4">
                                Betswamp is a decentralized peer-to-peer iGaming platform built
                                on Binance smart chain. The platform completely takes out the
                                traditional odds and booking system found in conventional
                                centralized platforms and provide gamers the flexibility to
                                create betting events on any category and terms of choice that
                                other players can wager on, hence offering no limitation on the
                                types of event created nor the size of the reward pool attached
                                to the event.
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className="container-fluid px-md-5 py-md-5 py-3"
                    id="about-section-2"
                >
                    <div
                        className=""
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                    >
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            arrows={false}
                            showDots={false}
                            responsive={this.state.responsive}
                            ssr={false} // means to render carousel on server-side.
                            infinite={false}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType={this.props.deviceType}
                            itemClass="px-4 row"
                        >
                            <div className="card about-card  overflow-hidden p-2 p-md-4 align-items-stretch ">
                                <h4 className="theam-text-color mb-3">Anonymous</h4>
                                <p>
                                    Betswamp does not collect any form of data from users neither
                                    is registration required to use the platform. gaming on
                                    Betswamp has been designed with flexibility and security in
                                    mind, gamers can get started just as easily as connecting
                                    their wallets to the platform and get instant access to a
                                    global decentralized peer-to-peer network of iGaming.
                                </p>
                            </div>
                            <div className="card about-card  overflow-hidden p-2 p-md-4 align-items-stretch ">
                                <h4 className="theam-text-color mb-3">Decentralized</h4>
                                <p>
                                    Betswamp is 100% decentralized with no central authority or
                                    influence on events, all events are user-created, and outcomes
                                    are also validated by users using a unique verification
                                    algorithm based on the "wisdom of crowds" concept this concept
                                    builds upon the idea that that large groups of people are
                                    collectively smarter than individual experts when it comes to
                                    problem-solving, decisionmaking, innovating, and predicting.
                                </p>
                            </div>
                            <div className="card about-card  overflow-hidden p-2 p-md-4 align-items-stretch">
                                <h4 className="theam-text-color mb-3">Fair</h4>
                                <p>
                                    On Betswamp, Players earn their exact winnings based upon
                                    their stake percentage on the event pool after validation.
                                    Unlike other platforms, Betswamp offers Participants on an
                                    event bonus from a portion of the pool regardless of the
                                    outcome chosen on that event. Betswamp smart contract utilizes
                                    a unique distribution algorithm that ensures Players do not
                                    only get guaranteed payouts on events won but also earn
                                    regardless of the outcome on each event participated.
                                </p>
                            </div>
                            <div className="card about-card  overflow-hidden p-2 p-md-4 align-items-stretch">
                                <h4 className="theam-text-color mb-3">Peer-To-Peer</h4>
                                <p>
                                    on Betswamp, users wager on events created by other users on
                                    the platform, unlike conventional iGaming platforms where
                                    Players wager on events provided by bookies. No event is
                                    created or controlled by the system. Events on Betswamp are
                                    validated by validators within the platform with no central
                                    control or influence from any external or internal party.
                                </p>
                            </div>
                        </Carousel>
                    </div>
                </div>
                <div
                    className="container-fluid  px-md-5 py-md-5 py-3"
                    id="about-section-3"
                >
                    <div className="col-lg-12 mb-2 mb-md-5 text-center text-md-start">
                        <h4>Tokenomics</h4>
                    </div>
                    <div
                        className="row"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-easing="linear"
                    >
                        <div className="col-lg-6 align-items-stretch mb-4">
                            <div className="d-flex align-items-center justify-content-center flex-column">
                                <div className="form-check my-2 my-md-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                        checked={
                                            this.state.currentToken == farmeFirst ? true : false
                                        }
                                        onChange={() => this.handleClick(farmeFirst)}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault1">
                                        8% Sell Tax
                                    </label>
                                </div>
                                <div className="form-check my-2 my-md-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        checked={this.state.currentToken == farmeSec ? true : false}
                                        onChange={() => this.handleClick(farmeSec)}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault2">
                                        4% Buy Tax
                                    </label>
                                </div>
                                <div className="form-check my-2 my-md-5">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault3"
                                        checked={this.state.currentToken == farmeTh ? true : false}
                                        onChange={() => this.handleClick(farmeTh)}
                                    />
                                    <label className="form-check-label" for="flexRadioDefault3">
                                        Distribution
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 align-items-stretch">
                            <img src={this.state.currentToken} className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div
                    className="container-fluid px-md-5 py-md-5 py-5"
                    id="about-section-4"
                >
                    <div className="col-lg-12 mb-2 mb-md-5 text-center text-md-start">
                        <h4>Road Map</h4>
                    </div>

                    <div className="col-lg-12">
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            arrows={true}
                            showDots={false}
                            responsive={this.state.roadMapSlide}
                            ssr={true} // means to render carousel on server-side.
                            infinite={false}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            // removeArrowOnDeviceType={["tablet"]}
                            deviceType={this.props.deviceType}

                            centerMode={false}
                            // itemClass="row"
                            afterChange={(previousSlide, { currentSlide, onMove }) => {
                                this.doSpeicalThing(currentSlide);
                            }}
                        >

                            {Object.entries(this.state.roadMap).map(([k, v]) => (
                                <div className="container col-11">
                                    <div className={`roadMapNav mb-4 pb-0 mb-md-5 pb-md-5 ${(v.is_active) ? '' : 'active'}`}>
                                        <p className={(v.is_active) ? '' : 'mt-3'}>
                                            <img src={(v.is_active) ? navIcon : greyDot} width={(v.is_active) ? '50' : '40'} />
                                            <hr style={{ marginTop: (v.is_active) ? '' : '8px' }} />
                                        </p>
                                    </div>
                                    <div className="roadMapTitle mb-4 px-2">
                                        <p>{v.title}</p>
                                    </div>
                                    <div className={`px-2`}>
                                        <div className={`roadMapCard ${(v.is_active) ? 'active' : ''}`}>
                                           {v.pointone != undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointone}</p>
                                            </p> :''}
                                            {v.pointtwo != undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointtwo}</p>
                                            </p> :''}
                                            {v.pointthree != undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointthree}</p>
                                            </p> :''}
                                            {v.pointfour != undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointfour}</p>
                                            </p> :''}
                                            {v.pointfive!= undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointfive}</p>
                                            </p> :''}
                                            {v.pointsix != undefined ? <p>
                                                <img src={whiteDot} className="me-4" /><p>{v.pointsix}</p>
                                            </p> :''}
                                            {v.pointseven != undefined ? <p>
                                                <img src={whiteDot} className="me-4" />{v.pointseven}
                                            </p> :''}
                                            {v.pointteight != undefined ? <p>
                                                <img src={whiteDot} className="me-4" />{v.pointteight}
                                            </p> :''}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>

                <div
                    className="container-fluid px-md-5 py-md-5 py-4 text-center"
                    id="about-section-5"
                >
                    <div className="space-100"></div>
                    <h3 className="">
                        GET THE BIG <br />
                        <span>PICTURE</span>
                    </h3>
                  <a href={whitepaper} target='_blank'>  <button className="btn mt-4" >Read Whitepaper</button></a>
                    <div className="space-100"></div>
                </div>

               {this.state.faq && this.state.faq.length != 0 ? <div
                    className="container-fluid px-md-5 py-md-5 py-3"
                    id="about-section-6"
                >
                    <div className="col-lg-12 mb-4 mb-md-5 text-center text-md-start">
                        <h4>FAQS</h4>
                    </div>
                    <div className="accordion" id="accordionFaq">


                   {this.state.faq ? this.faqs() : ''}

                    </div>
                </div>:''}

                <div
                    className="container-fluid px-md-5 py-md-5 py-3"
                    id="about-section-7"
                >
                    <div className="space-100"></div>
                    <div className="col-lg-12 mb-2 mb-md-5 text-center text-md-start">
                        <h4 className="mb-4">Have More Questions?</h4>
                        <p className="mb-4 p-1">Send us a mail.</p>
                        <p className="p-2">
                            <img src={emailImg} className="me-2" width="22px" />{" "}
                            admin@betswamp.com
                        </p>
                    </div>
                </div>
                <Footer />
            </Fragment>
        );
    }
}
export default Index;
