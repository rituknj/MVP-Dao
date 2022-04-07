import React from 'react'
import { StepFour } from '../../components/Elements/StepFour';
import { StepOne } from '../../components/Elements/StepOne';
import { StepThree } from '../../components/Elements/StepThree';
import { StepTwo } from '../../components/Elements/StepTwo';
import MultiStep from "react-multistep";
import icon from '../../../images/icon-park-outline_history-query.png'

export default function CreateEvent() {

    const steps = [
        { name: "Name A", component: <StepOne /> },
        { name: "Email", component: <StepTwo /> },
        { name: "Password", component: <StepThree /> },
        { name: "Agreement", component: <StepFour /> }
      ];

  return (
    <div className='createEvent-main py-3'>
        <div className="container-fluid">
            <button id='history'>History &nbsp;<img src={icon} alt="" /></button>
        </div>
        <div className='multistep rounded shadow pt-4 px-3 my-5 mx-auto'>
            <MultiStep steps={steps} nextStyle={{backgroundColor:"#fff", color:"#000", width:"100%", margin:"25px auto", display:"block", border:"none", padding:"8px 20px", borderRadius:"5px", fontWeight:"bold"}} prevStyle={{backgroundColor:"#fff", color:"#000", width:"100%", margin:"25px auto", display:"block", border:"none", padding:"8px 20px", borderRadius:"5px", fontWeight:"bold"}}/>
        </div>
    </div>
  )
}
