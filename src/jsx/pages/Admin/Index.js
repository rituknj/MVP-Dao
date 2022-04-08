import React, { Component, Fragment } from 'react'
import AdminHeader from '../../components/Elements/AdminHeader'
import 'aos/dist/aos.css'
import AdminSidebar from '../../components/Elements/AdminSidebar'
import CreateEvent from './CreateEvent'
import BetSlip from './BetSlip'

class Index extends Component {
  render() {
    return (
      <div className='adminIndex'>
        <AdminHeader />
        <div className='d-flex'>
            <AdminSidebar/>

            {/* COMPONENTS TO BE SHOWN BESIDE SIDEBAR */}
            <div className="adminGlobalContainer">
                {/* <CreateEvent/> */}
                <BetSlip/>
            </div>
        </div>
      </div>
    )
  }
}
export default Index
