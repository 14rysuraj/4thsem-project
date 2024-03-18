import React, { useEffect, useState } from "react";
import "./ManageTicket.scss";
import axios from "axios";
import { Link, Outlet } from "react-router-dom";
import {toast} from "react-toastify"


const ManageTicket = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/ticket/search");
      setTickets(response.data.searchTicket);
    };

    fetchData();
  }, []);

  const handleDeleteTicket = (e, index) => {
    console.log(tickets[index]._id);
    const response = axios.delete(
      `/api/v1/ticket/delete/${tickets[index]._id}`
    );

    if (response) {
      toast.success("Ticket deleted successfully");


      setTimeout(() => {
        window.location.reload();
      }, 2500);
     
    }
  };

  return (
    <div className="userDetail">
      <header>
        <div>From</div>
        <div>To</div>
        <div>Time</div>
        <div>Seat</div>
        <div>Edit</div>
      </header>

      {tickets.map((ticket, index) => (
        <div key={ticket._id} className="info">
          <h3>{ticket.from}</h3>
          <h3>{ticket.to}</h3>
          <h3>{ticket.time}</h3>
          <h3>{ticket.seat}</h3>
          <h3>
        <button>  <Link to={`/admin/ticketedit/${ticket._id}`}>Edit</Link></button> |{" "}
            <button onClick={(e) => handleDeleteTicket(e, index)}>
              Delete
            </button>
          </h3>
        </div>
      ))}

      <div className="add">
        <div className="addTicketForm">
          <Outlet />
        </div>
        {window.location.href ===
        "http://localhost:5173/admin/managetickets" ? (
          <button>
            {" "}
            <Link to="/admin/managetickets/edit">Add Ticket</Link>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ManageTicket;
