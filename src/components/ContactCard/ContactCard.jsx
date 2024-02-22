import React from 'react'
import "./ContactCard.css"
function ContactCard(props) {
  return (
    <div  className="contact-card">
          <h1>{props.heading}</h1>
          <h2>{props.office}</h2>
          <p>{props.number}</p>
          <p>{props.number2}</p>
          <p>Flight information {props.flightInfo }</p>
    </div>
  )
}

export default ContactCard
