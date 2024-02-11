import React, { useContext, useState } from 'react'
import './TicketStatus.css'
import { context } from '../../main';


function TicketStatus() {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);



  

  return (
  
  <>

    {
      isAuthenticated ?
          (<h2>yout ticket status</h2>) :
          <div class="image-container">
    <img src="../src/assets/bg-aero.jpg" alt="image"/>
	    <div class="overlay-text">
      "You have to be logged in to see your ticket status."
          </div>
          </div>
    }

    <main className='Tbody'>



       
      </main>
      </>
  )
}

export default TicketStatus
