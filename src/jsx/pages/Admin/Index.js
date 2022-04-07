import React, { Component, Fragment } from 'react'
import AdminHeader from '../../components/Elements/AdminHeader'
import 'aos/dist/aos.css'
import AdminSidebar from '../../components/Elements/AdminSidebar'

class Index extends Component {
  render() {
    return (
      <div className='adminIndex'>
        <AdminHeader />
        <div className='d-flex'>
            <AdminSidebar/>
        </div>
      </div>
    )
  }
}
export default Index
