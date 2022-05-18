import React, {useState, useEffect,useLayoutEffect} from 'react'
import { StepFour } from '../../components/Elements/StepFour';
import { StepOne } from '../../components/Elements/StepOne';
import { StepThree } from '../../components/Elements/StepThree';
import { StepTwo } from '../../components/Elements/StepTwo';
import MultiStep from "react-multistep";
import icon from '../../../images/icon-park-outline_history-query.png'
import { FiArrowLeft } from 'react-icons/fi'
import { CreatorReward } from './../../../web3/betsMVPService'
let FILL = false


export default function CreateEvent() {
    

    const [historyVisibility, setHistoryVisibility] = useState(false)
    const [completed, setCompleted] = useState([])
    const [option, setOption] = useState(1)
    const [notComplete, setNotcomplete] = useState([])


    useLayoutEffect(()=>{
        const completed =async()=>{
            const decodestoredevents = JSON.parse(window.localStorage.getItem('events'))
            decodestoredevents.forEach(async(element) => {
                const reward = await CreatorReward(element.id)
                element.creatoraward = reward
              });
            setCompleted(decodestoredevents)
        }
        completed();
        window.eventTitle2 = window.eventTitle
        window.description2 = window.description
        window.url2 = window.url
    },[window.url,window.description,window.eventTitle])

    


    const steps = [
        { name: "Name A", component: <StepOne /> },
        { name: "Email", component: <StepTwo /> },
        { name: "Password", component: <StepThree /> },
        { name: "Agreement", component: <StepFour /> }
    ];

    const completedCards = [
        {
            hashtags: "#SPORTS #SOCCER",
            title: "Chealsea  vs  Machester City",
            starts: "20 DEC 2020",
            ends: "20 DEC 2021",
            pool: "$0",
            reward: "$0",
        },
        {
            hashtags: "#SPORTS #SOCCER",
            title: "Chealsea  vs  Machester City",
            starts: "20 DEC 2020",
            ends: "20 DEC 2021",
            pool: "$0",
            reward: "$0",
        },
        {
            hashtags: "#SPORTS #SOCCER",
            title: "Chealsea  vs  Machester City",
            starts: "20 DEC 2020",
            ends: "20 DEC 2021",
            pool: "$0",
            reward: "$0",
        },
    ]

    const getdays = (endime) => {
        var current = Math.round(new Date().getTime()/1000)
        var seconds =  (endime/1000)-current 
        var day = Math.floor(seconds/86400)
        if(day>0){
          return day;
        }
        else{
          return 0;
        }
      }

    const renderCompleted = (completedCards, index) => {
        return (
            <>
            {}
            {completedCards.validate ? <div className="card my-4" key={index} style={{backgroundColor:"#1c1c1c"}}>
        <div className="card-header text-secondary">
            <span>#{completedCards.subcategory}</span>
            <h4 className='text-light fs-5'>{completedCards.name}</h4>
            <div className='justify-content-between d-flex'>
                <span>Starts: {getdays(completedCards.starttime)}</span>
                <span>Ends: {getdays(completedCards.endtime)}</span>
            </div>
        </div>
        <div className="card-body bg-dark text-light">
            <span className="card-text">ODDS</span>
            <p>{completedCards.teamone}<br />{completedCards.teamtwo}<br/>DRAW</p>
            <span>POOL SIZE</span>
            <p>{completedCards.poolsize/10**18}</p>
            <span>CREATOR's REWARD</span>
            <p>{completedCards.reward}</p>
        </div>
    </div>:''}
            </>
        )
    }
    
    const renderNotCompleted = (completedCards, index) => {
        return (
            <>
            {completedCards.validate ? '' : <div className="card my-4" key={index} style={{backgroundColor:"#1c1c1c"}}>
        <div className="card-header text-secondary">
            <span>#{completedCards.subcategory}</span>
            <h4 className='text-light fs-5'>{completedCards.name}</h4>
            <div className='justify-content-between d-flex'>
                <span>Starts: {getdays(completedCards.starttime)}</span>
                <span>Ends: {getdays(completedCards.endtime)}</span>
            </div>
        </div>
        <div className="card-body bg-dark text-light">
            <span className="card-text">ODDS</span>
            <p>{completedCards.teamone}<br />{completedCards.teamtwo}<br/>DRAW</p>
            <span>POOL SIZE</span>
            <p>{completedCards.poolsize}</p>
            <span>CREATOR's REWARD</span>
            <p>{completedCards.reward}</p>
        </div>
    </div>}
            </>
        )
    }
   
    setInterval(()=>{
        if(window.eventTitle2 && window.description2 && window.url2){
            window.FILL = true
        }
        
    },200)

    return (
        <div className='createEvent-main py-3'>
            <div className="container-fluid d-flex justify-content-between">
                {historyVisibility && <button onClick={() => setHistoryVisibility(false)} id='history'><FiArrowLeft />&nbsp; BACK</button>}
                <button onClick={() => setHistoryVisibility(true)} id='history' className='ms-auto'>History &nbsp;<img src={icon} alt="" /></button>
            </div>
            <div className='multistep rounded shadow pt-4 px-3 my-5 mx-auto' style={historyVisibility === false ? {display:"block"} : {display: "none"}}>
            <MultiStep steps={steps} showNavigation={true} fill={window.FILL} nextStyle={{backgroundColor:"#fff", color:"#000", width:"100%", margin:"25px auto", display:"block", border:"none", padding:"8px 20px", borderRadius:"5px", fontWeight:"bold"}} prevStyle={{backgroundColor:"#fff", color:"#000", width:"100%", margin:"25px auto", display:"block", border:"none", padding:"8px 20px", borderRadius:"5px", fontWeight:"bold"}}/>
        </div>

            {/* HISTORY */}
            <div className="container-fluid completed mt-5" style={historyVisibility === true ? {display:"block"} : {display: "none"}}>
                <div className="col-md-3">
                    <select className="form-select bg-dark border-0 text-light py-3" id="specificSizeSelect" onChange={(e)=>setOption(e.target.value)}>
                        <option selected value={1}>COMPLETED</option>
                        <option value={2}>PENDING</option>
                    </select>
                </div>
                {option == 1 ?<div className="container">
                    {completed.map((data)=>renderCompleted(data))}
                </div> : option == 2 ? <div className="container">
                    {completed.map((data)=>renderNotCompleted(data))}
                </div>: ''}
            </div>
        </div>
    )
}
