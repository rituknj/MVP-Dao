import React, { Component, Fragment } from "react";
import AdminHeader from "../../components/Elements/AdminHeader";
import "aos/dist/aos.css";
import AdminSidebar from "../../components/Elements/AdminSidebar";
import CreateEvent from "./CreateEvent";
import BetSlip from "./BetSlip";
import ValidateEvents from "./ValidateEvents";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import whh_coins from "../../../images/whh_coins.svg";
import tickets from "../../../images/ep_tickets.svg";
import file from "../../../images/gala_file-doc.svg";
import validate from "../../../images/VALIDATE.svg";
import plus from "../../../images/ant-design_plus-circle-outlined.svg";
import self from "../../../images/twemoji_people-hugging.svg";
import SelfHelp from "./SelfHelp";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuCollapse: false,
      showAdminSlider: 1,
    };
  }

  componentDidMount = async () => {
    setInterval(() => {
      this.setState({ menuCollapse: window.collapsed });
    }, 100);
  };

  render() {
    return (
      <div className="adminIndex">
        <AdminHeader />
        <div className="d-flex" style={{ paddingTop: "90px" }}>
          {/* <AdminSidebar/> */}
          <>
            <div id="AdminSidebar">
              <ProSidebar collapsed={this.state.menuCollapse}>
                <SidebarContent>
                  <Menu>
                    <MenuItem
                      active={this.state.showAdminSlider == 1 ? true : false}
                      onClick={() => this.setState({ showAdminSlider: 1 })}
                      icon={
                        <svg
                          width="35"
                          height="30"
                          viewBox="0 0 30 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.5 3V33H27.5V3H2.5ZM1.25 0.5H28.75C29.0815 0.5 29.3995 0.631696 29.6339 0.866116C29.8683 1.10054 30 1.41848 30 1.75V34.25C30 34.5815 29.8683 34.8995 29.6339 35.1339C29.3995 35.3683 29.0815 35.5 28.75 35.5H1.25C0.918479 35.5 0.600537 35.3683 0.366117 35.1339C0.131696 34.8995 0 34.5815 0 34.25V1.75C0 1.41848 0.131696 1.10054 0.366117 0.866116C0.600537 0.631696 0.918479 0.5 1.25 0.5ZM7.5 18H22.5V20.5H7.5V18ZM7.5 10.5H15V13H7.5V10.5ZM7.5 25.5H22.5V28H7.5V25.5Z"
                            fill="#BCBCBC"
                          />
                        </svg>
                      }
                    >
                      BET SLIP
                    </MenuItem>
                    <MenuItem
                      active={this.state.showAdminSlider == 2 ? true : false}
                      icon={
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.1875 16.75H19.25V10.8125C19.25 10.6406 19.1094 10.5 18.9375 10.5H17.0625C16.8906 10.5 16.75 10.6406 16.75 10.8125V16.75H10.8125C10.6406 16.75 10.5 16.8906 10.5 17.0625V18.9375C10.5 19.1094 10.6406 19.25 10.8125 19.25H16.75V25.1875C16.75 25.3594 16.8906 25.5 17.0625 25.5H18.9375C19.1094 25.5 19.25 25.3594 19.25 25.1875V19.25H25.1875C25.3594 19.25 25.5 19.1094 25.5 18.9375V17.0625C25.5 16.8906 25.3594 16.75 25.1875 16.75Z"
                            fill="#BCBCBC"
                          />
                          <path
                            d="M18 0.5C8.33594 0.5 0.5 8.33594 0.5 18C0.5 27.6641 8.33594 35.5 18 35.5C27.6641 35.5 35.5 27.6641 35.5 18C35.5 8.33594 27.6641 0.5 18 0.5ZM18 32.5312C9.97656 32.5312 3.46875 26.0234 3.46875 18C3.46875 9.97656 9.97656 3.46875 18 3.46875C26.0234 3.46875 32.5312 9.97656 32.5312 18C32.5312 26.0234 26.0234 32.5312 18 32.5312Z"
                            fill="#BCBCBC"
                          />
                        </svg>
                      }
                      onClick={() => this.setState({ showAdminSlider: 2 })}
                    >
                      Create Event
                    </MenuItem>
                    <MenuItem
                      active={this.state.showAdminSlider == 3 ? true : false}
                      icon={
                        <svg
                          width="35"
                          height="30"
                          viewBox="0 0 50 42"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="50" height="20" rx="2" fill="#545353" />
                          <rect
                            y="22"
                            width="50"
                            height="20"
                            rx="2"
                            fill="#373535"
                          />
                          <path
                            d="M14.052 8.888H12.036V7.7H17.526V8.888H15.51V14H14.052V8.888ZM22.3245 14L21.1095 12.245H21.0375H19.7685V14H18.3105V7.7H21.0375C21.5955 7.7 22.0785 7.793 22.4865 7.979C22.9005 8.165 23.2185 8.429 23.4405 8.771C23.6625 9.113 23.7735 9.518 23.7735 9.986C23.7735 10.454 23.6595 10.859 23.4315 11.201C23.2095 11.537 22.8915 11.795 22.4775 11.975L23.8905 14H22.3245ZM22.2975 9.986C22.2975 9.632 22.1835 9.362 21.9555 9.176C21.7275 8.984 21.3945 8.888 20.9565 8.888H19.7685V11.084H20.9565C21.3945 11.084 21.7275 10.988 21.9555 10.796C22.1835 10.604 22.2975 10.334 22.2975 9.986ZM27.7276 14.108C26.8276 14.108 26.1256 13.859 25.6216 13.361C25.1236 12.863 24.8746 12.152 24.8746 11.228V7.7H26.3326V11.174C26.3326 12.302 26.8006 12.866 27.7366 12.866C28.1926 12.866 28.5406 12.731 28.7806 12.461C29.0206 12.185 29.1406 11.756 29.1406 11.174V7.7H30.5806V11.228C30.5806 12.152 30.3286 12.863 29.8246 13.361C29.3266 13.859 28.6276 14.108 27.7276 14.108ZM36.8994 12.83V14H32.0214V7.7H36.7824V8.87H33.4704V10.238H36.3954V11.372H33.4704V12.83H36.8994Z"
                            style={{ fill: "#fff" }}
                          />
                          <path
                            d="M12.205 30.87V32.535H15.121V33.705H12.205V36H10.747V29.7H15.508V30.87H12.205ZM20.3804 34.65H17.4554L16.8974 36H15.4034L18.2114 29.7H19.6514L22.4684 36H20.9384L20.3804 34.65ZM19.9214 33.543L18.9224 31.131L17.9234 33.543H19.9214ZM23.122 29.7H24.58V34.812H27.739V36H23.122V29.7ZM30.5885 36.108C30.0905 36.108 29.6075 36.042 29.1395 35.91C28.6775 35.772 28.3055 35.595 28.0235 35.379L28.5185 34.281C28.7885 34.479 29.1095 34.638 29.4815 34.758C29.8535 34.878 30.2255 34.938 30.5975 34.938C31.0115 34.938 31.3175 34.878 31.5155 34.758C31.7135 34.632 31.8125 34.467 31.8125 34.263C31.8125 34.113 31.7525 33.99 31.6325 33.894C31.5185 33.792 31.3685 33.711 31.1825 33.651C31.0025 33.591 30.7565 33.525 30.4445 33.453C29.9645 33.339 29.5715 33.225 29.2655 33.111C28.9595 32.997 28.6955 32.814 28.4735 32.562C28.2575 32.31 28.1495 31.974 28.1495 31.554C28.1495 31.188 28.2485 30.858 28.4465 30.564C28.6445 30.264 28.9415 30.027 29.3375 29.853C29.7395 29.679 30.2285 29.592 30.8045 29.592C31.2065 29.592 31.5995 29.64 31.9835 29.736C32.3675 29.832 32.7035 29.97 32.9915 30.15L32.5415 31.257C31.9595 30.927 31.3775 30.762 30.7955 30.762C30.3875 30.762 30.0845 30.828 29.8865 30.96C29.6945 31.092 29.5985 31.266 29.5985 31.482C29.5985 31.698 29.7095 31.86 29.9315 31.968C30.1595 32.07 30.5045 32.172 30.9665 32.274C31.4465 32.388 31.8395 32.502 32.1455 32.616C32.4515 32.73 32.7125 32.91 32.9285 33.156C33.1505 33.402 33.2615 33.735 33.2615 34.155C33.2615 34.515 33.1595 34.845 32.9555 35.145C32.7575 35.439 32.4575 35.673 32.0555 35.847C31.6535 36.021 31.1645 36.108 30.5885 36.108ZM39.1357 34.83V36H34.2577V29.7H39.0187V30.87H35.7067V32.238H38.6317V33.372H35.7067V34.83H39.1357Z"
                            fill="white"
                            style={{ fill: "#fff" }}
                          />
                        </svg>
                      }
                      onClick={() => this.setState({ showAdminSlider: 3 })}
                    >
                      VALIDATE EVENTS
                    </MenuItem>
                    <MenuItem
                      active={this.state.showAdminSlider == 4 ? true : false}
                      icon={
                        <svg
                          width="35"
                          height="30"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_998_28994)">
                            <path
                              d="M29.6036 9.40448C30.5222 5.08275 28.3109 0.950972 24.6644 0.175893C21.018 -0.599185 17.3173 2.27594 16.3986 6.59767C15.48 10.9194 17.6914 15.0512 21.3378 15.8263C24.9843 16.6013 28.685 13.7262 29.6036 9.40448Z"
                              style={{ fill: "#641800" }}
                            />
                            <path
                              d="M9.72433 14.687V16.266C7.31033 16.791 4.34333 18.117 3.89533 20.007C2.49333 25.919 2.87033 35.081 2.87033 35.212V35.346C2.87033 36 3.53333 36 4.18633 36H20.2833C20.9363 36 21.5983 36 21.5983 35.346V20.007C21.5983 18.288 20.1853 16.569 16.9663 16.173V14.687H9.72433Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M26.2763 13.303V16.266C28.6903 16.791 31.6573 18.117 32.1053 20.007C33.5063 25.92 33.1303 35.082 33.1303 35.212V35.346C33.1303 36 32.4673 36 31.8143 36H15.7173C15.0643 36 14.4023 36 14.4023 35.346V20.007C14.4023 18.288 15.8153 16.569 19.0343 16.173V14.687L26.2763 13.303Z"
                              style={{ fill: "#641800" }}
                            />
                            <path
                              d="M14.6556 15.8251C18.3021 15.05 20.5135 10.9182 19.5948 6.5965C18.6762 2.27477 14.9755 -0.600357 11.3291 0.174721C7.6826 0.9498 5.47124 5.08158 6.38986 9.40331C7.30847 13.725 11.0092 16.6002 14.6556 15.8251Z"
                              fill="#BCBCBC"
                            />
                            <path
                              d="M19.0923 16.0881C17.7823 16.4691 15.6513 16.6341 13.1943 15.7061C10.6013 14.7261 8.2163 13.7621 7.2863 13.4381C6.4403 13.1431 4.2813 13.4051 3.8003 14.2861C3.3193 15.1671 3.0473 16.7711 4.2373 17.9451C5.4273 19.1191 11.6953 21.4361 13.4673 22.4781C14.3953 23.0241 14.3413 26.3011 14.3953 28.9771C14.4783 33.0201 21.7783 15.3071 19.0923 16.0881Z"
                              style={{ fill: "#641800" }}
                            />
                            <path
                              d="M12.2328 25.2831C13.5638 25.5811 15.8368 26.0941 18.2318 25.0141C20.7588 23.8741 22.9438 22.282 23.8508 21.901C24.6768 21.554 26.4218 21.2181 27.3828 22.5301C27.9768 23.3401 28.2898 24.9641 27.1758 26.2091C26.0608 27.4551 21.6788 30.1281 18.4368 30.9111C15.6878 31.5751 11.4698 31.5111 10.1238 30.1181C8.0228 27.9431 10.4048 24.8731 12.2328 25.2831ZM24.9908 17.2351C24.9908 15.2831 26.7148 14.2191 28.7298 13.4381C29.5648 13.1141 31.7348 13.4051 32.2158 14.2861C32.6968 15.1671 32.9688 16.7711 31.7788 17.9451C30.5888 19.1191 24.9908 20.2391 24.9908 17.2351Z"
                              fill="#BCBCBC"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_998_28994">
                              <rect width="36" height="36" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      }
                      onClick={() => this.setState({ showAdminSlider: 4 })}
                    >
                      SELF HELP
                    </MenuItem>
                    <hr />
                    <MenuItem icon={<img src={whh_coins} alt="" />}>
                      <a href="https://lucky-duckanoo-f4a914.netlify.app/" target="_blank" rel="noreferrer">BETSWAMP DAO</a>
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
            {this.state.showAdminSlider == 2 ? (
              <CreateEvent />
            ) : this.state.showAdminSlider == 1 ? (
              <BetSlip />
            ) : this.state.showAdminSlider == 3 ? (
              <ValidateEvents />
            ) : this.state.showAdminSlider == 4 ? (
              <SelfHelp />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default Index;
