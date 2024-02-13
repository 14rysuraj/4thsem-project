import React from "react";
import "./Card.css";
function Card({ image, money, p }) {
  





  const handleCardBook = async() => {
  



}


  return (
    <>
      





      
<form onSubmit={handleCardBook}></form>

      <div className="B-card">
        <div className="B-card-img">
          <img src={image} alt="" />
               
        </div>
        <h2 className="b-tag">{p}</h2>
              <p>------------------------------</p>
              <div className="forGap">
              <p className="B-package">Package Starts From </p>
                  <p className="B-package"><pre>     NRS: {money}</pre></p>
                 
                  </div>
      
        <p>------------------------------</p>

        <button className="book-now">Book Now</button>
      </div>
    </>
  );
}

export default Card;
