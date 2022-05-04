import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../images/logo.png'
import { GiHamburgerMenu } from 'react-icons/gi'
import { computeHeadingLevel } from '@testing-library/react'

class AdminHeader extends Component {

  slidbarcollapsed=(tab)=>{
    window.collapsed = !window.collapsed
  }

  render() {
    return (
      <div style={{ backgroundColor: "#0F0F0F", position: "fixed", zIndex: "5", width: "100%", }}>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent" aria-label="Fifth navbar example" >
          <div className="container-fluid">
            <a className="navbar-brand" href="/"><img src={logo} style={{ height: '70px', width: '70px' }} /></a>
            <div className='d-flex'>
            <ul className="navbar-nav ms-md-auto mb-2 mb-lg-0 flex-row" id="admin-navbar-nav">
              <li className="nav-item px-2">
                <a
                  className="nav-link text-white mt-1"
                  href="https://betdao.netlify.app/re-ui/stake"
                  target='_blank'
                >
                  DAO
                </a>
              </li>
              <li className="nav-item px-2">
                <NavLink
                  className="nav-link text-white mt-1"
                  to="/admin"
                >
                  Wallet
                </NavLink>
              </li>
            </ul>
            <button className='btn text-light fs-4 d-md-none mt-n2' onClick={()=>this.slidbarcollapsed(true)}><GiHamburgerMenu /></button>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
export default AdminHeader
