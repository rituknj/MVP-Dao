import React, { Component, Fragment } from "react";
import logo from '../../../images/logo.png';
import { NavLink } from "react-router-dom";
import whitepaper from '../../../images/PDF/Betswamp-Whitepaper-v1.2.pdf';
class Header extends Component {
    render() {
        return (
            <Fragment>
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
                    aria-label="Fifth navbar example"
                >
                    <div className="container-fluid home-header">
                        <NavLink class="navbar-brand px-2 px-md-4" to="/">
                            <img src={logo} width="95" className="py-1" />
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample05"
                            aria-controls="navbarsExample05"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample05">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            <form>
                                <ul className="navbar-nav">
                                    <li className="nav-item px-2 px-md-4">
                                        <a className="nav-link text-white mt-1" href="https://betdao.netlify.app/re-ui/stake" target='_blank'>DAO</a>
                                    </li>
                                    <li className="nav-item px-2 px-md-4">
                                        <NavLink className="nav-link text-white mt-1" to="/">MARKET</NavLink>
                                    </li>
                                    <li className="nav-item px-2 px-md-4">
                                        <NavLink className="nav-link text-white mt-1" to="/admin">WALLET</NavLink>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    }
}
export default Header;
