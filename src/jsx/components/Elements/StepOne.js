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
    this.handleEvenTitleChanged = this.handleEvenTitleChanged.bind(this);
    this.handleCategoryChanged = this.handleCategoryChanged.bind(this);
    this.handleSubCategoryChanged = this.handleSubCategoryChanged.bind(this);
  }

  handleEvenTitleChanged(event) {
    this.setState({ eventtitle: event.target.value });
    window.eventTitle = event.target.value
  }
  handleCategoryChanged(event) {
    this.setState({ category: event.target.value });
  }
  handleSubCategoryChanged(event) {
    this.setState({ subcategory: event.target.value });
    window.subTitle = event.target.value
  }

  render() {
    return (
      <div>
        <h5>Create events on literally anything verifiable</h5>
        <div className="my-3">
          <label for="inputEventTitle" className="form-label">EVENT TITLE</label>
          <input type="text" className="form-control" id="inputEventTitle" aria-describedby="eventHelp" onChange={this.handleEvenTitleChanged} value={this.state.eventtitle} autoFocus/>
        </div>
        <div className="mb-3">
          <label for="inputCategory" className="form-label">CATEGORY</label>
          <input type="text" className="form-control" id="inputCategory" onChange={this.handleCategoryChanged} value={this.state.category}/>
        </div>
        <div className="mb-3">
          <label for="inputSubCategory" className="form-label">SUB CATEGORY</label>
          <select
            className="form-select bg-dark border-0 text-light "
            id="specificSizeSelect"
            onChange={this.handleSubCategoryChanged}
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
