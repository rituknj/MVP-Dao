import React, {useEffect, useStatem, Fragment, useState } from "react";
import logo from '../../../images/logo.png';
import { Link, NavLink } from "react-router-dom";
import {initInstance,getAccount, loginProcess} from './../../../web3/web3'



const Header=()=> {
    const [account, setAccount] = useState()
    const [modalShow, setModalShow] = useState(false)
    const [allevents, setAllevents] = useState(0)
    const [downloaded, setDownloaded] = useState(0)

    useEffect(()=>{
        walletConnect();
        setInterval(async()=>{
           try {
            await getAddress()
           } catch (error) {
            
           }
        },3000)
    },[])

   const walletConnect = async()=> {
        await loginProcess();
        await initInstance();
        const address = await getAccount();
        window.login = address
        setAccount(address)
    }

    const getAddress =async()=>{
        const address = await getAccount();
        window.login = address
        setAccount(address)
    }

    const slicing = (address)=> {
        const first = address.slice(0,4);
        const second = address.slice(38);
        return first + "..." + second
    }

    // setInterval(()=>{
    //     setDownloaded(Number(window.allEventstorde))
    //     setAllevents(Number(window.allEvents))
    // },2000)
        return (
            <Fragment>
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
                    aria-label="Fifth navbar example"
                >
                    <div className="container-fluid home-header">
                        <NavLink class="navbar-brand px-2 px-md-4" to="/">
                            <img src={logo} width="50" className="py-1" />
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarsExample05"
                            aria-controls="navbarsExample05"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarsExample05">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                            <form>
                                <ul className="navbar-nav">
                                    {/* <li className="nav-item px-2 px-md-4">
                                        <a className="nav-link text-white mt-1" href="https://dao.betswamp.com" target='_blank'> TEST DAO</a>
                                    </li> */}
                                    {/* {allevents > 0 && allevents == downloaded ? <li className="nav-item px-2 px-md-4">
                                        <NavLink className="nav-link text-white mt-1" to="/app">MARKET</NavLink>
                                    </li>:
                                    <li className="nav-item px-2 px-md-4">
                                        <div className="nav-link text-white mt-1" to="/app"><Watch width='30' height='30' color='red'/></div>
                                    </li>} */}
                                    <li className="nav-item px-2 px-md-4">
                                        <a className="nav-link text-white mt-1" href="https://bet-swamp.gitbook.io/betswamp-v.2.0/" target='_blank'> DOCS</a>
                                    </li>
                                    {/* <li className="nav-item px-2 px-md-4">
                                        <Link className="nav-link text-white mt-1" to="/betting-app" target="_blank">Betting App</Link>
                                    </li> */}
                                    <li className="nav-item px-2 px-md-4 navWallet" style={{cursor: "pointer"}}>
                                        <span  className="nav-link text-white cursor-pointer" 
                                        onClick={()=>walletConnect()}
                                        >{account ? slicing(account) : "CONNECT"}</span>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    
}
export default Header;
