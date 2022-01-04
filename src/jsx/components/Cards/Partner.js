import React, { Component, Fragment } from "react";
import darkImage from "../../../images/dark-img.png";

class PARTNET extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:this.props.img
        }

    }

    componentDidMount = async() => { 
        this.Handleprops();
    };

    Handleprops = async() => {
      
        if(this.state.news != undefined){
            console.log("data img ", this.state.img)
        }
    }

    render() {
        return (
            <Fragment>
               {this.state.img != undefined ? <div
                  data-aos="zoom-in"
                  data-aos-duration="400"
                  data-aos-easing="linear"
                >
                    <img src={`https://betswamp-strapi-ckkbf.ondigitalocean.app${this.state.img.attributes.Image.data.attributes.url}`} width="100" />
                </div> :''} 
            </Fragment>
        );
    }
}
export default PARTNET;
