import React, {useEffect, useStatem, Fragment, useState } from "react";
import logo from '../../../images/logo.png';
import { NavLink } from "react-router-dom";
import {initInstance,loginProcess,getAccount} from './../../../web3/web3'
import WalletPopup from "./WalletPopup";

const Header=()=> {
    const [account, setAccount] = useState()
    const [modalShow, setModalShow] = useState(false)

    useEffect(async()=>{
        await walletConnect()
    },[])

   const walletConnect = async()=> {
        if(account){
            setAccount(undefined)
            return true
        }
        await initInstance();
        await loginProcess();
        const address = await getAccount();
        setAccount(address)
    }
    const slicing = (address)=>{
        const first = address.slice(0,4);
        const second = address.slice(38);
        return first + "..." + second
    }
        return (
            <Fragment>
                <nav
                    className="navbar navbar-expand-lg navbar-dark bg-dark bg-transparent"
                    aria-label="Fifth navbar example"
                >
                    <div className="container-fluid home-header">
                        <NavLink class="navbar-brand px-2 px-md-4" to="/">
                            <img src={logo} width="95" className="py-1" />
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
                                    <li className="nav-item px-2 px-md-4">
                                        <a className="nav-link text-white mt-1" href="https://betdao.netlify.app/re-ui/stake" target='_blank'>DAO</a>
                                    </li>
                                    <li className="nav-item px-2 px-md-4">
                                        <NavLink className="nav-link text-white mt-1" to="/app">MARKET</NavLink>
                                    </li>
                                    <li className="nav-item px-2 px-md-4" style={{cursor: "pointer"}}>
                                        <span  className="nav-link text-white fs-4 cursor-pointer" 
                                        onClick={()=>setModalShow(true)}
                                        >Wallet</span>
                                    </li>
                                    <WalletPopup
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                    />
                                </ul>
                            </form>
                        </div>
                    </div>
                </nav>
            </Fragment>
        );
    
}
export default Header;
