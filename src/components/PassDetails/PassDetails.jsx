import React from "react";
import "./PassDetails.scss";

const PassDetails = ({ num, onChange }) => {
  

  return (
    <div className="passengerDetails">
      <h1>Passenger {num}</h1>

      <div className="fields">
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => onChange("firstName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Middle Name"
          onChange={(e) => onChange("middleName", e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => onChange("lastName", e.target.value)}
        />
      </div>
      <div className="last">
        <select onChange={(e) => onChange("nationality", e.target.value)}>
          <option value="">Nationality</option>
          <option value="Nepal">Nepal</option>
          <option value="India">India</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>
  );
};

export default PassDetails;
