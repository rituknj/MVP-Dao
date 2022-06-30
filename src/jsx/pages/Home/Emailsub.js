import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import emailImg from './../../../images/email.png'
import { AiOutlineRight } from 'react-icons/ai'

export default function Emailsub() {
  const [user_email, set_user_email] = useState('')
  const [typeError, setTypeError] = useState('')
  const [success, setSuccess] = useState('')

  const expression = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/

  const handleName = (e) => {
    set_user_email(e.target.value)
  }
  const submitEmail = () => {
    if (user_email !== '') {
      setSuccess('We have recorded your response!')
    }
  }

  function sendEmail(e) {
    e.preventDefault()
    emailjs
      .send(
        'service_mcklc7e',
        'template_d33pzz5',
        { user_email },
        'YNUEqJSlFkM9w8gR5',
      )
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        },
        e.target.reset(),
      )
  }
  return (
    <div>
      <div
        className="container-fluid"
        style={{ backgroundColor: '#0b0b0b', padding: '50px 0' }}
      >
        <div className="container faq-box">
          <div className="subscribe">
            <div className="outer-box text-white">
              <h4 className="font-weight-bold">GET THE LATEST</h4>
              <p>
                SUBSCRIBE TO GET THE LATEST OF OUR NEWS, AND
                <br />
                LATEST UPDATES
              </p>
              <form onSubmit={sendEmail}>
                <input
                  className="sub-input py-3 px-4 text-light"
                  placeholder="email@domain.com"
                  type="email"
                  name="user_email"
                  value={user_email}
                  onChange={handleName}
                  required
                />
                {expression.test(user_email) === true ? (
                  ''
                ) : (
                  <p className="text-danger">{typeError}</p>
                )}
                <p className="text-success">{success}</p>

                <div className="sighup-btn">
                  <button
                    type="submit"
                    value="Send"
                    className="btn btn-md mt-1 mt-md-5 pl-4 pr-4 btn-signup text-light"
                    onClick={() => {
                      submitEmail()
                    }}
                    style={{
                      boxShadow: '10px 10px 4px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    SIGN UP
                    <AiOutlineRight
                      style={{ position: 'absolute', right: '5px' }}
                      className="mt-1  fw-bold"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="text-white faqbox">
            <div className="question-box">
              <h4 className="font-weight-bold">HAVE A QUESTION?</h4>
              <p>SEND US A MAIL</p>
              <div>
                <p className="text-white text-email mb-0">
                  <img src={emailImg} alt="" width="22" /> admin@betswamp.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
