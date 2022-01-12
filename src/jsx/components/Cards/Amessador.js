import React, { Component, Fragment } from "react";
import darkImage from "../../../images/dark-img.png";

class AMESSADOR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:this.props.img
        }

    }

    componentDidMount = async() => { 
        // console.log("partners",this.state.img)
    };

    Handleprops = async() => {
      
    }

    render() {
        return (
            <Fragment>
               {this.state.img != undefined ? <div
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-easing="linear"
                >
                    <img src={this.state.img.logo.full_url} width="100" />
                </div> :''} 
            </Fragment>
        );
    }
}
export default AMESSADOR;
