import React, { lazy, useContext, useEffect, useState } from "react";
import "./Book.css";
import Card from "../Card/Card";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, Navigate, redirect } from "react-router-dom";
import { context } from "../../main";
import "./Book.scss";
import { packages } from "../utils/packeges";
import { FaPlaneDeparture } from "react-icons/fa";
import { TbArrowsExchange } from "react-icons/tb";
import { FaLongArrowAltRight } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import Search from "../Search/Search";

function Book() {
  let today = new Date().toISOString().split("T")[0];
  let today1 = new Date();
  let maxDate = new Date(today1.getTime() + 2 * 24 * 60 * 60 * 1000);
  let maxDateString = maxDate.toISOString().split("T")[0];
  console.log(maxDateString);

  const { isAuthenticated, setIsAuthenticated } = useContext(context);
  const [tripType, setTripType] = useState("OneWay");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [showPassenger, setShowPassenger] = useState(false);
  const [adult, setadult] = useState(1);
  const [child, setchild] = useState(0);
  const [nationality, setNationality] = useState("");

  const handleSearchFlights = (e) => {
    e.preventDefault();

    if (!from || !to) return toast.error("Please select a location");
    if (!date) return toast.error("Please select a date");
    if (!nationality) return toast.error("Please enter your nationality");

   if(!returnDate && tripType==="RoundTrip") return toast.error("Please enter a return date");

    navigate("/search", {
      state: {
        tripType,
        nationality,
        adult,
        child,
        totalPassenger,
        from,
        to,
        date,
        returnDate,
      },
    });
  };

  const handleShowPassenger = (e) => {
    e.preventDefault();
    setShowPassenger((prev) => !prev);
  };

  let totalPassenger = 0;
  totalPassenger += adult + child;

  const subtractAdult = (e) => {
    e.preventDefault();
    setadult((prev) => parseInt(prev) - 1);
  };
  const addAdult = (e) => {
    e.preventDefault();
    setadult((prev) => parseInt(prev) + 1);
  };

  const subtractChild = (e) => {
    e.preventDefault();
    setchild((prev) => parseInt(prev) - 1);
  };

  const addChild = (e) => {
    e.preventDefault();
    setchild((prev) => parseInt(prev) + 1);
  };

  const handleSwapValue = (e) => {
    e.preventDefault();
    let tempFrom = from;
    let tempTo = to;
    setFrom(tempTo);
    setTo(tempFrom);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="BookBody">
        <div className="imgContainer">
          <div className="bookingContainer">
            <div className="flight">
              {" "}
              <FaPlaneDeparture />
              Flight
            </div>
            <form action="">
              <div className="options">
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="OneWay">One Way</option>
                  <option value="RoundTrip">Round Trip</option>
                </select>
                <select
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                >
                  <option value="">Nationality</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Indian">Indian</option>
                </select>
                <div className="passenger">
                  <label htmlFor="passenger"> {totalPassenger} passenger</label>

                  <button onClick={handleShowPassenger} id="passenger">
                    <MdOutlineKeyboardArrowDown />
                  </button>
                  {showPassenger ? (
                    <div className="dropdown">
                      <h3>
                        Passenger (max 8){" "}
                        <button onClick={handleShowPassenger}>
                          <IoMdClose />
                        </button>{" "}
                      </h3>
                      <div className="adult">
                        <p>Adult </p>

                        <button onClick={subtractAdult} disabled={adult <= 1}>
                          -
                        </button>
                        <span>{adult}</span>
                        <button
                          onClick={addAdult}
                          disabled={totalPassenger > 7}
                        >
                          +
                        </button>
                      </div>
                      <div className="child">
                        <p>Child</p>
                        <button onClick={subtractChild} disabled={child <= 0}>
                          -
                        </button>
                        <span>{child}</span>
                        <button
                          onClick={addChild}
                          disabled={totalPassenger > 7}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="otherOptions">
                <div className="source">
                  <h2>From</h2>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option value="">Select Boarding Location</option>
                    <option value="pokhara">Pokhara</option>
                    <option value="kathmandu">Kathmandu</option>
                  </select>
                </div>
                <button onClick={handleSwapValue}>
                  <TbArrowsExchange />
                </button>
                <div className="destination">
                  <h2>To</h2>
                  <select value={to} onChange={(e) => setTo(e.target.value)}>
                    <option value="">Select Destination</option>
                    <option value="pokhara">Pokhara</option>
                    <option value="kathmandu">Kathmandu</option>
                  </select>
                </div>
                <div className="dates">
                  <div className="departure">
                    <h2>Departure</h2>
                    <input
                      type="date"
                      value={date}
                      min={today}
                      max={maxDateString}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div className="return">
                    {" "}
                    <h2>Return</h2>
                    {tripType === "OneWay" ? (
                      <input
                        type="date"
                        value={returnDate}
                        min={today}
                        disabled
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    ) : (
                      <input
                        type="date"
                        value={returnDate}
                        min={today}
                        max={maxDateString}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <button onClick={handleSearchFlights}>
            Search Flights <FaLongArrowAltRight />
          </button>
        </div>

        <div className="hero">
          <div className="one">
            <p>Choose Your</p>
            <h1>DESTINATIONS</h1>
            <h2>
              Our Airlines provides domestic flight from Kathmandu to various
              populat destinations.
            </h2>
          </div>
          <div className="two">
            <div className="imgoneandtwo">
              {" "}
              <img src="src/assets/oneimg.jpeg" alt="" />
            </div>
            <div className="imgoneandtwo" id="imgtwo">
              <img src="src/assets/twoimg.jpeg" alt="" />
            </div>

            <div className="imgthirdandforth" id="thirdimg">
              <img src="src/assets/threeimg.jpeg" alt="" />
            </div>
            <div className="imgthirdandforth" id="forthimg">
              <img src="src/assets/fourthimg.jpeg" alt="" />
            </div>
          </div>
        </div>

        <h2 className="h2">Check Out Our Special Packages</h2>
        <div className="B-card-sec">
          {packages.map((item, id) => (
            <Card
              key={item.id}
              image={item.image}
              price={item.price}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Book;
