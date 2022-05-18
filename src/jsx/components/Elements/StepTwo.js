import React from "react";
window.FILL = false

export class StepTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      outcomecount: "",
      prefferedoutcome: "",
      opposingoutcome: ""
    };
  }

  handleOutcomeCountChanged(event) {
    this.setState({ outcomecount: event.target.value });
    window.outcome = event.target.value
  }
  handlePreferredOutcomeChanged(event) {
    this.setState({ prefferedoutcome: event.target.value });
    window.preferredoutcome = event.target.value

  }
  handleOpposingOutcomeChanged(event) {
    this.setState({ opposingoutcome: event.target.value });
    window.oppossingoutcome = event.target.value
  }


  render() {
    window.eventTitle2 = undefined
    window.description2 = undefined
    window.url2 = undefined

    window.outcome2 = window.outcome
    window.preferredoutcome2 = window.preferredoutcome
    window.oppossingoutcome2 = window.oppossingoutcome
    
    setInterval(()=>{
      window.FILL = false
      if(window.outcome2 && window.preferredoutcome2 && window.oppossingoutcome2){
          window.FILL = true
      }
  },200)
    
    return (
      <div>
        <h5>Enter the possible outcomes of the event</h5>
        <div className="my-3">
          <label for="inputOutcomeCount" className="form-label">NUMBER OF OUTCOMES</label>
          <input type="number" className="form-control" id="inputOutcomeCount" aria-describedby="eventHelp" onChange={(e)=>this.handleOutcomeCountChanged(e)} value={window.outcome} autoFocus/>
        </div>
        <div className="mb-3">
          <label for="inputPreferredOutcome" className="form-label">PREFERRED OUTCOME</label>
          <input type="text" className="form-control" id="inputPreferredOutcome" onChange={(e)=>this.handlePreferredOutcomeChanged(e)} value={window.preferredoutcome}/>
        </div>
        <div className="mb-3">
          <label for="inputOpposingOutcome" className="form-label">OPPOSING OUTCOME</label>
          <input type="text" className="form-control" id="inputOpposingOutcome" onChange={(e)=>this.handleOpposingOutcomeChanged(e)} value={window.oppossingoutcome} />
        </div>
      </div>
    );
  }
}
