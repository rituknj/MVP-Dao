import React, { Component, Fragment } from 'react'
import arrowDown from '../../../images/arrow-down.png'
import myBet from '../../../images/my-bet.png'
import greenArrow from '../../../images/green-arrow.png'
import { NavLink } from 'react-router-dom'
import BigInt, { max } from 'big-integer'
import logo from '../../../images/logo.png'
import {
  initInstance,
  loginProcess,
  disconnectWallet,
  getAccount,
  checkChain,
} from './../../../web3/web3'
import { getUSDTBalance, addUSDT } from './../../../web3/usdtService'
import { addBETS, getBETBalance, approve, isapproved } from './../../../web3/betsService'
import {
  getValidationPoint,
  earnvalidationpoints,
  revokevalidationpointsearning,
  claimpoints,
  totaltokenlocked,
  getusertotalwinnings,
  gettotaluserwageramount,
  getBetsHistory,
  getEvent,
  claimrewards,
  reclaimwager,
  AmountStackOnEventByaUser,
  GetUserWonAmountOnEvent,
  pendingpoint
} from './../../../web3/betsMVPService'
import { collapseToast } from 'react-toastify'
import './elements.css'
import AbstractModalHeader from 'react-bootstrap/esm/AbstractModalHeader'
import { width } from 'dom-helpers'

class AppHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      betbalanceinloop:0,
      myBetTab: 1,
      showMyBet: false,
      showMyBetHistory: false,
      balanceofUSDT: 0,
      acc: null,
      balanceBET: 0,
      validationpoint: 0,
      lockamount: 0,
      show: false,
      lockedbets: 0,
      totalwinnings: 0,
      totalwageramount: 0,
      bethistory: [],
      historyid:[],
      totalbetsmade: 0,
      userAmountstakedonanevent:0,
      userWoninEvent:0,
      bal:"BETS",
      showbalance:0,
      pendingvalidationpoints:0
    }
  }

  componentDidMount = async () => {
    let check = []
    let count = 0
    let balanceofBET = 0
    let point = 0
    let totalbetslocked
    let history = []
    let totalwageramount = 0
    let totalwinnings = 0
    let pendingvalidationpoints = 0
    await initInstance()
    await loginProcess()
    let balanceofUSD = await getUSDTBalance()
    let account = await getAccount()
    setInterval(async() => { 
      balanceofBET = await getBETBalance()
      point = await getValidationPoint()
      totalbetslocked = await totaltokenlocked()
      history = await getBetsHistory()
      totalwageramount = await gettotaluserwageramount()
      totalwinnings = await getusertotalwinnings()
      pendingvalidationpoints = await pendingpoint()
      this.setState({
        historyid: history,
        totalbetsmade: history.length,
        balanceBET: balanceofBET,
        validationpoint: point,
        lockedbets: totalbetslocked,
        totalwageramount: totalwageramount,
        totalwinnings: totalwinnings,
        pendingvalidationpoints:pendingvalidationpoints
      })
      // console.log('what is my balance',this.state.balanceBET)
    }, 100);

    
    let historyi = await getBetsHistory()
    
    console.log('len',history)

    historyi.forEach(async (element) => {
      let i = await getEvent(element)
      let x = Object.create(i)
      let won = await GetUserWonAmountOnEvent(element)
      x.won =  won
     
      check.push(x)
      this.setState({
        bethistory: check,
      })
    })
    console.log('final won', this.state.bethistory.won)
    console.log('bet won history', this.state.bethistory)
    this.setState({
      // totalbetsmade: count,
      // lockedbets: totalbetslocked,
    })
    // console.log('total bets locked', this.state.lockedbets)
    if (point > 0) {
      this.setState({
        show: true,
      })
    }
    this.setState({
      balanceofUSDT: balanceofUSD,
      acc: account,
    })
    console.log('USDT balance', balanceofUSD)
    console.log('BETS balance', balanceofBET)
    if(this.state.bal == 'BETS'){
      this.setState({
        showbalance:this.state.betbalanceinloop
      })
    }
    else{
      this.setState({
        showbalance: balanceofUSD
      })
    }
  }


  setbal =() => {
    if(this.state.bal == 'BETS'){
      this.setState({
        showbalance:this.state.balanceBET
      })
    }
    else{
      this.setState({
        showbalance: this.state.balanceofUSDT
      })
    }
  }

  // getvalidationpoints = async() => {
  //   const point = await getValidationPoint();
  //   this.setState({
  //     validationpoint:point
  //   })
  // }
  approveyourself = async () => {
    console.log('apprived run')
    await approve()
  }

  showid = (id) => {
    let uas = AmountStackOnEventByaUser(id)
    return uas
  }

  setHistory = () => {
    let items = []
    for (var i = 1; i <= 5; i++) {
      items.push(
        <div className="bet-card-custom mb-3">
          <div className="row">
            <div className="col-8">
              <h4 className="mb-4 w-100">Chealsea vs Machester City</h4>
              <div className="row mb-3 history-list">
                <div className="col-9">
                  <p className="m-0">Total amount staked:</p>
                </div>
                <div className="col-3">
                  <h4 className="m-0">$2000</h4>
                </div>
              </div>
              <div className="row mb-3 ">
                <div className="col-9">
                  <p className="m-0">Total amount won:</p>
                </div>
                <div className="col-3">
                  <h4 className="m-0">$2000</h4>
                </div>
              </div>
            </div>
            <div className="col-4">
              <p className="m-0 text-end w-100">ENDED</p>
            </div>
          </div>
        </div>,
      )
    }
    return items
  }

  handelClick = (tab) => {
    this.setState({
      myBetTab: tab,
    })
  }

  reclaimwagers = async(id, starttime) => {
    var ts = Math.round((new Date()).getTime() / 1000);
    let time = starttime - ts
    console.log("time",time, id )
      if(time < 0){
        try{
          await reclaimwager(id)
        }
        catch(e){
          alert(e.message)
        }
    }
    else{
      alert("Event time not elapse")
    }
  }

  // getUserStackAmountAnEvnet = async(id) => {
  //   let amount = await AmountStackOnEventByaUser(id)
  //   let wons = await GetUserWonAmountOnEvent(id)
  //   this.setState({
  //     userAmountstakedonanevent: Number(amount/10**18).toFixed(2),
  //     userWoninEvent: Number(wons/10**18).toFixed(2)
  //   })
  //   console.log("User won and amount", this.state.userWoninEvent, this.state.userAmountstakedonanevent)
  // }
  getUserStackAmountAnEvnet = async(id) => {
    return AmountStackOnEventByaUser(id).then(x => {
      return x
     }).catch(e =>{
       console.log(e)
     })
    // let wons = await GetUserWonAmountOnEvent(id)
    // this.setState({
    //   userAmountstakedonanevent: Number(amount/10**18).toFixed(2),
    //   userWoninEvent: Number(wons/10**18).toFixed(2)
    // })
    // console.log("User won and amount", amount)
   
  }
  // latestTime(id) {
  //     return new Promise((resolve, reject) => {
  //       AmountStackOnEventByaUser(id).then(bl => {
  //             console.log(bl.timestamp);
  //             console.log(typeof bl.timestamp.then == 'function');
  //             resolve(bl.timestamp);
  //         })
  //         .catch(reject);
  //     });
  // }

  claimrewardsamounts = async(id, endtime, isvalidate) => {
   
    var ts = Math.round((new Date()).getTime() / 1000);
    if(isvalidate==true){
      if(ts > endtime){
        try{
          await claimrewards(id)
        }
        catch(e){
          alert(e.message)
        }
      }
      else{
        alert("Event is not ended yet")
      }
    }
    else{
      alert("Evnet is not validated")
    }
  }


  showMyBet = () => {
    let showMyBet = this.state.showMyBet
    this.setState({
      showMyBet: showMyBet ? false : true,
      showMyBetHistory: false,
    })
  }
  showMyBetHistory = () => {
    let showMyBetHistory = this.state.showMyBetHistory
    this.setState({
      showMyBetHistory: showMyBetHistory ? false : true,
      showMyBet: false,
    })
  }
  hideEvent = () => {
    this.setState({
      showMyBetHistory: false,
      showMyBet: false,
    })
  }

  unlockamount = async () => {
    try {
      console.log('run')
      await revokevalidationpointsearning()
    } catch (error) {
      alert("Failed")
    }
  }

  lockamount = async (amount) => {
    let maxamount = await isapproved();
    let value = BigInt(amount*10**18)
    amount = value.value
    
    try {
      if(value.value < maxamount){
        await earnvalidationpoints(amount)
      }
      else{
        alert("Plases approve yourself for this much amount")
      }
      
    } catch (error) {
      alert("Failed")
    }
  }

  claimPoints = async () => {
    try {
      await claimpoints()
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
          aria-label="Fifth navbar example"
        >
          <div className="container-fluid">
            <a class="navbar-brand" href="#"></a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample05"
              aria-controls="navbarsExample05"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExample05">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><img src={logo} style={{height:'100px', width: '100px'}}/></li>
              </ul>
              <form>
                <ul className="navbar-nav" id="admin-navbar-nav">
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white mt-1"
                      to="/admin"
                      onClick={() => this.hideEvent()}
                    >
                      Admin
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white mt-1"
                      to="/app"
                      onClick={() => this.hideEvent()}
                    >
                      App
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white"
                      to="#"
                      onClick={() => this.showMyBet()}
                    >
                      My Bet {Number(this.state.balanceBET).toFixed(2)}
                      <img
                        src={arrowDown}
                        width="24px"
                        className={this.state.showMyBet ? 'rotate-element' : ''}
                      />
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white mt-1"
                      to="#"
                      onClick={() => this.showMyBetHistory()}
                    >
                      Wallet{' '}
                      <img
                        src={arrowDown}
                        width="24px"
                        className={`ms-2 ${
                          this.state.showMyBetHistory ? 'rotate-element' : ''
                        }`}
                      />
                    </NavLink>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
        {this.state.showMyBet ? (
          <div className="my-bet-slide" data-aos="fade-down">
            <div className="nav-tabs-slide d-flex justify-content-center align-items-center mt-3">
              <button
                className={`btn mx-2 ${
                  this.state.myBetTab == 1 ? 'active' : ''
                }`}
                onClick={() => this.handelClick(1)}
              >
                Active Bet
              </button>
              <button
                className={`btn mx-2 ${
                  this.state.myBetTab == 2 ? 'active' : ''
                }`}
                onClick={() => this.handelClick(2)}
              >
                Bet History
              </button>
            </div>
            {this.state.myBetTab == 1 ? (
              <div className="nav-tabs-data">
                <div className="p-3">
                  <div className="bet-card-custom mb-3">
                    <h4 className="mb-2">Total Bets Made</h4>
                    <p className="m-0">{this.state.totalbetsmade}</p>
                  </div>
                  <div className="bet-card-custom mb-3">
                    <h4 className="mb-2">Total amount staked</h4>
                    <p className="m-0">{Number(this.state.totalwageramount/10**18).toFixed(2)} BETS</p>
                  </div>
                  <div className="bet-card-custom">
                    <h4 className="mb-2">Total winnings</h4>
                    <p className="m-0">{Number(this.state.totalwinnings/10**18).toFixed(2)} BETS</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="nav-tabs-data">
                <div className="p-3">
                  {/* {this.setHistory()} */}
                {this.state.totalbetsmade == 0 ? <h1>You have not placed any bet yet</h1> :
                <>
                  {this.state.bethistory.map((items) => (
                    <div className="bet-card-custom mb-3" >
                      {console.log("123")}
                      <div className="row">
                        <div className="col-8">
                          <h4 className="mb-4 w-100">{items[3]}</h4>
                          <div className="row mb-3 history-list">
                            <div className="col-9">
                              <p className="m-0">Total amount staked:</p>
                            </div>
                            
                            <div className="col-3 betsflex" style={{display:'flex'}}>
                              <h4 className="m-0">
                                {Number(items[4]/(10**18)).toFixed(2)}&nbsp;&nbsp;BETS
                              </h4>
                            </div>
                          </div>
                          <div className="row mb-3 ">
                            <div className="col-9">
                              <p className="m-0">Total amount won:</p>
                            </div>
                            <div className="col-3 betsflex">
                              <h4 className="m-0">{Number(items.won/10**18).toFixed(2)}&nbsp;&nbsp;BETS</h4>
                            </div>
                          </div>
                          {/* <div className="row mb-3 ">
                            <div className="col-9">
                              <p className="m-0">Your staked amount:</p>
                            </div>
                            <div className="col-3">
                              <h4 className="m-0">{this.getUserStackAmountAnEvnet(items[0])}BETS</h4>
                            </div>
                          </div> */}
                        </div>
                        <div className="col-4">
                          <p className="m-0 text-end w-100">ENDED</p>
                        </div>
                      </div>
                      <button className="bethistory-claim" onClick={() => this.claimrewardsamounts(items[0], items[6], items[9])}>
                        Claim Rewards
                      </button>
                      <button
                        className="bethistory-claim"
                        style={{ marginLeft: '10px' }}
                        onClick={() => this.reclaimwagers(items[0], items[5])}
                      >
                        Refund Amount
                      </button>
                    </div>
                  ))}
                </>
                  }
                </div>
              </div>
            )}
          </div>
        ) : (
          ''
        )}

        {this.state.showMyBetHistory ? (
          <div className="my-wallet-slide" data-aos="fade-down">
            <div className="mt-5 wallet-info p-3">
              <div className="wallet-card p-3">
                <div className="d-flex mb-4">
                  <p className="w-100 m-0">BALANCE</p>
                  <select id="sel1" style={{backgroundColor:'transparent', color:'red',fontSize:'17px',textDecoration:'none',border:"none"}} value={this.state.bal} onChange={(e) => this.setState({bal:e.target.value})} onClick={()=> this.setbal()}>
                  <option >BETS</option>
                  <option >BUSD</option>
                  </select> 
                </div>
                <h2 className="mb-0">{Number(this.state.showbalance).toFixed(2)} {this.state.bal}</h2>
              </div>
              <div className="point-list mt-5">
                <h4 className="px-3">VALIDATION POINTS</h4>
                <hr />
              </div>
              <div className="point-list-data p-2 px-md-4 pt-5">
                <div className="mb-4">
                  <h4 className="">Total validation points earned</h4>
                  <p>{this.state.validationpoint}</p>
                  <h4 className="">Pending validation points</h4>
                  <p>{this.state.pendingvalidationpoints}</p>
                  {this.state.lockedbets > 0 ? (
                    <button
                      className="btn btn-danger"
                      style={{ backgroundColor: '#FF0000', color: '#000000' }}
                      onClick={() => this.claimPoints()}
                    >
                      Claim Points
                    </button>
                  ) : null}
                </div>
                <div className="mb-4">
                  <h4 className="">Total Token locked</h4>
                  <p>
                    {Number(this.state.lockedbets / 10 ** 18).toFixed(4)} BETS
                  </p>
                </div>
              </div>
              <div className="point-list-form p-2 px-md-4 pt-3">
                <div className="d-flex mb-4">
                  <p className="w-100">AMOUNT TO LOCK</p>
                  <p className="w-100 text-end">{this.state.lockamount} BETS</p>
                </div>
                <div className="position-relative">
                  <input
                    placeholder="amount"
                    value={this.state.lockamount}
                    onChange={(e) =>
                      this.setState({ lockamount: e.target.value })
                    }
                  />
                  <span className="position-absolute" style={{cursor:"pointer"}} onClick={() => this.setState({lockamount:this.state.balanceBET})}>MAX</span>
                </div>
                <div className="position-relative mt-4">
                  {/*add class "btn grey" when insufficient balance  */}
                  <button
                    className="btn"
                    onClick={() => this.lockamount(this.state.lockamount)}
                  >
                    Lock tokens
                  </button>
                  {this.state.lockedbets > 0 ? (
                    <button
                      className="btn mt-4"
                      onClick={() => this.unlockamount()}
                    >
                      Unlock Token
                    </button>
                  ) : null}
                  <button
                    className="btn mt-4"
                    onClick={() => this.approveyourself()}
                  >
                    Approve Yourself
                  </button>
                </div>
              </div>

              {/* <div className="mb-4">
                <h4 className="">Unlock amount</h4>
                <button className="btn" onClick={() => this.unlockamount()} >Unlock Token</button>
              </div> */}
            </div>
          </div>
        ) : (
          ''
        )}
      </Fragment>
    )
  }
}
export default AppHeader
