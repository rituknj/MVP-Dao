import React, { Component, Fragment } from "react";
import darkImage from "../../../images/dark-img.png";
import carbon_timer from "../../../images/carbon_timer.png";
import arrowRight from "../../../images/arrow-right.svg";
class NewsCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news:this.props.news,
            link:'sss',
            title:'',
            summery:''
        }
    }

    componentDidMount = async() => { 
        await this.Handleprops();
    };

    Handleprops = async() => {
        if(this.state.news != undefined){
            this.setState({
                link:this.state.news.attributes.Link,
                title:this.state.news.attributes.Title,
                summery:this.state.news.attributes.Summary
            })
            console.log("received data", this.state.news.attributes)
        }
    }

    render() {
        return (
            <Fragment>
                {this.state.news != undefined ? <div className="card game-card overflow-hidden game-news-card">
                    <div className="row image-card">
                        <div className="col-12 text-white">
                            <img src={darkImage} width="100%" />
                        </div>
                        <div className="col-12 bg-black">
                            <h6 className="px-2 m-0 py-1">
                                {this.state.news.attributes.Title}
                            </h6>
                        </div>
                    </div>
                    
                    <p style={{padding:'10px'}}>{this.state.news.attributes.Summary.substring(0, 90)}...</p>
                    <div className="row px-2 mt-2 py-1">
                        <div className="col-6">
                            <p className="text-start theam-text-color mb-1">
                                Yahoo finance
                            </p>
                            <p className="text-start">
                                <img src={carbon_timer} className="me-2 time-img" width="20" /> Created on {this.state.news.attributes.createdAt.substring(0,10)}
                            </p>
                        </div>
                        <div className="col-6">
                        <p className="text-start theam-text-color">
                             
                            </p>
                            <a  href={this.state.news.attributes.Link} target='_blank' style={{textDecoration:'none'}} >  <p className="text-end">
                                Read  <img src={arrowRight} className="ms-3" width="20" />
                            </p></a>
                        </div>
                    </div>
                </div>:''}
            </Fragment>
        );
    }
}
export default NewsCard;
