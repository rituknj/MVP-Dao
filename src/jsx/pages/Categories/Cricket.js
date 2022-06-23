import React, { Component, Fragment } from 'react'
import greenDot from './../../../images/green-dot.png'
import cardBackground from './../../../images/ground.png'
import carbon_timer from './../../../images/carbon_timer.png'
import {placeBet, getEventOccurrenceBetAmount, totalEvents, bettorscounts, cancelevent } from './../../../web3/betsMVPService'
import { TotalEventsCount, addingnewevents, updatingeventdata } from './../../../web3/Countallevents'
import {getBETBalanceBUSD } from './../../../web3/betsService'
import { initInstance, getAccount } from './../../../web3/web3'
import redDot from './../../../images/red-dot.png'
import FIRE from './../../../images/fire.png'
import PLUS from './../../../images/plus.png'
import OPEN from './../../../images/open.png'
import { GoPrimitiveDot } from 'react-icons/go'
import { TiStopwatch} from 'react-icons/ti'
import {MdOutlineArrowForwardIos} from 'react-icons/md'
import {ImFire} from 'react-icons/im'
import toast, { Toaster } from 'react-hot-toast';
// import { Modal, RadioGroup, Radio, ButtonToolbar, Button, Paragraph   } from 'rsuite';


import AppHeader from '../../components/Elements/AdminHeader'

import {
  allactiveusers,
  totalpayout,
  totalbetcreated,
  getActiveEvents,
} from './../../../web3/betsMVPService'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Match from './../../../images/match.png'
import UNMatch from './../../../images/un-match.png'
import Search from './../../../images/search.png'
import Filter from './../../../images/filter.png'
import Appheadercat from './../App/Appheadercat'
import Soccer from './../Categories/Soccer'

const tost =()=> toast.success('Success.', {
  style: {
    padding: '16px',
    color: '#000',
    marginTop:'75px'
  },
  iconTheme: {
    primary: '#0b0b0b',
    secondary: '#ffffff',
  },
});


const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};


class GameCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allevents: [],
      active: false,
      id: null,
      activeSubCat:[],
      subcategorys:[],
      searchItem:'',
      specificCats:[],
      zeroEventAmount: 0,
      oneEventAmount: 0,
      twoEventAmount: 0,
      stackvalueone: 0,
      stackvaluetwo: 0,
      stackvaluethree: 0,
      teamone: '',
      teamtwo: '',
      selectedteam: '',
      betvalue: 0,
      onbetteam: '',
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
      match:0,
      activeTabTop: false,
      catogries: '',
      activeTabBottom: 1,
      selectedcat: false,
      payout: 0,
      activeusers: 0,
      activeevents: 0,
      totalbetsmade: 0,
      events: 0,
      open: false,
      backdrop: 'static',
      path: '/app',
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
    }
  }
  componentDidMount = async () => {
    await initInstance();
    let bal = await getBETBalanceBUSD()
    let account = await getAccount()
    this.setState({
      BUSDbal: bal,
      account: account
    })
    
    let active_events = await totalEvents()
    let getstoredevents = window.localStorage.getItem('events')
    if (getstoredevents == null) {
      window.localStorage.setItem('events', JSON.stringify(''))
      await TotalEventsCount();
    }
   
    setInterval(async () => {
      await addingnewevents();
      this.setState({subcategorys: window.maincatogries})
    }, 3000);

    setInterval(async () => {
      this.setState({
        match: window.match
      })
    }, 500);
    
    
    let activeUser = await allactiveusers();
    let totalpay = await totalpayout();
    let totalEvent = await totalEvents();
    let totalbetsmade = await totalbetcreated();
    let activeevnets = await getActiveEvents();

    this.setState({
      payout:totalpay,
      activeusers: activeUser.length,
      activeevents: activeevnets,
      totalbetsmade: totalbetsmade,
      events: totalEvent
    })

  }
  handleOpen = () => this.setState({open:true})
  handleClose = () => this.setState({open:false})

  filterCat = async(sub)=>{
    let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
    const events = []
    let check2
    for (let i = decodestoredevents.length - 1; i >= 0; i--) {
      check2 = decodestoredevents[i]
      console.log(check2.subcategory == sub && Number(check2.Categories) == window.maincatNum, check2.subcategory,sub, Number(check2.Categories), window.maincatNum )
      if (check2.subcategory == sub && Number(check2.Categories) == window.maincatNum ) {
        console.log(check2)
        events.push(check2)
      }
    }
    this.setState({
      allevents: events,
      specificCats:events
    })
    this.setState({activeSubCat: sub})
  }

  SearchCategory = async(data)=>{
    let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
    const events = []
    let check2 
    for(let i = 0; i < decodestoredevents.length; i++){
      check2 = decodestoredevents[i]
      if(check2.teamone.includes(data.toString()) || check2.teamtwo.includes(data.toString()) || check2.descript.includes(data.toString())){
        events.push(check2)
      }
    }
    this.setState({
      allevents: events,
    })
  }

  Sorting = async(data)=>{
    // JSON.parse(window.localStorage.getItem('events'))
    let decodestoredevents = this.state.specificCats
    const events = []
    let check1
    let check2  
    if(data == 1){
      for(let i = 0; i < decodestoredevents.length; i++){
        for(let j = 0; j < decodestoredevents.length-i-1; j++){
          if(decodestoredevents[j].poolsize > decodestoredevents[j+1].poolsize){
            var temp = decodestoredevents[j]
            decodestoredevents[j] = decodestoredevents[j + 1]
            decodestoredevents[j+1] = temp 
          }
        }
      }
      this.setState({
        allevents: decodestoredevents,
      })
    }

    else if(data == 2){
      for(let i = 0; i < decodestoredevents.length; i++){
        for(let j = 0; j < decodestoredevents.length-i-1; j++){
          if(decodestoredevents[j].poolsize < decodestoredevents[j+1].poolsize){
            var temp = decodestoredevents[j]
            decodestoredevents[j] = decodestoredevents[j + 1]
            decodestoredevents[j+1] = temp 
          }
        }
      }
      this.setState({
        allevents: decodestoredevents,
      })
    }
    else if(data == 3){
      let decodestoredevent = JSON.parse(window.localStorage.getItem('events'))
      for(let i = 0; i < decodestoredevent.length; i++){
        for(let j = 0; j < decodestoredevent.length-i-1; j++){
          if(decodestoredevent[j].poolsize > decodestoredevent[j+1].poolsize){
            var temp = decodestoredevent[j]
            decodestoredevent[j] = decodestoredevent[j + 1]
            decodestoredevent[j+1] = temp 
          }
        }
      }
      this.setState({
        allevents: decodestoredevent,
        activeSubCat:'ALL'
      })
    }
    else{
      let decodestoredevent = JSON.parse(window.localStorage.getItem('events'))
      for(let i = 0; i < decodestoredevent.length; i++){
        for(let j = 0; j < decodestoredevent.length-i-1; j++){
          if(decodestoredevent[j].poolsize < decodestoredevent[j+1].poolsize){
            var temp = decodestoredevent[j]
            decodestoredevent[j] = decodestoredevent[j + 1]
            decodestoredevent[j+1] = temp 
          }
        }
      }
      this.setState({
        allevents: decodestoredevent,
        activeSubCat:'ALL'
      })
    }
    
  }
 

  cancelevent = async (id) => {
    await cancelevent(id)
  }

  handelSideMenu = async (eventid, teamone, teamtwo, endtime, poolsize, bettercount, category, potentialwins, zero, one, two) => {
    if (isNaN(potentialwins)) {
      potentialwins = 0
    }

    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);

    var current = Math.round(new Date().getTime()/1000)
    var seconds =  (endtime/1000)-current 
    var lefttime = Math.floor(seconds/86400)
    if(lefttime<0){
      lefttime = 0;
    }

    if (this.state.active === false) {
      this.setState({
        onbetteam: teamone
      })
    }
    if (this.state.active === true) {
      this.setState({
        onbetteam: teamtwo
      })
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
      potential_wins: potentialwins
    })

    document.getElementById('sidebar').style.transform = 'translateX(0%)';
    document.getElementById('sidebar').style.position = 'relative';
    document.getElementById(eventid).style.display = 'none';
  }

  setfalse = () => {
    this.setState({
      occurance: 0,
      betvalue: this.state.stackvalueone
    })
  }

  settrue = () => {
    this.setState({
      occurance: 1,
      betvalue: this.state.stackvaluetwo
    })

  }

  setdraw = () => {
    this.setState({
      occurance: 2,
      betvalue: this.state.stackvaluethree
    })

  }


  Onplacebet = async() => {
    try{
     const data =  await placeBet(this.state.id, this.state.occurance, this.state.stackvalueone)
     if(data.status){
      tost()
      updatingeventdata(this.state.id)
    }
    }
    catch(e){
      console.log("bet Error",e)
    }
  }
  getdata = (v) => {
  }

  

  countbettors = async (id) => {
    let one = await bettorscounts(id, 0)
    let two = await bettorscounts(id, 1)
    let three = await bettorscounts(id, 2)
    let zeroamount = await getEventOccurrenceBetAmount(id, 0)
    let oneamount = await getEventOccurrenceBetAmount(id, 1)
    let twoamount = await getEventOccurrenceBetAmount(id, 2)
    this.setState({
      eventoneparticipant: one,
      eventtwoparticipant: two,
      eventthreeparticipant: three,
      zeroEventAmount: zeroamount,
      oneEventAmount: oneamount,
      twoEventAmount: twoamount
    })
  }



  getdays = (endime) => {
    var current = Math.round(new Date().getTime()/1000)
    var seconds =  (endime)-current 
    var day = Math.floor(seconds/86400)
    if(day>0){
      return day;
    }
    else{
      return 0;
    }
  }

  mouseclass = (event) => {
    let x = event.screenX;
    let y = event.screenY;
    if (x > 600) {
      document.getElementById('sidebar').style.transform = 'translateX(-200%)';
      document.getElementById('sidebar').style.position = 'absolute';
      document.getElementById(this.state.id).style.display = 'inline-block'
    }
  }
  winningamount = (amountstake, poolsize) => {
    let totalstake = poolsize + amountstake
    let winningspercents = (amountstake / totalstake) * 100
    let potentialwinnings = ((totalstake - amountstake) / 100) * winningspercents
    if (isNaN(potentialwinnings)) {
      potentialwinnings = 0
    }
    return Number(potentialwinnings + amountstake).toFixed(2)

  }

  getGameCard = () => {
    let items = []
    for (var i = 1; i <= 10; i++) {
      items.push(
        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-4">
          <Soccer />
        </div>,
      )
    }
    return items
  }

  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab,
    })
    if(tab){
      window.match = tab
    }
    else{
      window.match = tab
    }
  }

  catorgy = (Cat)=> {
    this.setState({
      catogries: Cat
    })
  }

  selectedcategory = (cat) => {
    if (!this.state.selectedcat) {
      this.setState({ selectedcat: true })
    } else {
      this.setState({ selectedcat: false })
    }
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
        <br/>
        <div>
          <div className="container-fluid mt-5 bg-black" id="section-statistics" style={{paddingTop:"41px", paddingBottom:"41px"}}>
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
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  itemClass="px-2"
                >
                  <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                    <h6 className="m-0">Total Payout</h6>
                    <h6 className="mt-4 fw-lighter">
                      {(this.state.payout/10**18)} BUSD
                    </h6>
                  </div>

                  <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                    <h6 className="m-0">Total Events</h6>
                    <h6 className="mt-4 fw-lighter">{this.state.events}</h6>
                  </div>

                  <div className="overflow-hidden text-center py-3 align-items-stretch col-12 text-light">
                    <h6 className="m-0">Active users</h6>
                    <h6 className="mt-4 fw-lighter">
                      {this.state.activeusers}
                    </h6>
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
                  this.state.activeTabBottom == 1 ? ' active' : ''
                }`}
                onClick={() => this.handelMatchTab(1)}
              >
                <p className={`${this.state.activeTabBottom  != 1 ? "text-secondary " : '' }`}>Matched Events</p>{' '}
                <img className="mt-2" src={Match} width={20} />
              </button>
            </div>
            <div className="">
              <button
                className={`d-flex justify-content-around btn admin-match-button ${
                  this.state.activeTabBottom == 2 ? ' active' : ''
                }`}
                onClick={() => this.handelMatchTab(2)}
              >
                <p className={`${this.state.activeTabBottom  != 2 ? "text-secondary " : '' }`}>Un-Matched Events</p>
                <img className="mt-1 ml-2" src={UNMatch} width={25} />
              </button>
            </div>
          </div>
        </div>
        <div className=" sub-catogries mt-0 p-1 p-md-5 text-white" id="navbarsExample05">
          <div style={{overflow:'visible'}}>
          <p className="text-white" style={{fontSize:'12px'}}>SELECT SUB CATEGORY</p>
            <div className='main-dropdown' disabled >
            <div class="dropdown subcategory">
            <button
              class="btn btn-secondary dropdown-toggle border-0"
              style={{backgroundColor:"#4D4A4A", borderRadius:"10px"}}
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {window.maincatogries && window.maincatogries.length > 0 ? `${this.state.activeSubCat}`  : "No Categories Found"}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"  style={{backgroundColor:"#4D4A4A"}}>
             {this.state.subcategorys && this.state.subcategorys.map((data)=> {
               return <li>
               <button class="dropdown-item text-white" type="button" onClick={()=>this.filterCat(data)} >
               {data}
               </button>
             </li> 
               }) }
            </ul>
          </div>
                  
            </div>
          </div>
          <div className="sub-tools">
            <div className='search-bar'>
            <input value={this.state.searchItem} onChange={(e)=>this.setState({searchItem:e.target.value})}/>&nbsp;
            <img src={Search} width={22} height={22} onClick={()=>this.SearchCategory(this.state.searchItem)}/>
            </div>
           <div>
              <span id="dropdownMenu2" data-bs-toggle="dropdown" type='button' aria-expanded="false" ><img className='mt-2' src={Filter} width={25} height={25} /></span>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenu2"  style={{backgroundColor:"#4D4A4A"}}>
              <li>
                <button class="dropdown-item text-white pool" type="button" onClick={()=>this.Sorting(1)}>Pool Low to High</button>
             </li> 
             <li>
                <button class="dropdown-item text-white pool" type="button" onClick={()=>this.Sorting(2)}>Pool High to Low</button>
             </li> 
             <li>
                <button class="dropdown-item text-white pool" type="button" onClick={()=>this.Sorting(3)}>Pool Low to High (ALL)</button>
             </li> 
             <li>
                <button class="dropdown-item text-white pool" type="button" onClick={()=>this.Sorting(4)}>Pool High to Low (ALL)</button>
             </li> 
            </ul>
           </div>
          </div>
        </div>




        <div><Toaster/></div>
        <div className="row gx-0">
          <div className="col-12">
            <div className="match-main-div">
              <div className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5">
                <div className="betting-cards" onClick={this.mouseclass}>

                  {/* *******************Slider*************** */}
                  <div className='sidebarNew shadow-lg gx-3' id="sidebar">
                    <div className="container-fluid category-title py-4">
                      <div className='d-flex justify-content-between'>
                        <div id="img-head">
                        <h4 className='fs-5'> {Math.round((new Date()).getTime() / 1000) > this.state.globalendtime ? <img src={redDot} className="red-dot" width="12" /> : <img src={greenDot} className="me-2" width="12" />} {this.state.category}</h4>
                          <span>{this.state.teamone} <span className='text-danger'>vs</span> {this.state.teamtwo}</span>
                        </div>
                        {/* <div id="date"><p>25 Feb &nbsp;&nbsp;&nbsp;<span>2022</span></p></div> */}
                      </div>
                      <div className='d-flex mt-5 justify-content-between'>
                        <div id="poolSize"><p>Pool Size</p>
                          <span>${this.state.poolsize}</span>
                        </div>
                        <div id="timeLeft"><TiStopwatch /> {this.state.currenttime} Days Left</div>
                      </div>
                    </div>
                    <div className="category-body pb-4">
                      <div className="row p-3">
                        <div className="col-8">
                          <ul>
                            <li>{Number(this.state.zero).toFixed(2)}% &nbsp;&nbsp;{this.state.teamone}</li>
                            <li>{Number(this.state.one).toFixed(2)}% &nbsp;&nbsp;{this.state.teamtwo}</li>
                          </ul>
                        </div>
                        <div className="col-4 button-row gap-2">
                          <div><img src={FIRE} style={{ width: '10px' }} /></div>
                          <div className='text-white mb-1' style={{ fontSize: '10px' }}>Close</div>
                          <div><img src={OPEN} style={{ width: '10px' }} /></div>
                        </div>
                      </div>
                      <hr />
                      <div className="row p-3">
                        <p style={{fontSize:"12px", marginBottom:"0"}}>Available Balance</p>
                        <span>{this.state.BUSDbal}</span>
                      </div>
                      <hr />
                      <div className="container selectBet">
                        <p>SELECT PREFERRED ODD</p>
                        <br />
                        <div id={`betA`} className={`${this.state.occurance==0?'active':" "}`} onClick={() =>  {this.setState({occurance:0}); this.setfalse()}}>
                          <p className='fs-6 mb-2'>{this.state.teamone}</p>
                          <p>Participants: <span>{this.state.eventoneparticipant}</span></p>
                          <p>Total amount betted: <span>{(Number(this.state.zeroEventAmount)/10**18).toFixed(2)}&nbsp;BUSD</span></p>
                          <GoPrimitiveDot style={{position:"absolute", top:"15px", right:"15px"}}/>
                        </div>
                        <br />
                        <div id="betA" className={` ${this.state.occurance==1?'active':" "}`} onClick={() => {this.setState({occurance:1}); this.settrue()}}>
                          <p className='fs-6 mb-2'>{this.state.teamtwo}</p>
                          <p>Participants: <span>{this.state.eventtwoparticipant}</span></p>
                          <p>Total amount betted: <span>{(Number(this.state.oneEventAmount)/10**18).toFixed(2)}&nbsp;BUSD</span></p>
                          <GoPrimitiveDot className="text-danger" style={{position:"absolute", top:"15px", right:"15px"}}/>
                        </div>
                      </div>
                      <div className="returnBet container d-flex justify-content-between mt-3">
                        <div id='return'>
                          <p>Potential Return</p>
                          <span className='text-light'>{this.state.stackvalueone == 0 ? this.state.potential_wins: this.winningamount(Number(this.state.stackvalueone),Number(this.state.poolsize))}&nbsp;BUSD</span>
                        </div>
                        <div id='amount'>
                          <p className='text-end mb-2'>ENTER AMOUNT TO BET</p>
                          <div className='border rounded p-2 text-light'><input className='text-light' type="text" value={this.state.stackvalueone} onChange={(e) => this.setState({stackvalueone:e.target.value})}/><span onClick={() => this.setState({stackvalueone:this.state.BUSDbal})} style={{cursor:'pointer'}}>MAX</span></div>
                        </div>
                      </div>
                      <div className="sideBtnContainer">
                        <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex" onClick={()=>this.Onplacebet()} style={{backgroundColor:"#fff", color:"#000", width:"80%",}}><span>PLACE BET</span><MdOutlineArrowForwardIos className='mt-1'/></button>
                        {/* <button className="btn mx-auto my-3 p-3 fw-bold justify-content-between d-flex shadow" style={{backgroundColor:"#3b3b3b", color:"#fff", width:"80%",}}><span>VIEW STREAM</span><TiSocialYoutube className='mt-1'/></button> */}
                      </div>
                    </div>
                  </div>


                  {/* *******************Slider*************** */}

               {  this.state.match == 1 ?  
               <div className='game-cards row'>
                    {this.state.allevents.map((events) => (
                      <>
                      {Number(events.teamtwoParticipate) > 0 && Number(events.teamOneParticipate) > 0 ? <div className="col" id={`${events.id}`}>
                        <div className="card game-card overflow-hidden"
                          onClick={() => this.handelSideMenu(events.id, events.teamone, events.teamtwo, events.endtime, events.poolsize, events.BettorsCount, events.subcategory, events.potential_wins, events.zero, events.one, events.two)
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
                              {Math.round((new Date()).getTime() / 1000) > events.endtime ? <img src={redDot} className="red-dot" width="12" /> : <img src={greenDot} className="me-2" width="12" />}
                            </div>
                            <div className="col-12 mt-4">
                              <h4 className="team-name">
                                {events.teamone}{' '}
                                <span className="theam-text-color">vs</span>{' '}
                                {events.teamtwo}
                              </h4>
                            </div>
                            <div className="col-12 mt-4">
                              <p className="theam-text-color m-0">
                                {events.subcategory}
                              </p>
                              <p className="theam-text-color m-0">Pool size</p>
                            </div>
                            <div className="col-6">
                              <h3>{Number(events.poolsize / 10 ** 18).toFixed(2)} BUSD</h3>
                            </div>
                            <div className="col-6">
                              <h5 className="text-end">
                                <img
                                  src={carbon_timer}
                                  className="me-2"
                                  width="18"
                                  style={{ verticalAlign: 'sub' }}
                                />
                                {this.getdays(events.endtime)} Days left
                              </h5>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-8">
                              <ul>
                                <li>{Number(events.zero).toFixed(2)}% &nbsp;&nbsp;{events.teamone}</li>
                                <li>{Number(events.one).toFixed(2)}% &nbsp;&nbsp;{events.teamtwo}</li>
                                {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                              </ul>
                            </div>
                            <div className="col-4 button-row gap-2">
                              <div><ImFire fill={events.isboosted ? "#fc9b00" : "#04c91e"}/></div>
                              <div className='text-white mb-1' style={{ fontSize: '10px' }}>OPEN</div>
                              <div><img src={PLUS} style={{ width: '10px' }} /></div>
                            </div>
                          </div>
                        </div>
                      </div>:''}
                    </>
                    ))}
                  </div> 

                  : this.state.match == 2 ? 

                  <div className='game-cards row'>
                    {this.state.allevents.map((events) => (
                      <>
                     {Number(events.teamtwoParticipate) == 0 || Number(events.teamOneParticipate) == 0 ? <div className="col" id={`${events.id}`}>
                        <div className="card game-card overflow-hidden"
                          onClick={() => this.handelSideMenu(events.id, events.teamone, events.teamtwo, events.endtime, events.poolsize, events.BettorsCount, events.subcategory, events.potential_wins, events.zero, events.one, events.two)
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
                              {Math.round((new Date()).getTime() / 1000) > events.endtime ? <img src={redDot} className="red-dot" width="12" /> : <img src={greenDot} className="me-2" width="12" />}
                            </div>
                            <div className="col-12 mt-4">
                              <h4 className="team-name">
                                {events.teamone}{' '}
                                <span className="theam-text-color">vs</span>{' '}
                                {events.teamtwo}
                              </h4>
                            </div>
                            <div className="col-12 mt-4">
                              <p className="theam-text-color m-0">
                                {events.subcategory}
                              </p>
                              <p className="theam-text-color m-0">Pool size</p>
                            </div>
                            <div className="col-6">
                              <h3>{Number(events.poolsize / 10 ** 18).toFixed(2)} BUSD</h3>
                            </div>
                            <div className="col-6">
                              <h5 className="text-end">
                                <img
                                  src={carbon_timer}
                                  className="me-2"
                                  width="18"
                                  style={{ verticalAlign: 'sub' }}
                                />
                                {this.getdays(events.endtime)} Days left
                              </h5>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-8">
                              <ul>
                                <li>{Number(events.zero).toFixed(2)}% &nbsp;&nbsp;{events.teamone}</li>
                                <li>{Number(events.one).toFixed(2)}% &nbsp;&nbsp;{events.teamtwo}</li>
                                {/* <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li> */}
                              </ul>
                            </div>
                            <div className="col-4 button-row gap-2">
                              <div><ImFire fill={events.isboosted ? "#fc9b00" : "#04c91e"}/></div>
                              <div className='text-white mb-1' style={{ fontSize: '10px' }}>OPEN</div>
                              <div><img src={PLUS} style={{ width: '10px' }} /></div>
                            </div>
                          </div>
                        </div>
                      </div>:''}
                      </>
                    ))}
                  </div> :''}
                </div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>V 2.0</h3>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default GameCard

