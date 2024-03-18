import React, { useContext, useState, useEffect } from "react";
import "./Search.scss";

import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { context } from "../../main";
import axios from "axios";
import PassDetails from "../PassDetails/PassDetails";

const Search = () => {
  const location = useLocation();
  const formData = location.state;
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [show, setshow] = useState(false);
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [ticket, setticket] = useState("");

  console.log(formData.totalPassenger);
  console.log(passengerDetails);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/ticket/search");
      setSearchData(response.data.searchTicket);
    };

    fetchData();
  }, []);

  console.log(searchData);

  const handlePayment = (e, idx) => {
    e.preventDefault();
    {
      !isAuthenticated ? navigate("/login") : "";
    }

    setshow((prev) => !prev);

    setticket(searchData[idx]._id);
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengerDetails = [...passengerDetails];
    newPassengerDetails[index] = {
      ...newPassengerDetails[index],
      [field]: value,
    };
    setPassengerDetails(newPassengerDetails);
  };

  const filterSearch = searchData.filter(
    (Result) => Result.from == formData.from && Result.to == formData.to
  );

  const handleBook = () => {
    console.log(formData.from);
    console.log(formData.to);
    console.log(formData.totalPassenger);
    console.log(formData.returnDate);
    console.log(formData.adult);
    console.log(formData.child);
    console.log(passengerDetails);
    console.log(ticket);
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
                  <MdAirlineSeatReclineExtra />
                  <span>{item.seat}</span>
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
                <h3>NRS : 9000</h3>
                <button onClick={(e) => handlePayment(e, idx)}>Continue</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bookNow">
          <div className="container">
            <button onClick={() => setshow(false)}>
              <RxCross2 />
            </button>

            <h1>Passenger Details</h1>

            {Array.from({ length: formData.totalPassenger }).map((_, index) => (
              <PassDetails
                key={index}
                num={index + 1}
                onChange={(field, value) =>
                  handlePassengerChange(index, field, value)
                }
              />
            ))}

            <div className="btn">
              <button>NRS :9000 </button>
              <button onClick={handleBook}>Book Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
