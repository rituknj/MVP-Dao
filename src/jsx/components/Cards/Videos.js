import React, { Component, Fragment } from "react";
import darkImage from "../../../images/dark-img.png";
import YouTube from 'react-youtube';

class VIDEO extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img:this.props.img,
            isOpen:false,
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
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: {
              // https://developers.google.com/youtube/player_parameters
              autoplay: 1,
            },
          };
        return (
            <Fragment>
                <div className="container-fluid px-md-5" id="section-analytics">
                    <div className="row py-5">
                        <div className="col-lg-12 position-relative" id="video-frame">
                            <video poster="placeholder.png" controls={false}>
                                <source src="movie.mp4" type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                            </video>
                            {this.state.isOpen ? 
                            <YouTube videoId="KWLdJQR_4pA" id="play-video" className="playing_video" opts={opts} onReady={this._onReady} /> 
                            : <a id="play-video" className="video-play-button " onClick={() => this.setState({isOpen:true})}>
                                <span></span>
                            </a>}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default VIDEO;
