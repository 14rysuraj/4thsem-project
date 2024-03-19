import React, { useContext, useEffect, useState } from "react";
import "./TicketStatus.css";
import { context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";

import { NavLink } from "react-router-dom";

function TicketStatus() {
  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/ticket/myTicket`);

      setTickets(response.data.ticket);
    };
    fetchData();
  }, []);

  const handleCancel = async (e, index) => {
    console.log(tickets[index]._id);
    const response = await axios.delete(
      `/api/v1/ticket/deleteTicket/${tickets[index]._id}`
    );

    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        toast.success("you will get 50% payment return");
      }, 1500);

      setTimeout(() => {
        window.location.reload();
      }, 4000);
    }
  };

  console.log(tickets);

  return (
    <>
      {isAuthenticated ? (
        <main className="Tbody">
          {tickets.map((ticket, index) => (
            <div key={ticket._id} className="ticket">
              <h2>Flight Number: {ticket.flightNumber}</h2>

              <div className="fromAndTotext">
                <p className="fromCitytext">From: {ticket.fromCity}</p>
              </div>
              <p>To: {ticket.toCity}</p>
              <br />
              <p>Flight Date: {ticket.date}</p>
              <p className="tripTypetext">TripType: {ticket.tripType}</p>
              <p className="passengertext">
                Passenger: {ticket.totalPassenger}
              </p>
              <p className="passengertext">
                Passenger Name :{" "}
                {ticket.passengerDetails.map((passenger) => (
                  <span key={passenger._id}>
                    {passenger.firstName} {passenger.lastName} (
                    {passenger.nationality}) ,
                  </span>
                ))}
              </p>
              <p className="tripTypetext">Amount: {ticket.amount}</p>
              <p className="tripTypetext">Return Date: {ticket.returnDate}</p>

              <div className="cancelBtn">
                <button onClick={(e) => handleCancel(e, index)}>
                  Cancel Ticket
                </button>
              </div>

              {/* Add more ticket information as needed */}
            </div>
          ))}
        </main>
      ) : (
        <div className="loginToSee">
          <NavLink to={"/login"}>Please Login To See Your Bookings</NavLink>
        </div>
      )}
    </>
  );
}

export default TicketStatus;
