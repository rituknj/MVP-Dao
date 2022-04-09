import React, { Component, Fragment } from 'react'
import AdminHeader from '../../components/Elements/AdminHeader'
import 'aos/dist/aos.css'
import AdminSidebar from '../../components/Elements/AdminSidebar'
import CreateEvent from './CreateEvent'
import BetSlip from './BetSlip'
import ValidateEvents from './ValidateEvents'

class Index extends Component {
  render() {
    return (
      <div className='adminIndex'>
        <AdminHeader />
        <div className='d-flex' style={{paddingTop: "90px"}}>
            <AdminSidebar/>

            {/* COMPONENTS TO BE SHOWN BESIDE SIDEBAR */}
            <div className="adminGlobalContainer">
                {/* <CreateEvent/> */}
                {/* <BetSlip/> */}
                <ValidateEvents/>
            </div>
        </div>
      </div>
    )
  }
}
export default Index
