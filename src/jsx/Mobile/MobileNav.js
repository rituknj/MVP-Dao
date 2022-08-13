import React from 'react'
import logo from "../../images/bettingnewlogo.png";

export default function MobileNav() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link active navItem text-light mx-5"
                  aria-current="page"
                  href="/"
                >
                  DAO
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/">
                  DASHBOARD
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/">
                  WALLET
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link navItem text-light mx-5" href="/mobile-view">
                  Mobile
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
