import React, { Component, Fragment } from 'react'
import greenDot from './../../../images/green-dot.png'
import cardBackground from './../../../images/ground.png'
import carbon_timer from './../../../images/carbon_timer.png'
import App from './../../pages/App/Index'
import Appheadercat from '../../pages/App/Appheadercat'
import AppHeader from '../../components/Elements/AppHeader'
import { getActiveEvents, getEvent, placeBet } from './../../../web3/betsMVPService'
import { initInstance } from './../../../web3/web3'
import redDot from './../../../images/red-dot.png'
import { event } from 'jquery'


class GameCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allevents: [],
      active:false,
      id:null,
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
      participant:0
    }
  }
  componentDidMount = async () => {
    await initInstance()
    const events = []
    let check
    let active_events = await getActiveEvents()

    for (let i = 0; i <= active_events.length; i++) {
      check = await getEvent(i)
      if (check[2] == 'Boxing') {
        events.push(check)
        this.setState({
          allevents: events,
        })
      }
      console.log('all events', this.state.allevents)
    }

  }

  closehandelSideMenu = () => {
    document.getElementById('sidebar').style.display = 'none'
  }


  handelSideMenu = (eventid, teamone,teamtwo, endtime, poolsize, bettercount) => {

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
      id:eventid,
      teamone:teamone,
      teamtwo:teamtwo,
      currenttime:lefttime,
      poolsize:poolsize,
      participant:bettercount
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

  placebet = async(id, team, amount) => {
    const betdata = {
      event_id: id,
      amount: parseInt(amount),
      occured: parseInt(team)
    }
    id = parseInt(id)
    team = parseInt(team)
    amount = parseInt(amount)
    try { 
    console.log('selection int',betdata);
    // let betcontract = await getBETMVPContract();
    // await betcontract.methods.placeBet(id,amount,team).call();
    // let ret = await placeBet(betdata);
    // console.log('placebet', ret)
  }
    catch(error){
        console.log(error)
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


  render() {
  
    return (
      <Fragment>
        <App/>
        <div className="sidebar" id="sidebar">
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
                              <span>Soccer</span>
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
                              <h3 className="mb-0">{this.state.poolsize}</h3>
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
                                    Participants:&nbsp;&nbsp; <span>{this.state.participant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>$2000</span>
                                  </p>
                                </div>
                                <div className="col-9 col-md-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '25%' }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-3 col-md-2 mb-4">
                                  <p className="percent m-0">55.5%</p>
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
                                    $0.00
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
                                    Participants:&nbsp;&nbsp; <span>{this.state.participant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>$2000</span>
                                  </p>
                                </div>
                                <div className="col-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '25%' }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-2 mb-4">
                                  <p className="percent m-0">55.5%</p>
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
                                    $0.00
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
                                    Participants:&nbsp;&nbsp; <span>{this.state.participant}</span>
                                  </p>
                                </div>
                                <div className="col-12 mb-2">
                                  <p>
                                    Total amount staked::&nbsp;&nbsp;{' '}
                                    <span>$2000</span>
                                  </p>
                                </div>
                                <div className="col-10 mb-4">
                                  <div className="progress">
                                    <div
                                      className="progress-bar"
                                      role="progressbar"
                                      style={{ width: '25%' }}
                                      aria-valuenow="25"
                                      aria-valuemin="0"
                                      aria-valuemax="100"
                                    ></div>
                                  </div>
                                </div>
                                <div className="col-2 mb-4">
                                  <p className="percent m-0">55.5%</p>
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
                                    $0.00
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
                                {events[7]}{' '}
                                <span className="theam-text-color">vs</span>{' '}
                                {events[8]}
                              </h4>
                            </div>
                            <div className="col-12 mt-4">
                              <p className="theam-text-color m-0">
                                {events[2]}
                              </p>
                              <p className="theam-text-color m-0">Pool size</p>
                            </div>
                            <div className="col-6">
                              <h3>{events[4]}</h3>
                            </div>
                            <div className="col-6">
                              <h5 className="text-end">
                                <img
                                  src={carbon_timer}
                                  className="me-2"
                                  width="18"
                                  style={{ verticalAlign: 'sub' }}
                                />
                                {this.getdays(events[6])} Days left
                              </h5>
                            </div>
                          </div>
                          <div className="row p-3">
                            <div className="col-8">
                              <ul>
                                <li>30% &nbsp;&nbsp;Chealsea</li>
                                <li>65% &nbsp;&nbsp;Machester City</li>
                                <li>5% &nbsp;&nbsp;&nbsp;&nbsp;Draw</li>
                              </ul>
                            </div>
                            <div className="col-4 button-row">
                              <button
                                className="btn"
                                onClick={() => this.handelSideMenu(events[0],events[7],events[8],events[6],events[4], events[13])
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
