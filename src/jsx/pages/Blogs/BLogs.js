import React, { Component, Fragment } from "react";
import Header from '../../components/Elements/Header'
import Footer from '../../components/Elements/Footer'

class BLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs:0,
           
        };
    }


    componentDidMount = async() => {
        console.log(this.props.location.query.updated)
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer Nv0ftzZGsdUuPsXPYJcAZ1DHEMKs5zqawWFlRRDv");
        var requestOptions = {
         method: 'GET',
         headers: myHeaders,
         redirect: 'follow'
     };

    await fetch(`https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/in-house-articles/${this.props.location.query.id}`, requestOptions)
        .then(response => response.json())
        .then(result => this.setState({blogs:result}))
        .catch(error => console.log('error', error));
        if(this.state.blogs != undefined){
            console.log(this.state.blogs.image.full_url)
        }  
    };


    render() {
        return (
            <Fragment>
                <Header/>
                {this.state.blogs != undefined ? <div className="blogbody">
                    <div className="blogtitle">
                        <h1 className="blogtext">{this.state.blogs.title}</h1>
                    </div>
                    <div className="blogimg" style={{textAlign:'center'}}>
                         <img src={`${this.props.location.query.image}`} style={{height:'auto', maxWidth:'70%'}}/> : 
                    </div>
                    <div className="blogartical">
                     <p className="blogtext">{this.state.blogs.excerpt}</p>
                    </div>
                </div> :' '}
            
                {this.state.blogs != undefined ? <p className="updated">Created on {this.props.location.query.updated.slice(0,10)}</p>:''}
                <Footer/>
            </Fragment>
        );
    }
}
export default BLogs;
