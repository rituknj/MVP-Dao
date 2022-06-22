import React, { useEffect, useState } from "react";
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

const AdminSidebar = (props) => {
    //create initial menuCollapse state using useState hook

    //create a custom function that will change menucollapse state from false to true and true to false

  return (
    <>
      
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={true} className='collapsed'>
          <SidebarContent>
            <Menu>
              {/* <MenuItem icon={<img src={tickets} style={{color:"#fff"}} alt=""/>}>BET SLIP</MenuItem> */}
              <MenuItem active={true} icon={<img src={plus} alt=""/>}>Create Event</MenuItem>
              <MenuItem icon={<img src={validate} alt=""/>}>VALIDATE EVENTS</MenuItem>
              <MenuItem icon={<img src={self} alt=""/>}>SELF HELP</MenuItem>
              <hr />
              <MenuItem icon={<img src={whh_coins} alt=""/>}><a href="https://lucky-duckanoo-f4a914.netlify.app/" target='_blank'></a>BETSWAMP DAO</MenuItem>
              <hr />
              <MenuItem icon={<img src={file} alt=""/>}>DOCS</MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu>
              <MenuItem>Version 2.0</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      
    </>
  );
};

export default AdminSidebar;
