import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../images/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { computeHeadingLevel } from "@testing-library/react";

import { getAccount, initInstance, loginProcess } from "../../../web3/web3";

class AdminHeader extends Component {
  slidbarcollapsed = (tab) => {
    window.collapsed = !window.collapsed;
  };
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      account:undefined
    };
  }

  componentDidMount =async()=>{
    await this.walletConnect();
  }

  walletConnect = async()=> {
    // if(account){
    //     setAccount(undefined)
    //     return true
    // }
    await initInstance();
    await loginProcess();
    const address = await getAccount();
    this.setState({account:address})
}

  render() {
    return (
      <div
        style={{
          position: "fixed",
          zIndex: "5",
          width: "100%",
          marginBottom: "50px",
        }}
      >
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
          aria-label="Fifth navbar example"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <img src={logo} style={{ height: "50px", width: "50px" }} />
            </a>
            <div className="d-flex">
              <ul
                className="navbar-nav ms-md-auto mb-2 mb-lg-0 flex-row"
                id="admin-navbar-nav"
              >
                {window.location.pathname.includes("/app") === true ||
                window.location.pathname.includes("/admin") === true ? (
                  ""
                ) : (
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white"
                      style={
                        window.location.pathname.includes("/app") === true
                          ? { fontWeight: "700" }
                          : { fontWeight: "400" }
                      }
                      to="/app"
                    >
                      MARKET
                    </NavLink>
                  </li>
                )}
                {window.location.pathname.includes("/admin") === true ? (
                  ""
                ) : (
                  <li className="nav-item px-2">
                    <a
                      className="nav-link text-white"
                      href="https://lucky-duckanoo-f4a914.netlify.app/"
                      target="_blank"
                    >
                      DAO
                    </a>
                  </li>
                )}
                {window.location.pathname.includes("/admin") === true ||
                window.location.pathname.includes("/comingsoon") === true ? (
                  ""
                ) : (
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white"
                      style={
                        window.location.pathname.includes("/admin") === true
                          ? { fontWeight: "700" }
                          : { fontWeight: "400" }
                      }
                      to="/admin"
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                )}
                <li
                  className="nav-item px-2 mt-0 mt-lg-1"
                  style={{ cursor: "pointer" }}
                >
                  <span
                    className="nav-link text-white cursor-pointer"
                    onClick={() => this.walletConnect()}
                  >
                    {this.state.account ? "CONNECTED" : "CONNECT"}
                  </span>
                </li>
                {/* <WalletPopup
                  show={this.state.modalShow}
                  onHide={() => this.setState({ modalShow: false })}
                /> */}
              </ul>
              {window.location.pathname.includes("admin") && (
                <button
                  className="btn text-light fs-4 d-md-none mt-n2"
                  onClick={() => this.slidbarcollapsed(true)}
                >
                  <GiHamburgerMenu />
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default AdminHeader;
