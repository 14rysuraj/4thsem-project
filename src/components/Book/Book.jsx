import React, { useContext, useEffect, useState } from "react";
import "./Book.css";
import Card from "../Card/Card";
import pic1 from "../../assets/lumbini.jpeg";
import pic2 from "../../assets/specialfamilytour.jpeg";
import pic3 from "../../assets/adventurouspokharatour.jpeg";
import pic4 from "../../assets/muktinath.jpeg";
import pic5 from "../../assets/jalbire.jpeg";
import pic6 from "../../assets/pokharaandsang.jpeg";
import pic7 from "../../assets/paragliding.jpeg";
import pic8 from "../../assets/templerun.jpeg";

import Payment from "../Payment/Payment";
import toast from "react-hot-toast";
import { Navigate, redirect } from "react-router-dom";
import { context } from "../../main";

function Book() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [passenger, setPassenger] = useState("");
  const [tripType, setTripType] = useState("");
  const [amount, setAmount] = useState("");
  const { isAutheticated, setIsAuthenticated } = useContext(context);

  const handleBook = (e) => {
    e.preventDefault();

    if (!fromCity || !toCity) return toast.error("select the city");
    if (fromCity === toCity) return toast.error("choose different city");

    if (!passenger) return toast.error("select the passenger");
    if (!tripType) return toast.error("select the trip type");

    if (!isAutheticated) toast.error("login first for booking");
    return <Navigate to={"/login"} />;

    console.log(fromCity + toCity + date + passenger + tripType);

    toast.success("Thank you for booking");
    setFromCity("");
    setToCity("");
    setDate("");
    setPassenger("");
    setTripType("");
    setAmount("");
  };

  const handleReverse = () => {
    let tempFrom = fromCity;
    let tempTo = toCity;
    setFromCity(tempTo);
    setToCity(tempFrom);
  };

  useEffect(() => {
    console.log("from city:", fromCity);
    console.log("top city:", toCity);
  }, [fromCity, toCity]);

  return (
    <>
      <div className="BookBody">
        <div className="size">
          <div className="wholeBook">
            <h1 id="B-message">Where Do You Like To Go ?</h1>
            <div className="Booking">
              <div className="aero-image"></div>
            </div>
            <form onSubmit={handleBook} className="bookForm">
              <div className="toAndFrom">
                <select
                  name="city"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  id="from"
                >
                  <option value="">From</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                  <option value="Muktinath">Muktinath</option>
                </select>

                <div
                  onClick={() => handleReverse()}
                  className="switchicon"
                ></div>

                <select
                  name="city"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  id="to"
                >
                  <option value="">To</option>
                  <option value="Muktinath">Muktinath</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Pokhara">Pokhara</option>
                </select>
              </div>
              <br />
              <div className="dateAndClass">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="date"
                  required
                />
                <select
                  name="passenger"
                  id="passengers"
                  className="class"
                  placeho
                  value={passenger}
                  onChange={(e) => setPassenger(e.target.value)}
                >
                  <option value="">Passenger</option>
                  <option value="2 Adult">2 Adult</option>
                </select>
              </div>

              <div className="oneWayTwoWay">
                {/* Radio buttons for selecting trip type */}
                <label>
                  <input
                    type="radio"
                    value="oneWay"
                    checked={tripType === "oneWay"}
                    onChange={() => setTripType("oneWay")}
                  />
                  One Way
                </label>
                <label>
                  <input
                    type="radio"
                    value="twoWay"
                    checked={tripType === "twoWay"}
                    onChange={() => setTripType("twoWay")}
                  />
                  Two Way
                </label>
              </div>

              <div className="btn-cont">
                <h1 id="moneyCalc">Amount :</h1>
                <button className="Book-now">Book Now</button>
              </div>
            </form>
          </div>
        </div>

        <div className="B-card-sec">
          <Card image={pic1} money="1288" p="TWO DAYS IN PEACEFUL LUMBINI" />
          <Card p="Special Family Tour" image={pic2} money="3000" />
          <Card image={pic3} p="Adventorous Pokhara Tour" />
          <Card image={pic4} p="MUKTINATH DARSHAN" />
        </div>

        <div className="B-card-sec2">
          <Card image={pic5} p="JALBIRE CANYONING" />
          <Card image={pic6} p="POKHARA AND SARANGKOT" />
          <Card image={pic7} p="PARAGLIDING IN POKHARA" />
          <Card image={pic8} p="TEMPLE RUN [BHTRTO]" />
        </div>
      </div>
    </>
  );
}

export default Book;
