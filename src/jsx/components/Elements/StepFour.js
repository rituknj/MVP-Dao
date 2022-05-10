import { createEvent } from './../../../web3/betsMVPService'
import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import toast, { Toaster } from 'react-hot-toast';
import { placeBet, UserEventHistory } from './../../../web3/betsMVPService'

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

export class StepFour extends React.Component {
  constructor() {
    super()
    this.state = {
      checked: '',
      amount: 0,
      modelshow: true
    }
    // this.handleCheckedChanged = this.handleCheckedChanged.bind(this)
  }

  handleBetAmountChanged(event) {
    window.anmount = event.target.value
  }
  
  
  CreateEvent =async()=>{
    const starttime = parseInt((new Date(window.starttime).getTime()).toFixed(0),)
    const endtime = parseInt((new Date(window.endtime).getTime()).toFixed(0),)
    const data = await createEvent(window.subTitle,window.description,window.url,window.eventTitle,starttime,endtime,window.oppossingoutcome,window.preferredoutcome);  
    if(data.status){
      tost()
      const id = await UserEventHistory()
      const placebetdata = await placeBet(id[id.length-1],0,window.anmount)
      console.log("palcebet",placebetdata )
      if(placebetdata.status){
        tost()
      }
    }
  }

  render() {
    return (
      <div>
        <div><Toaster/></div>
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
            onChange={(e)=>this.handleBetAmountChanged(e)}
            value={window.anmount}
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
