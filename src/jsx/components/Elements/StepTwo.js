import React from "react";

export class StepTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      outcomecount: "",
      prefferedoutcome: "",
      opposingoutcome: ""
    };
    this.handleOutcomeCountChanged = this.handleOutcomeCountChanged.bind(this);
    this.handlePreferredOutcomeChanged = this.handlePreferredOutcomeChanged.bind(this);
    this.handleOpposingOutcomeChanged = this.handleOpposingOutcomeChanged.bind(this);
  }

  handleOutcomeCountChanged(event) {
    this.setState({ outcomecount: event.target.value });
  }
  handlePreferredOutcomeChanged(event) {
    this.setState({ prefferedoutcome: event.target.value });
  }
  handleOpposingOutcomeChanged(event) {
    this.setState({ opposingoutcome: event.target.value });
  }

  render() {
    return (
      <div>
        <h5>Enter the possible outcomes of the event</h5>
        <div className="my-3">
          <label for="inputOutcomeCount" className="form-label">NUMBER OF OUTCOMES</label>
          <input type="text" className="form-control" id="inputOutcomeCount" aria-describedby="eventHelp" onChange={this.handleOutcomeCountChanged} value={this.state.outcomecount} autoFocus/>
        </div>
        <div className="mb-3">
          <label for="inputPreferredOutcome" className="form-label">PREFERRED OUTCOME</label>
          <input type="text" className="form-control" id="inputPreferredOutcome" onChange={this.handlePreferredOutcomeChanged} value={this.state.prefferedoutcome}/>
        </div>
        <div className="mb-3">
          <label for="inputOpposingOutcome" className="form-label">OPPOSING OUTCOME</label>
          <input type="text" className="form-control" id="inputOpposingOutcome" onChange={this.handleOpposingOutcomeChanged} value={this.state.opposingoutcome} />
        </div>
      </div>
    );
  }
}
