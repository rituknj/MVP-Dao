import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import arrowRight from "../../../images/arrow-right.svg";
class ExternalBlog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs:this.props.blogs,
        }
    }

    componentDidMount = async() => { 
       
    };



    render() {
        return (
            <Fragment>
                {this.state.blogs != undefined ? <div className="card game-card overflow-hidden game-news-card">
                    <div className="row image-card">
                        <div className="col-12 text-white">
                            <img src={this.state.blogs.image.full_url} style={{height:'300px', width:'100%'}}/>
                        </div>
                        <div className="col-12 bg-black">
                            <h6 className="px-2 m-0 py-1">
                                {this.state.blogs.title}
                            </h6>
                        </div>
                    </div>
                    
                    <p style={{padding:'10px'}}>{this.state.blogs.excerpt.substring(0, 90)}...</p>
                    <div className="row px-2 mt-2 py-1">
                        <div className="col-6">
                            <p className="text-start theam-text-color mb-1">
                               {this.state.blogs.source}
                            </p>
                            <p className="text-start">
                                Published on {this.state.blogs.published_at.substring(0,10)}
                            </p>
                        </div>
                        <div className="col-6">
                        <p className="text-start theam-text-color">
                             
                            </p>
                            <a  href="#" target='_blank' style={{textDecoration:'none'}} >  <p className="text-end">
                             <Link style={{textDecoration:'none',color:'#ffff'}}  to={{pathname: `/blogs`, query:{id:this.state.blogs.id,updated:this.state.blogs.date,image:this.state.blogs.image.full_url,body:this.state.blogs.body,categories:this.state.blogs.category}}}> Read  <img src={arrowRight} className="ms-3" width="20" /></Link> 
                        </p></a>
                        </div>
                    </div>
                </div>:''}
            </Fragment>
        );
    }
}
export default ExternalBlog;