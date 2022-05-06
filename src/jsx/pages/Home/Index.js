import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../components/Elements/Header'
import Footer from '../../components/Elements/Footer'
import GameCardHome from './GameCard'
import NewsCard from '../../components/Cards/NewsCard'
import PartnerCom from '../../components/Cards/Partner'
import Videocom from '../../components/Cards/Videos'
import ExternalBlog from '../../components/Cards/ExternalBlog'
import Amessador from '../../components/Cards/Amessador'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import loadable from '@loadable/component'
import pMinDelay from 'p-min-delay'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { initInstance, loginProcess } from './../../../web3/web3'
import { gettotalsupply } from './../../../web3/betsService'
import NFTs from "./../../../images/nfts.png"
import menone from "./../../../images/manone.png"
import women from "./../../../images/womenone.png"
import womentwo from "./../../../images/womentwo.png"
import emailImg from './../../../images/email.png';
import Partners from "./../../../images/unreal.png"
import Binance from "./../../../images/binance.png"
import Saga from "./../../../images/saga.png"
import Football from './../../../images/football.png'
import Playstation from "./../../../images/playstation.png"
import { FaTwitter } from "react-icons/fa"
import { AiFillLinkedin } from "react-icons/ai"
import NFTsText from "./../../../images/nfts-side-text.png"

import {
  allactiveusers,
  totalpayout,
  totalEvents,
  totalbetcreated,
  getActiveEvents,
} from '../../../web3/betsMVPService'
import { TotalEventsCount } from '../../../web3/Countallevents'
import YouTube from 'react-youtube'
import axios from 'axios'
import { createChart } from 'lightweight-charts'
import { lineData } from './../About/demo';

////Images
import arrowRight from '../../../images/arrow-right.svg'
import lineImage from '../../../images/line.png'
import HeroModal from './HeroModal'
var chart = null

