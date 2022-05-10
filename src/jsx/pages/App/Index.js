import React, { Component, Fragment } from 'react'
import AppHeader from '../../components/Elements/AdminHeader'
import { NavLink } from 'react-router-dom'
import {
  allactiveusers,
  totalpayout,
  totalEvents,
  totalbetcreated,
  getActiveEvents,
} from './../../../web3/betsMVPService'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import Match from './../../../images/match.png'
import UNMatch from './../../../images/un-match.png'
import Down from './../../../images/down.png'
import Search from './../../../images/search.png'
import Filter from './../../../images/filter.png'
import Appheadercat from './Appheadercat'
import Soccer from './../Categories/Soccer'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTabTop: false,
      catogries: '',
      activeTabBottom: 1,
      selectedcat: false,
      payout: 0,
      activeusers: 0,
      activeevents: 0,
      totalbetsmade: 0,
      events: 0,
      path: '/app',
      responsive_center: {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 4,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2,
        },
      },
    }
  }
  componentDidMount = async() => {
    let activeUser = await allactiveusers();
    let totalpay = await totalpayout();
    let totalEvent = await totalEvents();
    let totalbetsmade = await totalbetcreated();
    let activeevnets = await getActiveEvents();

    this.setState({
      payout:totalpay,
      activeusers: activeUser.length,
      activeevents: activeevnets,
      totalbetsmade: totalbetsmade,
      events: totalEvent
    })
    console.log("subcatogries",window.location.pathname)
  }

  getGameCard = () => {
    let items = []
    for (var i = 1; i <= 10; i++) {
      items.push(
        <div key={i} className="col-12 col-sm-12 col-md-6 col-lg-4">
          <Soccer />
        </div>,
      )
    }
    return items
  }

  handelMatchTab = (tab) => {
    this.setState({
      activeTabBottom: tab,
    })
    if(tab){
      window.match = tab
    }
    else{
      window.match = tab
    }
  }

  catorgy = (Cat)=> {
    this.setState({
      catogries: Cat
    })
  }

  selectedcategory = (cat) => {
    if (!this.state.selectedcat) {
      this.setState({ selectedcat: true })
    } else {
      this.setState({ selectedcat: false })
    }
  }

  
  
  render() {
    
    return (

      <Fragment>
        <AppHeader />
        <br/>
        <div>
          <div className="container-fluid px-md-5 mt-5" id="section-statistics">
            <div
              className="row py-5"
            >
              <div className="col-lg-12">
                <Carousel
                  swipeable={true}
                  draggable={true}
                  arrows={false}
                  showDots={false}
                  responsive={this.state.responsive_center}
                  infinite={true}
                  keyBoardControl={true}
                  customTransition="all .5"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  removeArrowOnDeviceType={['tablet', 'mobile']}
                  itemClass="px-2"
                >
                  <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                    <h6 className="theam-text-color m-0">Total Payout</h6>
                    <h6 className="text-white mt-4">
                      {(this.state.payout / 10 ** 18).toFixed(0)} BUSD
                    </h6>
                  </div>

                  <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                    <h6 className="theam-text-color m-0">Total Events</h6>
                    <h6 className="text-white mt-4">{this.state.events}</h6>
                  </div>

                  <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                    <h6 className="theam-text-color m-0">Active users</h6>
                    <h6 className="text-white mt-4">
                      {this.state.activeusers}
                    </h6>
                  </div>

                  <div className="overflow-hidden text-center py-3  align-items-stretch col-12">
                    <h6 className="theam-text-color m-0">Total bet Created</h6>
                    <h6 className="text-white mt-4">
                      {this.state.totalbetsmade}
                    </h6>
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
        </div>
        <Appheadercat />
        <div className="container-fluid px-md-5">
          <div className="space-20"></div>
          <div className="d-flex flex-wrap">
            <div className="me-md-4 me-2">
              <button
                className={`d-flex justify-content-around btn admin-match-button font-weight-bold ${
                  this.state.activeTabBottom == 1 ? ' active' : ''
                }`}
                onClick={() => this.handelMatchTab(1)}
              >
                <p>Matched Events</p>{' '}
                <img className="mt-2" src={Match} width={20} />
              </button>
            </div>
            <div className="">
              <button
                className={`d-flex justify-content-around btn admin-match-button font-weight-bold ${
                  this.state.activeTabBottom == 2 ? ' active' : ''
                }`}
                onClick={() => this.handelMatchTab(2)}
              >
                <p>Un-Matched Events</p>
                <img className="mt-1 ml-2" src={UNMatch} width={25} />
              </button>
            </div>
          </div>
        </div>
        <div className=" sub-catogries mt-0 p-1 p-md-5 text-white" id="navbarsExample05">
          <div style={{overflow:'visible'}}>
          <p>Select Subcategory Categories</p>
            <div className='main-dropdown'
            disabled
            contentEditable='true'
            >
              <div
                className="select-catogries m-0"
                onClick={() => this.selectedcategory()}
                contentEditable='false'
              >
                <p>{
                  window.location.pathname == '/soccer'
                  ? 'Soccer'
                  : window.location.pathname == '/rugby'
                  ? 'Rugby'
                  : window.location.pathname == '/tennis'
                  ? 'Tennis'
                  : window.location.pathname == '/racing' 
                  ? 'Hockey'
                  : window.location.pathname == '/boxing' 
                  ? 'Combat'
                  : window.location.pathname == '/baseball' 
                  ? 'Baseball'
                  : window.location.pathname == '/basketball'
                  ? 'Basketball'
                  : window.location.pathname == '/football'
                  ? 'Football'
                  : window.location.pathname == '/cricket'
                  ? 'Cricket'
                  : 'Soccer'
                  }</p>
                <img src={Down} style={{ height: '10px', marginTop: '10px' }} />
              </div>
                <div
                  className="catorgies" 
                  style={{ borderRadius: '0px 10px 10px 10px'}}
                  
                >
                  <NavLink
                    to="/soccer"
                    className="sublinks"
                    
                    style={{ textDecoration: 'none', color: '#ffffff' }}
            
                  >
                    Soccer
                  </NavLink>
                  <NavLink
                    to="/rugby"
                    className="sublinks"
                    
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Rugby
                  </NavLink>
                  <NavLink
                    to="/tennis"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Tennis
                  </NavLink>
                  <NavLink
                    to="/racing"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Hockey
                  </NavLink>
                  <NavLink
                    to="/boxing"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Combat
                  </NavLink>
                  <NavLink
                    to="/basketball"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Basketball
                  </NavLink>
                  <NavLink
                    to="/baseball"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Baseball
                  </NavLink>
                  <NavLink
                    to="/cricket"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Cricket
                  </NavLink>
                  <NavLink
                    to="/football"
                    className="sublinks"
                    style={{ textDecoration: 'none', color: '#ffffff' }}
                  >
                    Football
                  </NavLink>
                </div>
            </div>
          </div>
          <div className="sub-tools">
            <img src={Search} width={25} height={25} />
            <img src={Filter} width={25} height={25} />
          </div>
        </div>
      </Fragment>
    )
  }
}
export default Index
