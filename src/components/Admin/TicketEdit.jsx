import React, { useState, useEffect } from "react";
import "./TicketEdit.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const TicketEdit = () => {
  const { id } = useParams();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [time, setTime] = useState("");
  const [flightNumber, setflightNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/v1/ticket/search/${id}`);
      setFrom(response.data.ticket.from);
      setTo(response.data.ticket.to);
      setTime(response.data.ticket.time);
      setflightNumber(response.data.ticket.flightNumber);
    };

    fetchData();
  }, []);

  console.log(id);

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await axios.post(`/api/v1/ticket/update/${id}`, {
      from: from,
      to: to,
      time: time,
      flightNumber: flightNumber,
    });

    if (response) {
      toast.success("Ticket updated successfully");
      navigate("/admin/managetickets");
    }
  };

  return (
    <div className="ticketEdit">
      <div className="container">
        <form>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setflightNumber(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </form>
      </div>
    </div>
  );
};

export default TicketEdit;
