import React from "react";
import "./Services.css";

function Services({img,title}) {
  return (
      <div className="serviceCard">
          <div className="imgdiv">
          <img src={img} alt="" />
              </div>
          
      <h3>{title}</h3>
      <br />
          <div className="moreInfoBtn">
              <button>More info</button>
              </div>
    </div>
  );
}

export default Services;
