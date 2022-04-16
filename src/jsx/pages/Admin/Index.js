import React, { Component, Fragment } from 'react'
import AdminHeader from '../../components/Elements/AdminHeader'
import 'aos/dist/aos.css'
import AdminSidebar from '../../components/Elements/AdminSidebar'
import CreateEvent from './CreateEvent'
import BetSlip from './BetSlip'
import ValidateEvents from './ValidateEvents'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import whh_coins from '../../../images/whh_coins.svg'
import tickets from '../../../images/ep_tickets.svg'
import file from '../../../images/gala_file-doc.svg'
import validate from '../../../images/VALIDATE.svg'
import plus from '../../../images/ant-design_plus-circle-outlined.svg'
import self from '../../../images/twemoji_people-hugging.svg'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuCollapse: false,
      showAdminSlider: 1
    }
  }

  render() {
    return (
      <div className="adminIndex">
        <AdminHeader />
        <div className="d-flex" style={{ paddingTop: '90px' }}>
          {/* <AdminSidebar/> */}
          <>
            <div id="AdminSidebar">
              <ProSidebar collapsed={this.state.menuCollapse}>
                <SidebarContent>
                  <Menu>
                    <MenuItem
                    active={this.state.showAdminSlider == 1 ? true : false }
                    onClick={()=>this.setState({showAdminSlider:1})}
                      icon={
                        <img src={tickets} style={{ color: '#fff' }} alt="" />
                      }
                    >
                      BET SLIP
                    </MenuItem>
                    <MenuItem active={this.state.showAdminSlider == 2 ? true : false } icon={<img src={plus} alt="" />} onClick={()=>this.setState({showAdminSlider:2})}>
                      Create Event
                    </MenuItem>
                    <MenuItem active={this.state.showAdminSlider == 3 ? true : false } icon={<img src={validate} alt="" />} onClick={()=>this.setState({showAdminSlider:3})}>
                      VALIDATE EVENTS
                    </MenuItem>
                    <MenuItem active={this.state.showAdminSlider == 4 ? true : false } icon={<img src={self} alt="" />} onClick={()=>this.setState({showAdminSlider:4})}>
                      SELF HELP
                    </MenuItem>
                    <hr />
                    <MenuItem icon={<img src={whh_coins} alt="" />}>
                      BETSWAMP DAO
                    </MenuItem>
                    <hr />
                    <MenuItem icon={<img src={file} alt="" />}>DOCS</MenuItem>
                  </Menu>
                </SidebarContent>
                <SidebarFooter>
                  <Menu>
                    <MenuItem>Version 2.0</MenuItem>
                  </Menu>
                </SidebarFooter>
              </ProSidebar>
            </div>
          </>

          {/* COMPONENTS TO BE SHOWN BESIDE SIDEBAR */}
          <div className="adminGlobalContainer">
          { this.state.showAdminSlider == 2  ? <CreateEvent /> 
          : this.state.showAdminSlider == 1  ? <BetSlip/> 
          : this.state.showAdminSlider == 3  ? <ValidateEvents/> : ''}
          </div>
        </div>
      </div>
    )
  }
}
export default Index
