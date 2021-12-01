import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//Element
import SideBar from '../jsx/pages/Home/SideBar'
//Pages
import Home from '../jsx/pages/Home/Index'
import App from '../jsx/pages/App/Index'
import Admin from '../jsx/pages/Admin/Index'
import About from '../jsx/pages/About/Index'
import Tennis from './../jsx/pages/Categories/Tennis'
import Soccer from './../jsx/pages/Categories/Soccer'
import Rugby from './../jsx/pages/Categories/Rugby'
import Racing from './../jsx/pages/Categories/Racing'
import Boxing from './../jsx/pages/Categories/Boxing'
import Basketball from './../jsx/pages/Categories/Basketball'
import Baseball from './../jsx/pages/Categories/Baseball'
import Cricket from './../jsx/pages/Categories/Cricket'
import Football from './../jsx/pages/Categories/Football'

class Web extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/app" component={Soccer} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/about" component={About} />
            <Route exact path="/soccer" component={Soccer} />
            <Route exact path="/rugby" component={Rugby} />
            <Route exact path="/tennis" component={Tennis} />
            <Route exact path="/racing" component={Racing} />
            <Route exact path="/boxing" component={Boxing} />
            <Route exact path="/basketball" component={Basketball} />
            <Route exact path="/baseball" component={Baseball} />
            <Route exact path="/cricket" component={Cricket} />
            <Route exact path="/football" component={Football} />
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}
export default Web
