import { createEvent } from './../../../web3/betsMVPService'
import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'


export class StepFour extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: '',
      amount: 0
    }
    // this.handleCheckedChanged = this.handleCheckedChanged.bind(this)
  }

  handleBetAmountChanged(event) {
    window.anmount = event.target.value
  }
  CreateEvent =async()=>{
    const starttime = parseInt((new Date(window.starttime).getTime()).toFixed(0),)
    const endtime = parseInt((new Date(window.endtime).getTime()).toFixed(0),)
    await createEvent(window.subTitle,"","",window.eventTitle,starttime,endtime,window.oppossingoutcome,window.preferredoutcome);  
    console.log(window.subTitle,"","",window.eventTitle,starttime,endtime,window.oppossingoutcome,window.preferredoutcome)
  }

  render() {
    return (
      <div>
        <h5>Place a Bet on Your Preferred Outcome</h5>
        <div className="container selectBet">
          <p>PREFERRED OUTCOME</p>
          <div id={`betA`}>
            <p className="fs-6 mb-2">CHEALSEA</p>
            <p>
              Participants: <span>0</span>
            </p>
            <p>
              Total amount betted: <span>$0</span>
            </p>
            <GoPrimitiveDot
              style={{ position: 'absolute', top: '15px', right: '15px' }}
            />
          </div>
        </div>
        <div className="my-3">
          <label for="inputBetAmount" className="form-label">
            ENTER AMOUNT TO BET
          </label>
          <input
            type="number"
            className="form-control"
            id="inputBetAmount"
            onChange={this.handleBetAmountChanged}
            value={this.state.betamount}
          />
          <button
            className="btn"
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgb(0, 0, 0)',
              width: '100%',
              margin: '25px auto',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
            onClick={()=>this.CreateEvent()}
          >
            Create Event
          </button>
        </div>
      </div>
    )
  }
}
