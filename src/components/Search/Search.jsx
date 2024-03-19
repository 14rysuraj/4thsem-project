import React, { useContext, useState, useEffect, useRef } from "react";
import "./Search.scss";

import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { context } from "../../main";
import axios from "axios";
import PassDetails from "../PassDetails/PassDetails";
import { toast } from "react-toastify";
import { FaPlane } from "react-icons/fa";
const Search = () => {
  const location = useLocation();
  const formData = location.state;
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [show, setshow] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState(
    Array(formData.totalPassenger).fill({})
   );
   
  const [ticket, setticket] = useState("");
  const bookNowRef = useRef(null);
  const [amount, setamount] = useState();

  console.log(passengerDetails);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/ticket/search");
      setSearchData(response.data.searchTicket);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const passenger = formData.totalPassenger;
    setamount(passenger * 4000);
  }, [amount]);

  const handlePayment = (e, idx) => {
    e.preventDefault();
    {
      !isAuthenticated ? navigate("/login") : "";
    }

    setshow((prev) => !prev);

    setticket(searchData[idx].flightNumber);
  };

  const handlePassengerChange = (index, field, value) => {
    console.log(`Updating passenger ${index + 1}, field: ${field}, value: ${value}`);
    const newPassengerDetails = [...passengerDetails];
    if (!newPassengerDetails[index]) {
       newPassengerDetails[index] = {};
    }
    newPassengerDetails[index][field] = value;
    setPassengerDetails(newPassengerDetails);
   };
   

  const filterSearch = searchData.filter(
    (Result) => Result.from == formData.from && Result.to == formData.to
  );


  const handleBook = async (e) => {
    e.preventDefault();

    console.log("Passenger Details Before Check:", passengerDetails);

    const hasEmptyField = passengerDetails.some(
      (passenger) => !passenger.firstName || !passenger.lastName || !passenger.nationality
     );
     
     console.log("Has Empty Field:", hasEmptyField);
     
  
    if (hasEmptyField) {
      toast.error("Fields are missing");
      return;
   }
  

   

    const fromCity = formData.from;
    const toCity = formData.to;
    const date = formData.date;
    const totalPassenger = formData.totalPassenger;
    const adult = formData.adult;
    const child = formData.child;
    const tripType = formData.tripType;
    const returnDate = formData.returnDate;
    const passengerDetailsData = passengerDetails;
    const flightNumber = ticket;

    const response = await axios.post(
      "/api/v1/ticket/new",
      {
        fromCity,
        toCity,
        date,
        totalPassenger,
        adult,
        child,
        tripType,
        amount,
        returnDate,
        passengerDetails: passengerDetailsData,
        flightNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/book");
      
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <>
      {!show ? (
        <div className="searchBody">
          <div className="header">
            <div className="one">
              <h1>From</h1>
              <p>{formData.from}</p>
            </div>
            <IoAirplaneSharp />
            <div className="one">
              <h1>To</h1>
              <p>{formData.to}</p>
            </div>
            <div className="one">
              <h1>Departure Date</h1>
              <p>{formData.date}</p>
            </div>

            <div className="one">
              <h1>Return Date</h1>
              <p>{formData.returnDate || "One Way"}</p>
            </div>

            <div className="one">
              <h1>Passenger Type</h1>
              <p>Adult :{formData.adult}</p>
              <p>Child :{formData.child}</p>
            </div>
          </div>

          {filterSearch.map((item, idx) => (
            <div key={idx} className="searchContainer">
              <div className="one">
                <div className="seat">
                  <FaPlane />

                  <span>{item.flightNumber}</span>
                </div>
                <div className="middle">
                  <h3>{item.from}</h3>
                  <IoAirplaneSharp />
                  <h3>{item.to}</h3>
                </div>
                <div className="last">
                  <h3>arrival time</h3>
                  <span>{item.time}</span>
                </div>
              </div>
              <div className="two">
                <h3>NRS : {amount}</h3>
                <button onClick={(e) => handlePayment(e, idx)}>Continue</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div ref={bookNowRef} className={`bookNow ${show ? "show" : ""}`}>
          <div className="container">
            <button onClick={() => setshow(false)}>
              <RxCross2 />
            </button>

            <h1>Passenger Details</h1>

            {Array.from({ length: formData.totalPassenger }).map((_, index) => (
 <PassDetails
    key={index}
    num={index + 1}
    onChange={(field, value) => handlePassengerChange(index, field, value)}
 />
))}



            <div className="btn">
              <button>NRS : {amount} </button>
              <button onClick={handleBook}>Book Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
