import React, { Component, Fragment } from "react";
import arrowDown from "../../../images/arrow-down.png";
import myBet from "../../../images/my-bet.png";
import greenArrow from "../../../images/green-arrow.png";
import { NavLink } from "react-router-dom";
import { initInstance, loginProcess, disconnectWallet, getAccount, checkChain } from './../../../web3/web3';
import { getUSDTBalance, addUSDT } from './../../../web3/usdtService';
import { addBETS, getBETBalance } from './../../../web3/betsService';
import { getValidationPoint, earnvalidationpoints, revokevalidationpointsearning, claimpoints, totaltokenlocked, getusertotalwinnings, gettotaluserwageramount, getBetsHistory, getEvent } from './../../../web3/betsMVPService';
import { collapseToast } from "react-toastify";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myBetTab: 1,
      showMyBet: false,
      showMyBetHistory: false,
      balanceofUSDT: 0,
      acc: null,
      balanceBET: 0,
      validationpoint:0,
      lockamount:0,
      show:false,
      lockedbets:0,
      totalwinnings:0,
      totalwageramount: 0,
      bethistory:[]
    }
  }

  componentDidMount = async () => { 
    let check =[ ]
    await initInstance();
    await loginProcess();
    let balanceofUSD = await getUSDTBalance();
    let account = await getAccount();
    let balanceofBET = await getBETBalance();
    const point = await getValidationPoint();
    let totalbetslocked= await totaltokenlocked();
    let totalwinnings = await getusertotalwinnings();
    let totalwageramount = await gettotaluserwageramount() 
    let history = await getBetsHistory()
    

    history.forEach(async element => {
      let i = await getEvent(element)
      check.push(i)
      this.setState({
        bethistory: check
      })
      console.log('history', this.state.bethistory)
    });

    

    this.setState({
      lockedbets: totalbetslocked,
      totalwinnings: totalwinnings,
      totalwageramount: totalwageramount
    })
    // console.log('total bets locked', this.state.lockedbets)
    if(point > 0){
      this.setState({
        show:true
      })
    }
    this.setState({
      validationpoint:point,
      balanceofUSDT: balanceofUSD,
      acc:account,
      balanceBET: balanceofBET
    });
    console.log("USDT balance", balanceofUSD)
    console.log("BETS balance", balanceofBET)
  };

  // getvalidationpoints = async() => {
  //   const point = await getValidationPoint();
  //   this.setState({
  //     validationpoint:point
  //   })
  // }

  setHistory = () => {
    
    let items = [];
    for (var i = 1; i <= 5; i++) {

      items.push(<div className="bet-card-custom mb-3">
        <div className="row">
          <div className="col-8">
            <h4 className="mb-4 w-100">Chealsea  vs  Machester City</h4>
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
      </div>);
    }
    return items;
  }

  handelClick = (tab) => {
    this.setState({
      myBetTab: tab
    })
  }
  showMyBet = () => {
    let showMyBet = this.state.showMyBet
    this.setState({
      showMyBet: (showMyBet) ? false : true,
      showMyBetHistory: false
    })
  }
  showMyBetHistory = () => {
    let showMyBetHistory = this.state.showMyBetHistory
    this.setState({
      showMyBetHistory: (showMyBetHistory) ? false : true,
      showMyBet: false
    })
  }
  hideEvent = () => {
    this.setState({
      showMyBetHistory:false,
      showMyBet: false
    })
  }

  unlockamount = async() => {
    try{
      await revokevalidationpointsearning();
    }
    catch(error){
      console.log(error)
    }
  }

  lockamount = async(amount) => {
    try{
    await earnvalidationpoints(amount)
    }
    catch(error){
      console.log(error);
    }  
  }

  claimPoints = async() => {
    try{
      await claimpoints()
    }
    catch(error){
      console.log(error)
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
              <form>
                <ul className="navbar-nav" id="admin-navbar-nav">
                  <li className="nav-item px-2">
                    <NavLink className="nav-link text-white mt-1" to="/admin" onClick={() => this.hideEvent()}>
                      Admin
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link text-white mt-1" to="/app" onClick={() => this.hideEvent()}>
                      App
                    </NavLink>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link text-white" to="#" onClick={() => this.showMyBet()}>
                      My Bet{" "}
                      {this.state.balanceBET}
                      <img src={arrowDown} width="24px" className={(this.state.showMyBet) ? 'rotate-element' : ''} />
                    </NavLink>

                  </li>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link text-white mt-1" to="#" onClick={() => this.showMyBetHistory()}>
                      Wallet{" "}
                      <img src={arrowDown} width="24px" className={`ms-2 ${(this.state.showMyBetHistory) ? 'rotate-element' : ''}`} />
                    </NavLink>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
        {(this.state.showMyBet) ? <div className="my-bet-slide" data-aos="fade-down">
          <div className="nav-tabs-slide d-flex justify-content-center align-items-center mt-3">
            <button className={`btn mx-2 ${(this.state.myBetTab == 1) ? 'active' : ''}`} onClick={() => this.handelClick(1)}>Active Bet</button>
            <button className={`btn mx-2 ${(this.state.myBetTab == 2) ? 'active' : ''}`} onClick={() => this.handelClick(2)}>Bet History</button>
          </div>
          {(this.state.myBetTab == 1) ? <div className="nav-tabs-data">
            <div className="p-3">
              <div className="bet-card-custom mb-3">
                <h4 className="mb-2">Total Bets Made</h4>
                <p className="m-0">
                  0
                </p>
              </div>
              <div className="bet-card-custom mb-3">
                <h4 className="mb-2">Total amount staked</h4>
                <p className="m-0">{this.state.totalwageramount} BETS</p>
              </div>
              <div className="bet-card-custom">
                <h4 className="mb-2">Total winnings</h4>
                <p className="m-0">{this.state.totalwinnings} BETS</p>
              </div>
            </div>
            {/* <h5 className="mx-3 mb-0">History</h5>
            <hr className="mb-0 mt-2" />
            <div className="p-3">
             
            </div> */}
          </div> : <div className="nav-tabs-data">
            <div className="p-3">
              {/* {this.setHistory()} */}

          {this.state.bethistory.map(items =>    <div className="bet-card-custom mb-3">
            <div className="row">
          <div className="col-8">
            <h4 className="mb-4 w-100">{items[3]}</h4>
            <div className="row mb-3 history-list">
              <div className="col-9">
                <p className="m-0">Total amount staked:</p>
              </div>
              <div className="col-3">
                <h4 className="m-0">{items[4]} BETS</h4>
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
      </div>)}

            </div>
          </div>}
        </div> : ""}

        {(this.state.showMyBetHistory) ? <div className="my-wallet-slide" data-aos="fade-down">
          <div className="mt-5 wallet-info p-3">
            <div className="wallet-card p-3">
              <div className="d-flex mb-4">
                <p className="w-100 m-0">BALANCE</p>
                <h4 className="w-100 m-0 text-end">
                  <img src={greenArrow} width="auto" className="me-3" />
                  USDT
                </h4>
              </div>
              <h2 className="mb-0">2.49882340 USDT</h2>
            </div>
            <div className="point-list mt-5">
              <h4 className="px-3">VALIDATION POINTS</h4>
              <hr />
            </div>
            <div className="point-list-data p-2 px-md-4 pt-5">
              <div className="mb-4">
                <h4 className="">Total validation points earned</h4>
                <p>{this.state.validationpoint}</p>
                {this.state.show?<button className="btn btn-danger" style={{backgroundColor:"#FF0000", color:'#000000'}} onClick={() => this.claimPoints()}>Claim Points</button>:null}
              </div>
              <div className="mb-4">
                <h4 className="">Total Token locked</h4>
                <p>{this.state.lockedbets} BETS</p>
              </div>
            </div>
            <div className="point-list-form p-2 px-md-4 pt-3">
              <div className="d-flex mb-4">
                <p className="w-100">AMOUNT TO LOCK</p>
                <p className="w-100 text-end">{this.state.lockamount} BETS</p>
              </div>
              <div className="position-relative">
                <input placeholder='amount' value={this.state.lockamount} onChange={(e) => this.setState({lockamount:e.target.value})}/>
                <span className="position-absolute">MAX</span>
              </div>
              <div className="position-relative mt-4">
                {/*add class "btn grey" when insufficient balance  */}
                <button className="btn" onClick={() => this.lockamount(this.state.lockamount)}>Lock tokens</button>
               {this.state.show?<button className="btn mt-4" onClick={() => this.unlockamount()}>Unlock Token</button>:null}
              </div>
            </div>
            {/* <div className="mb-4">
                <h4 className="">Unlock amount</h4>
                <button className="btn" onClick={() => this.unlockamount()} >Unlock Token</button>
              </div> */}
          </div>
        </div> : ""}

      </Fragment>
    );
  }
}
export default AppHeader;
