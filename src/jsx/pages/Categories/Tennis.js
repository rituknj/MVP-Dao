import React, { Component, Fragment } from 'react'
import greenDot from './../../../images/green-dot.png'
import cardBackground from './../../../images/ground.png'
import carbon_timer from './../../../images/carbon_timer.png'
import App from './../../pages/App/Index'
import Appheadercat from '../../pages/App/Appheadercat'
import AppHeader from '../../components/Elements/AppHeader'
import { getActiveEvents, getEvent, placeBet, getEventOccurrenceBetAmount, totalEvents, bettorscounts, bettorscountspercent, AmountStackOnEventByaUser,cancelevent } from './../../../web3/betsMVPService'
import {TotalEventsCount,addingnewevents} from './../../../web3/Countallevents'
import {isapproved} from './../../../web3/betsService'
import { initInstance,getAccount } from './../../../web3/web3'
import { fromWei, formatNumber } from '../../../web3/utils'
import redDot from './../../../images/red-dot.png'
import BigInt from 'big-integer'
import { event } from 'jquery'


class GameCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allevents: [],
      active:false,
      id:null,
      zeroEventAmount:0,
      oneEventAmount:0,
      twoEventAmount:0,
      stackvalueone:0,
      stackvaluetwo:0,
      stackvaluethree:0,
      teamone:'',
      teamtwo:'',
      selectedteam:'',
      betvalue:0,
      onbetteam:'',
      currenttime:0,
      occurance:0,
      poolsize:0, 
      participant:0,
      category:null,
      eventoneparticipant:0,
      eventtwoparticipant:0,
      eventthreeparticipant:0,
      endtime:0,
      v:0,
      potential_wins:0,
      account:0,
      zero:0,
      one:0,
      two:0
    }
  }
  componentDidMount = async() => {
    await initInstance();
    let account = await getAccount()
    this.setState({
      account: account
    })
    let active_events = await totalEvents()
    let getstoredevents = window.localStorage.getItem('events')
    if(getstoredevents == null)
    {
      window.localStorage.setItem('events',JSON.stringify(''))
      await TotalEventsCount();
    }
    let decodestoredevents = JSON.parse(window.localStorage.getItem('events'))

    // if(decodestoredevents.length != active_events){
    //   console.log("runed")
    //   await TotalEventsCount();
    // }
    decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
    // console.log("what is this",decodestoredevents)

    setInterval(async() => { 
      // console.log("run every things")
      await addingnewevents();
    }, 2000);
    
    const events = []
    let check = []
    let check2
    
    
    for (let i = decodestoredevents.length-1; i >= 0; i--) {
      check2 = decodestoredevents[i]
  
      if (check2.subcategory == 'Tennis'){
        events.push(check2)
        this.setState({
          allevents: events,
        })
        console.log("check3", this.state.allevents)
      }
    }
  
  }
  closehandelSideMenu = () => {
    document.getElementById('sidebar').style.display = 'none'
  }

  cancelevent = async(id) => {
     await cancelevent(id)
  }

  handelSideMenu = async(eventid, teamone,teamtwo, endtime, poolsize, bettercount, category, potentialwins, zero, one, two) => {
    
    // console.log("potential win", potentialwins)
    await this.countbettors(eventid);
    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = endtime - ts
    lefttime = parseInt(Math.floor(lefttime/3600)/24);
    if(lefttime <  0){
      lefttime = 0
    }
    
    if(this.state.active === false){
      this.setState({
        onbetteam: teamone
      })
    }
    if(this.state.active === true){
      this.setState({
        onbetteam: teamtwo
      })
    }
    this.setState({
      zero:zero,
      one:one,
      two:two,
      endtime:endtime,
      category:category,
      id:eventid,
      teamone:teamone,
      teamtwo:teamtwo,
      currenttime:lefttime,
      poolsize:Number(poolsize/10**18).toFixed(2),
      participant:bettercount,
      potential_wins:potentialwins
    })
    
    document.getElementById('sidebar').style.display = 'inline';
  }

  setfalse =() =>{
    this.setState({
    occurance:0,
    betvalue: this.state.stackvalueone
    })
    
  }

  settrue =() =>{
    this.setState({
    occurance:1,
    betvalue: this.state.stackvaluetwo
  })
   
  }

  setdraw =() =>{
    this.setState({
    occurance:2,
    betvalue: this.state.stackvaluethree
  })
   
  }


  Onsubmit = (event) => {
    event.preventDefault()
    if(this.state.occurance==0){
      // console.log('selection str',this.state.id, this.state.onbetteam, this.state.stackvalueone);
      this.placebet(this.state.id, this.state.occurance, this.state.stackvalueone)
    }
    if(this.state.occurance==1){
      // console.log('selection str',this.state.id, this.state.onbetteam, this.state.stackvaluetwo);
      this.placebet(this.state.id, this.state.occurance, this.state.stackvaluetwo)
    }
    if(this.state.occurance==2){
      // console.log('selection str',this.state.id, this.state.onbetteam, this.state.stackvaluetwo);
      this.placebet(this.state.id, this.state.occurance, this.state.stackvaluethree)
    }
  }
  getdata = (v) => {
      // console.log("value",v)
  }

  countbettors = async(id) => {
    let one = await bettorscounts(id,0)
    let two = await bettorscounts(id,1)
    let three = await bettorscounts(id,2)
    let zeroamount = await getEventOccurrenceBetAmount(id, 0)
    let oneamount = await getEventOccurrenceBetAmount(id, 1)
    let twoamount = await getEventOccurrenceBetAmount(id, 2)
    this.setState({
    eventoneparticipant:one,
    eventtwoparticipant:two,
    eventthreeparticipant:three,
    zeroEventAmount:zeroamount,
    oneEventAmount:oneamount,
    twoEventAmount:twoamount
    })
    // console.log('participants', this.state.eventoneparticipant,this.state.eventtwoparticipant,this.state.eventthreeparticipant)
}

  placebet = async(id, team, amount) => {
    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = this.state.endtime - ts
    const betdata = {
      event_id: id,
      amount: amount,
      occured: team
    }
    try { 
    if(lefttime > 0)
    {
      await placeBet(betdata);
      window.location.reload(false);
    }

    else{
      alert("Event Time ended")
    }
    
  }
    catch(error){
      // alert(error.message)
    }
  }

  getdays = (endime) =>{
    var ts = Math.round((new Date()).getTime() / 1000);
    let lefttime = endime - ts
    
    lefttime = parseInt(Math.floor(lefttime/3600)/24);
    if(lefttime <  0){
      lefttime = 0
    }
    // console.log("time remaining",parseInt(lefttime/24), ts);
    return lefttime
  }

  moussecloas = (event) =>{
    let x = event.screenX;     
    let y = event.screenY;
    if(x>633){
      document.getElementById('sidebar').style.display = 'none';
    }
    console.log("position", x, y)
  }
  winningamount = (amountstake , poolsize) => {
      let totalstake =  poolsize + amountstake
      let winningspercents =  (amountstake/totalstake)*100
      let potentialwinnings = ((totalstake-amountstake)/100)*winningspercents
      if(isNaN(potentialwinnings)){
        potentialwinnings = 0
      }
      return Number(potentialwinnings+amountstake).toFixed(2)
      
  }


  render() {
    
    return (
      <Fragment>
        <App/>
        <div className="sidebar" id="sidebar" onClick={this.moussecloas}>
                        <div className="data-list" >
                          <form onSubmit={this.Onsubmit}>
                          <div
                            className="row p-3 image-card"
                            style={{
                              backgroundImage: `url(${cardBackground})`,
                            }}
                          >
                            <div className="layer"></div>
                            <div className="col-10 text-white top-text mb-3">
                              <img
                                src={greenDot}
                                className="me-4 mb-1"
                                width="14px"
                              />
                              <span>{this.state.category}</span>
                            </div>
                            <div
                              className="col-2 text-white text-end mb-3 close-btn"
                              onClick={() => this.closehandelSideMenu()}
                            >
                              <i className="fas fa-times"></i>
                            </div>
                            <div className="col-12 mt-4 mb-3">
                              <h4 className="team-name">
                                {this.state.teamone}{' '}
                                <span className="theam-text-color">vs</span>{' '}
                                {this.state.teamtwo}
                              </h4>
                              <h5>Event id {this.state.id}</h5>
                            </div>
                            <div className="col-12 mt-4 mb-3">
                              <p className="theam-text-color m-0">Pool size</p>
                            </div>
                            <div className="col-6">
                              <h3 className="mb-0">{this.state.poolsize} BETS</h3>
                            </div>
                            <div className="col-6">
                              <h5 className="text-end mb-0">
                                <img
                                  src={carbon_timer}
                                  className="me-3"
                                  width="23px"
                                  style={{ verticalAlign: 'sub' }}
                                />
                                {this.state.currenttime} Days left
                              </h5>
                            </div>
                          </div>
                          <div className="odds-list p-3">
                            <div className={`odds-card p-3 mb-3 ${this.state.occurance==0?'active':" "}`} onClick={() =>  this.setState({occurance:0}), () => this.setfalse()}>
                              <div className="row mb-3">
                                <div className="col-6">
                                  <h4>{this.state.teamone}</h4>
                                </div>
                                <div className="col-6 text-end">
                                  <img src={redDot} className="red-dot" />
                                </div>
                              </div>
                              <div className="row info">
                                <div className="col-12 mb-2">
                                  <p>
                                    Participants:&nbsp;&nbsp; <span>{this.state.eventoneparticipant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>{(Number(this.state.zeroEventAmount)/10**18).toFixed(2)}&nbsp;BETS</span>
                                  </p>
                                </div>
                                <div className="col-9 col-md-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: `${Number(this.state.zero).toFixed(2)}%` }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-3 col-md-2 mb-4">
                                  <p className="percent m-0">{Number(this.state.zero).toFixed(2)}%</p>
                                </div>
                              </div>
                              <div className="row form mt-3">
                                <div className="col-md-5">
                                  <p>Stake</p>
                                  <div className="position-relative">
                                    <input className="form-control" value={this.state.stackvalueone} onChange={(e) => this.setState({stackvalueone:e.target.value})}/>
                                    <span className="position-absolute max-btn">
                                      MAX
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-4">
                                  <p style={{ marginTop: '2.3rem' }}>
                                    Potential Return
                                  </p>
                                  <p
                                    style={{ fontSize: '24px' }}
                                    className="mb-0 mt-3"
                                  >
                                    {this.winningamount(Number(this.state.stackvalueone),Number(this.state.poolsize))}&nbsp;BETS
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={`odds-card p-3 mb-3 ${this.state.occurance==1?'active':" "}`} onClick={() => this.setState({occurance:1}) , () => this.settrue()}>
                              <div className="row ">
                                <div className="col-6">
                                  <h4>{this.state.teamtwo}</h4>
                                </div>
                                <div className="col-6 text-end">
                                  <img src={redDot} className="red-dot" />
                                </div>
                              </div>
                              <div className="row info">
                                <div className="col-12 mb-2">
                                  <p>
                                    Participants:&nbsp;&nbsp; <span>{this.state.eventtwoparticipant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>{(Number(this.state.oneEventAmount)/10**18).toFixed(2)}&nbsp;BETS</span>
                                  </p>
                                </div>
                                <div className="col-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: `${Number(this.state.one).toFixed(2)}%` }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-2 mb-4">
                                  <p className="percent m-0">{Number(this.state.one).toFixed(2)}%</p>
                                </div>
                              </div>
                              <div className="row form mt-3">
                                <div className="col-md-5">
                                  <p>Stake</p>
                                  <div className="position-relative">
                                    <input className="form-control" value={this.state.stackvaluetwo} onChange={(e) => this.setState({stackvaluetwo:e.target.value})} />
                                    <span className="position-absolute max-btn">
                                      MAX
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-4">
                                  <p style={{ marginTop: '2.3rem' }}>
                                    Potential Return
                                  </p>
                                  <p
                                    style={{ fontSize: '24px' }}
                                    className="mb-0 mt-3"
                                  >
                                    {this.winningamount(Number(this.state.stackvaluetwo),Number(this.state.poolsize))}&nbsp;BETS
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className={`odds-card p-3 mb-3 ${this.state.occurance==2?'active':" "}`} onClick={() => this.setState({occurance:1}) , () => this.setdraw()}>
                              <div className="row ">
                                <div className="col-6">
                                  <h4>Draw</h4>
                                </div>
                                <div className="col-6 text-end">
                                  <img src={redDot} className="red-dot" />
                                </div>
                              </div>
                              <div className="row info">
                                <div className="col-12 mb-2">
                                  <p>
                                    Participants:&nbsp;&nbsp; <span>{this.state.eventthreeparticipant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>{(Number(this.state.twoEventAmount)/10**18).toFixed(2)}&nbsp;BETS</span>
                                  </p>
                                </div>
                                <div className="col-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: `${Number(this.state.two).toFixed(2)}%` }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-2 mb-4">
                                  <p className="percent m-0">{Number(this.state.two).toFixed(2)}%</p>
                                </div>
                              </div>
                              <div className="row form mt-3">
                                <div className="col-md-5">
                                  <p>Stake</p>
                                  <div className="position-relative">
                                    <input className="form-control" value={this.state.stackvaluethree} onChange={(e) => this.setState({stackvaluethree:e.target.value})} />
                                    <span className="position-absolute max-btn">
                                      MAX
                                    </span>
                                  </div>
                                </div>
                                <div className="col-md-3"></div>
                                <div className="col-md-4">
                                  <p style={{ marginTop: '2.3rem' }}>
                                    Potential Return
                                  </p>
                                  <p
                                    style={{ fontSize: '24px' }}
                                    className="mb-0 mt-3"
                                  >
                                    {this.winningamount(Number(this.state.stackvaluethree),Number(this.state.poolsize))}&nbsp;BETS
                                  </p>
                                </div>
                              </div>
                            </div>

                          </div>
                          <div  className="bid-button p-3 mb-3">
                            <button type='submit' className="btn">PLACE BET</button>
                          </div>
                          </form>
                        </div>
                      </div>



        <div className="row">
          <div className="col-12">
            <div className="match-main-div">
            <div style={{textAlign:"center",backgroundColor:"#938585", height:'37px'}}>
            <h3 className='ml-3' style={{color:"white"}}>Tennis</h3>
            </div>
              <div className="theam-bg-dark mt-2 mt-md-5 p-1 p-md-5">
                <div className="row">

                  {this.state.allevents.map((events) => (
                      <div className="col-12 col-sm-12 col-md-6 col-lg-4">
                        
                        <div className="card game-card overflow-hidden">
                          <div
                            className="row p-3 image-card"
                            style={{
                              backgroundImage: `url(${cardBackground})`,
                            }}
                          >
                            <div class="layer"></div>
                            <div className="col-12 text-white">
                              <img src={greenDot} className="me-2" width="12" />
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
                              <h3>{Number(events.poolsize/10**18).toFixed(2)} BETS</h3>
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
                                <li>{Number(events.two).toFixed(2)}% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li>
                              </ul>
                            </div>
                            <div className="col-4 button-row gap-2">
                            {events.creator == this.state.account ? <button
                                className="btn"
                                onClick={() => this.cancelevent(events.id)
                                }
                              >
                              Cancel 
                            </button>:""}
                              <button
                                className="btn"
                                onClick={() => this.handelSideMenu(events.id, events.teamone, events.teamtwo, events.endtime, events.poolsize, events.BettorsCount, events.subcategory, events.potential_wins,events.zero,events.one,events.two)
                                }
                              >
                                BET
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
export default GameCard
