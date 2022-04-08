import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../images/logo.png'

class AdminHeader extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#0F0F0F"}}>
        <nav
          className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
          aria-label="Fifth navbar example"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li> <a href='/'> <img src={logo} style={{height:'70px', width: '70px'}}/></a></li>
              </ul>
              <form>
                <ul className="navbar-nav" id="admin-navbar-nav">
                  <li className="nav-item px-2">
                    <a
                      className="nav-link text-white mt-1"
                      href="/"
                    >
                      DAO
                    </a>
                  </li>
                  <li className="nav-item px-2">
                    <NavLink
                      className="nav-link text-white mt-1"
                      to="#"
                    >
                      Wallet
                    </NavLink>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
export default AdminHeader
