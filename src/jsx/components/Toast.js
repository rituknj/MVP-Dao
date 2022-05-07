import React, { Component, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import {MdDangerous} from "react-icons/md"

export const ToastSuccess = () => {

  const [success, setSuccess] = useState(false)
  useEffect(()=>{
    handleSuccess()
  }, [success])

  const handleSuccess = () => {
    if (success === true) {
      document.getElementById("toastSuccess").style.transform = 'translateX(0%)'
      document.getElementById("toastSuccess").style.transitionDuration = '0.25s'
    } else {
      document.getElementById("toastSuccess").style.transform = 'translateX(200%)'
      document.getElementById("toastSuccess").style.transitionDuration = '0.25s'
    }
  }

  return (
    <div className="success position-absolute border" id="toastSuccess" style={{backgroundColor: "#0F0F0F", height: "fit-content", color: "#fff", width:"250px", right:"25px",}}>
      <div className="d-flex">
        <div className="p-2" style={{backgroundColor: "#2B2A2A"}}>
          <AiFillCheckCircle size={24}/>
        </div>
        <div className="p-2">
          <p className="m-0">SUCCESS</p>
        </div>
      </div>
    </div>
  );
};

export const ToastFail = () => {

  const [failed, setFailed] = useState(false)
  useEffect(()=>{
    handleFailed()
  }, [failed])

  const handleFailed = () => {
    if (failed === true) {
      document.getElementById("toastFailed").style.transform = 'translateX(0%)'
      document.getElementById("toastFailed").style.transitionDuration = '0.25s'
    } else {
      document.getElementById("toastFailed").style.transform = 'translateX(200%)'
      document.getElementById("toastFailed").style.transitionDuration = '0.25s'
    }
  }

  return (
    <div className="success position-absolute border" id="toastFailed" style={{backgroundColor: "#0F0F0F", height: "fit-content", color: "red", width:"250px", right:"25px",}}>
      <div className="d-flex">
        <div className="p-2" style={{backgroundColor: "#2B2A2A"}}>
          <MdDangerous size={24}/>
        </div>
        <div className="p-2">
          <p className="m-0">Failed</p>
        </div>
      </div>
    </div>
  );
};
