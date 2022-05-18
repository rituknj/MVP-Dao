import { createEvent } from './../../../web3/betsMVPService'
import React from 'react'
import { GoPrimitiveDot } from 'react-icons/go'
import toast, { Toaster } from 'react-hot-toast';
import { placeBet, UserEventHistory } from './../../../web3/betsMVPService'

const tost =(msg)=> toast.success(msg, {
  style: {
    padding: '16px',
    color: '#000',
  },
  iconTheme: {
    primary: '#0b0b0b',
    secondary: '#ffffff',
  },
});

const tostError =(error)=> toast.error(error);

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
  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  
  
  
  CreateEvent =async()=>{
    const starttime = parseInt((new Date(window.starttime).getTime()).toFixed(0),)
    const endtime = parseInt((new Date(window.endtime).getTime()).toFixed(0),)
    console.log(window.eventTitle)
    if(!window.eventTitle || window.eventTitle == ''){
      tostError("Please Enter Valid Event Title")
    }
    else if (!window.description || window.description == ''){
      tostError("Please Fill Discription")
      
    }
    else if (!this.validURL(window.url)){
      tostError("Please Enter Valid Url")
    }
    else if (window.outcome == 0 || window.outcome > 3 || !window.outcome){
      tostError("Outcome should be less than 3 and more than 1")
    }

    else if (!window.preferredoutcome || window.preferredoutcome == ''){
      tostError("Please Fill Valid Preferred Outcome")
      
    }
    else if (!window.oppossingoutcome || window.oppossingoutcome == ''){
      tostError("Please Fill Valid Preferred Outcome")
    }

    else if(starttime > endtime){
      tostError("StartTime can not be greater than EndTime")
    }
    else if (!window.anmount || window.anmount == 0) {
      tostError("Bet Amount should be greater than 0")
    }
    else{
      const data = await createEvent(window.subTitle,window.description,window.url,window.eventTitle,starttime,endtime,window.oppossingoutcome,window.preferredoutcome);  
      if(data.status){
        tost("Event Create Successfully")
        const id = await UserEventHistory()
        const placebetdata = await placeBet(id[id.length-1],0,window.anmount)
        console.log("palcebet",placebetdata )
        if(placebetdata.status){
          tost("Creator Bet Successfully")
        }
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
            <p className="fs-6 mb-2">{window.preferredoutcome}</p>
            <p>
              Participants: <span>0</span>
            </p>
            <p>
              Total amount betted: <span>${window.anmount}</span>
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
