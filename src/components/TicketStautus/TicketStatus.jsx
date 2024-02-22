import React, { useContext, useEffect, useState } from "react";
import "./TicketStatus.css";
import { context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function TicketStatus() {
  const { isAuthenticated, setIsAuthenticated, round, setRound } =
    useContext(context);
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
      }, 2500);
    }
  };

  return (
    <>
     {isAuthenticated?(<main className="Tbody">
        {tickets.map((ticket, index) => (
          <div key={ticket._id} className="ticket">
            <h2>Ticket ID: {ticket._id}</h2>
            

            <div className="fromAndTotext">
              <p className="fromCitytext">From: {ticket.fromCity}</p>
              <p>To: {ticket.toCity}</p>
            </div>
            <p>Daparts: {ticket.date}</p>
            <p className="tripTypetext">TripType: {ticket.tripType}</p>
            <p className="passengertext">Passenger: {ticket.passenger}</p>
            <div className="cancelBtn">
              <button onClick={(e) => handleCancel(e, index)}>
                Cancel Ticket
              </button>
            </div>

            <p className="amounttext">Amount:{ticket.amount}</p>
            {/* Add more ticket information as needed */}
          </div>
        ))}
      </main>) : <div className="loginToSee">
          <NavLink to={"/login"}>Please Login To See Your Bookings</NavLink>
      </div>}
      
    </>
  );
}

export default TicketStatus;
