import React from 'react'
import { Button, Modal } from "react-bootstrap";

export default function HeroModal(props) {
  return (
    <div className='heroModal'>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className='bg-dark rounded p-0'>
            <iframe src="https://www.youtube.com/embed/u2KHX3pAjXw" style={{height:"100%", width:"100%", minHeight:"400px"}} frameborder="0"></iframe>
        </Modal.Body>
      </Modal>
    </div>
  )
}
