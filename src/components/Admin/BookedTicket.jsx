import React, { useEffect, useState } from "react";
import "./BookedTicket.scss";
import axios from "axios";
import { toast } from "react-toastify";

const BookedTicket = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/admin/allbookedticket");
        setDatas(response.data.ticket);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load booked tickets");
      }
    };
    fetchData();
 }, []);

  console.log(datas);

  return (
    <div className="bookedTicketBody">
      <h2>Booked Ticket</h2>

      {datas.map((item, idx) => (
        <div key={idx} className="container">
          <p>Flight Number: <p>{item.flightNumber}</p></p>
          <p>Flight Date: <p>{item.date}</p></p>
          <p>Passenger:  <p>{item.totalPassenger}</p></p>
          <p>Booked by: <p>{item.user.name}</p></p>
        </div>
      ))}


      
    </div>
  );
};

export default BookedTicket;
