import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import whh_coins from '../../../images/whh_coins.png'
import tickets from '../../../images/ep_tickets.png'
import file from '../../../images/gala_file-doc.png'
import validate from '../../../images/VALIDATE (2).png'
import plus from '../../../images/ant-design_plus-circle-outlined.png'
import self from '../../../images/twemoji_people-hugging.png'

const AdminSidebar = () => {
  
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(false)

    //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="AdminSidebar">
          {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          {/* <SidebarHeader>
          <div className="logotext">
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div><div className="closemenu" onClick={menuIconClick}>
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader> */}
          <SidebarContent>
            <Menu>
              <MenuItem icon={<img src={tickets} alt=""/>}>BET SLIP</MenuItem>
              <MenuItem active={true} icon={<img src={plus} alt=""/>}>Create Event</MenuItem>
              <MenuItem icon={<img src={validate} alt=""/>}>VALIDATE EVENTS</MenuItem>
              <MenuItem icon={<img src={self} alt=""/>}>SELF HELP</MenuItem>
              <hr />
              <MenuItem icon={<img src={whh_coins} alt=""/>}>BETSWAMP DAO</MenuItem>
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
      </div>
    </>
  );
};

export default AdminSidebar;
