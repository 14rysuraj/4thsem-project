import React from "react";
import "./Book.css";
import Card from "../Card/Card";
import pic1  from "../../assets/lumbini.jpeg";
import pic2 from "../../assets/specialfamilytour.jpeg"
import pic3 from "../../assets/adventurouspokharatour.jpeg"
import pic4 from "../../assets/muktinath.jpeg"
import pic5 from "../../assets/jalbire.jpeg"
import pic6 from "../../assets/pokharaandsang.jpeg"
import pic7 from "../../assets/paragliding.jpeg"
import pic8 from "../../assets/templerun.jpeg"

import Payment from "../Payment/Payment";



function Book() {
  const handleBookNow = (e) => {};

  return (
    <>
      <div className="BookBody">
        <div className="size">
          <div className="wholeBook">
            <h1 id="B-message">Where Do You Like To Go ?</h1>
            <div className="Booking">
              <div className="aero-image"></div>
            </div>
            <form action="/payment" className="bookForm">
              <label for="from">
                From : <br />
                <select name="city" id="from">
                  <option value="Lumbini">Lumbini</option>
                </select>
               
              </label>
              <br />
              <label for="to">
                To : <br />
                <select name="city" id="to">
                  <option value="Pokhara">Pokhara</option>
                  <option value="Muktinath">Muktinath</option>
                
                </select>
                 
              </label>
              <br />
              <div className="dateAndClass">
                <input type="date" className="date" />
                <select name="passenger" id="passengers" className="class">
                  <option value="1 Adult -Business">1 Adult-Business</option>
                </select>
              </div>
              
              <div className="btn-cont">
                <button className="Book-now" onClick={handleBookNow}>
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="B-card-sec">
          <Card
            image={pic1}
            money="1288"
            p="TWO DAYS IN PEACEFUL LUMBINI"
          />
          <Card
            p="Special Family Tour"
            image={pic2}
            money="3000"
          />
          <Card
            image={pic3}
            p="Adventorous Pokhara Tour"
          />
          <Card
            image={pic4}
            p="MUKTINATH DARSHAN"
          />

        </div>

        <div className="B-card-sec2">
          <Card
            image={pic5}
          p="JALBIRE CANYONING"
          />
          <Card
            image={pic6}
          p="POKHARA AND SARANGKOT"
          />
          <Card
            image={pic7}
          p="PARAGLIDING IN POKHARA"
          />
          <Card
            image={pic8}
            p="TEMPLE RUN [BHTRTO]"
          />
        </div>
      </div>
    </>
  );
}

export default Book;
