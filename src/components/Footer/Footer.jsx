import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <>
      <div className='footerBody'>
          
      <div className="fdiv0">
        <h2>Need Help?</h2>
        <p>Terms and Conditions</p>
        <p>Condition of Carriage Passenger</p>
        <p>Fare Policy</p>
        <p>Manage Booking Policy</p>
      </div>
      <div className="fdiv1">

        <h2>Fly Easy (P)LTD.</h2>
        <h3>Our Office</h3>
        <p>Nirmal Pandu Gwarkhu </p>
        <p>Gwarkhu-4 ,Kathmandu</p>
        <p>Email: Info@NSairlines.com</p>
      </div>
      <div className="fdiv2">
        <div className="fdivimgsec">
          <img src="../src/assets/instagram.svg" alt="img" />
          <img src="../src/assets/square-x-twitter.svg" alt="" />
          <img src="../src/assets/square-facebook.svg" alt="" />
        </div>
        <h1>
            Contact Us:<br/>+977-9805476565<br/>info@gmail.com
        </h1>
      </div>
      
      
      </div>
      <div className="lastOne">
        <div className="div1">
          <h3>Follow Us : twitter@gmail.com</h3>
        </div>
        <div className="div2">
          <p>Copyright &#169; 2024 FLY EASY.All Rights Reserved. </p>
        </div>
      </div>
      </>
  )
}

export default Footer