const SalesChart = loadable(() =>
  pMinDelay(import('../../components/Chart/SalesChart'), 1000),
)
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      totalSupply: 0,
      price: 0,
      liquidity: 0,
      activeusers: 0,
      isOpen: false,
      payout: 0,
      events: 0,
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
        document.getElementById('linechart') != null
          ? document.getElementById('linechart').clientWidth
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
    }
    this.videoOnReady = this.videoOnReady.bind(this)
  }

  componentDidMount = async () => {
    AOS.init()
    await initInstance()
    await loginProcess()
    window.localStorage.clear()
    let activeusers = await allactiveusers()
    let payout = await totalpayout()
    let events = await totalEvents()
    let totalbets = await totalbetcreated()
    let activeevents = await getActiveEvents()
    let totalSupply = await gettotalsupply()
    // totalSupply = fromWei(totalSupply)
    this.setState({
      totalSupply: totalSupply,
      activeusers: activeusers,
      payout: payout,
      events: events,
      totalbetsmade: totalbets,
      activeevents: activeevents,
    })
    AOS.init()
    let LineData = []
    let Lineprice = []
    const Linetime = []
    const Line = 'https://api.coingecko.com/api/v3/coins/betswamp/market_chart?vs_currency=usd&days=30*'
    await axios
      .get(Line)
      .then(function (response) {
        LineData = response.data.prices
        if (LineData) {
          Lineprice = LineData.map(d => {
            return { time: d[0] / 1000, value: d[1] }
          })
          // console.log("line data is ", Lineprice)
          // console.log("Line series data is ", lineData)
        }
      })
      .catch(function (error) {
        console.log('error is', error)
      })
    this.setState({
      Lineprice: Lineprice,
    })


    // var myHeaders = new Headers();
    // myHeaders.append("Accept", "application/json");
    // myHeaders.append("Authorization", "Bearer Nv0ftzZGsdUuPsXPYJcAZ1DHEMKs5zqawWFlRRDv");
    // var requestOptions = {
    //   method: 'GET',
    //   headers: myHeaders,
    //   redirect: 'follow'
    // };
    // await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/partners", requestOptions)
    //   .then(response => response.json())
    //   .then(result => this.setState({ partner: result }))
    //   .catch(error => console.log('error', error));
    // console.log("partners",this.state.partner.length)
    // **************** API FOR PARTNER DATA ****************//

    // **************** API FOR VIDEO DATA ****************//
    // await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/videos", requestOptions)
    //   .then(response => response.json())
    //   .then(result => this.setState({ video: result }))
    //   .catch(error => console.log('error', error));
    // console.log("video is ", this.state.video);

    // **************** API FOR VIDEO DATA ****************//

    // **************** API LINE EXTERNAL BLOG DATA ****************//
    // await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/in-house-articles", requestOptions)
    //   .then(response => response.json())
    //   .then(result => this.setState({ indernalblog: result }))
    //   .catch(error => console.log('error', error));
    // console.log("blog",this.state.indernalblog)
    // **************** API LINE EXTERNAL BLOG DATA ****************//

    // **************** API LINE INTERNAL BLOG DATA ****************//
    // await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/external-articles", requestOptions)
    //   .then(response => response.json())
    //   .then(result => this.setState({ bloglength: result }))
    //   .catch(error => console.log('error', error));
    // **************** API LINE INTERNAL BLOG DATA ****************//

    // **************** API LINEambassador BLOG DATA ****************//
    // await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/ambassadors", requestOptions)
    //   .then(response => response.json())
    //   .then(result => this.setState({ Ambassador: result }))
    //   .catch(error => console.log('error', error));
    // console.log("amemsador", this.state.Ambassador)
    // **************** API LINE ambassador BLOG DATA ****************//

    // fetching price of total
    request(
      'GET',
      'https://api.pancakeswap.info/api/v2/tokens/0x749f031FDa3a4904b026f2275A697096492a129d',
    )
      .then((r1) => {
        var x1 = JSON.parse(r1.target.responseText)
        let val = Number(x1.data.price).toFixed(13)
        this.setState({
          price: val,
          realprice: x1.data.price,
        })
      })
      .catch((err) => {
        console.log('error is', err)
      })

    function request(method, url) {
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.onload = resolve
        xhr.onerror = reject
        xhr.send()
      })
    }


    try {

      window.localStorage.setItem('events', JSON.stringify(''))
      await TotalEventsCount()
      let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
      this.setState({
        item: decodestoredevents.reverse(),
      })
    }
    catch (e) {
      console.log("Error on home page", e)
    }


    
  }

  fetchdata = async () => {
    console.log("run")
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer Nv0ftzZGsdUuPsXPYJcAZ1DHEMKs5zqawWFlRRDv");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/partners", requestOptions)
      .then(response => response.json())
      .then(result => this.setState({ partner: result }))
      .catch(error => console.log('error', error));
    console.log("partners", this.state.partner.logo.length)
  }

  parterImg = () => {
    let items = []
    for (var i = this.state.partner.length; i > 0; i--) {
      items.push(<PartnerCom img={this.state.partner[i - 1]} />)
    }
    return items
  }

  amessador = () => {
    let items = []
    for (var i = this.state.Ambassador.length; i > 0; i--) {
      items.push(<Amessador img={this.state.Ambassador[i - 1]} />)
    }
    return items
  }


  videoOnReady(event) {
    // access to player in all event handlers via event.target
    this.setState({
      playerPlayVideo: event.target.playVideo,
    })
  }
  videos = () => {
    let items = []
    for (var i = this.state.video.length; i > 0; i--) {
      items.push(<Videocom videos={this.state.video[i - 1]} />)
    }
    return items
  }

  getNewsCard = () => {
    let items = []
    for (var i = this.state.bloglength.length; i > 0; i--) {
      items.push(<NewsCard news={this.state.bloglength[i - 1]} />)
    }
    return items
  }
  internalblogs = () => {
    let items = []
    for (var i = this.state.indernalblog.length; i > 0; i--) {
      items.push(<ExternalBlog blogs={this.state.indernalblog[i - 1]} />)
    }
    return items
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
  moussecloas = (event) => {
    let x = event.screenX
    let y = event.screenY

    if (x > 633) {
    }
    console.log('position', x, y)
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }
    return (
      <Fragment onClick={this.moussecloas}>
        <Header />
        <div onClick={this.moussecloas}>
          <div className='topBoxBg'>
            <div className="container mb-5 mb-md-0" id="section-home">
              <div className="space-100"></div>

              <div className="row">
                <div
                  className="col-md-8 col-11 hometopBox"
                  data-aos="zoom-in-up"
                  data-aos-easing="linear"
                >
                  <h2 className="text-white text-center text-md-start">
                    A DAO YOU CAN LITERALY<br />
                    <span>BET</span> ON
                  </h2>
                  <p className="mt-5 mt-md-4 text-white text-center text-md-start">
                    Get the best APY in the market staking on the betswamp DAO and have<br /> fun
                    betting on your favorite market.{' '}
                  </p>
                  <div className="text-center text-md-center my-1 my-md-0 topAppBtn">
                    <a
                      href='https://betdao.netlify.app/re-ui/stake'
                      target='_blank'
                      className="btn btn-md theam-bg-red mt-2 mt-md-5 homeTopBtnDao"
                    >
                      LAUNCH DAO
                    </a>
                    <NavLink
                      to="/app"
                      className="btn btn-md theam-bg-red mt-2 mt-md-5 homeTopBtn"
                    >
                      START BETING
                    </NavLink>
                  </div>
                </div>
                <div className="col-xxl-4 col-xl-3 col-12 homeTopImage d-flex align-items-center justify-content-center" >
                  <span class="btn-video-zm" onClick={() => this.setState({modalShow: true})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 12.282 14.739">
                      <path d="M7.369,0l7.369,12.282H0Z" transform="translate(12.282) rotate(90)" fill="#4D0202" />
                    </svg>
                  </span>
                  <HeroModal show={this.state.modalShow} onHide={() => this.setState({modalShow: false})} />
                </div>
              </div>
            </div>
          </div>

          <div className="container-fluid px-md-5" id="section-analytics">
           
            <div className="space-100"></div>
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
                  responsive={this.state.responsive_center}
                  ssr={true} // means to render carousel on server-side.
                  infinite={true}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  deviceType={this.props.deviceType}
                  itemClass="px-2"
                >
                 

                  <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                    <h5 className="text-white m-0">Price</h5>
                    <h4 className="text-white mt-3">
                      $ {Number(this.state.price).toFixed(4)}
                    </h4>
                  </div>

                  <div className=" overflow-hidden text-center py-3 align-items-stretch col-12">
                    <h5 className="text-white m-0">Holders</h5>
                    <h4 className="text-white mt-3">731</h4>
                  </div>

                  <div className="overflow-hidden text-center py-3 align-items-stretch col-12">
                    <h5 className="text-white m-0">Market Cap</h5>
                    <h4 className="text-white mt-3">
                      ${' '}
                      {(
                        (Number(this.state.price).toFixed(4) * 250000000) /
                        10 ** 6
                      ).toFixed(2)}{' '}
                      M
                    </h4>
                  </div>

                  <div className="overflow-hidden text-center py-3 align-items-stretch col-12">
                    <h5 className="text-white m-0">Total Supply</h5>
                    <h4 className="text-white mt-3">250,000,000</h4>
                  </div>

                
                </Carousel>
              </div>
            </div>
          </div>
          <div className="space-100"></div>
          <div className="space-100"></div>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-8 text-white'><img src={NFTs} style={{ width: '100%' }} /></div>
              <div className='col-6 col-md-4 text-white side-text-nfts' style={{ width: '40%', marginTop: '50px' }}>
                <p className="mt-2 mt-md-4 text-white d-flex">
                  <div class="vl me-2"></div> <span><p className='m-0'>BETSWAMP</p> <h4>ECOSYSTEM</h4></span>
                </p>
                <p >BETSWAMP IS BUILDING A DECENTRALIZED ECOSYSTEM WHERE ALL IT'S UTILITES ARE POWERED BY A ROBUST AND SUSTAINABLE DAO WHICH PROVIDES INVESTORS A SECURED PLATFORM THEY CAN VOCOUNT ON.</p>
                <NavLink
                  to="/app"
                  className="btn btn-md text-white mt-2 mt-md-5 nftsTopBtn"
                >
                  LEARN MORE
                </NavLink>
              </div>

            </div>
          </div>
          <div className="container-fluid px-md-5" id="section-analytics">
            {/*  */}
          </div>
          
          <div className="space-100"></div>
          <div className="container-fluid px-md-5" id="section-statistics">
            <p className="mt-3 mt-md-5 text-white px-2 px-md-4 py-4 div-p d-flex">
              <div class="vl me-2"></div> <span><p className='m-0'>BETSWAMP</p> <h4 className='m-0'>ECOSYSTEM</h4></span>
            </p>
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
                  infinite={true}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  deviceType={this.props.deviceType}
                  itemClass="px-2"
                >
                  <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                    <h5 className="m-0 text-white text-start">DAO</h5>
                    <h4 className="text-white mt-4">
                      {/* {(this.state.payout / 10 ** 18).toFixed(0)} BUSD */}
                    </h4>
                  </div>

                  <div className="card chart-card overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                    <h5 className="m-0 text-white text-start"><p className='m-0' style={{ fontSize: '10px' }}>DECENTRALISED</p>P2P BETTING</h5>
                    {/* <h4 className="text-white mt-4">{this.state.events}</h4> */}
                  </div>

                  <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                    <h5 className="m-0 text-white text-start">BETSVERSE</h5>
                    <h4 className="text-white mt-4">
                      {/* {this.state.activeusers} */}
                    </h4>
                  </div>

                  <div className="card chart-card  overflow-hidden text-center py-3 align-items-stretch col-12 ecosystem">
                    <h5 className="m-0 text-white text-start">NFT</h5>
                    <h4 className="text-white mt-4">
                      {/* {this.state.totalbetsmade} */}
                    </h4>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="space-50"></div>

          <div className="container-fluid px-md-5 my-5" id="section-partners">
            <p className="mt-2 mt-md-4 text-white px-2 px-md-4 pb-4 div-p d-flex">
              <div class="vl me-2"></div> <span><h4 style={{ marginTop: '10px' }}>AMBASSADORS</h4></span>
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
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              itemClass="d-flex justify-content-center align-items-center flex-column"
            >
              {/* {this.amessador()} */}
              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
                style={{ textAlign: 'center', color: '#ffff' }}
              >
                <img src={menone} width="100" style={{ borderRadius: '80px' }} />
                <p className='m-0'>Name</p>
                <p className='m-0'>Title</p>
                <div className='d-flex m-0 justify-content-evenly'>
                  <FaTwitter />{" "}
                  <AiFillLinkedin />
                </div>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
                style={{ textAlign: 'center', color: '#ffff' }}
              >
                <img src={women} width="100" style={{ borderRadius: '80px' }} />
                <p className='m-0'>Name</p>
                <p className='m-0'>Title</p>
                <div className='d-flex m-0 justify-content-evenly'>
                  <FaTwitter />{" "}
                  <AiFillLinkedin />
                </div>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
                style={{ textAlign: 'center', color: '#ffff' }}
              >
                <img src={menone} width="100" style={{ borderRadius: '80px' }} />
                <p className='m-0'>Name</p>
                <p className='m-0'>Title</p>
                <div className='d-flex m-0 justify-content-evenly'>
                  <FaTwitter />{" "}
                  <AiFillLinkedin />
                </div>
              </div>
              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
                style={{ textAlign: 'center', color: '#ffff' }}
              >
                <img src={womentwo} width="100" style={{ borderRadius: '80px' }} />
                <p className='m-0'>Name</p>
                <p className='m-0'>Title</p>
                <div className='d-flex m-0 justify-content-evenly'>
                  <FaTwitter />{" "}
                  <AiFillLinkedin />
                </div>
              </div>

            </Carousel>
          </div>
          <div className="space-100"></div>
          <div className="container-fluid px-md-5 my-5" id="section-partners">
            <p className="mt-2 mt-md-4 text-white d-flex">
              <div class="vl me-2"></div> <span><p className='m-0'>STRATEGIC</p> <h4>PARTNERS</h4></span>
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
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              itemClass="d-flex justify-content-center align-items-center flex-column"
            >
              {/* {this.amessador()} */}
              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
              >
                <img src={Partners} style={{ width: "100%" }} />
              </div>

              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
              >
                <img src={Binance} style={{ width: "100%" }} />
              </div>

              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
              >
                <img src={Saga} style={{ width: "100%" }} />
              </div>

              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
              >
                <img src={Football} style={{ width: "100%" }} />
              </div>

              <div
                data-aos="zoom-in"
                data-aos-duration="400"
                data-aos-easing="linear"
              >
                <img src={Playstation} style={{ width: "100%" }} />
              </div>

            </Carousel>
          </div>

          {/* <div className="container-fluid px-md-5 my-5" id="section-bet-cards">
            <Carousel
              swipeable={true}
              draggable={true}
              arrows={true}
              showDots={false}
              responsive={this.state.responsive_game_card}
              ssr={true} // means to render carousel on server-side.
              infinite={true}
              keyBoardControl={true}
              customTransition="all .5"
              transitionDuration={500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              itemClass="carousel-item-padding-40-px px-4"
            >
              {this.state.activeevents != 0 &&
                this.state.item.map((item) => (
                  <GameCardHome
                    url={item.subcategory}
                    poolsize={item.poolsize}
                    subcategories={item.subcategory}
                    teamone={item.teamone}
                    teamtwo={item.teamtwo}
                    endtime={item.endtime}
                    zero={item.zero}
                    one={item.one}
                    two={item.two}
                  />
                ))}
            </Carousel>
            <div className="mt-4 px-4">
              <p className="mt-2 mt-md-4 text-white text-end">
                View Events
                <img src={arrowRight} className="ms-3" width="20" />
              </p>
            </div>

          </div> */}
         
          {false ? <div className="container-fluid px-md-5 my-5" id="section-news">
            <div className="space-100"></div>
            <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1">
              NEWS <img src={lineImage} className="ms-3" />
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
              removeArrowOnDeviceType={['tablet', 'mobile']}
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
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              itemClass="carousel-item-padding-40-px px-4"
            >
              {this.internalblogs()}
            </Carousel>

          </div> : ''}

         

          {false ? <div className="container-fluid px-md-5 my-5" id="section-partners">
            <div className="space-100"></div>
            <p className="mt-2 mt-md-4 text-white px-2 px-md-3 pb-4 div-p-1 text-uppercase">
              partners <img src={lineImage} className="ms-3" />
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
              removeArrowOnDeviceType={['tablet', 'mobile']}
              deviceType={this.props.deviceType}
              itemClass="d-flex justify-content-center align-items-center flex-column"
            >
              {this.parterImg()}

            </Carousel>
          </div> : ''}
          <div className="space-100"></div>
          <div className='container faq-box '>
            <div className='subscribe'>
              <div className='outer-box text-white'>
                <h4 className='font-weight-bold'>GET THE LATEST</h4>
                <p>SUBSCRIBE  TO GET THE LATEST OF OUR NEWS, AND<br />
                  LATEST UPDATES</p>
                <input className='sub-input' placeholder='email@domain.com' />
                <div className='sighup-btn'>
                  <button className='btn btn-md text-white mt-1 mt-md-5 pl-4 pr-4 btn-signup'>SIGN UP</button>
                </div>

              </div>
            </div>
            <div className='text-white faqbox'>
              <div className='question-box'>
                <h4 className='font-weight-bold'>HAVE A QUESTION?</h4>
                <p>SEND US A MAIL</p>
                <div>
                  <p className="text-white text-email mb-0"><img src={emailImg} width="22" /> admin@betswamp.com</p>
                </div>
              </div>
            </div>

          </div>

          <div className='d-flex'><Footer /></div>

        </div>
      </Fragment>
    )
  }
}
export default Index
