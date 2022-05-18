import React from "react";


export class StepThree extends React.Component {
  constructor() {
    super();
    this.state = {
      startdate: "",
      enddate: ""
    };
    this.handleStartDateChanged = this.handleStartDateChanged.bind(this);
    this.handleEndDateChanged = this.handleEndDateChanged.bind(
      this
    );
  }

  handleStartDateChanged(event) {
    this.setState({ startdate: event.target.value });
    window.starttime = parseInt((new Date(event.target.value).getTime() / 1000).toFixed(0),)
  }

  handleEndDateChanged(event) {
    this.setState({ enddate: event.target.value });
    window.endtime = parseInt((new Date(event.target.value).getTime() / 1000).toFixed(0),)
  }

  render() {
  //   window.outcome2 = undefined
  //   window.preferredoutcome2 = undefined
  //   window.oppossingoutcome2 = undefined

  //   window.starttime2 = window.starttime
  //   window.endtime2 = window.endtime

  //   setInterval(()=>{
      
  //     if(window.starttime2 && window.endtime2){
  //         window.FILL = true
  //     }
  // },200)

    return (
      <div>
        <h5>Enter the starting and ending date for the event</h5>
        <div className="my-3">
          <label for="inputStartDate" className="form-label">STARTING DATE/TIME</label>
          <input type="datetime-local" className="form-control" id="inputStartDate" aria-describedby="eventHelp" onChange={(e)=>this.handleStartDateChanged(e)} value={this.state.startdate} autoFocus/>
        </div>
        <div className="mb-3">
          <label for="inputEndDate" className="form-label">ENDING DATE/TIME</label>
          <input type="datetime-local" className="form-control" id="inputEndDate" onChange={(e)=>this.handleEndDateChanged(e)} value={this.state.enddate}/>
        </div>
      </div>
    );
  }
}
