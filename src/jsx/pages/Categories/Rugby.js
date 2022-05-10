import React, { Component, Fragment } from 'react'
import greenDot from './../../../images/green-dot.png'
import cardBackground from './../../../images/ground.png'
import carbon_timer from './../../../images/carbon_timer.png'
import App from './../../pages/App/Index'
import {placeBet, getEventOccurrenceBetAmount, totalEvents, bettorscounts, bettorscountspercent, AmountStackOnEventByaUser, cancelevent } from './../../../web3/betsMVPService'
import { TotalEventsCount, addingnewevents } from './../../../web3/Countallevents'
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

const tost =()=> toast.success('Success.', {
  style: {
    padding: '16px',
    color: '#000',
  },
  iconTheme: {
    primary: '#0b0b0b',
    secondary: '#ffffff',
  },
});



class GameCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allevents: [],
      active: false,
      id: null,
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
      match:0
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
    let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))

    decodestoredevents = JSON.parse(window.localStorage.getItem('events'))


    setInterval(async () => {
      await addingnewevents();
    }, 2000);
    setInterval(async () => {
      this.setState({
        match: window.match
      })
    }, 500);
    
    


    const events = []
    let check = []
    let check2


    for (let i = decodestoredevents.length - 1; i >= 0; i--) {
      check2 = decodestoredevents[i]

      if (check2.subcategory == 'Rubgy') {
        events.push(check2)
        this.setState({
          allevents: events,
        })
        console.log("check3", this.state.allevents)
      }
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

    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = endtime - ts
    lefttime = parseInt(Math.floor(lefttime / 3600) / 24);
    if (lefttime < 0) {
      lefttime = 0
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


  Onplacebet =async() => {
    try{
     const data =  await placeBet(this.state.id, this.state.occurance, this.state.stackvalueone)
     if(data.status){
      tost()
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
    var seconds =  (endime/1000)-current 
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


  render() {
   
    return (
      <Fragment>
        <App />
        <div><Toaster/></div>
        <div className="row gx-0">
          <div className="col-12">
            <div className="match-main-div">
              <div className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5">
                <div className="betting-cards" onClick={this.mouseclass}>

                  {/* *******************Slider*************** */}
                  <div className='sidebarNew shadow-lg me-auto gx-3' id="sidebar">
                    <div className="container-fluid category-title py-4">
                      <div className='d-flex justify-content-between'>
                        <div id="img-head">
                          <h4 className='fs-5'><GoPrimitiveDot style={{ color: "green" }} /> {this.state.category}</h4>
                          <span>{this.state.teamone} <span className='text-danger'>vs</span> {this.state.teamtwo}</span>
                        </div>
                        <div id="date"><p>25 Feb &nbsp;&nbsp;&nbsp;<span>2022</span></p></div>
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
                      {Number(events.teamtwoParticipate) > 0 && Number(events.teamOneParticipate) > 0 ? <div className="col">
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
                     {Number(events.teamtwoParticipate) == 0 || Number(events.teamOneParticipate) == 0 ? <div className="col">
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
            <h3>V 1.0</h3>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default GameCard

