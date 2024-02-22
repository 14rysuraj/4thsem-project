import React from "react";
import ContactCard from "../ContactCard/ContactCard";
import "./Contact.css"


function Contact() {
    return <>
        <div className="contactBody">
            <div className="contactCard">
        <ContactCard heading="KATHMANDU" office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865" />
        <ContactCard heading="KATHMANDU AIRPORT" office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865" />
        <ContactCard heading="BIRATNAGAR" office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865" />
        <ContactCard heading="SIMRA" office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865" />
        <ContactCard heading="BHADRAPUR" office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865" />
        <ContactCard heading="POKHARA"  office="Corporate Office" number="034-454564" number2="945-495749" flightInfo="+97348563865"/>
            </div>

            <h2>Location Map</h2>
            <img src="../src/assets/map.png" alt="" />
            </div>
      
    </>;
}

export default Contact;
