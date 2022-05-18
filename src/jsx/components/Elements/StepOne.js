import React from "react";
window.subTitle = 'Cricket'

export class StepOne extends React.Component {
  constructor() {
    super();
    this.state = {
      eventtitle: "",
      category: "",
      subcategory: ""
    };
 
  }

  handleEvenTitleChanged(event) {
    this.setState({ eventtitle: event.target.value });
    window.eventTitle = event.target.value
  }
  handleCategoryChanged(event) {
    this.setState({ category: event.target.value });
  }
  handleSubCategoryChanged(event) {
   
    window.subTitle = event.target.value
   
  }
  handleCategoryChanged(event) {
   
    window.cat = event.target.value
   
  }
  handlediscriptionChanged(event) {
    window.description = event.target.value
   
  }
  handleurlChanged(event) {
    window.url = event.target.value
  }
  

  render() {
    
    return (
      <div>
        <h5>Create events on literally anything verifiable</h5>
        <div className="my-3">
          <label for="inputEventTitle" className="form-label">EVENT TITLE</label>
          <input type="text" className="form-control" id="inputEventTitle" aria-describedby="eventHelp" required value={window.eventTitle} onChange={(e)=>this.handleEvenTitleChanged(e)} autoFocus/>
        </div>
        {/* <div className="mb-3">
          <label for="inputCategory" className="form-label">CATEGORY</label>
          <input type="text" className="form-control" id="inputCategory" value={window.eventTitle} onChange={this.handleCategoryChanged} />
        </div> */}
        <div className="my-3">
          <label for="inputEventTitle" className="form-label">DESCRIPTION</label>
          <input type="text" className="form-control" id="inputEventTitle" aria-describedby="eventHelp" required value={window.description} onChange={(e)=>this.handlediscriptionChanged(e)} autoFocus/>
        </div>
        <div className="my-3">
          <label for="inputEventTitle" className="form-label">URL</label>
          <input type="url" className="form-control" id="inputEventTitle" aria-describedby="eventHelp" required value={window.url} onChange={(e)=>this.handleurlChanged(e)} autoFocus/>
        </div>
        <div className="mb-3">
          <label for="inputSubCategory" className="form-label">CATEGORY</label>
          <select
            className="form-select bg-dark border-0 text-light "
            id="specificSizeSelect"
            value={window.cat}
            onChange={(e)=>this.handleCategoryChanged(e)}
          >
            <option value="SPORTS">SPORTS</option>
            <option value="WEATHER">WEATHER</option>
            <option value="REALITY_TV_SHOWS">REALITY TV SHOWS</option>
            <option value="POLITICS">POLITICS</option>
            <option value="AWARDS">AWARDS</option>
            <option value="DEAD_POOL">DEAD POOL</option>
            <option value="GAMES">GAMES</option>
            <option value="MARKET_PREDICTION">MARKET PREDICTION</option>
            <option value="SPECIAL">SPECIAL</option>
          </select>
        </div>
        <div className="mb-3">
          <label for="inputSubCategory" className="form-label">SUB CATEGORY</label>
          <select
            className="form-select bg-dark border-0 text-light "
            id="specificSizeSelect"
            value={window.subTitle}
            onChange={(e)=>this.handleSubCategoryChanged(e)}
          >
            <option value="Cricket">Cricket</option>
            <option value="Soccer">Soccer</option>
            <option value="Tennis">Tennis</option>
            <option value="Rugby">Rugby</option>
            <option value="Football">Football</option>
            <option value="Hockey">Hockey</option>
            <option value="Boxing">Boxing</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
          </select>
        </div>
      </div>
    );
  }
}
