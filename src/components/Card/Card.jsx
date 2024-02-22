import React, { useEffect, useState } from "react";
import "./Card.css";

function Card({ image, money, p }) {


  const handleCardBook = async (e) => {
    e.preventDefault();
    console.log(p + money);
   
  };

  return (
    <>
      <form className="bookingForm" onSubmit={handleCardBook}>
        <div className="B-card">
          <div className="B-card-img">
            <img src={image} alt="" />
          </div>
          <h2 className="b-tag">{p}</h2>
          <p>------------------------------</p>
          <div className="forGap">
            <p className="B-package">Package Starts From </p>
            <p className="B-package">
              <pre> NRS: {money}</pre>
            </p>
          </div>

          <p>------------------------------</p>

          <button className="book-now">More info</button>
        </div>
      </form>
    </>
  );
}

export default Card;
