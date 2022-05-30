import React, { Component, Fragment } from "react";
import Header from "../../components/Elements/Header";
import Footer from "../../components/Elements/Footer";
import arrowRight from "./../../../images/arrow-right.svg";
import { themesList } from "web3modal";
import { Link } from "react-router-dom";
class NEWPAGE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news:[1,2,3,4,5],
            InHouse:[]
        }
    }

    componentDidMount = async() => { 
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer Nv0ftzZGsdUuPsXPYJcAZ1DHEMKs5zqawWFlRRDv");
         var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
      };
      await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/in-house-articles", requestOptions)
         .then(response => response.json())
         .then(result => this.setState({InHouse:result}))
       .catch(error => console.log('error', error));
       console.log("in house", this.state.InHouse)


    await fetch("https://admin.fomolaunch.app/api/1e124355acb64ffbb39fc774b8d1c30b/external-articles", requestOptions)
       .then(response => response.json())
       .then(result => this.setState({news:result}))
     .catch(error => console.log('error', error));
     console.log("external ", this.state.news)
   
    };

   

    render() {
        return (
            <Fragment>
                <Header/>
                <div className="newpagecard" style={{display:'flex',justifyContent:'center',gap:'20px',flexWrap:'wrap',padding:'20px'}}>
                {this.state.InHouse.map(data => {
               return <div className="car game-card overflow-hidden game-news-card" style={{width:'500px',height:'auto'}}>
                    <div className="row image-card">
                        <div className="col-12 text-white">
                           {data.image != undefined ? <img src={data.image.thumb} alt="" style={{height:'300px', width:'100%'}} /> : ''}
                        </div>
                        <div className="col-12 bg-black">
                            <h6 className="px-2 m-0 py-1">
                                {data.title}
                            </h6>
                        </div>
                    </div>
                    
                    <p style={{padding:'10px'}}>{data.excerpt.slice(0,110)}...</p>
                    <div className="row px-2 mt-2 py-1">
                        <div className="col-6">
                            <p className="text-start theam-text-color mb-1">
                               {data.source}
                            </p>
                            <p className="text-start">
                                Published on {data.date.slice(0,10)}
                            </p>
                        </div>
                        <div className="col-6">
                        <p className="text-start theam-text-color">
                            </p>
                         <Link><a target='_blank' style={{textDecoration:'none'}} >  <p className="text-end">
                         <Link style={{textDecoration:'none',color:'#ffff',border:'none'}}  to={{pathname: `/blogs`, query:{id:data.id,updated:data.date,image:data.image.full_url,body:data.body,categories:data.category}}}> Read  <img src={arrowRight} alt="" className="ms-3" width="20" /></Link> 
                            </p></a></Link>
                        </div>
                    </div>
                </div>}) }

                {this.state.news.map(data => {
               return <div className="car game-card overflow-hidden game-news-card" style={{width:'500px',height:'auto'}}>
                    <div className="row image-card">
                        <div className="col-12 text-white">
                           {data.image != undefined ? <img src={data.image.thumb} alt="" style={{height:'300px', width:'100%'}} /> : ''}
                        </div>
                        <div className="col-12 bg-black">
                            <h6 className="px-2 m-0 py-1">
                                {data.title}
                            </h6>
                        </div>
                    </div>
                    
                  {data.summary != undefined ?  <p style={{padding:'10px'}}>{data.summary.slice(0,110)}...</p> : ''}
                    <div className="row px-2 mt-2 py-1">
                        <div className="col-6">
                            <p className="text-start theam-text-color mb-1">
                               {data.source}
                            </p>
                           {data.date != undefined ? <p className="text-start">
                                Published on {data.date.slice(0,10)}
                            </p> :''}
                        </div>
                        <div className="col-6">
                        <p className="text-start theam-text-color">
                            </p>
                         <a href={data.link} target='_blank' rel="noreferrer" style={{textDecoration:'none'}} >  <p className="text-end">
                          Read  <img src={arrowRight} alt="" className="ms-3" width="20" />
                            </p></a>
                        </div>
                    </div>
                </div>}) }
                </div>
                <Footer/>
            </Fragment>
        );
    }
}
export default NEWPAGE;
