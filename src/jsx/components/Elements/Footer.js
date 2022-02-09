import React, { Component, Fragment } from "react";
import { Link } from 'react-router-dom'
import logo from '../../../images/logo.png';
import logoFooter from '../../../images/logo-footer.png';
import emailImg from '../../../images/email.png';
import facebook from '../../../images/ic_sharp-facebook.png';
import icons_twitter from '../../../images/akar-icons_twitter-fill.png';
import icons_instagram from '../../../images/akar-icons_instagram-fill.png';
import icons_discord from '../../../images/akar-icons_discord-fill.png';
import bi_medium from '../../../images/bi_medium.png';
import icons_github from '../../../images/akar-icons_github-fill.png';
import cib_telegram from '../../../images/cib_telegram-plane.png';
class Footer extends Component {

    socialIcons = () => {
        return (
            <div className="d-flex justify-content-center justify-content-sm-start my-3 flex-wrap social-icons">
              <a href="https://www.facebook.com/Betswamp?_rdc=1&_rdr" target="_blank" ><img src={facebook} className="mx-2" /></a> 
               <a href="https://twitter.com/betswamp" target="_blank" > <img src={icons_twitter} className="mx-2" /></a>
               <a href="https://www.instagram.com/betswamp/" target="_blank"> <img src={icons_instagram} className="mx-2" /></a>
               <a href="#" ><img src={icons_discord} className="mx-2" /></a> 
               <a href="https://betswamp.medium.com/" target="_blank"> <img src={bi_medium} className="mx-2" /></a>
                <a href="https://github.com/Betswamp" target="_blank"> <img src={icons_github} className="mx-2" /></a>
            <a href="https://t.me/betswamp_official" target='_blank'><img src={cib_telegram} className="mx-2" /></a>
            </div>
        )
    }
    render() {
        return (
            <Fragment>
                <footer className="container-fluid px-md-5 py-0 py-md-5" style={{ backgroundImage: `url(${logoFooter})` }}>
                    <div className="space-100"></div>

                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
                            <img src={logo} width="146" />
                        </div>
                        <div className="col-md-12 d-block d-md-none mb-4 mb-md-0 text-center">
                            {this.socialIcons()}
                        </div>
                        <div className="col-md-2 text-center text-md-start">
                            {/* <p className="text-white font-weight-bold mb-4">INFO</p> */}
                            <ul className="list-unstyled text-small footerList">
                          <Link to='/about'   className="text-white font-weight-bold" href="#" style={{textDecoration:"none"}}>About</Link> 
                          <br/> 
                          <br/> 
                          <li><a className="text-white" href="#">News</a></li>  
                            </ul>
                        </div>
                        <div className="col-md-2 text-center text-md-start">
                            {/* <p className="text-white font-weight-bold mb-4">INFO</p> */}
                            <ul className="list-unstyled text-small footerList">
                          <Link to='/about' className="text-white font-weight-bold" href="#" style={{textDecoration:"none"}}>Apps</Link> 
                          <br/> 
                          <br/> 
                          <li><a className="text-white" href="#">BETTING PLATFORM</a></li>  
                          <li><a className="text-white" href="#">DAO</a></li> 
                            </ul>
                        </div>
                        <div className="col-md-2 text-center text-md-start">
                            <p className="text-white font-weight-bold mb-2 mb-md-4">CONTACT</p>
                            <p className="text-white text-email mb-0"><img src={emailImg} width="22" /> admin@betswamp.com</p>
                        </div>
                        <div className="col-md-3 text-center text-md-start my-5 my-md-0">
                      {/* <Link to='/app'> <button className="btn btn-md theam-bg-red">
                                Launch app
                            </button></Link> */}
                        </div>
                    </div>
                    <div className="space-100"></div>
                    <div className="d-none d-md-block">
                        {this.socialIcons()}
                    </div>
                    <div className="media-icons"></div>
                    <div className="row mt-4" id="footer-bottom">
                        {/* <div className="col-6">
                            <p className="theam-text-grey">Legal Disclaimer</p>
                        </div>
                        <div className="col-6 text-end">
                            <p className="theam-text-grey">© 2021 Betswamp.com</p>
                        </div> */}
                    </div>
                </footer>

            </Fragment>
        );
    }
}
export default Footer;
