import React from 'react'
import {GoPrimitiveDot} from 'react-icons/go'

export default function BetSlip() {

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

    const renderCompleted = (completedCards, index) => {
        return (
            <div className="card w-75 my-4" key={index} style={{ backgroundColor: "#1c1c1c" }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between" style={{fontSize: "12px"}}>
                        <span className='text-light'><GoPrimitiveDot color='green' size={18}/> ACTIVE</span>
                        <span className='text-secondary'>#SOCCER</span>
                    </div>
                    <h5 className="card-title text-center">Chealsea <span className='text-danger'>vs</span> Machester City</h5>
                    <p className="text-center text-light my-3" style={{fontSize:"12px"}}>POOL SIZE<br /><span className='fs-6'>$3,600</span></p>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-warning ms-auto fw-bold">BOOST</a>
                </div>
            </div>
        )
    }

    return (
        <div className='container-fluid betslip-main'>
            <div className="row py-3 px-2 mb-3 justify-content-around">
                <div className="col-md-3 p-2 shadow rounded border-light">
                    <span>TOTAL</span>
                    <h5>BETS MADE</h5>
                    <hr className='text-light' />
                    <p>500</p>
                </div>
                <div className="col-md-3 p-2 shadow rounded border-primary">
                    <span>TOTAL</span>
                    <h5>BETS WON</h5>
                    <hr className='text-primary' />
                    <p>50</p>
                </div>
                <div className="col-md-3 p-2 shadow rounded border-danger">
                    <span>TOTAL</span>
                    <h5>BETS LOST</h5>
                    <hr className="text-danger" />
                    <p>300</p>
                </div>
                <div className="col-md-3 p-2 shadow rounded border-success">
                    <span>TOTAL</span>
                    <h5>AMOUNT WON</h5>
                    <hr className='text-success' />
                    <p>$10,000,000</p>
                </div>
            </div>
            <div className="container-fluid px-4 py-4 w-100">
                <div className="col-md-3">
                    <select className="form-select bg-dark border-0 text-light py-3" id="specificSizeSelect">
                        <option selected>ACTIVE</option>
                        <option value="1">INACTIVE</option>
                        <option value="2">HISTORY</option>
                    </select>
                </div>
                <div className="container activeBets">
                    {completedCards.map(renderCompleted)}
                </div>
            </div>
        </div>
    )
}
