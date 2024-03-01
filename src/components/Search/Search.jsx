import React, { useContext } from "react";
import "./Search.scss";
import { searchResult } from "../utils/searchflightdata";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { IoAirplaneSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { context } from "../../main";


const Search = () => {
  const location = useLocation();
  const formData = location.state;
  const { isAuthenticated, setisAuthenticated } = useContext(context);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    {!isAuthenticated ? navigate("/login"):""} 

  };

  return (
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

      {console.log(formData)}

      {searchResult.map((item, id) => (
        <div key={item.id} className="searchContainer">
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
            <button onClick={handlePayment}>Continue</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
