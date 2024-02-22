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
import { useNavigate,Navigate, redirect } from "react-router-dom";
import { context } from "../../main";
import axios from "axios";

function Book() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [passenger, setPassenger] = useState("");
  const [tripType, setTripType] = useState("");
  const [amount, setAmount] = useState("1000");
  const [returnDate, setReturnDate] = useState("");
  const { isAuthenticated, setIsAuthenticated,round,setRound } = useContext(context);

  const navigate = useNavigate();

  useEffect(() => {
    setAmount(passenger * 1000);
    if (tripType == "twoWay") {
      setAmount(passenger * 1000 * 2);
    }
  });

  const handleBook = async (e) => {
    try {
      e.preventDefault();
      if (!fromCity || !toCity) return toast.error("select the city");
      if (fromCity === toCity) return toast.error("choose different city");
      if (new Date(date) < Date.now() || new Date(returnDate) < Date.now())
        return toast.error("date not valid");
      if (!passenger) return toast.error("select the passenger");
      if (!tripType) return toast.error("select the trip type");
      

      const response = await axios.post(
        "/api/v1/ticket/new",
        {
          fromCity,
          toCity,
          date,
          passenger,
          tripType,
          amount,
          returnDate,
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
        
        navigate("/" ,{ replace: true});
        
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }

    {
      !isAuthenticated ? toast.error("Login  first") : "";
    }
  };

  const handleReverse = () => {
    let tempFrom = fromCity;
    let tempTo = toCity;
    setFromCity(tempTo);
    setToCity(tempFrom);
  };

 

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
                  <option value="2">2 Adult</option>
                  <option value="3">3 Adult</option>
                </select>
              </div>
              {tripType == "twoWay" ? (
                <p className="returnDate">Return Date :</p>
              ) : (
                ""
              )}

              {tripType == "twoWay" ? (
                <div className="returnDateAndInput">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="date"
                    required
                  />
                </div>
              ) : (
                ""
              )}

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
                <h1 id="moneyCalc">Amount :{amount}</h1>
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
